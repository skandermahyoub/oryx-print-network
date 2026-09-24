import Link from "next/link";
import { getCrmSnapshot } from "@/lib/admin-crm";
import { completeCrmActivityAction, createLeadAction, createOpportunityAction, scheduleCrmActivityAction, updateLeadStatusAction } from "./actions";

const stageLabels:Record<string,string>={
  new:"جديد",
  contacted:"تم التواصل",
  qualified:"مؤهل",
  quote:"عرض سعر",
  negotiation:"تفاوض",
  won:"فاز",
  lost:"فقد"
};

export default async function CrmPage(){
  const crm=await getCrmSnapshot();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX CRM</span>
        <h1>المبيعات والعلاقات</h1>
        <p>العميل المحتمل لا يضيع بين واتساب والذاكرة. كل Lead وOpportunity وFollow-up يعود إلى مسار واضح.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="crm-kpis">
      <article><small>Leads</small><strong>{crm.totals.leads}</strong></article>
      <article><small>فرص مفتوحة</small><strong>{crm.totals.openOpportunities}</strong></article>
      <article><small>قيمة Pipeline</small><strong>{crm.totals.pipelineValue.toLocaleString("en-US")} YER</strong></article>
      <article><small>متابعات متأخرة</small><strong>{crm.totals.overdueActivities}</strong></article>
    </section>

    <section className="crm-create-panel">
      <div><span className="eyebrow">NEW LEAD</span><h2>إضافة Lead</h2></div>
      <form action={createLeadAction}>
        <input name="fullName" placeholder="اسم الشخص"/>
        <input name="companyName" placeholder="الشركة"/>
        <input name="phone" placeholder="الهاتف"/>
        <input name="email" type="email" placeholder="البريد"/>
        <input name="source" placeholder="المصدر: اتصال، إحالة، حملة..."/>
        <input name="notes" placeholder="ملاحظات"/>
        <button type="submit">إضافة إلى CRM</button>
      </form>
    </section>

    <section className="crm-layout">
      <div className="crm-panel">
        <div className="crm-panel-head"><h2>Pipeline</h2><span>{crm.pipeline.reduce((sum,item)=>sum+item.count,0)} فرصة</span></div>
        <div className="pipeline-columns">
          {crm.pipeline.length?crm.pipeline.map(stage=><article key={stage.stage}>
            <small>{stageLabels[stage.stage]??stage.stage}</small>
            <strong>{stage.count}</strong>
            <span>{stage.value.toLocaleString("en-US")} YER</span>
          </article>):<div className="empty-panel">لا توجد فرص مفتوحة بعد.</div>}
        </div>
      </div>

      <div className="crm-panel">
        <div className="crm-panel-head"><h2>أحدث العملاء المحتملين</h2><Link href="/admin/campaigns">الحملات البيعية ←</Link></div>
        <div className="crm-lead-list">
          {crm.leads.length?crm.leads.map(lead=><article className="crm-lead-operational" key={lead.id}>
            <div><strong>{lead.name}</strong><small>{lead.company??lead.phone??"—"}</small></div>
            <span>{lead.source??"غير محدد"}</span>
            <b>{lead.status}</b>
            <details>
              <summary>إدارة</summary>
              <div className="crm-lead-actions">
                <form action={updateLeadStatusAction}>
                  <input type="hidden" name="leadId" value={lead.id}/>
                  <select name="status" defaultValue={lead.status}>
                    <option value="new">جديد</option>
                    <option value="contacted">تم التواصل</option>
                    <option value="qualified">مؤهل</option>
                    <option value="unqualified">غير مؤهل</option>
                    <option value="converted">تحول</option>
                    <option value="lost">مفقود</option>
                  </select>
                  <button type="submit">حفظ الحالة</button>
                </form>
                <form action={createOpportunityAction}>
                  <input type="hidden" name="leadId" value={lead.id}/>
                  <input name="name" required placeholder="اسم الفرصة"/>
                  <input name="estimatedValue" type="number" min="0" step="0.01" placeholder="القيمة المتوقعة"/>
                  <input name="expectedCloseDate" type="date"/>
                  <button type="submit">إنشاء فرصة</button>
                </form>
                <form action={scheduleCrmActivityAction}>
                  <input type="hidden" name="entityType" value="lead"/>
                  <input type="hidden" name="entityId" value={lead.id}/>
                  <input type="hidden" name="activityType" value="follow_up"/>
                  <input name="subject" placeholder="موضوع المتابعة"/>
                  <input name="dueAt" type="datetime-local" required/>
                  <button type="submit">جدولة متابعة</button>
                </form>
              </div>
            </details>
          </article>):<div className="empty-panel">لا توجد Leads بعد.</div>}
        </div>
      </div>
    </section>

    <section className="crm-panel overdue-panel">
      <div className="crm-panel-head"><h2>متابعات فات موعدها</h2><span>{crm.overdue.length}</span></div>
      {crm.overdue.length?<div className="crm-overdue-list">{crm.overdue.map(item=><article key={item.id}>
        <strong>{item.subject??item.type}</strong>
        <span>{new Date(item.dueAt).toLocaleString("ar-YE")}</span>
        <form action={completeCrmActivityAction}>
          <input type="hidden" name="activityId" value={item.id}/>
          <button type="submit">تمت</button>
        </form>
      </article>)}</div>:<p className="empty-note">لا توجد متابعات متأخرة.</p>}
    </section>
  </main>;
}
