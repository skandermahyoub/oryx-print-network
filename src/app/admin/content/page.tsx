import Link from "next/link";
import { getContentPosts } from "@/lib/admin-content";

export default async function ContentAdminPage(){
  const posts=await getContentPosts();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX CONTENT & SEO</span>
        <h1>المجلة الرقمية</h1>
        <p>كل مقال يجب أن يجيب عن سؤال حقيقي، يربط بالخدمة المناسبة، ويصنع مدخلًا عضويًا إلى ORYX بدل نشر محتوى للزينة.</p>
      </div>
      <div className="admin-list-actions"><Link className="primary-button" href="/admin/content/new">مقال جديد</Link><Link className="secondary-button" href="/admin">مركز القيادة</Link></div>
    </section>

    <section className="admin-list-shell">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>المقال</th><th>التصنيف</th><th>الحالة</th><th>SEO</th><th>خدمات مرتبطة</th><th>آخر تحديث</th></tr></thead>
          <tbody>
            {posts.length?posts.map(post=><tr key={post.id}>
              <td><Link className="table-order-link" href={`/admin/content/${post.id}`}><strong>{post.title}</strong><small>{post.slug}</small></Link></td>
              <td>{post.category??"—"}</td>
              <td><span className="status-pill">{post.status}</span></td>
              <td>{post.seoTitle?"مهيأ":"يحتاج إعداد"}</td>
              <td>{post.relatedServices}</td>
              <td>{new Date(post.updatedAt).toLocaleDateString("ar-YE")}</td>
            </tr>):<tr><td colSpan={6} className="empty-cell">لا توجد مقالات بعد.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  </main>;
}
