import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminQcDetail } from "@/lib/admin-qc-detail";
import { closeQcInspectionAction, updateQcCheckAction } from "./actions";

export const dynamic="force-dynamic";

const resultLabels:Record<string,string>={
  pending:"معلق",
  pass:"اجتاز",
  fail:"فشل",
  not_applicable:"غير منطبق"
};

export default async function QcInspectionPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const detail=await getAdminQcDetail(id);
  if(!detail) notFound();

  const pending=detail.checks.filter(check=>check.result==="pending").length;
  const failed=detail.checks.filter(check=>check.result==="fail").length;
  const passed=detail.checks.filter(check=>check.result==="pass").length;
  const closed=detail.inspection.status!=="pending";

  return <main className="admin-qc-detail-page">
    <section className="admin-order-hero">
      <div>
        <Link href="/admin/production" className="admin-back-link">الإنتاج والجودة ←</Link>
        <span className="eyebrow">ORYX QUALITY CONTROL</span>
        <h1>{detail.inspection.service}</h1>
        <p>QC · WO #{detail.inspection.workOrderNumber} · ORDER #{detail.inspection.orderNumber}</p>
      </div>
      <div className="admin-order-hero-status">
        <small>الحالة</small>
        <strong>{detail.inspection.status}</strong>
        <span>{detail.inspection.partner??"تنفيذ داخلي"}</span>
      </div>
    </section>

    <section className="qc-detail-kpis">
      <article><small>كمية أمر العمل</small><strong>{detail.inspection.quantity}</strong></article>
      <article><small>فحوص ناجحة</small><strong>{passed}</strong></article>
      <article><small>معلقة</small><strong>{pending}</strong></article>
      <article><small>فاشلة</small><strong>{failed}</strong></article>
      <article><small>إثباتات إنتاج</small><strong>{detail.proofDocuments.length}</strong></article>
    </section>

    <section className="admin-order-body">
      <div className="admin-order-main">
        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>Checklist الجودة</h2><span>{detail.checks.length}</span></div>
          <div className="qc-checklist">
            {detail.checks.length?detail.checks.map((check,index)=><article key={check.id} className={`qc-check qc-${check.result}`}>
              <div className="qc-check-number">{String(index+1).padStart(2,"0")}</div>
              <div className="qc-check-title">
                <strong>{check.label}</strong>
                <small>{check.key}</small>
              </div>
              {closed?<div className="qc-check-closed">
                <span className="status-pill">{resultLabels[check.result]??check.result}</span>
                {check.measurement?<small>القياس: {check.measurement}</small>:null}
                {check.notes?<p>{check.notes}</p>:null}
              </div>:<form action={updateQcCheckAction} className="qc-check-form">
                <input type="hidden" name="inspectionId" value={detail.inspection.id}/>
                <input type="hidden" name="checkId" value={check.id}/>
                <select name="result" defaultValue={check.result}>
                  <option value="pending">معلق</option>
                  <option value="pass">اجتاز</option>
                  <option value="fail">فشل</option>
                  <option value="not_applicable">غير منطبق</option>
                </select>
                <input name="measurement" defaultValue={check.measurement??""} placeholder="قياس / نتيجة"/>
                <input name="tolerance" defaultValue={check.tolerance??""} placeholder="Tolerance"/>
                <input name="notes" defaultValue={check.notes??""} placeholder="ملاحظات"/>
                <button type="submit">حفظ الفحص</button>
              </form>}
            </article>):<p className="empty-note">لا توجد بنود Checklist لهذا الفحص.</p>}
          </div>
        </section>

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>إثباتات مراحل الإنتاج</h2><span>{detail.proofDocuments.length}</span></div>
          <div className="qc-proof-grid">
            {detail.proofDocuments.length?detail.proofDocuments.map(doc=><article key={doc.id}>
              <div><strong>{doc.fileName}</strong><small>{doc.stepKey??doc.eventType}</small></div>
              <span>{new Date(doc.createdAt).toLocaleString("ar-YE")}</span>
              <Link href={`/api/documents/${doc.id}/download`}>فتح الإثبات ←</Link>
            </article>):<p className="empty-note">لا توجد إثباتات مرفوعة.</p>}
          </div>
        </section>

        {!closed?<section className="admin-order-section qc-close-section">
          <div className="admin-order-section-head"><h2>قرار الجودة النهائي</h2><span>{pending?`${pending} بنود معلقة`:"Checklist مكتمل"}</span></div>
          <form action={closeQcInspectionAction} className="qc-close-form">
            <input type="hidden" name="inspectionId" value={detail.inspection.id}/>
            <label>الكمية المقبولة
              <input name="acceptedQuantity" type="number" min="0" max={detail.inspection.quantity} step="0.001" defaultValue={detail.inspection.quantity}/>
            </label>
            <label>الكمية المرفوضة
              <input name="rejectedQuantity" type="number" min="0" max={detail.inspection.quantity} step="0.001" defaultValue="0"/>
            </label>
            <label className="wide">ملاحظات القرار
              <textarea name="notes" rows={4} placeholder="اشرح أي قبول مشروط أو سبب إعادة العمل"/>
            </label>
            <div className="qc-close-actions">
              <button name="decision" value="passed" className="qc-pass" type="submit" disabled={pending>0||failed>0}>اجتاز الجودة</button>
              <button name="decision" value="conditional" className="qc-conditional" type="submit" disabled={pending>0}>قبول مشروط</button>
              <button name="decision" value="failed" className="qc-fail" type="submit">فشل وإعادة عمل</button>
            </div>
          </form>
        </section>:null}
      </div>

      <aside className="admin-order-side">
        <div className="admin-order-finance">
          <small>Inspection</small>
          <strong>{detail.inspection.type}</strong>
          <span>WO #{detail.inspection.workOrderNumber}</span>
          <span>ORDER #{detail.inspection.orderNumber}</span>
          <span>{new Date(detail.inspection.createdAt).toLocaleString("ar-YE")}</span>
        </div>
        <Link className="secondary-button work-order-order-link" href={`/admin/production/${detail.inspection.workOrderId}`}>فتح أمر العمل</Link>
        <Link className="secondary-button work-order-order-link" href={`/admin/orders/${detail.inspection.orderId}`}>فتح الطلب</Link>
      </aside>
    </section>
  </main>;
}
