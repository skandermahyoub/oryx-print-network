import { databaseConfigured, getSql } from "@/lib/db";

export type ContentPostRow={
  id:string;
  slug:string;
  title:string;
  category:string|null;
  status:string;
  seoTitle:string|null;
  relatedServices:number;
  publishedAt:string|null;
  updatedAt:string;
};

export async function getContentPosts():Promise<ContentPostRow[]>{
  if(!databaseConfigured()) return [];
  try{
    const sql=getSql();
    const rows=await sql`
      select
        id,slug,title_ar,category,status,seo_title,related_service_slugs,published_at,updated_at
      from blog_posts
      order by
        case status when 'draft' then 0 when 'review' then 1 when 'published' then 2 else 3 end,
        updated_at desc
    `;
    return rows.map(row=>({
      id:String(row.id),
      slug:String(row.slug),
      title:String(row.title_ar),
      category:row.category?String(row.category):null,
      status:String(row.status),
      seoTitle:row.seo_title?String(row.seo_title):null,
      relatedServices:Array.isArray(row.related_service_slugs)?row.related_service_slugs.length:0,
      publishedAt:row.published_at?new Date(String(row.published_at)).toISOString():null,
      updatedAt:new Date(String(row.updated_at)).toISOString()
    }));
  }catch{
    return [];
  }
}
