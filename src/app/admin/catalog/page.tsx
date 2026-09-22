import { ServiceBuilderPreview } from "@/components/service-builder-preview";

export default function AdminCatalogPage(){
  return <main className="admin-catalog-page">
    <section className="admin-catalog-head">
      <span className="eyebrow">ORYX SERVICE BUILDER</span>
      <h1>ابنِ خدمة جديدة دون برمجة صفحة جديدة.</h1>
      <p>المعاينة التشغيلية الأولى لمحرك الخدمات الديناميكي. ربط الحفظ الفعلي بقاعدة Neon يأتي في طبقة الإدارة الآمنة.</p>
    </section>
    <ServiceBuilderPreview/>
  </main>;
}
