import Link from "next/link";
import { projectIdeas } from "@/lib/projects";

export default function ProjectsPage(){
  return <main className="catalog-page">
    <section className="catalog-hero dark-hero">
      <span className="eyebrow light">ORYX PROJECTS LAB</span>
      <h1>نبتكر السوق أيضًا.</h1>
      <p>مشاريع وأدلة ومجلات وحملات نصنع فكرتها ثم نبني حولها الرعايات والشراكات والصفقات.</p>
    </section>
    <section className="project-grid page-grid">
      {projectIdeas.map((project,index)=><Link className="project-card" href={`/projects/${project.slug}`} key={project.slug}>
        <span>{project.type}</span>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <small>PROJECT {String(index+1).padStart(2,"0")} ←</small>
      </Link>)}
    </section>
  </main>;
}
