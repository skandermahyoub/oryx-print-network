import Link from "next/link";
import { getProductionSnapshot } from "@/lib/admin-production";

export default async function ProductionPage(){
  const production=await getProductionSnapshot();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX PRODUCTION CONTROL</span>
        <h1>الإنتاج والجودة</h1>
        <p>من اعتماد التصميم إلى شريك التنفيذ والماكينة وفحص الجودة وإعادة العمل، كل قطعة لها أثر تشغيلي قابل للتتبع.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="production-kpis">
      <article><small>في الطابور</small><strong>{production.totals.queued}</strong></article>
      <article><small>قيد التنفيذ</small><strong>{production.totals.inProgress}</strong></article>
      <article><small>فحص جودة معلق</small><strong>{production.totals.qc}</strong></article>
      <article><small>إعادة عمل</small><strong>{production.totals.rework}</strong></article>
      <article><small>متأخر</small><strong>{production.totals.overdue}</strong></article>
    </section>

    <section className="admin-list-shell production-qc-shell">
      <div className="logistics-section-head"><h2>فحوصات الجودة المعلقة</h2><span>{production.inspections.length}</span></div>
      <div className="qc-review-grid">
        {production.inspections.length?production.inspections.map(inspection=><article key={inspection.id}>
          <div className="qc-review-head">
            <div><small>WO #{inspection.workOrderNumber} · ORDER #{inspection.orderNumber}</small><h3>{inspection.service}</h3></div>
            <span className="status-pill">{inspection.status}</span>
          </div>
          <p>{inspection.partner??"تنفيذ داخلي"} · كمية {inspection.quantity}</p>
          <Link className="qc-open-button" href={`/admin/production/qc/${inspection.id}`}>فتح Checklist وفحص الجودة ←</Link>
        </article>):<div className="empty-panel">لا توجد فحوصات جودة معلقة.</div>}
      </div>
    </section>

    <section className="admin-list-shell">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>WO</th><th>الطلب</th><th>الخدمة</th><th>الشريك</th><th>المرحلة</th><th>الأولوية</th><th>الموعد</th></tr></thead>
          <tbody>
            {production.workOrders.length?production.workOrders.map(work=><tr key={work.id}>
              <td><Link className="table-order-link" href={`/admin/production/${work.id}`}><strong>#{work.number}</strong></Link></td>
              <td>#{work.orderNumber}</td>
              <td>{work.service}</td>
              <td>{work.partner??"لم يسند"}</td>
              <td><span className="status-pill">{work.currentStep??work.status}</span></td>
              <td>{work.priority}</td>
              <td>{work.promisedAt?new Date(work.promisedAt).toLocaleString("ar-YE"):"—"}</td>
            </tr>):<tr><td colSpan={7} className="empty-cell">لا توجد أوامر إنتاج مفتوحة بعد.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  </main>;
}
