import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminProjectDetail } from "@/lib/admin-project-detail";
import { addProjectBudgetLineAction, addProjectDeliverableAction, addProjectSponsorAction, addProjectTaskAction, updateProjectTaskAction } from "./actions";

export const dynamic="force-dynamic";

export default async function ProjectDetailPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const detail=await getAdminProjectDetail(id);
  if(!detail) notFound();

  const plannedRevenue=detail.budgetLines.filter(line=>["revenue","sponsorship","advertising"].includes(line.type)).reduce((sum,line)=>sum+line.planned,0);
  const plannedCost=detail.budgetLines.filter(line=>line.type==="cost").reduce((sum,line)=>sum+line.planned,0);

  return <main className="admin-project-detail-page">
    <section className="admin-order-hero">
      <div>
        <Link href="/admin/projects" className="admin-back-link">مشاريع ORYX ←</Link>
        <span className="eyebrow">ORYX PROJECTS LAB</span>
        <h1>{detail.project.name}</h1>
        <p>{detail.project.type} · {detail.project.slug}</p>
      </div>
      <div className="admin-order-hero-status"><small>الحالة</small><strong>{detail.project.status}</strong><span>{new Date(detail.project.updatedAt).toLocaleString("ar-YE")}</span></div>
    </section>

    <section className="project-detail-kpis">
      <article><small>مهام مفتوحة</small><strong>{detail.tasks.filter(task=>!["completed","cancelled"].includes(task.status)).length}</strong></article>
      <article><small>رعاة محتملون/فعليون</small><strong>{detail.sponsors.length}</strong></article>
      <article><small>إيراد مخطط</small><strong>{plannedRevenue.toLocaleString("en-US")}</strong></article>
      <article><small>تكلفة مخططة</small><strong>{plannedCost.toLocaleString("en-US")}</strong></article>
      <article><small>مخرجات</small><strong>{detail.deliverables.length}</strong></article>
    </section>

    <section className="project-ops-grid">
      <article className="project-op-panel">
        <h2>المهام</h2>
        <form action={addProjectTaskAction} className="project-inline-form">
          <input type="hidden" name="projectId" value={detail.project.id}/>
          <input name="title" required placeholder="مهمة جديدة"/>
          <select name="priority" defaultValue="normal"><option value="low">منخفض</option><option value="normal">عادي</option><option value="high">عالٍ</option><option value="urgent">عاجل</option></select>
          <input name="dueAt" type="datetime-local"/>
          <button type="submit">إضافة</button>
        </form>
        <div className="project-task-list">{detail.tasks.map(task=><div key={task.id}>
          <div><strong>{task.title}</strong><small>{task.priority}{task.dueAt?` · ${new Date(task.dueAt).toLocaleString("ar-YE")}`:""}</small></div>
          <form action={updateProjectTaskAction}>
            <input type="hidden" name="projectId" value={detail.project.id}/><input type="hidden" name="taskId" value={task.id}/>
            <select name="status" defaultValue={task.status}><option value="todo">To do</option><option value="in_progress">In progress</option><option value="blocked">Blocked</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select>
            <button type="submit">حفظ</button>
          </form>
        </div>)}</div>
      </article>

      <article className="project-op-panel">
        <h2>الرعاة</h2>
        <form action={addProjectSponsorAction} className="project-inline-form">
          <input type="hidden" name="projectId" value={detail.project.id}/>
          <input name="sponsorName" required placeholder="اسم الراعي"/>
          <input name="packageName" placeholder="باقة الرعاية"/>
          <input name="amount" type="number" min="0" step="0.01" placeholder="القيمة"/>
          <input name="contactName" placeholder="جهة الاتصال"/>
          <input name="phone" placeholder="الهاتف"/>
          <button type="submit">إضافة راعٍ</button>
        </form>
        <div className="project-simple-list">{detail.sponsors.map(sponsor=><div key={sponsor.id}><strong>{sponsor.name}</strong><span>{sponsor.packageName??sponsor.status}</span><b>{sponsor.amount===null?"—":`${sponsor.amount.toLocaleString("en-US")} ${sponsor.currency}`}</b></div>)}</div>
      </article>

      <article className="project-op-panel">
        <h2>الميزانية</h2>
        <form action={addProjectBudgetLineAction} className="project-inline-form">
          <input type="hidden" name="projectId" value={detail.project.id}/>
          <select name="lineType" defaultValue="cost"><option value="cost">تكلفة</option><option value="revenue">إيراد</option><option value="sponsorship">رعاية</option><option value="advertising">إعلان</option><option value="in_kind">عيني</option></select>
          <input name="category" placeholder="التصنيف"/>
          <input name="description" required placeholder="الوصف"/>
          <input name="planned" type="number" min="0" step="0.01" required placeholder="المخطط"/>
          <button type="submit">إضافة بند</button>
        </form>
        <div className="project-simple-list">{detail.budgetLines.map(line=><div key={line.id}><strong>{line.description}</strong><span>{line.type} · {line.category??"—"}</span><b>{line.planned.toLocaleString("en-US")} {line.currency}</b></div>)}</div>
      </article>

      <article className="project-op-panel">
        <h2>المخرجات</h2>
        <form action={addProjectDeliverableAction} className="project-inline-form">
          <input type="hidden" name="projectId" value={detail.project.id}/>
          <input name="title" required placeholder="المخرج"/>
          <input name="type" placeholder="النوع"/>
          <input name="quantity" type="number" min="0" step="0.001" placeholder="الكمية"/>
          <input name="dueAt" type="datetime-local"/>
          <button type="submit">إضافة مخرج</button>
        </form>
        <div className="project-simple-list">{detail.deliverables.map(item=><div key={item.id}><strong>{item.title}</strong><span>{item.type??item.status}</span><b>{item.quantity??"—"}</b></div>)}</div>
      </article>
    </section>
  </main>;
}
