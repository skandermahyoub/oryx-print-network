"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

function value(formData:FormData,key:string){return String(formData.get(key)??"").trim();}
function refresh(projectId:string){
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
}

export async function addProjectTaskAction(formData:FormData){
  const access=await requirePermission("projects.manage");
  const projectId=value(formData,"projectId");
  const title=value(formData,"title");
  const priority=value(formData,"priority")||"normal";
  const dueAt=value(formData,"dueAt");
  const notes=value(formData,"notes");
  if(title.length<2) throw new Error("Task title is required.");
  const sql=getSql();
  const rows=await sql`
    insert into project_tasks (project_id,title,status,priority,assigned_to,due_at,notes)
    select id,${title},'todo',${priority},${access.preview?null:access.user.id},${dueAt||null},${notes||null}
    from projects where id=${projectId}
    returning id
  `;
  if(!rows[0]) throw new Error("Project not found.");
  refresh(projectId);
}

export async function updateProjectTaskAction(formData:FormData){
  await requirePermission("projects.manage");
  const projectId=value(formData,"projectId");
  const taskId=value(formData,"taskId");
  const status=value(formData,"status");
  if(!["todo","in_progress","blocked","completed","cancelled"].includes(status)) throw new Error("Invalid task status.");
  const sql=getSql();
  const rows=await sql`
    update project_tasks
    set status=${status},completed_at=case when ${status}='completed' then now() else null end
    where id=${taskId} and project_id=${projectId}
    returning id
  `;
  if(!rows[0]) throw new Error("Task not found.");
  refresh(projectId);
}

export async function addProjectSponsorAction(formData:FormData){
  await requirePermission("projects.manage");
  const projectId=value(formData,"projectId");
  const sponsorName=value(formData,"sponsorName");
  const amountRaw=value(formData,"amount");
  const amount=amountRaw?Number(amountRaw):null;
  if(sponsorName.length<2||amount!==null&&(!Number.isFinite(amount)||amount<0)) throw new Error("Sponsor data is invalid.");
  const sql=getSql();
  const rows=await sql`
    insert into project_sponsors (project_id,sponsor_name,package_name,amount,currency,status,contact_name,phone)
    select id,${sponsorName},${value(formData,"packageName")||null},${amount},'YER','prospect',${value(formData,"contactName")||null},${value(formData,"phone")||null}
    from projects where id=${projectId}
    returning id
  `;
  if(!rows[0]) throw new Error("Project not found.");
  refresh(projectId);
}

export async function addProjectBudgetLineAction(formData:FormData){
  await requirePermission("projects.manage");
  const projectId=value(formData,"projectId");
  const lineType=value(formData,"lineType");
  const description=value(formData,"description");
  const planned=Number(value(formData,"planned")||"0");
  if(!["cost","revenue","sponsorship","advertising","in_kind"].includes(lineType)||description.length<2||!Number.isFinite(planned)||planned<0) throw new Error("Budget line is invalid.");
  const sql=getSql();
  const rows=await sql`
    insert into project_budget_lines (project_id,line_type,category,description,planned_amount,actual_amount,currency)
    select id,${lineType},${value(formData,"category")||null},${description},${planned},0,'YER'
    from projects where id=${projectId}
    returning id
  `;
  if(!rows[0]) throw new Error("Project not found.");
  refresh(projectId);
}

export async function addProjectDeliverableAction(formData:FormData){
  await requirePermission("projects.manage");
  const projectId=value(formData,"projectId");
  const title=value(formData,"title");
  const quantityRaw=value(formData,"quantity");
  const quantity=quantityRaw?Number(quantityRaw):null;
  if(title.length<2||quantity!==null&&(!Number.isFinite(quantity)||quantity<0)) throw new Error("Deliverable data is invalid.");
  const sql=getSql();
  const rows=await sql`
    insert into project_deliverables (project_id,title,deliverable_type,quantity,status,due_at)
    select id,${title},${value(formData,"type")||null},${quantity},'planned',${value(formData,"dueAt")||null}
    from projects where id=${projectId}
    returning id
  `;
  if(!rows[0]) throw new Error("Project not found.");
  refresh(projectId);
}
