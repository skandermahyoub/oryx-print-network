import { databaseConfigured, getSql } from "@/lib/db";

export type AdminProjectDetail={
  project:{id:string;name:string;slug:string;type:string;status:string;brief:string|null;budget:number|null;currency:string;updatedAt:string};
  tasks:Array<{id:string;title:string;status:string;priority:string;dueAt:string|null;notes:string|null}>;
  sponsors:Array<{id:string;name:string;packageName:string|null;amount:number|null;currency:string;status:string;contact:string|null;phone:string|null}>;
  budgetLines:Array<{id:string;type:string;category:string|null;description:string;planned:number;actual:number;currency:string}>;
  packages:Array<{id:string;name:string;price:number|null;currency:string;active:boolean;inventoryLimit:number|null}>;
  deliverables:Array<{id:string;title:string;type:string|null;quantity:number|null;status:string;dueAt:string|null}>;
};

export async function getAdminProjectDetail(projectId:string):Promise<AdminProjectDetail|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();
  const projects=await sql`
    select id,name_ar,slug,project_type,status,brief,budget,currency,updated_at
    from projects where id=${projectId} limit 1
  `;
  const p=projects[0];
  if(!p) return null;

  const [tasks,sponsors,budgetLines,packages,deliverables]=await Promise.all([
    sql`select id,title,status,priority,due_at,notes from project_tasks where project_id=${projectId} order by case status when 'todo' then 0 when 'in_progress' then 1 else 2 end,due_at nulls last,created_at`,
    sql`select id,sponsor_name,package_name,amount,currency,status,contact_name,phone from project_sponsors where project_id=${projectId} order by created_at desc`,
    sql`select id,line_type,category,description,planned_amount,actual_amount,currency from project_budget_lines where project_id=${projectId} order by created_at desc`,
    sql`select id,name_ar,price,currency,is_active,inventory_limit from project_sponsorship_packages where project_id=${projectId} order by sort_order,created_at`,
    sql`select id,title,deliverable_type,quantity,status,due_at from project_deliverables where project_id=${projectId} order by due_at nulls last,created_at`
  ]);

  return {
    project:{
      id:String(p.id),name:String(p.name_ar),slug:String(p.slug),type:String(p.project_type),status:String(p.status),
      brief:p.brief?String(p.brief):null,budget:p.budget===null?null:Number(p.budget),currency:String(p.currency??"YER"),
      updatedAt:new Date(String(p.updated_at)).toISOString()
    },
    tasks:tasks.map(row=>({id:String(row.id),title:String(row.title),status:String(row.status),priority:String(row.priority),dueAt:row.due_at?new Date(String(row.due_at)).toISOString():null,notes:row.notes?String(row.notes):null})),
    sponsors:sponsors.map(row=>({id:String(row.id),name:String(row.sponsor_name),packageName:row.package_name?String(row.package_name):null,amount:row.amount===null?null:Number(row.amount),currency:String(row.currency??"YER"),status:String(row.status),contact:row.contact_name?String(row.contact_name):null,phone:row.phone?String(row.phone):null})),
    budgetLines:budgetLines.map(row=>({id:String(row.id),type:String(row.line_type),category:row.category?String(row.category):null,description:String(row.description),planned:Number(row.planned_amount??0),actual:Number(row.actual_amount??0),currency:String(row.currency??"YER")})),
    packages:packages.map(row=>({id:String(row.id),name:String(row.name_ar),price:row.price===null?null:Number(row.price),currency:String(row.currency??"YER"),active:Boolean(row.is_active),inventoryLimit:row.inventory_limit===null?null:Number(row.inventory_limit)})),
    deliverables:deliverables.map(row=>({id:String(row.id),title:String(row.title),type:row.deliverable_type?String(row.deliverable_type):null,quantity:row.quantity===null?null:Number(row.quantity),status:String(row.status),dueAt:row.due_at?new Date(String(row.due_at)).toISOString():null}))
  };
}
