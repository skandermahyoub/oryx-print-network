import Link from "next/link";
import { notFound } from "next/navigation";
import { getSql } from "@/lib/db";
import { archiveContentPostAction, updateContentPostAction } from "../actions";

export const dynamic="force-dynamic";

export default async function ContentEditorPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const sql=getSql();
  const rows=await sql`
    select
      id,slug,title_ar,excerpt_ar,content_ar,category,status,seo_title,seo_description,
      related_service_slugs,published_at,updated_at
    from blog_posts
    where id=${id}
    limit 1
  `;
  const post=rows[0];
  if(!post) notFound();

  const related=Array.isArray(post.related_service_slugs)?post.related_service_slugs.map(String).join(", "):"";

  return <main className="content-editor-page">
    <section className="content-editor-head">
      <div>
        <Link href="/admin/content">المجلة ←</Link>
        <span className="eyebrow">ORYX CONTENT STUDIO</span>
        <h1>{String(post.title_ar)}</h1>
        <p>آخر تحديث {new Date(String(post.updated_at)).toLocaleString("ar-YE")}</p>
      </div>
      <div className="content-editor-status"><small>الحالة</small><strong>{String(post.status)}</strong></div>
    </section>

    <form action={updateContentPostAction} className="content-editor-form">
      <input type="hidden" name="id" value={String(post.id)}/>
      <div className="content-editor-grid">
        <label className="wide">عنوان المقال<input name="title" defaultValue={String(post.title_ar)} required/></label>
        <label>Slug<input name="slug" dir="ltr" defaultValue={String(post.slug)} required pattern="[a-z0-9-]+"/></label>
        <label>التصنيف<input name="category" defaultValue={String(post.category??"")}/></label>
        <label className="wide">المقتطف<textarea name="excerpt" rows={3} defaultValue={String(post.excerpt_ar??"")}/></label>
        <label className="wide article-content-field">المحتوى<textarea name="content" rows={22} defaultValue={String(post.content_ar??"")} placeholder="استخدم ## لبداية العناوين الفرعية، وافصل الفقرات بسطر فارغ."/></label>
        <label>SEO Title<input name="seoTitle" defaultValue={String(post.seo_title??"")}/></label>
        <label>الحالة
          <select name="status" defaultValue={String(post.status)}>
            <option value="draft">مسودة</option>
            <option value="review">مراجعة</option>
            <option value="published">منشور</option>
            <option value="archived">مؤرشف</option>
          </select>
        </label>
        <label className="wide">SEO Description<textarea name="seoDescription" rows={3} defaultValue={String(post.seo_description??"")}/></label>
        <label className="wide">الخدمات المرتبطة<input name="relatedServices" dir="ltr" defaultValue={related} placeholder="business-cards, brochures, product-boxes"/></label>
      </div>

      <div className="content-editor-actions">
        <button className="primary-button" type="submit">حفظ المقال</button>
        {String(post.status)==="published"?<Link className="secondary-button" href={`/magazine/${String(post.slug)}`}>معاينة المقال</Link>:null}
      </div>
    </form>

    <form action={archiveContentPostAction} className="content-danger-zone">
      <input type="hidden" name="id" value={String(post.id)}/>
      <button type="submit">أرشفة المقال</button>
    </form>
  </main>;
}
