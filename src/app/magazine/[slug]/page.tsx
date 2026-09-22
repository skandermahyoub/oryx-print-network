import { notFound } from "next/navigation";
import Link from "next/link";
import { magazineArticles } from "@/lib/magazine";

export function generateStaticParams(){
  return magazineArticles.map(article=>({slug:article.slug}));
}

export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const article=magazineArticles.find(item=>item.slug===slug);
  if(!article) notFound();

  return <main className="article-page">
    <article className="article-shell">
      <span className="eyebrow">{article.category}</span>
      <h1>{article.title}</h1>
      <p className="article-lead">{article.excerpt}</p>
      <div className="article-placeholder">
        <h2>المقال قيد التحرير داخل CMS</h2>
        <p>هذه الصفحة أصبحت جزءًا فعليًا من بنية المجلة وSEO. المحتوى النهائي سيُدار من لوحة أوريكس ويرتبط بالخدمات والباقات ذات الصلة.</p>
      </div>
      <Link className="primary-button" href="/services">استكشف الخدمات المرتبطة</Link>
    </article>
  </main>;
}
