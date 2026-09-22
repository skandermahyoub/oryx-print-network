import Link from "next/link";
import { getAdminPartners } from "@/lib/admin-partners";

const statusLabels:Record<string,string>={
  applicant:"طلب جديد",
  under_review:"قيد المراجعة",
  active:"نشط",
  suspended:"موقوف",
  rejected:"مرفوض"
};

export default async function AdminPartnersPage(){
  const partners=await getAdminPartners();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX PRODUCTION NETWORK</span>
        <h1>شركاء الإنتاج</h1>
        <p>طلبات الانضمام والمنشآت المعتمدة وأداؤها التشغيلي في مكان واحد.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="admin-partner-grid">
      {partners.length?partners.map(partner=><article key={partner.id}>
        <div className="partner-card-top">
          <span className="status-pill">{statusLabels[partner.status]??partner.status}</span>
          <small>{partner.city??"مدينة غير محددة"}</small>
        </div>
        <h2>{partner.name}</h2>
        <p>{partner.capabilities??"لم تُسجل القدرات التفصيلية بعد."}</p>
        <div className="partner-card-meta">
          <span><b>الهاتف</b>{partner.phone??"—"}</span>
          <span><b>النوع</b>{partner.partnerType}</span>
          <span><b>الأداء</b>{partner.performanceScore===null?"غير مقيم":`${partner.performanceScore}%`}</span>
        </div>
      </article>):<div className="empty-panel">لا توجد طلبات شركاء أو شركاء نشطون بعد.</div>}
    </section>
  </main>;
}
