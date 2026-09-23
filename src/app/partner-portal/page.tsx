import Link from "next/link";
import { requirePartnerAccess } from "@/lib/auth/partner-access";
import { getPartnerPortalSnapshot } from "@/lib/partner-portal";
import { getCatalogSummaries } from "@/lib/catalog-repository";
import {
  acceptPartnerJobAction,
  completeProductionStepAction,
  declinePartnerJobAction,
  markPartnerNotificationReadAction,
  startPartnerProductionAction,
  submitPartnerPriceAction
} from "./actions";

export const dynamic="force-dynamic";

export default async function PartnerPortalPage(){
  const access=await requirePartnerAccess();
  const [snapshot,services]=await Promise.all([
    getPartnerPortalSnapshot(access.partnerId),
    getCatalogSummaries()
  ]);

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
      <div className="account-section-head"><h2>الإشعارات</h2><span>{snapshot.notifications.filter(item=>item.status!=="read").length} جديد</span></div>
      <div className="partner-notification-list">
        {snapshot.notifications.length?snapshot.notifications.map(item=><article key={item.id} className={item.status==="read"?"read":""}>
          <div><small>{new Date(item.createdAt).toLocaleString("ar-YE")}</small><strong>{item.subject}</strong><p>{item.body}</p></div>
          {item.status!=="read"?<form action={markPartnerNotificationReadAction}>
            <input type="hidden" name="notificationId" value={item.id}/>
            <button type="submit">تمت القراءة</button>
          </form>:<span>مقروء</span>}
        </article>):<p className="account-empty">لا توجد إشعارات جديدة.</p>}
      </div>
    </section>

    <section className="partner-portal-section">
      <div className="account-section-head"><h2>أعمال الإنتاج</h2><span>الأعمال المسندة إلى منشأتك</span></div>
      <div className="admin-table-wrap">
        <table className="partner-table">
          <thead><tr><th>WO</th><th>الطلب</th><th>الخدمة</th><th>الحالة</th><th>تكلفة التنفيذ</th><th>الموعد</th><th>الإجراء</th></tr></thead>
          <tbody>
            {snapshot.jobs.length?snapshot.jobs.map(job=><tr key={job.id}>
              <td><strong>#{job.workOrderNumber}</strong></td>
              <td>#{job.orderNumber}</td>
              <td>{job.service}</td>
              <td><span className="status-pill">{job.status}</span>{job.currentStepName?<small className="partner-current-step">{job.currentStepName}</small>:null}</td>
              <td>{job.quotedCost===null?"—":`${job.quotedCost.toLocaleString("en-US")} ${job.currency}`}</td>
              <td>{job.promisedAt?new Date(job.promisedAt).toLocaleString("ar-YE"):"—"}</td>
              <td>
                {job.status==="offered"?<div className="partner-job-actions">
                  <form action={acceptPartnerJobAction}>
                    <input type="hidden" name="partnerJobId" value={job.id}/>
                    <button className="accept" type="submit">قبول</button>
                  </form>
                  <form action={declinePartnerJobAction}>
                    <input type="hidden" name="partnerJobId" value={job.id}/>
                    <input type="hidden" name="reason" value="Declined from partner portal"/>
                    <button className="decline" type="submit">رفض</button>
                  </form>
                </div>:job.status==="accepted"||job.status==="rework"?<form action={startPartnerProductionAction} className="partner-production-action">
                  <input type="hidden" name="partnerJobId" value={job.id}/>
                  <button type="submit">ابدأ الإنتاج</button>
                </form>:job.status==="in_progress"?<form action={completeProductionStepAction} className="partner-production-step-form">
                  <input type="hidden" name="partnerJobId" value={job.id}/>
                  <input name="goodQuantity" type="number" min="0" step="0.001" placeholder="جيد"/>
                  <input name="wasteQuantity" type="number" min="0" step="0.001" placeholder="هالك"/>
                  <button type="submit">{job.currentStepName?"أكمل المرحلة":"إرسال للجودة"}</button>
                </form>:<span className="partner-job-static">{job.workOrderStatus}</span>}
              </td>
            </tr>):<tr><td colSpan={7} className="empty-cell light">لا توجد أعمال مفتوحة حاليًا.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>

    <section className="partner-price-submit partner-portal-section">
      <div className="account-section-head">
        <div><h2>قدّم سعر ORYX</h2><p>السعر هنا تكلفة تنفيذ خاصة بالشبكة، وليس سعر بيع العميل النهائي.</p></div>
      </div>
      <form action={submitPartnerPriceAction} className="partner-price-form">
        <label>الخدمة
          <select name="serviceSlug" required defaultValue="">
            <option value="" disabled>اختر الخدمة</option>
            {services.map(service=><option key={service.slug} value={service.slug}>{service.title} · {service.category}</option>)}
          </select>
        </label>
        <label>التكلفة الأساسية
          <input name="baseCost" type="number" min="0" step="0.01" required placeholder="0"/>
        </label>
        <label>الحد الأدنى للكمية
          <input name="minimumQuantity" type="number" min="0" step="0.001" placeholder="اختياري"/>
        </label>
        <label>وقت التنفيذ الطبيعي
          <input name="normalLeadHours" type="number" min="1" step="1" placeholder="بالساعات"/>
        </label>
        <label>وقت التنفيذ العاجل
          <input name="urgentLeadHours" type="number" min="1" step="1" placeholder="بالساعات"/>
        </label>
        <label>صلاحية السعر
          <input name="validUntil" type="date"/>
        </label>
        <label className="wide">ملاحظات وشروط
          <textarea name="notes" rows={3} placeholder="الخامة، الكمية، الاستثناءات أو أي شروط مهمة"/>
        </label>
        <button className="primary-button" type="submit">إرسال السعر للمراجعة</button>
      </form>
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
