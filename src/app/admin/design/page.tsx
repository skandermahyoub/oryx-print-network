import Link from "next/link";
import { getDesignSnapshot } from "@/lib/admin-design";

export default async function DesignPage(){
  const design=await getDesignSnapshot();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX DESIGN STUDIO</span>
        <h1>استوديو التصميم</h1>
        <p>Brief وإصدارات V1/V2/V3 واعتماد عميل مرتبط بالنسخة الدقيقة التي يسمح لها بالدخول إلى الإنتاج.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="production-kpis">
      <article><small>Briefs</small><strong>{design.totals.brief}</strong></article>
      <article><small>قيد التصميم</small><strong>{design.totals.designing}</strong></article>
      <article><small>بانتظار الاعتماد</small><strong>{design.totals.waitingApproval}</strong></article>
      <article><small>معتمد</small><strong>{design.totals.approved}</strong></article>
      <article><small>متأخر</small><strong>{design.totals.overdue}</strong></article>
    </section>

    <section className="admin-list-shell">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>الطلب</th><th>الخدمة</th><th>الحالة</th><th>الإصدارات</th><th>الاعتماد</th><th>الموعد</th></tr></thead>
          <tbody>
            {design.jobs.length?design.jobs.map(job=><tr key={job.id}>
              <td><strong>#{job.orderNumber}</strong></td>
              <td>{job.service}</td>
              <td><span className="status-pill">{job.status}</span></td>
              <td>{job.versions}</td>
              <td>{job.approved?"معتمد":"غير معتمد"}</td>
              <td>{job.dueAt?new Date(job.dueAt).toLocaleString("ar-YE"):"—"}</td>
            </tr>):<tr><td colSpan={6} className="empty-cell">لا توجد Design Jobs بعد.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  </main>;
}
