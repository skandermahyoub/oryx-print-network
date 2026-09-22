import Link from "next/link";
import { getCatalogSummaries } from "@/lib/catalog-repository";

export default async function ServicesPage({searchParams}:{searchParams:Promise<{search?:string}>}){
  const allServices=await getCatalogSummaries();
  const {search}=await searchParams;
  const needle=(search??"").trim().toLowerCase();
  const services=needle?allServices.filter(service=>`${service.title} ${service.summary} ${service.category}`.toLowerCase().includes(needle)):allServices;
  const groups=Array.from(new Set(services.map(service=>service.category)));

  return <main className="catalog-page">
    <section className="catalog-hero">
      <span className="eyebrow">ORYX SERVICE UNIVERSE</span>
      <h1>موسوعة خدمات، لا قائمة أسعار.</h1>
      <p>كل خدمة لها صفحة مستقلة ومواصفات وتشطيبات وتسعير ومسار إنتاج خاص بها. الكتالوج مصمم ليتوسع دون إعادة برمجة المنصة.</p>{needle?<div className="catalog-search-result">نتائج البحث عن: <strong>{search}</strong></div>:null}
      <div className="catalog-metrics">
        <span><strong>{services.length}</strong> خدمة قابلة للبيع</span>
        <span><strong>{groups.length}</strong> تصنيف تشغيلي</span>
      </div>
    </section>

    <section className="catalog-shell">
      {groups.map(group=>{
        const groupServices=services.filter(service=>service.category===group);
        return <div className="catalog-group" key={group}>
          <div className="catalog-group-head">
            <h2>{group}</h2>
            <span>{groupServices.length} خدمة</span>
          </div>
          <div className="catalog-list">
            {groupServices.map(service=>
              <Link className="catalog-row" href={`/services/${service.slug}`} key={service.slug}>
                <div><strong>{service.title}</strong><p>{service.summary}</p></div>
                <div className="catalog-row-meta"><span>{service.pricingMode==="instant"?"تسعير مباشر":"عرض سعر"}</span><b>←</b></div>
              </Link>
            )}
          </div>
        </div>;
      })}
    </section>
  </main>;
}
