import { databaseConfigured, getSql } from "@/lib/db";

export type AdminDesignDetail={
  job:{
    id:string;
    status:string;
    brief:string|null;
    dueAt:string|null;
    assignedTo:string|null;
    orderId:string;
    orderNumber:number;
    orderItemId:string;
    service:string;
    serviceSlug:string;
    customer:string;
    specifications:Record<string,unknown>;
  };
  versions:Array<{
    id:string;
    number:number;
    status:string;
    notes:string|null;
    documentId:string|null;
    fileName:string|null;
    createdAt:string;
    decision:string|null;
    decisionNotes:string|null;
    decidedAt:string|null;
  }>;
  designers:Array<{id:string;name:string;email:string|null}>;
};

export async function getAdminDesignDetail(designJobId:string):Promise<AdminDesignDetail|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();

  const jobs=await sql`
    select
      dj.id,dj.status,dj.brief,dj.due_at,dj.order_item_id,
      assignee.display_name as assigned_name,
      oi.order_id,oi.specifications,
      o.order_number,
      s.name_ar as service_name,s.slug as service_slug,
      coalesce(c.company_name,c.display_name,'—') as customer_name
    from design_jobs dj
    join order_items oi on oi.id=dj.order_item_id
    join orders o on o.id=oi.order_id
    join services s on s.id=oi.service_id
    left join customers c on c.id=o.customer_id
    left join app_users assignee on assignee.id=dj.assigned_to
    where dj.id=${designJobId}
    limit 1
  `;
  const job=jobs[0];
  if(!job) return null;

  const [versions,designers]=await Promise.all([
    sql`
      select
        dv.id,dv.version_number,dv.status,dv.notes,dv.document_id,dv.created_at,
        d.file_name,
        da.decision,da.notes as decision_notes,da.decided_at
      from design_versions dv
      left join documents d on d.id=dv.document_id
      left join design_approvals da on da.design_version_id=dv.id
      where dv.design_job_id=${designJobId}
      order by dv.version_number desc,da.decided_at desc nulls last
    `,
    sql`
      select distinct au.id,au.display_name,au.email
      from app_users au
      join user_roles ur on ur.user_id=au.id
      join roles r on r.id=ur.role_id
      where au.status='active'
        and au.user_type='staff'
        and r.key in ('designer','owner','executive')
      order by au.display_name
    `
  ]);

  return {
    job:{
      id:String(job.id),
      status:String(job.status),
      brief:job.brief?String(job.brief):null,
      dueAt:job.due_at?new Date(String(job.due_at)).toISOString():null,
      assignedTo:job.assigned_name?String(job.assigned_name):null,
      orderId:String(job.order_id),
      orderNumber:Number(job.order_number),
      orderItemId:String(job.order_item_id),
      service:String(job.service_name),
      serviceSlug:String(job.service_slug),
      customer:String(job.customer_name),
      specifications:job.specifications&&typeof job.specifications==="object"&&!Array.isArray(job.specifications)
        ? job.specifications as Record<string,unknown>
        : {}
    },
    versions:versions.map(row=>({
      id:String(row.id),
      number:Number(row.version_number),
      status:String(row.status),
      notes:row.notes?String(row.notes):null,
      documentId:row.document_id?String(row.document_id):null,
      fileName:row.file_name?String(row.file_name):null,
      createdAt:new Date(String(row.created_at)).toISOString(),
      decision:row.decision?String(row.decision):null,
      decisionNotes:row.decision_notes?String(row.decision_notes):null,
      decidedAt:row.decided_at?new Date(String(row.decided_at)).toISOString():null
    })),
    designers:designers.map(row=>({
      id:String(row.id),
      name:String(row.display_name??row.email??"Staff"),
      email:row.email?String(row.email):null
    }))
  };
}
