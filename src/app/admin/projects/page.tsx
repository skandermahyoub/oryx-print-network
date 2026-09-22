import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminProjects } from "@/lib/admin-projects";

export default async function ProjectsAdminPage(){
  if(process.env.ENABLE_ADMIN_PREVIEW!=="true") notFound();
  const projects=await getAdminProjects();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX PROJECTS LAB OS</span>
        <h1>تشغيل المشاريع</h1>
        <p>المشروع الذي تبتكره ORYX يصبح ميزانية ومخرجات ومهام ورعاة وإيرادات ووثائق ومؤشرات أثر، لا مجرد فكرة جميلة في قائمة.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="admin-project-grid">
      {projects.map(project=><article key={project.id}>
        <div><span className="status-pill">{project.status}</span><small>{project.type}</small></div>
        <h2>{project.name}</h2>
        <div className="project-admin-kpis">
          <span><b>{project.sponsors}</b> رعاة</span>
          <span><b>{project.openTasks}</b> مهام مفتوحة</span>
          <span><b>{project.plannedRevenue.toLocaleString("en-US")}</b> إيراد مخطط</span>
          <span><b>{project.plannedCost.toLocaleString("en-US")}</b> تكلفة مخططة</span>
        </div>
      </article>)}
      {!projects.length?<div className="empty-panel">لا توجد مشاريع داخل النظام.</div>:null}
    </section>
  </main>;
}
