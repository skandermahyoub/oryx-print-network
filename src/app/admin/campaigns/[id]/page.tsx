import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminCampaignDetail } from "@/lib/admin-campaign-detail";
import { addCampaignOfferAction, addCampaignTargetAction, updateCampaignStatusAction, updateCampaignTargetAction } from "./actions";

export const dynamic="force-dynamic";

export default async function CampaignDetailPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const detail=await getAdminCampaignDetail(id);
  if(!detail) notFound();
  const won=detail.targets.filter(target=>target.status==="won").length;
  const contacted=detail.targets.filter(target=>!["new","researched"].includes(target.status)).length;
  const revenue=detail.results.reduce((sum,result)=>sum+(result.revenue??0),0);

  return <main className="admin-campaign-detail-page">
    <section className="admin-order-hero">
      <div>
        <Link href="/admin/campaigns" className="admin-back-link">الحملات ←</Link>
        <span className="eyebrow">ORYX SALES CAMPAIGN</span>
        <h1>{detail.campaign.name}</h1>
        <p>{detail.campaign.objective}</p>
      </div>
      <div className="admin-order-hero-status"><small>الحالة</small><strong>{detail.campaign.status}</strong><span>{detail.campaign.startsAt??"—"} → {detail.campaign.endsAt??"—"}</span></div>
    </section>

    <section className="partner-review-actions">
      {["planned","active","paused","completed"].map(status=><form action={updateCampaignStatusAction} key={status}>
        <input type="hidden" name="campaignId" value={detail.campaign.id}/><input type="hidden" name="status" value={status}/><button type="submit">{status}</button>
      </form>)}
    </section>

    <section className="campaign-detail-kpis">
      <article><small>الأهداف</small><strong>{detail.targets.length}</strong></article>
      <article><small>تم التواصل</small><strong>{contacted}</strong></article>
      <article><small>Won</small><strong>{won}</strong></article>
      <article><small>إيراد منسوب</small><strong>{revenue.toLocaleString("en-US")}</strong></article>
    </section>

    <section className="campaign-detail-grid">
      <article className="campaign-op-panel">
        <h2>إضافة هدف</h2>
        <form action={addCampaignTargetAction} className="campaign-inline-form">
          <input type="hidden" name="campaignId" value={detail.campaign.id}/>
          <input name="company" placeholder="الشركة"/>
          <input name="contact" placeholder="الشخص"/>
          <input name="phone" placeholder="الهاتف"/>
          <input name="email" type="email" placeholder="البريد"/>
          <input name="city" placeholder="المدينة"/>
          <input name="score" type="number" min="0" max="100" defaultValue="50" placeholder="Score"/>
          <input name="nextActionAt" type="datetime-local"/>
          <button type="submit">إضافة للهدف</button>
        </form>
      </article>

      <article className="campaign-op-panel">
        <h2>العرض البيعي</h2>
        <form action={addCampaignOfferAction} className="campaign-inline-form">
          <input type="hidden" name="campaignId" value={detail.campaign.id}/>
          <input name="name" required placeholder="اسم العرض"/>
          <input name="headline" placeholder="العنوان"/>
          <select name="discountType" defaultValue="none"><option value="none">بدون خصم</option><option value="fixed">خصم ثابت</option><option value="percent">نسبة</option><option value="custom">مخصص</option></select>
          <input name="discountValue" type="number" min="0" step="0.01" placeholder="القيمة"/>
          <input name="validUntil" type="date"/>
          <button type="submit">إضافة العرض</button>
        </form>
      </article>

      <article className="campaign-op-panel campaign-targets-panel">
        <h2>الأهداف والمتابعة</h2>
        <div className="campaign-target-list">{detail.targets.map(target=><div key={target.id}>
          <div><strong>{target.company??target.contact??"هدف"}</strong><small>{target.contact??target.phone??target.city??"—"} · Score {target.score}</small></div>
          <form action={updateCampaignTargetAction}>
            <input type="hidden" name="campaignId" value={detail.campaign.id}/><input type="hidden" name="targetId" value={target.id}/>
            <select name="status" defaultValue={target.status}>{["new","researched","contacted","interested","meeting","quoted","won","lost","do_not_contact"].map(status=><option key={status} value={status}>{status}</option>)}</select>
            <input name="nextActionAt" type="datetime-local"/>
            <button type="submit">حفظ</button>
          </form>
        </div>)}</div>
      </article>

      <article className="campaign-op-panel">
        <h2>العروض الحالية</h2>
        <div className="project-simple-list">{detail.offers.map(offer=><div key={offer.id}><strong>{offer.name}</strong><span>{offer.headline??offer.discountType??"—"}</span><b>{offer.discountValue??"—"}</b></div>)}</div>
      </article>
    </section>
  </main>;
}
