import Link from "next/link";
import { getReleaseReadiness } from "@/lib/release-readiness";

export const dynamic="force-dynamic";

export default async function ReadinessPage(){
  const readiness=await getReleaseReadiness();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX RELEASE GATE</span>
        <h1>جاهزية الـPreview</h1>
        <p>هذه الصفحة لا تقيس جمال الواجهة؛ تقيس ما إذا كانت البنية الحرجة موجودة ومتصلة قبل أن نستهلك Deploy واحدًا على Netlify.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="readiness-score">
      <article><small>Passed</small><strong>{readiness.passed}</strong></article>
      <article><small>Warnings</small><strong>{readiness.warnings}</strong></article>
      <article><small>Blockers</small><strong>{readiness.blockers}</strong></article>
      <article className={readiness.blockers===0?"ready":"blocked"}>
        <small>Release Gate</small>
        <strong>{readiness.blockers===0?"READY":"BLOCKED"}</strong>
      </article>
    </section>

    <section className="readiness-grid">
      {readiness.checks.map(check=><article key={check.key} className={`readiness-card ${check.status}`}>
        <span>{check.status.toUpperCase()}</span>
        <h2>{check.label}</h2>
        <p>{check.detail}</p>
      </article>)}
    </section>

    <section className="readiness-rule">
      <strong>قاعدة الإطلاق</strong>
      <p>لن نربط Netlify Preview ما دام هناك Blocker. التحذيرات تُراجع حسب طبيعتها؛ بعضها بيانات تشغيلية تُضاف بعد أول دخول للإدارة وليست عيبًا برمجيًا.</p>
    </section>
  </main>;
}
