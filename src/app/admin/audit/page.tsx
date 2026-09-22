import Link from "next/link";
import { getAuditEvents } from "@/lib/admin-audit";

export const dynamic="force-dynamic";

export default async function AuditPage(){
  const events=await getAuditEvents();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX AUDIT TRAIL</span>
        <h1>سجل التدقيق</h1>
        <p>من غيّر ماذا ومتى. القرارات الحساسة مثل حالات الشركاء والأسعار والأدوار تبقى قابلة للمراجعة بدل أن تختفي بعد الضغط على الزر.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="audit-stream">
      {events.length?events.map(event=><article key={event.id}>
        <div className="audit-time"><strong>{new Date(event.createdAt).toLocaleDateString("ar-YE")}</strong><span>{new Date(event.createdAt).toLocaleTimeString("ar-YE")}</span></div>
        <div className="audit-main">
          <span className="status-pill">{event.entityType}</span>
          <h2>{event.action}</h2>
          <p>{event.actor??"System"}{event.entityId?` · ${event.entityId}`:""}</p>
          {(event.before||event.after)?<details><summary>عرض البيانات</summary><pre>{JSON.stringify({before:event.before,after:event.after},null,2)}</pre></details>:null}
        </div>
      </article>):<div className="empty-panel">لا توجد أحداث تدقيق بعد.</div>}
    </section>
  </main>;
}
