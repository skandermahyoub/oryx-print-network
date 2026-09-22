"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

function text(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

function serviceSlugs(raw:string){
  return Array.from(new Set(
    raw.split(",")
      .map(item=>item.trim())
      .filter(item=>/^[a-z0-9-]+$/.test(item))
  )).slice(0,50);
}

export async function createContentPostAction(formData:FormData){
  await requirePermission("content.manage");
  const title=text(formData,"title");
  const slug=text(formData,"slug").toLowerCase();

  if(title.length<4||!/^[a-z0-9-]{3,120}$/.test(slug)){
    throw new Error("أدخل عنوانًا وSlug صالحًا.");
  }

  const sql=getSql();
  const rows=await sql`
    insert into blog_posts (
      slug,title_ar,excerpt_ar,content_ar,category,status,seo_title,seo_description,related_service_slugs
    ) values (
      ${slug},
      ${title},
      '',
      '',
      'مجلة ORYX',
      'draft',
      ${title},
      '',
      '{}'
    )
    on conflict (slug) do nothing
    returning id
  `;

  if(!rows[0]) throw new Error("هذا الـSlug مستخدم مسبقًا.");
  redirect(`/admin/content/${rows[0].id}`);
}

export async function updateContentPostAction(formData:FormData){
  await requirePermission("content.manage");
  const id=text(formData,"id");
  const title=text(formData,"title");
  const slug=text(formData,"slug").toLowerCase();
  const excerpt=text(formData,"excerpt");
  const content=text(formData,"content");
  const category=text(formData,"category");
  const status=text(formData,"status");
  const seoTitle=text(formData,"seoTitle");
  const seoDescription=text(formData,"seoDescription");
  const requestedSlugs=serviceSlugs(text(formData,"relatedServices"));

  if(!id||title.length<4||!/^[a-z0-9-]{3,120}$/.test(slug)){
    throw new Error("بيانات المقال غير مكتملة.");
  }
  if(!["draft","review","published","archived"].includes(status)){
    throw new Error("حالة المقال غير صالحة.");
  }
  if(status==="published"&&(excerpt.length<20||content.length<100)){
    throw new Error("لا يمكن نشر مقال فارغ أو قصير جدًا.");
  }

  const sql=getSql();
  const validRows=requestedSlugs.length
    ? await sql`select slug from services where slug=any(${requestedSlugs}) and is_active=true`
    : [];
  const validSlugs=validRows.map(row=>String(row.slug));

  const rows=await sql`
    update blog_posts
    set
      slug=${slug},
      title_ar=${title},
      excerpt_ar=${excerpt||null},
      content_ar=${content||null},
      category=${category||null},
      status=${status},
      seo_title=${seoTitle||null},
      seo_description=${seoDescription||null},
      related_service_slugs=${validSlugs},
      published_at=case
        when ${status}='published' then coalesce(published_at,now())
        else published_at
      end,
      updated_at=now()
    where id=${id}
    returning id
  `;

  if(!rows[0]) throw new Error("المقال غير موجود.");

  revalidatePath(`/admin/content/${id}`);
  revalidatePath("/admin/content");
  revalidatePath("/magazine");
  revalidatePath(`/magazine/${slug}`);
}

export async function archiveContentPostAction(formData:FormData){
  await requirePermission("content.manage");
  const id=text(formData,"id");
  const sql=getSql();
  await sql`
    update blog_posts
    set status='archived',updated_at=now()
    where id=${id}
  `;
  revalidatePath("/admin/content");
  redirect("/admin/content");
}
