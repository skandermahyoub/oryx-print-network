"use server";

import { revalidatePath } from "next/cache";
import { requirePartnerAccess } from "@/lib/auth/partner-access";
import { getSql } from "@/lib/db";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function acceptPartnerJobAction(formData:FormData){
  const access=await requirePartnerAccess();
  const partnerJobId=value(formData,"partnerJobId");
  const sql=getSql();

  const rows=await sql`
    with accepted_job as (
      update partner_jobs
      set status='accepted',accepted_at=now()
      where id=${partnerJobId}
        and partner_id=${access.partnerId}
        and status='offered'
      returning work_order_id
    ),
    assignment_update as (
      update production_assignments pa
      set status='accepted',accepted_at=now()
      from accepted_job
      where pa.work_order_id=accepted_job.work_order_id
        and pa.partner_id=${access.partnerId}
        and pa.status='assigned'
      returning pa.id
    )
    select work_order_id from accepted_job
  `;

  if(!rows[0]) throw new Error("Job is no longer available to accept.");
  revalidatePath("/partner-portal");
}

export async function declinePartnerJobAction(formData:FormData){
  const access=await requirePartnerAccess();
  const partnerJobId=value(formData,"partnerJobId");
  const reason=value(formData,"reason");
  const sql=getSql();

  const rows=await sql`
    with declined_job as (
      update partner_jobs
      set status='declined',notes=concat_ws(E'\n',notes,${reason||"Declined by partner"})
      where id=${partnerJobId}
        and partner_id=${access.partnerId}
        and status='offered'
      returning work_order_id
    ),
    assignment_update as (
      update production_assignments pa
      set status='cancelled'
      from declined_job
      where pa.work_order_id=declined_job.work_order_id
        and pa.partner_id=${access.partnerId}
        and pa.status='assigned'
      returning pa.id
    ),
    work_update as (
      update work_orders wo
      set partner_id=null
      from declined_job
      where wo.id=declined_job.work_order_id
      returning wo.order_item_id
    ),
    item_update as (
      update order_items oi
      set assigned_partner_id=null
      from work_update
      where oi.id=work_update.order_item_id
      returning oi.id
    ),
    sourcing_update as (
      update sourcing_requests sr
      set status='ready_to_assign',updated_at=now()
      from work_update
      where sr.order_item_id=work_update.order_item_id
        and sr.status='assigned'
      returning sr.id
    )
    select work_order_id from declined_job
  `;

  if(!rows[0]) throw new Error("Job is no longer available to decline.");
  revalidatePath("/partner-portal");
}

export async function submitPartnerPriceAction(formData:FormData){
  const access=await requirePartnerAccess();
  const serviceSlug=value(formData,"serviceSlug");
  const baseCost=Number(value(formData,"baseCost"));
  const minimumQuantity=value(formData,"minimumQuantity");
  const normalLeadHours=value(formData,"normalLeadHours");
  const urgentLeadHours=value(formData,"urgentLeadHours");
  const validUntil=value(formData,"validUntil");
  const notes=value(formData,"notes");

  if(!serviceSlug||!Number.isFinite(baseCost)||baseCost<0){
    throw new Error("Invalid partner price submission.");
  }

  const sql=getSql();
  const rows=await sql`
    insert into partner_price_submissions (
      partner_id,service_id,pricing_model,currency,base_cost,minimum_quantity,
      normal_lead_hours,urgent_lead_hours,valid_until,status,submitted_by,notes
    )
    select
      ${access.partnerId},
      s.id,
      'base_cost',
      'YER',
      ${baseCost},
      ${minimumQuantity?Number(minimumQuantity):null},
      ${normalLeadHours?Number(normalLeadHours):null},
      ${urgentLeadHours?Number(urgentLeadHours):null},
      ${validUntil||null},
      'submitted',
      ${access.appUserId},
      ${notes||null}
    from services s
    where s.slug=${serviceSlug} and s.is_active=true
    returning id
  `;

  if(!rows[0]) throw new Error("Service not found.");
  revalidatePath("/partner-portal");
}
