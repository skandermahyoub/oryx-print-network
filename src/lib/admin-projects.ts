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
        coalesce(sponsor_stats.sponsors,0)::integer as sponsors,
        coalesce(task_stats.open_tasks,0)::integer as open_tasks,
        coalesce(budget_stats.planned_revenue,0)::numeric(14,2) as planned_revenue,
        coalesce(budget_stats.planned_cost,0)::numeric(14,2) as planned_cost
      from projects p
      left join lateral (
        select count(*)::integer as sponsors
        from project_sponsors ps
        where ps.project_id=p.id
      ) sponsor_stats on true
      left join lateral (
        select count(*)::integer as open_tasks
        from project_tasks pt
        where pt.project_id=p.id and pt.status not in ('completed','cancelled')
      ) task_stats on true
      left join lateral (
        select
          coalesce(sum(planned_amount) filter (where line_type in ('revenue','sponsorship','advertising')),0) as planned_revenue,
          coalesce(sum(planned_amount) filter (where line_type='cost'),0) as planned_cost
        from project_budget_lines pbl
        where pbl.project_id=p.id
      ) budget_stats on true
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
