import Link from "next/link";
import { getAdminCatalogServices } from "@/lib/admin-catalog";
import { setServicePublicationAction } from "../actions";

export const dynamic="force-dynamic";

export default async function CatalogServicesPage(){
  const services=await getAdminCatalogServices();
  const drafts=services.filter(service=>!service.public);
  const publicServices=services.filter(service=>service.public);

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX CATALOG GOVERNANCE</span>
        <h1>إدارة الخدمات</h1>
        <p>المسودة لا تدخل السوق لمجرد أن لها اسمًا. نرى حقولها وتشطيباتها ومسارها وقواعد التسعير قبل فتحها للعميل.</p>
      </div>
      <div className="admin-list-actions">
        <Link className="primary-button" href="/admin/catalog">خدمة جديدة</Link>
        <Link className="secondary-button" href="/admin">مركز القيادة</Link>
      </div>
    </section>

    <section className="catalog-governance-kpis">
      <article><small>كل الخدمات</small><strong>{services.length}</strong></article>
      <article><small>منشورة</small><strong>{publicServices.length}</strong></article>
      <article><small>مسودات</small><strong>{drafts.length}</strong></article>
      <article><small>بدون Workflow</small><strong>{services.filter(service=>service.workflowSteps===0).length}</strong></article>
    </section>

    <section className="admin-list-shell">
      <div className="admin-table-wrap">
        <table className="admin-table catalog-governance-table">
          <thead><tr><th>الخدمة</th><th>القسم</th><th>DNA</th><th>التسعير</th><th>الظهور</th><th>الإجراء</th></tr></thead>
          <tbody>
            {services.map(service=><tr key={service.id}>
              <td><Link className="table-order-link" href={`/admin/catalog/services/${service.id}`}><strong>{service.name}</strong><small>{service.slug}</small></Link></td>
              <td>{service.department}<small>{service.category}</small></td>
              <td><div className="catalog-dna-pills">
                <span>{service.fields} حقول</span>
                <span>{service.finishings} تشطيبات</span>
                <span>{service.workflowSteps} مراحل</span>
              </div></td>
              <td>{service.pricingMode}<small>{service.pricingRules} قواعد سعر</small></td>
              <td><span className={service.public?"status-pill ready":"status-pill warning"}>{service.public?"منشور":"مسودة"}</span></td>
              <td><form action={setServicePublicationAction}>
                <input type="hidden" name="serviceId" value={service.id}/>
                <input type="hidden" name="publish" value={service.public?"false":"true"}/>
                <button className={service.public?"catalog-unpublish":"catalog-publish"} type="submit">{service.public?"إخفاء":"اعتماد ونشر"}</button>
              </form></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </section>
  </main>;
}
