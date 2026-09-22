import { databaseConfigured, getSql } from "@/lib/db";

export type DesignSnapshot={
  jobs:Array<{
    id:string;
    service:string;
    orderNumber:number;
    status:string;
    dueAt:string|null;
    versions:number;
    approved:boolean;
  }>;
  totals:{brief:number;designing:number;waitingApproval:number;approved:number;overdue:number};
};

const empty:DesignSnapshot={jobs:[],totals:{brief:0,designing:0,waitingApproval:0,approved:0,overdue:0}};

export async function getDesignSnapshot():Promise<DesignSnapshot>{
  if(!databaseConfigured()) return empty;
  try{
    const sql=getSql();
    const [jobs,totals]=await Promise.all([
      sql`
        select
          dj.id,
          dj.status,
          dj.due_at,
          s.name_ar as service_name,
          o.order_number,
          count(distinct dv.id)::integer as versions,
          exists(
            select 1
            from design_versions av
            join design_approvals da on da.design_version_id=av.id
            where av.design_job_id=dj.id and da.decision='approved'
          ) as approved
        from design_jobs dj
        join order_items oi on oi.id=dj.order_item_id
        join orders o on o.id=oi.order_id
        join services s on s.id=oi.service_id
        left join design_versions dv on dv.design_job_id=dj.id
        group by dj.id,s.name_ar,o.order_number
        order by dj.due_at nulls last,dj.created_at
        limit 100
      `,
      sql`
        select
          count(*) filter (where status='brief')::integer as brief,
          count(*) filter (where status in ('designing','in_progress'))::integer as designing,
          count(*) filter (where status in ('waiting_approval','review'))::integer as waiting_approval,
          count(*) filter (where status='approved')::integer as approved,
          count(*) filter (where due_at is not null and due_at<now() and status not in ('approved','completed','cancelled'))::integer as overdue
        from design_jobs
      `
    ]);
    const t=totals[0];
    return {
      jobs:jobs.map(row=>({
        id:String(row.id),
        service:String(row.service_name),
        orderNumber:Number(row.order_number),
        status:String(row.status),
        dueAt:row.due_at?new Date(String(row.due_at)).toISOString():null,
        versions:Number(row.versions??0),
        approved:Boolean(row.approved)
      })),
      totals:{
        brief:Number(t?.brief??0),
        designing:Number(t?.designing??0),
        waitingApproval:Number(t?.waiting_approval??0),
        approved:Number(t?.approved??0),
        overdue:Number(t?.overdue??0)
      }
    };
  }catch{
    return empty;
  }
}
