"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function updatePartnerStatusAction(formData:FormData){
  const access=await requirePermission("partners.manage");
  const partnerId=value(formData,"partnerId");
  const status=value(formData,"status");
  const note=value(formData,"note");

  if(!["applicant","under_review","active","suspended","rejected"].includes(status)){
    throw new Error("Invalid partner status.");
  }

  const sql=getSql();
  const rows=await sql`
    with current as (
      select id,status
      from partners
      where id=${partnerId}
      limit 1
    ),
    updated as (
      update partners p
      set status=${status},updated_at=now()
      from current
      where p.id=current.id
      returning p.id,current.status as old_status,p.status as new_status
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select
        ${access.preview?null:access.user.id},
        'partner',
        updated.id,
        'status_change',
        jsonb_build_object('status',updated.old_status),
        jsonb_build_object('status',updated.new_status,'note',${note||null})
      from updated
      returning id
    )
    select id from updated
  `;

  if(!rows[0]) throw new Error("Partner not found.");
  revalidatePath(`/admin/partners/${partnerId}`);
  revalidatePath("/admin/partners");
  revalidatePath("/admin");
}

export async function reviewPartnerPriceAction(formData:FormData){
  const access=await requirePermission("partners.manage");
  const partnerId=value(formData,"partnerId");
  const priceId=value(formData,"priceId");
  const decision=value(formData,"decision");
  const note=value(formData,"note");

  if(!["approved","rejected"].includes(decision)){
    throw new Error("Invalid price review decision.");
  }

  const sql=getSql();

  if(decision==="approved"){
    const rows=await sql`
      with target as (
        select *
        from partner_price_submissions
        where id=${priceId}
          and partner_id=${partnerId}
          and status='submitted'
        limit 1
      ),
      superseded as (
        update partner_price_submissions old
        set status='superseded'
        from target
        where old.partner_id=target.partner_id
          and old.service_id=target.service_id
          and old.id<>target.id
          and old.status='approved'
        returning old.id
      ),
      approved as (
        update partner_price_submissions pps
        set
          status='approved',
          reviewed_by=${access.preview?null:access.user.id},
          reviewed_at=now(),
          notes=concat_ws(E'\n',pps.notes,${note||null})
        from target
        where pps.id=target.id
        returning pps.*
      ),
      capability as (
        insert into partner_capabilities (
          partner_id,service_id,base_cost,currency,min_quantity,
          normal_lead_hours,urgent_lead_hours,is_active,valid_until
        )
        select
          partner_id,service_id,base_cost,currency,minimum_quantity,
          normal_lead_hours,urgent_lead_hours,true,valid_until
        from approved
        on conflict (partner_id,service_id) do update set
          base_cost=excluded.base_cost,
          currency=excluded.currency,
          min_quantity=excluded.min_quantity,
          normal_lead_hours=excluded.normal_lead_hours,
          urgent_lead_hours=excluded.urgent_lead_hours,
          is_active=true,
          valid_until=excluded.valid_until
        returning id
      ),
      audit as (
        insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
        select
          ${access.preview?null:access.user.id},
          'partner',
          ${partnerId},
          'partner_price_approved',
          jsonb_build_object('price_id',approved.id,'status','submitted'),
          jsonb_build_object('price_id',approved.id,'status','approved','service_id',approved.service_id,'base_cost',approved.base_cost,'currency',approved.currency)
        from approved
        returning id
      )
      select id from approved
    `;

    if(!rows[0]) throw new Error("Price submission is no longer pending.");
  }else{
    const rows=await sql`
      with rejected as (
        update partner_price_submissions
        set
          status='rejected',
          reviewed_by=${access.preview?null:access.user.id},
          reviewed_at=now(),
          notes=concat_ws(E'\n',notes,${note||null})
        where id=${priceId}
          and partner_id=${partnerId}
          and status='submitted'
        returning id,service_id,base_cost,currency
      ),
      audit as (
        insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
        select
          ${access.preview?null:access.user.id},
          'partner',
          ${partnerId},
          'partner_price_rejected',
          jsonb_build_object('price_id',rejected.id,'status','submitted'),
          jsonb_build_object('price_id',rejected.id,'status','rejected','note',${note||null})
        from rejected
        returning id
      )
      select id from rejected
    `;

    if(!rows[0]) throw new Error("Price submission is no longer pending.");
  }

  revalidatePath(`/admin/partners/${partnerId}`);
  revalidatePath("/admin/pricing");
  revalidatePath("/admin/sourcing");
}
