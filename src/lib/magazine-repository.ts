import { databaseConfigured, getSql } from "@/lib/db";
import { magazineArticles } from "@/lib/magazine";

export type MagazinePost={
  slug:string;
  title:string;
  category:string;
  excerpt:string;
  content:string;
  seoTitle:string|null;
  seoDescription:string|null;
  relatedServiceSlugs:string[];
  publishedAt:string|null;
};

export async function getMagazinePosts():Promise<MagazinePost[]>{
  if(!databaseConfigured()){
    return magazineArticles.map(article=>({
      slug:article.slug,
      title:article.title,
      category:article.category,
      excerpt:article.excerpt,
      content:"",
      seoTitle:null,
      seoDescription:null,
      relatedServiceSlugs:[],
      publishedAt:null
    }));
  }

  try{
    const sql=getSql();
    const rows=await sql`
      select
        slug,title_ar,category,excerpt_ar,content_ar,seo_title,seo_description,
        related_service_slugs,published_at
      from blog_posts
      where status='published'
      order by published_at desc nulls last,created_at desc
    `;

    if(!rows.length){
      return magazineArticles.map(article=>({
        slug:article.slug,
        title:article.title,
        category:article.category,
        excerpt:article.excerpt,
        content:"",
        seoTitle:null,
        seoDescription:null,
        relatedServiceSlugs:[],
        publishedAt:null
      }));
    }

    return rows.map(row=>({
      slug:String(row.slug),
      title:String(row.title_ar),
      category:String(row.category??"مجلة ORYX"),
      excerpt:String(row.excerpt_ar??""),
      content:String(row.content_ar??""),
      seoTitle:row.seo_title?String(row.seo_title):null,
      seoDescription:row.seo_description?String(row.seo_description):null,
      relatedServiceSlugs:Array.isArray(row.related_service_slugs)?row.related_service_slugs.map(String):[],
      publishedAt:row.published_at?new Date(String(row.published_at)).toISOString():null
    }));
  }catch{
    return magazineArticles.map(article=>({
      slug:article.slug,
      title:article.title,
      category:article.category,
      excerpt:article.excerpt,
      content:"",
      seoTitle:null,
      seoDescription:null,
      relatedServiceSlugs:[],
      publishedAt:null
    }));
  }
}

export async function getMagazinePost(slug:string):Promise<MagazinePost|undefined>{
  if(databaseConfigured()){
    try{
      const sql=getSql();
      const rows=await sql`
        select
          slug,title_ar,category,excerpt_ar,content_ar,seo_title,seo_description,
          related_service_slugs,published_at
        from blog_posts
        where slug=${slug} and status='published'
        limit 1
      `;
      const row=rows[0];
      if(row){
        return {
          slug:String(row.slug),
          title:String(row.title_ar),
          category:String(row.category??"مجلة ORYX"),
          excerpt:String(row.excerpt_ar??""),
          content:String(row.content_ar??""),
          seoTitle:row.seo_title?String(row.seo_title):null,
          seoDescription:row.seo_description?String(row.seo_description):null,
          relatedServiceSlugs:Array.isArray(row.related_service_slugs)?row.related_service_slugs.map(String):[],
          publishedAt:row.published_at?new Date(String(row.published_at)).toISOString():null
        };
      }
    }catch{}
  }

  const fallback=magazineArticles.find(article=>article.slug===slug);
  return fallback?{
    slug:fallback.slug,
    title:fallback.title,
    category:fallback.category,
    excerpt:fallback.excerpt,
    content:"",
    seoTitle:null,
    seoDescription:null,
    relatedServiceSlugs:[],
    publishedAt:null
  }:undefined;
}
