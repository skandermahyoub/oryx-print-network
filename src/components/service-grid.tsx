import { departments } from "@/lib/catalog";

export function ServiceGrid(){
  return <div className="service-grid">
    {departments.map((department,index)=><article className="service-card" key={department.slug}>
      <div className="service-number">{String(index+1).padStart(2,"0")}</div>
      <h3>{department.title}</h3>
      <p>{department.description}</p>
      <div className="chips">{department.examples.map(item=><span key={item}>{item}</span>)}</div>
      <button className="text-action" type="button">استكشف القسم ←</button>
    </article>)}
  </div>;
}
