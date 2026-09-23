"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

const deliveryTransitions:Record<string,string[]>={
  pending:["scheduled","cancelled"],
  scheduled:["picked_up","rescheduled","cancelled"],
  rescheduled:["scheduled","cancelled"],
  picked_up:["out_for_delivery","failed"],
  out_for_delivery:["delivered","failed","rescheduled"],
  failed:["rescheduled","cancelled"],
  delivered:[],
  cancelled:[]
};

const installationTransitions:Record<string,string[]>={
  pending:["scheduled","cancelled"],
  scheduled:["on_site","rescheduled","cancelled"],
  rescheduled:["scheduled","cancelled"],
  on_site:["completed","failed"],
  failed:["rescheduled","cancelled"],
  completed:[],
  cancelled:[]
};

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function updateDeliveryStatusAction(formData:FormData){
  const access=await requirePermission("delivery.manage");
  const id=value(formData,"id");
  const to=value(formData,"to");
  const note=value(formData,"note");
  const sql=getSql();

  const current=await sql`select status,order_id from delivery_jobs where id=${id} limit 1`;
  if(!current[0]) throw new Error("Delivery job not found.");
  const from=String(current[0].status);
  if(!(deliveryTransitions[from]??[]).includes(to)) throw new Error("Invalid delivery transition.");

  await sql`
    with updated as (
      update delivery_jobs
      set
        status=${to},
        delivered_at=case when ${to}='delivered' then now() else delivered_at end,
        updated_at=now()
      where id=${id}
      returning id,order_id
    ),
    event as (
      insert into delivery_events (delivery_job_id,from_status,to_status,actor_id,note)
      select updated.id,${from},${to},${access.preview?null:access.user.id},${note||null}
      from updated
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select
        ${access.preview?null:access.user.id},
        'delivery_job',
        updated.id,
        'status_change',
        jsonb_build_object('status',${from}),
        jsonb_build_object('status',${to},'note',${note||null})
      from updated
      returning id
    )
    select id from updated
  `;

  revalidatePath("/admin/logistics");
}

export async function updateInstallationStatusAction(formData:FormData){
  const access=await requirePermission("delivery.manage");
  const id=value(formData,"id");
  const to=value(formData,"to");
  const note=value(formData,"note");
  const sql=getSql();

  const current=await sql`select status,order_id from installation_jobs where id=${id} limit 1`;
  if(!current[0]) throw new Error("Installation job not found.");
  const from=String(current[0].status);
  if(!(installationTransitions[from]??[]).includes(to)) throw new Error("Invalid installation transition.");

  await sql`
    with updated as (
      update installation_jobs
      set
        status=${to},
        completed_at=case when ${to}='completed' then now() else completed_at end
      where id=${id}
      returning id,order_id
    ),
    event as (
      insert into installation_events (installation_job_id,from_status,to_status,actor_id,note)
      select updated.id,${from},${to},${access.preview?null:access.user.id},${note||null}
      from updated
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select
        ${access.preview?null:access.user.id},
        'installation_job',
        updated.id,
        'status_change',
        jsonb_build_object('status',${from}),
        jsonb_build_object('status',${to},'note',${note||null})
      from updated
      returning id
    )
    select id from updated
  `;

  revalidatePath("/admin/logistics");
}
