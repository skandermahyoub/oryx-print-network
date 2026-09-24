"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function addWorkflowStepAction(formData:FormData){
  const access=await requirePermission("catalog.manage");
  const serviceId=value(formData,"serviceId");
  const name=value(formData,"name");
  const estimatedMinutesRaw=value(formData,"estimatedMinutes");
  const estimatedMinutes=estimatedMinutesRaw?Number(estimatedMinutesRaw):null;
  const requiresQc=value(formData,"requiresQc")==="true";
  const requiresPhoto=value(formData,"requiresPhoto")==="true";

  if(!serviceId||name.length<2||name.length>180){
    throw new Error("بيانات مرحلة الإنتاج غير مكتملة.");
  }
  if(estimatedMinutes!==null&&(!Number.isFinite(estimatedMinutes)||estimatedMinutes<0)){
    throw new Error("المدة التقديرية غير صالحة.");
  }

  const sql=getSql();
  const workflowRows=await sql`
    select
      pw.id,pw.version,pw.name_ar,
      (select count(*)::integer from work_orders wo where wo.workflow_id=pw.id) as usage_count
    from production_workflows pw
    where pw.service_id=${serviceId}
      and pw.is_default=true
      and pw.is_active=true
    order by pw.version desc
    limit 1
  `;

  let workflowId:string;

  if(!workflowRows[0]){
    const service=await sql`select name_ar from services where id=${serviceId} limit 1`;
    if(!service[0]) throw new Error("الخدمة غير موجودة.");
    const created=await sql`
      insert into production_workflows (service_id,name_ar,version,is_default,is_active)
      values (${serviceId},${`مسار إنتاج ${String(service[0].name_ar)}`},1,true,true)
      returning id
    `;
    workflowId=String(created[0].id);
  }else{
    const current=workflowRows[0];
    if(Number(current.usage_count??0)>0){
      const cloned=await sql`
        with old_workflow as (
          select *
          from production_workflows
          where id=${current.id}
          limit 1
        ),
        max_version as (
          select coalesce(max(version),0)+1 as next_version
          from production_workflows
          where service_id=${serviceId}
        ),
        unset_default as (
          update production_workflows
          set is_default=false
          where service_id=${serviceId} and is_default=true
          returning id
        ),
        new_workflow as (
          insert into production_workflows (service_id,name_ar,version,is_default,is_active)
          select
            old_workflow.service_id,
            old_workflow.name_ar,
            max_version.next_version,
            true,
            true
          from old_workflow cross join max_version
          returning id
        ),
        copied_steps as (
          insert into workflow_steps (
            workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo,estimated_minutes,config
          )
          select
            new_workflow.id,
            ws.step_key,
            ws.name_ar,
            ws.sort_order,
            ws.requires_qc,
            ws.requires_photo,
            ws.estimated_minutes,
            ws.config
          from new_workflow
          join workflow_steps ws on ws.workflow_id=${current.id}
          returning id
        )
        select id from new_workflow
      `;
      workflowId=String(cloned[0].id);
    }else{
      workflowId=String(current.id);
    }
  }

  const next=await sql`
    select
      coalesce(max(sort_order),0)+10 as next_sort,
      count(*)::integer+1 as next_number
    from workflow_steps
    where workflow_id=${workflowId}
  `;
  const nextSort=Number(next[0]?.next_sort??10);
  const nextNumber=Number(next[0]?.next_number??1);
  const stepKey=`step_${String(nextNumber).padStart(2,"0")}`;

  const inserted=await sql`
    with step as (
      insert into workflow_steps (
        workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo,estimated_minutes
      ) values (
        ${workflowId},${stepKey},${name},${nextSort},${requiresQc},${requiresPhoto},${estimatedMinutes}
      )
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'service',
        ${serviceId},
        'workflow_step_added',
        jsonb_build_object('workflow_id',${workflowId},'step_key',${stepKey},'name',${name})
      from step
      returning id
    )
    select id from step
  `;

  if(!inserted[0]) throw new Error("تعذر إضافة مرحلة الإنتاج.");
  revalidatePath(`/admin/catalog/services/${serviceId}`);
  revalidatePath("/admin/catalog/services");
  revalidatePath("/services");
}

export async function addServiceFieldAction(formData:FormData){
  const access=await requirePermission("catalog.manage");
  const serviceId=value(formData,"serviceId");
  const key=value(formData,"key");
  const label=value(formData,"label");
  const type=value(formData,"type");
  const required=value(formData,"required")==="true";
  const options=value(formData,"options")
    .split(",")
    .map(item=>item.trim())
    .filter(Boolean)
    .slice(0,100);

  const allowed=["select","number","text","boolean","file","textarea","date","location","color","dimension"];
  if(!serviceId||!/^[a-z][a-z0-9_]{1,80}$/.test(key)||label.length<1||!allowed.includes(type)){
    throw new Error("بيانات الحقل غير صالحة.");
  }

  const sql=getSql();
  const sort=await sql`
    select coalesce(max(sort_order),0)+10 as next_sort
    from service_fields
    where service_id=${serviceId}
  `;

  const rows=await sql`
    with field as (
      insert into service_fields (
        service_id,field_key,label_ar,field_type,is_required,affects_price,
        affects_material,affects_production,customer_visible,staff_visible,config,sort_order
      ) values (
        ${serviceId},${key},${label},${type},${required},false,false,true,true,true,
        ${JSON.stringify(options.length?{options}:{})}::jsonb,
        ${Number(sort[0]?.next_sort??10)}
      )
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'service',
        ${serviceId},
        'field_added',
        jsonb_build_object('key',${key},'label',${label},'type',${type})
      from field
      returning id
    )
    select id from field
  `;

  if(!rows[0]) throw new Error("تعذر إضافة الحقل.");
  revalidatePath(`/admin/catalog/services/${serviceId}`);
  revalidatePath("/admin/catalog/services");
  revalidatePath("/services");
}
