import Link from "next/link";
import { notFound } from "next/navigation";
import { findProject, projectIdeas } from "@/lib/projects";

export function generateStaticParams(){
  return projectIdeas.map(project=>({slug:project.slug}));
}

export default async function ProjectDetailPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const project=findProject(slug);
  if(!project) notFound();

  return <main className="project-detail-page">
    <section className="project-detail-hero">
      <div>
        <span className="eyebrow">{project.type}</span>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <div className="hero-actions">
          <Link className="primary-button" href="/partners">اقترح شراكة</Link>
          <Link className="secondary-button" href="/projects">كل المشاريع</Link>
        </div>
      </div>
      <div className="project-model-card">
        <small>النموذج التجاري</small>
        <strong>{project.commercialModel}</strong>
      </div>
    </section>

    <section className="project-detail-body">
      <div className="project-column">
        <span className="eyebrow">المخرجات</span>
        <h2>ماذا سينتج المشروع؟</h2>
        <div className="project-output-grid">
          {project.outputs.map((item,index)=><article key={item}><span>{String(index+1).padStart(2,"0")}</span><strong>{item}</strong></article>)}
        </div>
      </div>

      <div className="project-column">
        <span className="eyebrow">الرعاة المحتملون</span>
        <h2>من يمكن أن يجد قيمة مباشرة هنا؟</h2>
        <div className="project-segments">
          {project.sponsorSegments.map(item=><span key={item}>{item}</span>)}
        </div>
      </div>

      <div className="project-operating-note">
        <strong>ORYX Projects Lab</strong>
        <p>كل مشروع يمكن تحويله داخل النظام إلى ميزانية ومهام ومخرجات وباقات رعاية وشركاء ووثائق ومؤشرات أثر، ثم إدارته من الفكرة حتى الإغلاق.</p>
      </div>
    </section>
  </main>;
}
