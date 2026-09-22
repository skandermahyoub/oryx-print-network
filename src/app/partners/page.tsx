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

      <form className="partner-form">
        <h2>طلب انضمام مبدئي</h2>
        <label>اسم المؤسسة<input placeholder="اسم المطبعة أو الورشة"/></label>
        <label>المدينة<input placeholder="صنعاء"/></label>
        <label>رقم التواصل<input placeholder="77xxxxxxx"/></label>
        <label>مجال الإنتاج<select defaultValue=""><option value="" disabled>اختر المجال</option><option>طباعة ورقية</option><option>طباعة رقمية</option><option>لوحات وواجهات</option><option>ليزر وتصنيع</option><option>تغليف</option><option>هدايا ومنتجات دعائية</option><option>ملابس وتطريز</option></select></label>
        <label>أهم المعدات والخدمات<textarea rows={5} placeholder="اكتب نبذة مختصرة"/></label>
        <button type="button">إرسال طلب الانضمام</button>
      </form>
    </section>
  </main>;
}
