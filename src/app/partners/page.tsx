import { PartnerApplicationForm } from "@/components/partner-application-form";

export default function PartnersPage(){
  return <main className="partner-page">
    <section className="catalog-hero">
      <span className="eyebrow">ORYX PRODUCTION NETWORK</span>
      <h1>لديك ماكينة أو ورشة؟ نملك قناة طلبات.</h1>
      <p>انضم كشريك إنتاج وقدم قدراتك وأسعار أوريكس الخاصة ووقت التنفيذ. توزيع الأعمال يعتمد على القدرة والسعر والجودة والالتزام.</p>
    </section>

    <section className="partner-layout">
      <div className="partner-steps">
        <article><b>01</b><h2>عرّف منشأتك</h2><p>الموقع، الخدمات، المعدات، الخامات والطاقة الإنتاجية.</p></article>
        <article><b>02</b><h2>قدّم أسعار ORYX</h2><p>سعر تنفيذ خاص وصلاحية السعر والحد الأدنى والوقت الطبيعي والعاجل.</p></article>
        <article><b>03</b><h2>نختبر الجودة</h2><p>عينات وقدرات وتقييم أولي قبل اعتماد الشبكة.</p></article>
        <article><b>04</b><h2>استلم أعمالًا مناسبة</h2><p>كل طلب يوجّه للشريك الأنسب وفق محرك توزيع وليس وفق الاشتراك الأعلى.</p></article>
      </div>
      <PartnerApplicationForm/>
    </section>
  </main>;
}
