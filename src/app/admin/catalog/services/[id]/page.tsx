import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminServiceDetail } from "@/lib/admin-service-detail";
import { setServicePublicationAction } from "../../actions";
import { addServiceFieldAction, addWorkflowStepAction } from "./actions";

export const dynamic="force-dynamic";

export default async function AdminServiceDetailPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const detail=await getAdminServiceDetail(id);
  if(!detail) notFound();

  const currentWorkflow=detail.workflows.find(workflow=>workflow.isDefault)??detail.workflows[0];

  return <main className="admin-service-detail-page">
    <section className="admin-order-hero">
      <div>
        <Link href="/admin/catalog/services" className="admin-back-link">إدارة الخدمات ←</Link>
        <span className="eyebrow">ORYX SERVICE DNA</span>
        <h1>{detail.service.name}</h1>
        <p>{detail.service.department} · {detail.service.category} · {detail.service.slug}</p>
      </div>
      <div className="admin-order-hero-status">
        <small>الحالة</small>
        <strong>{detail.service.public?"منشور":"مسودة"}</strong>
        <span>آخر تحديث {new Date(detail.service.updatedAt).toLocaleString("ar-YE")}</span>
      </div>
    </section>

    <section className="partner-review-actions">
      <form action={setServicePublicationAction}>
        <input type="hidden" name="serviceId" value={detail.service.id}/>
        <input type="hidden" name="publish" value={detail.service.public?"false":"true"}/>
        <button type="submit">{detail.service.public?"إخفاء من الكتالوج":"اعتماد ونشر"}</button>
      </form>
      {detail.service.public?<Link className="service-public-link" href={`/services/${detail.service.slug}`}>فتح صفحة العميل ←</Link>:null}
    </section>

    <section className="admin-order-body">
      <div className="admin-order-main">
        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>هوية الخدمة</h2></div>
          <div className="partner-profile-grid">
            <span><b>طريقة البيع</b>{detail.service.sellingMode}</span>
            <span><b>طريقة التسعير</b>{detail.service.pricingMode}</span>
            <span><b>اعتماد التصميم</b>{detail.service.designApproval?"مطلوب":"غير مطلوب"}</span>
            <span><b>شركاء قادرون</b>{detail.partnerCount}</span>
            <span><b>قواعد السعر</b>{detail.pricingRules.length}</span>
            <span><b>Preflight</b>{detail.preflight.length}</span>
          </div>
          {detail.service.summary?<p className="partner-metadata-note">{detail.service.summary}</p>:null}
        </section>

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>حقول المواصفات</h2><span>{detail.fields.length}</span></div>
          <div className="service-field-admin-list">
            {detail.fields.map(field=><article key={field.id}>
              <div><strong>{field.label}</strong><small>{field.key}</small></div>
              <span>{field.type}</span>
              <span>{field.required?"مطلوب":"اختياري"}</span>
              <span>{field.affectsPrice?"سعر":""} {field.affectsMaterial?"خامة":""} {field.affectsProduction?"إنتاج":""}</span>
            </article>)}
          </div>
          <form action={addServiceFieldAction} className="service-inline-builder">
            <input type="hidden" name="serviceId" value={detail.service.id}/>
            <input name="label" required placeholder="اسم الحقل"/>
            <input name="key" required pattern="[a-z][a-z0-9_]+" placeholder="field_key" dir="ltr"/>
            <select name="type" defaultValue="select">
              {["select","number","text","boolean","file","textarea","date","location","color","dimension"].map(type=><option key={type}>{type}</option>)}
            </select>
            <input name="options" placeholder="الخيارات، مفصولة بفاصلة"/>
            <select name="required" defaultValue="false"><option value="false">اختياري</option><option value="true">مطلوب</option></select>
            <button type="submit">+ حقل</button>
          </form>
        </section>

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>مسار الإنتاج</h2><span>{currentWorkflow?.steps.length??0}</span></div>
          {currentWorkflow?<div className="workflow-admin-head">
            <div><strong>{currentWorkflow.name}</strong><small>Version {currentWorkflow.version}{currentWorkflow.usedByWorkOrders?` · مستخدم في ${currentWorkflow.usedByWorkOrders} أمر عمل`:""}</small></div>
          </div>:null}
          <div className="workflow-admin-list">
            {currentWorkflow?.steps.length?currentWorkflow.steps.map((step,index)=><article key={step.id}>
              <span>{String(index+1).padStart(2,"0")}</span>
              <strong>{step.name}</strong>
              <small>{step.requiresQc?"QC ":""}{step.requiresPhoto?"PHOTO ":""}{step.estimatedMinutes?`${step.estimatedMinutes} دقيقة`:""}</small>
            </article>):<p className="empty-note">لم يُبن مسار إنتاج لهذه الخدمة بعد.</p>}
          </div>
          <form action={addWorkflowStepAction} className="service-inline-builder workflow-add-form">
            <input type="hidden" name="serviceId" value={detail.service.id}/>
            <input name="name" required placeholder="اسم مرحلة الإنتاج"/>
            <input name="estimatedMinutes" type="number" min="0" placeholder="دقائق تقديرية"/>
            <select name="requiresQc" defaultValue="false"><option value="false">بدون QC</option><option value="true">يتطلب QC</option></select>
            <select name="requiresPhoto" defaultValue="false"><option value="false">بدون صورة</option><option value="true">يتطلب صورة</option></select>
            <button type="submit">+ مرحلة</button>
          </form>
        </section>

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>التشطيبات</h2><span>{detail.finishings.length}</span></div>
          <div className="admin-tag-cloud">{detail.finishings.map(item=><span key={item.id}>{item.name}</span>)}</div>
        </section>
      </div>

      <aside className="admin-order-side">
        <div className="admin-order-finance">
          <small>Production DNA</small>
          <strong>{detail.fields.length + detail.finishings.length + (currentWorkflow?.steps.length??0)}</strong>
          <span>{detail.fields.length} حقول</span>
          <span>{detail.finishings.length} تشطيبات</span>
          <span>{currentWorkflow?.steps.length??0} مراحل إنتاج</span>
        </div>

        <div className="admin-order-section service-side-card">
          <h2>Preflight</h2>
          <div className="portal-list">
            {detail.preflight.length?detail.preflight.map(item=><div key={item.key}><strong>{item.label}</strong><small>{item.beforeQuote?"قبل السعر":item.beforeProduction?"قبل الإنتاج":"مراجعة"}</small></div>):<p className="empty-note">لا توجد متطلبات Preflight.</p>}
          </div>
        </div>

        <div className="admin-order-section service-side-card">
          <h2>قواعد السعر</h2>
          <div className="portal-list">
            {detail.pricingRules.length?detail.pricingRules.map(rule=><div key={rule.id}><strong>{rule.name}</strong><span>{rule.type}</span><small>Priority {rule.priority} · {rule.active?"Active":"Off"}</small></div>):<p className="empty-note">لا توجد قواعد سعر.</p>}
          </div>
        </div>
      </aside>
    </section>
  </main>;
}
