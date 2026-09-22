import Link from "next/link";
import { serviceCatalog } from "@/lib/service-catalog";

const groups=Array.from(new Set(serviceCatalog.map(s=>s.category)));

export default function ServicesPage(){
  return <main className="catalog-page">
    <section className="catalog-hero">
      <span className="eyebrow">ORYX SERVICE UNIVERSE</span>
      <h1>موسوعة خدمات، لا قائمة أسعار.</h1>
      <p>كل خدمة لها مواصفات وتشطيبات وحقول وتسعير ومسار إنتاج خاص بها.</p>
    </section>

    <section className="catalog-shell">
      {groups.map(group=><div className="catalog-group" key={group}>
        <div className="catalog-group-head">
          <h2>{group}</h2>
          <span>{serviceCatalog.filter(s=>s.category===group).length} خدمة مبدئية</span>
        </div>
        <div className="catalog-list">
          {serviceCatalog.filter(s=>s.category===group).map(service=>
            <Link className="catalog-row" href={`/services/${service.slug}`} key={service.slug}>
              <div><strong>{service.title}</strong><p>{service.summary}</p></div>
              <div className="catalog-row-meta"><span>{service.pricingMode==="instant"?"تسعير مباشر":"عرض سعر"}</span><b>←</b></div>
            </Link>
          )}
        </div>
      </div>)}
    </section>
  </main>;
}
