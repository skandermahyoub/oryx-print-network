import { databaseConfigured, getSql } from "@/lib/db";

export type ProjectAdminRow={
  id:string;
  name:string;
  type:string;
  status:string;
  sponsors:number;
  openTasks:number;
  plannedRevenue:number;
  plannedCost:number;
  currency:string;
};

export async function getAdminProjects():Promise<ProjectAdminRow[]>{
  if(!databaseConfigured()) return [];
  try{
    const sql=getSql();
    const rows=await sql`
      select
        p.id,p.name_ar,p.project_type,p.status,p.currency,
        count(distinct ps.id)::integer as sponsors,
        count(distinct pt.id) filter (where pt.status not in ('completed','cancelled'))::integer as open_tasks,
        coalesce(sum(distinct pbl.planned_amount) filter (where pbl.line_type in ('revenue','sponsorship','advertising')),0)::numeric(14,2) as planned_revenue,
        coalesce(sum(distinct pbl.planned_amount) filter (where pbl.line_type='cost'),0)::numeric(14,2) as planned_cost
      from projects p
      left join project_sponsors ps on ps.project_id=p.id
      left join project_tasks pt on pt.project_id=p.id
      left join project_budget_lines pbl on pbl.project_id=p.id
      group by p.id
      order by p.updated_at desc
    `;
    return rows.map(row=>({
      id:String(row.id),
      name:String(row.name_ar),
      type:String(row.project_type),
      status:String(row.status),
      sponsors:Number(row.sponsors??0),
      openTasks:Number(row.open_tasks??0),
      plannedRevenue:Number(row.planned_revenue??0),
      plannedCost:Number(row.planned_cost??0),
      currency:String(row.currency??"YER")
    }));
  }catch{
    return [];
  }
}
