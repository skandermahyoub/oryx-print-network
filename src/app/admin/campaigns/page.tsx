import Link from "next/link";
import { notFound } from "next/navigation";
import { getSalesCampaigns } from "@/lib/admin-campaigns";

const labels:Record<string,string>={
  draft:"مسودة",
  planned:"مخططة",
  active:"نشطة",
  paused:"متوقفة",
  completed:"مكتملة",
  cancelled:"ملغاة"
};

export default async function SalesCampaignsPage(){
  if(process.env.ENABLE_ADMIN_PREVIEW!=="true") notFound();
  const campaigns=await getSalesCampaigns();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX SALES ENGINE</span>
        <h1>الحملات البيعية</h1>
        <p>أوريكس لا تنتظر الطلب. هنا تتحول الباقات والمواسم والمناسبات إلى حملات استهداف ومتابعة وصفقات.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="campaign-admin-grid">
      {campaigns.map(campaign=><article key={campaign.id}>
        <div className="campaign-card-head">
          <span className="status-pill">{labels[campaign.status]??campaign.status}</span>
          <small>{campaign.packageName??"بدون باقة مرتبطة"}</small>
        </div>
        <h2>{campaign.name}</h2>
        <p>{campaign.objective}</p>
        {campaign.pitch?<blockquote>{campaign.pitch}</blockquote>:null}
        <div className="campaign-card-kpis">
          <span><b>{campaign.targetCount}</b> أهداف</span>
          <span><b>{campaign.contactedCount}</b> تم التواصل</span>
          <span><b>{campaign.wonCount}</b> صفقات</span>
        </div>
        <footer>
          <small>{campaign.startsAt??"—"} → {campaign.endsAt??"—"}</small>
          <span>Direct B2B</span>
        </footer>
      </article>)}
      {!campaigns.length?<div className="empty-panel">لا توجد حملات بعد.</div>:null}
    </section>
  </main>;
}
