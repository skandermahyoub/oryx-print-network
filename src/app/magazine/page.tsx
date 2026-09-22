import Link from "next/link";
import { magazineArticles } from "@/lib/magazine";

export default function MagazinePage(){
  return <main className="catalog-page">
    <section className="catalog-hero">
      <span className="eyebrow">ORYX PRINT JOURNAL</span>
      <h1>المجلة التي تجيب قبل أن يسأل العميل.</h1>
      <p>معرفة متخصصة في الطباعة والتصميم والإعلان والتغليف، مبنية لتفيد القارئ وتقوده إلى الخدمة الصحيحة.</p>
    </section>
    <section className="article-grid page-grid">
      {magazineArticles.map((article,index)=><article className="article-card" key={article.slug}>
        <div className="article-meta"><span>{article.category}</span><small>{String(index+1).padStart(2,"0")}</small></div>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <div className="article-intent">نية البحث: {article.intent}</div>
        <Link href={`/magazine/${article.slug}`}>اقرأ المقال ←</Link>
      </article>)}
    </section>
  </main>;
}
