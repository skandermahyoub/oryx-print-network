import { ServiceBuilderPreview } from "@/components/service-builder-preview";
import { getCatalogBuilderOptions } from "@/lib/catalog-builder";

export const dynamic="force-dynamic";

export default async function AdminCatalogPage(){
  const options=await getCatalogBuilderOptions();

  return <main className="admin-catalog-page">
    <section className="admin-catalog-head">
      <span className="eyebrow">ORYX SERVICE BUILDER</span>
      <h1>ابنِ خدمة تشغيلية جديدة دون برمجة صفحة.</h1>
      <p>الخدمة الجديدة تحفظ كمسودة في Neon مع حقول مواصفاتها وتشطيباتها، وتبقى مخفية عن العملاء حتى اعتمادها.</p>
      <div className="admin-catalog-actions"><a className="secondary-button" href="/admin/catalog/services">إدارة كل الخدمات</a></div><div className="catalog-metrics">
        <span><strong>{options.categories.length}</strong> تصنيف متاح</span>
        <span><strong>{options.finishings.length}</strong> تشطيب في المكتبة</span>
      </div>
    </section>
    <ServiceBuilderPreview categories={options.categories} finishings={options.finishings}/>
  </main>;
}
