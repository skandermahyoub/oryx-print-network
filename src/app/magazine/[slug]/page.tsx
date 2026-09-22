import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { magazineArticles } from "@/lib/magazine";
import { getMagazinePost } from "@/lib/magazine-repository";

export function generateStaticParams(){
  return magazineArticles.map(article=>({slug:article.slug}));
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const article=await getMagazinePost(slug);
  if(!article) return {};
  return {
    title:article.seoTitle??`${article.title} | مجلة ORYX`,
    description:article.seoDescription??article.excerpt
  };
}

function paragraphs(content:string){
  return content
    .split(/\n\s*\n/)
    .map(block=>block.trim())
    .filter(Boolean);
}

export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const article=await getMagazinePost(slug);
  if(!article) notFound();

  const blocks=paragraphs(article.content);

  return <main className="article-page">
    <article className="article-shell">
      <span className="eyebrow">{article.category}</span>
      <h1>{article.title}</h1>
      <p className="article-lead">{article.excerpt}</p>
      {article.publishedAt?<div className="article-published">نشر في {new Date(article.publishedAt).toLocaleDateString("ar-YE")}</div>:null}

      {blocks.length?<div className="article-body">
        {blocks.map((block,index)=>{
          const heading=block.startsWith("## ");
          return heading
            ? <h2 key={index}>{block.replace(/^##\s+/,"")}</h2>
            : <p key={index}>{block}</p>;
        })}
      </div>:<div className="article-placeholder">
        <h2>المقال قيد التحرير داخل CMS</h2>
        <p>هذه الصفحة مرتبطة ببنية المجلة وSEO وسيظهر المحتوى المنشور من Neon مباشرة.</p>
      </div>}

      {article.relatedServiceSlugs.length?<section className="article-related-services">
        <h2>خدمات مرتبطة</h2>
        <div>{article.relatedServiceSlugs.map(service=><Link key={service} href={`/services/${service}`}>{service} ←</Link>)}</div>
      </section>:null}

      <Link className="primary-button" href="/services">استكشف كل الخدمات</Link>
    </article>
  </main>;
}
