import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminDesignDetail } from "@/lib/admin-design-detail";
import { assignDesignJobAction, createDesignVersionAction } from "./actions";

export const dynamic="force-dynamic";

export default async function DesignDetailPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const detail=await getAdminDesignDetail(id);
  if(!detail) notFound();

  return <main className="admin-design-detail-page">
    <section className="admin-order-hero">
      <div>
        <Link href="/admin/design" className="admin-back-link">استوديو التصميم ←</Link>
        <span className="eyebrow">ORYX DESIGN JOB</span>
        <h1>{detail.job.service}</h1>
        <p>طلب #{detail.job.orderNumber} · {detail.job.customer}</p>
      </div>
      <div className="admin-order-hero-status">
        <small>الحالة</small>
        <strong>{detail.job.status}</strong>
        <span>{detail.job.assignedTo??"غير مسند"}</span>
      </div>
    </section>

    <section className="admin-order-body">
      <div className="admin-order-main">
        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>Brief والتكليف</h2></div>
          <form action={assignDesignJobAction} className="design-assignment-form">
            <input type="hidden" name="designJobId" value={detail.job.id}/>
            <label>المصمم
              <select name="assigneeId" defaultValue="">
                <option value="">غير مسند</option>
                {detail.designers.map(designer=><option key={designer.id} value={designer.id}>{designer.name}</option>)}
              </select>
            </label>
            <label>الموعد
              <input name="dueAt" type="datetime-local" defaultValue={detail.job.dueAt?detail.job.dueAt.slice(0,16):""}/>
            </label>
            <label className="wide">Brief
              <textarea name="brief" rows={5} defaultValue={detail.job.brief??""} placeholder="الهدف، الرسالة، المقاسات، العناصر الإلزامية، المراجع..."/>
            </label>
            <button type="submit">حفظ التكليف</button>
          </form>
        </section>

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>إصدارات التصميم</h2><span>{detail.versions.length}</span></div>
          <div className="design-version-list">
            {detail.versions.length?detail.versions.map(version=><article key={version.id}>
              <div><small>VERSION</small><strong>V{version.number}</strong></div>
              <span className="status-pill">{version.status}</span>
              <div><small>الملف</small><b>{version.fileName??(version.documentId?"Document linked":"بدون ملف")}</b></div>
              <div><small>قرار العميل</small><b>{version.decision??"—"}</b></div>
              <div><small>أنشئ</small><b>{new Date(version.createdAt).toLocaleString("ar-YE")}</b></div>
              {version.notes?<p>{version.notes}</p>:null}
              {version.decisionNotes?<p className="decision-note">{version.decisionNotes}</p>:null}
            </article>):<p className="empty-note">لم تُرفع نسخة تصميم بعد.</p>}
          </div>
        </section>

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>نسخة جديدة</h2></div>
          <form action={createDesignVersionAction} className="design-version-create-form">
            <input type="hidden" name="designJobId" value={detail.job.id}/>
            <label>Document ID
              <input name="documentId" placeholder="اختياري — مستند موجود في design-files" dir="ltr"/>
            </label>
            <label className="wide">ملاحظات النسخة
              <textarea name="notes" rows={4} placeholder="ما الذي تغير في هذه النسخة وما الذي يجب على العميل مراجعته؟"/>
            </label>
            <button type="submit">إنشاء نسخة وإرسالها للاعتماد</button>
          </form>
          <p className="design-storage-note">الملف نفسه سيُرفع عبر طبقة التخزين الخاصة عند ربط بيئة الـPreview؛ هنا نربط النسخة بسجل Document غير قابل للاستبدال.</p>
        </section>
      </div>

      <aside className="admin-order-side">
        <div className="admin-order-finance">
          <small>الطلب</small>
          <strong>#{detail.job.orderNumber}</strong>
          <span>{detail.job.customer}</span>
          <span>{detail.job.serviceSlug}</span>
        </div>

        <div className="admin-order-section service-side-card">
          <h2>مواصفات معتمدة للمرجع</h2>
          <pre className="design-spec-json">{JSON.stringify(detail.job.specifications,null,2)}</pre>
        </div>
      </aside>
    </section>
  </main>;
}
