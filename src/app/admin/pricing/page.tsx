import Link from "next/link";
import { getPricingSnapshot } from "@/lib/admin-pricing";

const modeLabels:Record<string,string>={
  fixed:"ثابت",
  per_unit:"للوحدة",
  tiered:"شرائح كمية",
  matrix:"مصفوفة",
  formula:"معادلة",
  manual_quote:"عرض سعر يدوي"
};

export default async function PricingAdminPage(){
  const pricing=await getPricingSnapshot();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX PRICING ENGINE</span>
        <h1>التسعير</h1>
        <p>لا يوجد سعر وهمي. أي خدمة بلا قاعدة سعر معتمدة أو تكلفة تنفيذ صالحة تبقى في وضع عرض السعر حتى نملك بيانات حقيقية.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="pricing-kpis">
      <article><small>الخدمات</small><strong>{pricing.totals.services}</strong></article>
      <article><small>مهيأة للتسعير الآلي</small><strong>{pricing.totals.automated}</strong></article>
      <article><small>لها قواعد سعر فعلية</small><strong>{pricing.totals.withRules}</strong></article>
      <article><small>لها سعر شريك معتمد</small><strong>{pricing.totals.withApprovedPartnerPrice}</strong></article>
    </section>

    <section className="admin-list-shell">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>الخدمة</th><th>التصنيف</th><th>طريقة التسعير</th><th>قواعد ORYX</th><th>أسعار شركاء</th><th>الحالة</th></tr></thead>
          <tbody>
            {pricing.services.map(service=><tr key={service.slug}>
              <td><Link className="table-order-link" href={`/admin/pricing/${service.slug}`}><strong>{service.title}</strong><small>{service.slug}</small></Link></td>
              <td>{service.category}</td>
              <td>{modeLabels[service.pricingMode]??service.pricingMode}</td>
              <td>{service.activeRules}</td>
              <td>{service.approvedPartnerPrices}/{service.partnerPrices}</td>
              <td><span className={service.activeRules||service.approvedPartnerPrices?"status-pill ready":"status-pill warning"}>{service.activeRules||service.approvedPartnerPrices?"بيانات متاحة":"يتطلب تسعير"}</span></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </section>
  </main>;
}
