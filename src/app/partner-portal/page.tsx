import Link from "next/link";
import { requirePartnerAccess } from "@/lib/auth/partner-access";
import { getPartnerPortalSnapshot } from "@/lib/partner-portal";

export const dynamic="force-dynamic";

export default async function PartnerPortalPage(){
  const access=await requirePartnerAccess();
  const snapshot=await getPartnerPortalSnapshot(access.partnerId);

  const pendingSettlements=snapshot.settlements
    .filter(item=>item.status==="pending")
    .reduce((sum,item)=>sum+item.amount,0);

  return <main className="partner-portal-page">
    <section className="partner-portal-head">
      <div>
        <span className="eyebrow">ORYX PRODUCTION PARTNER</span>
        <h1>{snapshot.partner.name}</h1>
        <p>{snapshot.partner.city??"الموقع غير محدد"} · حالة الحساب: {snapshot.partner.status}</p>
      </div>
      <div className="account-actions">
        <Link className="secondary-button" href="/auth/sign-out">تسجيل الخروج</Link>
      </div>
    </section>

    <section className="partner-portal-kpis">
      <article><small>أعمال مفتوحة</small><strong>{snapshot.jobs.length}</strong></article>
      <article><small>أسعار مسجلة</small><strong>{snapshot.prices.length}</strong></article>
      <article><small>ماكينات</small><strong>{snapshot.machines.length}</strong></article>
      <article><small>تقييم الأداء</small><strong>{snapshot.partner.score===null?"—":`${snapshot.partner.score}%`}</strong></article>
      <article><small>مستحقات معلقة</small><strong>{pendingSettlements.toLocaleString("en-US")}</strong></article>
    </section>

    <section className="partner-portal-section">
      <div className="account-section-head"><h2>أعمال الإنتاج</h2><span>الأعمال المسندة إلى منشأتك</span></div>
      <div className="admin-table-wrap">
        <table className="partner-table">
          <thead><tr><th>WO</th><th>الطلب</th><th>الخدمة</th><th>الحالة</th><th>تكلفة التنفيذ</th><th>الموعد</th></tr></thead>
          <tbody>
            {snapshot.jobs.length?snapshot.jobs.map(job=><tr key={job.id}>
              <td><strong>#{job.workOrderNumber}</strong></td>
              <td>#{job.orderNumber}</td>
              <td>{job.service}</td>
              <td><span className="status-pill">{job.status}</span></td>
              <td>{job.quotedCost===null?"—":`${job.quotedCost.toLocaleString("en-US")} ${job.currency}`}</td>
              <td>{job.promisedAt?new Date(job.promisedAt).toLocaleString("ar-YE"):"—"}</td>
            </tr>):<tr><td colSpan={6} className="empty-cell light">لا توجد أعمال مفتوحة حاليًا.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>

    <section className="partner-portal-grid">
      <article className="partner-portal-section">
        <div className="account-section-head"><h2>الأسعار المقدمة</h2></div>
        <div className="portal-list">
          {snapshot.prices.length?snapshot.prices.slice(0,12).map(price=><div key={price.id}>
            <strong>{price.service}</strong>
            <span>{price.baseCost===null?"بدون سعر أساسي":`${price.baseCost.toLocaleString("en-US")} ${price.currency}`}</span>
            <small>{price.status}{price.validUntil?` · حتى ${price.validUntil}`:""}</small>
          </div>):<p className="account-empty">لم تسجل أسعار بعد.</p>}
        </div>
      </article>

      <article className="partner-portal-section">
        <div className="account-section-head"><h2>الماكينات</h2></div>
        <div className="portal-list">
          {snapshot.machines.length?snapshot.machines.map(machine=><div key={machine.id}>
            <strong>{machine.name}</strong><span>{machine.type}</span><small>{machine.status}</small>
          </div>):<p className="account-empty">لم تسجل الماكينات بعد.</p>}
        </div>
      </article>
    </section>
  </main>;
}
