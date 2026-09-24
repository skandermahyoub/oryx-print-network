"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function createLeadAction(formData:FormData){
  const access=await requirePermission("crm.manage");
  const fullName=value(formData,"fullName");
  const companyName=value(formData,"companyName");
  const phone=value(formData,"phone");
  const email=value(formData,"email");
  const source=value(formData,"source");
  const notes=value(formData,"notes");

  if(!fullName&&!companyName) throw new Error("Lead needs a person or company name.");

  const sql=getSql();
  const rows=await sql`
    with created as (
      insert into leads (
        full_name,company_name,phone,email,source,status,owner_id,notes,metadata
      ) values (
        ${fullName||null},${companyName||null},${phone||null},${email||null},
        ${source||'manual'},'new',${access.preview?null:access.user.id},${notes||null},
        '{"source":"oryx-crm"}'::jsonb
      )
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'lead',
        created.id,
        'created',
        jsonb_build_object('full_name',${fullName||null},'company_name',${companyName||null},'source',${source||'manual'})
      from created
      returning id
    )
    select id from created
  `;

  if(!rows[0]) throw new Error("Lead could not be created.");
  revalidatePath("/admin/crm");
  revalidatePath("/admin");
}

export async function updateLeadStatusAction(formData:FormData){
  const access=await requirePermission("crm.manage");
  const leadId=value(formData,"leadId");
  const status=value(formData,"status");
  const allowed=["new","contacted","qualified","unqualified","converted","lost"];
  if(!allowed.includes(status)) throw new Error("Invalid lead status.");

  const sql=getSql();
  const rows=await sql`
    with old as (
      select id,status from leads where id=${leadId} limit 1
    ),
    updated as (
      update leads l
      set status=${status},updated_at=now()
      from old
      where l.id=old.id
      returning l.id,old.status as old_status,l.status as new_status
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select
        ${access.preview?null:access.user.id},
        'lead',
        updated.id,
        'status_change',
        jsonb_build_object('status',updated.old_status),
        jsonb_build_object('status',updated.new_status)
      from updated
      returning id
    )
    select id from updated
  `;

  if(!rows[0]) throw new Error("Lead not found.");
  revalidatePath("/admin/crm");
}

export async function createOpportunityAction(formData:FormData){
  const access=await requirePermission("crm.manage");
  const leadId=value(formData,"leadId");
  const name=value(formData,"name");
  const estimatedValueRaw=value(formData,"estimatedValue");
  const estimatedValue=estimatedValueRaw?Number(estimatedValueRaw):null;
  const expectedCloseDate=value(formData,"expectedCloseDate");

  if(!leadId||name.length<2) throw new Error("Opportunity data is incomplete.");
  if(estimatedValue!==null&&(!Number.isFinite(estimatedValue)||estimatedValue<0)) throw new Error("Opportunity value is invalid.");

  const sql=getSql();
  const rows=await sql`
    with lead as (
      select id from leads where id=${leadId} limit 1
    ),
    created as (
      insert into opportunities (
        lead_id,name,stage,estimated_value,currency,expected_close_date,owner_id
      )
      select
        lead.id,${name},'new',${estimatedValue},'YER',${expectedCloseDate||null},${access.preview?null:access.user.id}
      from lead
      returning id
    ),
    updated_lead as (
      update leads
      set status='qualified',updated_at=now()
      where id=${leadId} and status in ('new','contacted')
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'opportunity',
        created.id,
        'created',
        jsonb_build_object('lead_id',${leadId},'name',${name},'estimated_value',${estimatedValue})
      from created
      returning id
    )
    select id from created
  `;

  if(!rows[0]) throw new Error("Lead not found.");
  revalidatePath("/admin/crm");
  revalidatePath("/admin");
}

export async function scheduleCrmActivityAction(formData:FormData){
  const access=await requirePermission("crm.manage");
  const entityType=value(formData,"entityType");
  const entityId=value(formData,"entityId");
  const activityType=value(formData,"activityType")||"follow_up";
  const subject=value(formData,"subject");
  const dueAt=value(formData,"dueAt");
  const notes=value(formData,"notes");

  if(!["lead","opportunity","customer"].includes(entityType)||!entityId||!dueAt){
    throw new Error("Follow-up data is incomplete.");
  }

  const sql=getSql();
  const rows=await sql`
    insert into activities (
      entity_type,entity_id,activity_type,subject,due_at,owner_id,notes
    ) values (
      ${entityType},${entityId},${activityType},${subject||null},${dueAt},
      ${access.preview?null:access.user.id},${notes||null}
    )
    returning id
  `;

  if(!rows[0]) throw new Error("Follow-up could not be scheduled.");
  revalidatePath("/admin/crm");
}

export async function completeCrmActivityAction(formData:FormData){
  await requirePermission("crm.manage");
  const activityId=value(formData,"activityId");
  const sql=getSql();

  const rows=await sql`
    update activities
    set completed_at=coalesce(completed_at,now())
    where id=${activityId}
    returning id
  `;

  if(!rows[0]) throw new Error("Activity not found.");
  revalidatePath("/admin/crm");
}
