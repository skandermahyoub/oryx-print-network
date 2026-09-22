import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminPartnerDetail } from "@/lib/admin-partner-detail";
import { reviewPartnerPriceAction, updatePartnerStatusAction } from "./actions";

export const dynamic="force-dynamic";

const statusLabels:Record<string,string>={
  applicant:"طلب جديد",
  under_review:"قيد المراجعة",
  active:"نشط",
  suspended:"موقوف",
  rejected:"مرفوض"
};

export default async function AdminPartnerDetailPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const detail=await getAdminPartnerDetail(id);
  if(!detail) notFound();

  const metadataText=Object.entries(detail.partner.metadata)
    .filter(([,v])=>typeof v==="string"&&String(v).trim())
    .map(([k,v])=>`${k}: ${String(v)}`)
    .join(" · ");

  return <main className="admin-partner-detail-page">
    <section className="admin-order-hero">
      <div>
        <Link href="/admin/partners" className="admin-back-link">شركاء الإنتاج ←</Link>
        <span className="eyebrow">ORYX PRODUCTION PARTNER</span>
        <h1>{detail.partner.name}</h1>
        <p>{detail.partner.city??"بدون مدينة"} · {detail.partner.phone??"بدون هاتف"} · {detail.partner.email??"بدون بريد"}</p>
      </div>
      <div className="admin-order-hero-status">
        <small>الحالة</small>
        <strong>{statusLabels[detail.partner.status]??detail.partner.status}</strong>
        <span>{detail.partner.performanceScore===null?"لم يبدأ التقييم":`تقييم الأداء ${detail.partner.performanceScore}%`}</span>
      </div>
    </section>

    <section className="partner-review-actions">
      {["under_review","active","suspended","rejected"].filter(status=>status!==detail.partner.status).map(status=><form action={updatePartnerStatusAction} key={status}>
        <input type="hidden" name="partnerId" value={detail.partner.id}/>
        <input type="hidden" name="status" value={status}/>
        <button type="submit">{statusLabels[status]}</button>
      </form>)}
    </section>

    <section className="admin-order-body">
      <div className="admin-order-main">
        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>بيانات المنشأة</h2></div>
          <div className="partner-profile-grid">
            <span><b>الاسم القانوني</b>{detail.partner.legalName}</span>
            <span><b>الاسم التجاري</b>{detail.partner.tradeName??"—"}</span>
            <span><b>المدينة</b>{detail.partner.city??"—"}</span>
            <span><b>العنوان</b>{detail.partner.address??"—"}</span>
            <span><b>شروط التسعير</b>{detail.partner.pricingTerms??"لم تحدد"}</span>
            <span><b>شروط التسوية</b>{detail.partner.settlementTerms??"لم تحدد"}</span>
          </div>
          {metadataText?<p className="partner-metadata-note">{metadataText}</p>:null}
        </section>

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>أسعار ORYX المقدمة</h2><span>{detail.prices.length}</span></div>
          <div className="partner-price-review-list">
            {detail.prices.length?detail.prices.map(price=><article key={price.id}>
              <div><strong>{price.service}</strong><small>{price.serviceSlug}</small></div>
              <b>{price.baseCost===null?"بدون سعر":`${price.baseCost.toLocaleString("en-US")} ${price.currency}`}</b>
              <span>{price.normalLeadHours??"—"} ساعة · حد أدنى {price.minimumQuantity??"—"}</span>
              <em className="status-pill">{price.status}</em>
              {price.status==="submitted"?<div className="price-review-actions">
                <form action={reviewPartnerPriceAction}>
                  <input type="hidden" name="partnerId" value={detail.partner.id}/>
                  <input type="hidden" name="priceId" value={price.id}/>
                  <input type="hidden" name="decision" value="approved"/>
                  <button className="approve" type="submit">اعتماد</button>
                </form>
                <form action={reviewPartnerPriceAction}>
                  <input type="hidden" name="partnerId" value={detail.partner.id}/>
                  <input type="hidden" name="priceId" value={price.id}/>
                  <input type="hidden" name="decision" value="rejected"/>
                  <button className="reject" type="submit">رفض</button>
                </form>
              </div>:null}
            </article>):<p className="empty-note">لم يقدم الشريك أسعارًا بعد.</p>}
          </div>
        </section>

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>القدرات المعتمدة</h2><span>{detail.capabilities.length}</span></div>
          <div className="partner-capability-grid">
            {detail.capabilities.length?detail.capabilities.map((cap,index)=><article key={`${cap.service}-${index}`}>
              <strong>{cap.service}</strong>
              <span>{cap.baseCost===null?"بدون تكلفة":`${cap.baseCost.toLocaleString("en-US")} ${cap.currency}`}</span>
              <small>{cap.normalLeadHours??"—"} ساعة · طاقة {cap.dailyCapacity??"—"}</small>
            </article>):<p className="empty-note">لا توجد قدرات معتمدة بعد.</p>}
          </div>
        </section>

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>الماكينات</h2><span>{detail.machines.length}</span></div>
          <div className="partner-capability-grid">
            {detail.machines.length?detail.machines.map(machine=><article key={machine.id}>
              <strong>{machine.name}</strong>
              <span>{machine.type}</span>
              <small>{[machine.brand,machine.model,machine.status].filter(Boolean).join(" · ")}</small>
            </article>):<p className="empty-note">لم تسجل الماكينات بعد.</p>}
          </div>
        </section>
      </div>

      <aside className="admin-order-side">
        <div className="admin-order-finance">
          <small>التقييم الحالي</small>
          <strong>{detail.partner.performanceScore===null?"—":`${detail.partner.performanceScore}%`}</strong>
          <span>{detail.scoreHistory.length} Snapshot محفوظ</span>
          <span>{detail.compliance.length} وثيقة امتثال</span>
        </div>

        <div className="admin-order-timeline">
          <h2>سجل الشريك</h2>
          <article><span></span><div><strong>طلب الانضمام</strong><small>{new Date(detail.partner.createdAt).toLocaleString("ar-YE")}</small></div></article>
          {detail.audit.map((event,index)=><article key={`${event.action}-${index}`}>
            <span></span><div><strong>{event.action}</strong><small>{new Date(event.createdAt).toLocaleString("ar-YE")}</small>{event.actor?<p>{event.actor}</p>:null}</div>
          </article>)}
        </div>
      </aside>
    </section>
  </main>;
}
