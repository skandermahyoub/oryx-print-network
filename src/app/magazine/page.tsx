import Link from "next/link";
import { getMagazinePosts } from "@/lib/magazine-repository";

export const dynamic="force-dynamic";

export default async function MagazinePage(){
  const posts=await getMagazinePosts();

  return <main className="catalog-page">
    <section className="catalog-hero">
      <span className="eyebrow">ORYX PRINT JOURNAL</span>
      <h1>المجلة التي تجيب قبل أن يسأل العميل.</h1>
      <p>معرفة متخصصة في الطباعة والتصميم والإعلان والتغليف، مبنية لتفيد القارئ وتقوده إلى الخدمة الصحيحة.</p>
      <div className="catalog-metrics">
        <span><strong>{posts.length}</strong> مقالًا منشورًا</span>
      </div>
    </section>
    <section className="article-grid page-grid">
      {posts.map((article,index)=><article className="article-card" key={article.slug}>
        <div className="article-meta"><span>{article.category}</span><small>{String(index+1).padStart(2,"0")}</small></div>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        {article.relatedServiceSlugs.length?<div className="article-intent">{article.relatedServiceSlugs.length} خدمات مرتبطة</div>:null}
        <Link href={`/magazine/${article.slug}`}>اقرأ المقال ←</Link>
      </article>)}
    </section>
  </main>;
}
