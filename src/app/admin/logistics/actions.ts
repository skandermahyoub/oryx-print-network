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
  delivered:[],cancelled:[]
};
const installationTransitions:Record<string,string[]>={
  pending:["scheduled","cancelled"],scheduled:["on_site","rescheduled","cancelled"],
  rescheduled:["scheduled","cancelled"],on_site:["completed","failed"],
  failed:["rescheduled","cancelled"],completed:[],cancelled:[]
};
function value(formData:FormData,key:string){return String(formData.get(key)??"").trim();}

async function maybeCompleteOrder(sql:ReturnType<typeof getSql>,orderId:string,actorId:string|null){
  const evidence=await sql`
    select
      o.status,
      not exists(select 1 from delivery_jobs d where d.order_id=o.id and d.status not in ('delivered','cancelled')) as deliveries_done,
      not exists(select 1 from installation_jobs i where i.order_id=o.id and i.status not in ('completed','cancelled')) as installations_done,
      exists(select 1 from delivery_jobs d where d.order_id=o.id and d.status='delivered')
        or exists(select 1 from installation_jobs i where i.order_id=o.id and i.status='completed') as fulfilled,
      exists(select 1 from invoices i where i.order_id=o.id and i.status in ('issued','partial','paid')) as invoice_issued,
      exists(select 1 from invoices i where i.order_id=o.id and i.status='paid' and i.total>0 and i.amount_paid>=i.total) as collected
    from orders o where o.id=${orderId} limit 1
  `;
  const row=evidence[0];
  if(!row||!Boolean(row.deliveries_done)||!Boolean(row.installations_done)||!Boolean(row.fulfilled)) return false;
  if(!Boolean(row.invoice_issued)||!Boolean(row.collected)) return false;
  const from=String(row.status);
  if(!['delivery_scheduled','pickup_scheduled','ready'].includes(from)) return false;
  const changed=await sql`
    with updated as (
      update orders set status='completed',updated_at=now()
      where id=${orderId} and status=${from}
      returning id
    ), event as (
      insert into order_status_events(order_id,from_status,to_status,actor_id,reason)
      select id,${from},'completed',${actorId},'Fulfilment complete and invoice fully collected' from updated
      returning id
    ) select id from updated
  `;
  return changed.length>0;
}

export async function updateDeliveryStatusAction(formData:FormData){
  const access=await requirePermission("delivery.manage");
  const id=value(formData,"id"),to=value(formData,"to"),note=value(formData,"note");
  const sql=getSql();
  const current=await sql`select status,order_id from delivery_jobs where id=${id} limit 1`;
  if(!current[0]) throw new Error("Delivery job not found.");
  const from=String(current[0].status),orderId=String(current[0].order_id);
  if(!(deliveryTransitions[from]??[]).includes(to)) throw new Error("Invalid delivery transition.");
  const actorId=access.preview?null:access.user.id;
  const changed=await sql`
    with updated as (
      update delivery_jobs set status=${to},delivered_at=case when ${to}='delivered' then now() else delivered_at end,updated_at=now()
      where id=${id} and status=${from} returning id
    ), event as (
      insert into delivery_events(delivery_job_id,from_status,to_status,actor_id,note)
      select id,${from},${to},${actorId},${note||null} from updated returning id
    ), audit as (
      insert into audit_events(actor_id,entity_type,entity_id,action,before_data,after_data)
      select ${actorId},'delivery_job',id,'status_change',jsonb_build_object('status',${from}),jsonb_build_object('status',${to},'note',${note||null}) from updated returning id
    ) select id from updated
  `;
  if(!changed[0]) throw new Error("Delivery job changed concurrently. Reload before retrying.");
  if(to==='delivered') await maybeCompleteOrder(sql,orderId,actorId);
  revalidatePath("/admin/logistics");revalidatePath(`/admin/orders/${orderId}`);revalidatePath("/admin/finance");
}

export async function updateInstallationStatusAction(formData:FormData){
  const access=await requirePermission("delivery.manage");
  const id=value(formData,"id"),to=value(formData,"to"),note=value(formData,"note");
  const sql=getSql();
  const current=await sql`select status,order_id from installation_jobs where id=${id} limit 1`;
  if(!current[0]) throw new Error("Installation job not found.");
  const from=String(current[0].status),orderId=String(current[0].order_id);
  if(!(installationTransitions[from]??[]).includes(to)) throw new Error("Invalid installation transition.");
  const actorId=access.preview?null:access.user.id;
  const changed=await sql`
    with updated as (
      update installation_jobs set status=${to},completed_at=case when ${to}='completed' then now() else completed_at end
      where id=${id} and status=${from} returning id
    ), event as (
      insert into installation_events(installation_job_id,from_status,to_status,actor_id,note)
      select id,${from},${to},${actorId},${note||null} from updated returning id
    ), audit as (
      insert into audit_events(actor_id,entity_type,entity_id,action,before_data,after_data)
      select ${actorId},'installation_job',id,'status_change',jsonb_build_object('status',${from}),jsonb_build_object('status',${to},'note',${note||null}) from updated returning id
    ) select id from updated
  `;
  if(!changed[0]) throw new Error("Installation job changed concurrently. Reload before retrying.");
  if(to==='completed') await maybeCompleteOrder(sql,orderId,actorId);
  revalidatePath("/admin/logistics");revalidatePath(`/admin/orders/${orderId}`);revalidatePath("/admin/finance");
}

export async function createDeliveryJobAction(formData:FormData){
  const access=await requirePermission("delivery.manage");
  const orderId=value(formData,"orderId");const deliveryType=value(formData,"deliveryType")==="pickup"?"pickup":"delivery";const scheduledAt=value(formData,"scheduledAt");const sql=getSql();
  const rows=await sql`
    with target as (select o.id,o.status,o.customer_id,c.display_name,c.phone,c.city from orders o left join customers c on c.id=o.customer_id where o.id=${orderId} and o.status='ready' limit 1),
    created as (insert into delivery_jobs(order_id,delivery_type,status,recipient_name,phone,address,scheduled_at,currency,notes)
      select target.id,${deliveryType},case when ${scheduledAt||null} is null then 'pending' else 'scheduled' end,coalesce(nullif(${value(formData,"recipient")},''),target.display_name),coalesce(nullif(${value(formData,"phone")},''),target.phone),coalesce(nullif(${value(formData,"address")},''),target.city),${scheduledAt||null},'YER',nullif(${value(formData,"notes")},'') from target
      where not exists(select 1 from delivery_jobs d where d.order_id=target.id and d.status not in ('delivered','cancelled')) returning id,order_id,status),
    updated_order as (update orders o set status=case when ${deliveryType}='pickup' then 'pickup_scheduled' else 'delivery_scheduled' end,updated_at=now() from created where o.id=created.order_id returning o.id),
    event as (insert into order_status_events(order_id,from_status,to_status,actor_id,reason) select target.id,target.status,case when ${deliveryType}='pickup' then 'pickup_scheduled' else 'delivery_scheduled' end,${access.preview?null:access.user.id},'Logistics job created' from target join updated_order on updated_order.id=target.id returning id),
    audit as (insert into audit_events(actor_id,entity_type,entity_id,action,after_data) select ${access.preview?null:access.user.id},'delivery_job',created.id,'created',jsonb_build_object('order_id',created.order_id,'type',${deliveryType},'status',created.status) from created returning id)
    select id from created`;
  if(!rows[0]) throw new Error("Order is not ready or already has an active delivery job.");
  revalidatePath(`/admin/orders/${orderId}`);revalidatePath("/admin/logistics");revalidatePath("/admin");
}

export async function createInstallationJobAction(formData:FormData){
  const access=await requirePermission("delivery.manage");const orderId=value(formData,"orderId");const scheduledAt=value(formData,"scheduledAt");const sql=getSql();
  const rows=await sql`
    with target as (select id,status from orders where id=${orderId} and status in ('ready','delivery_scheduled','pickup_scheduled') limit 1),
    created as (insert into installation_jobs(order_id,status,address,scheduled_at,technician_name,technician_phone,notes)
      select target.id,case when ${scheduledAt||null} is null then 'pending' else 'scheduled' end,nullif(${value(formData,"address")},''),${scheduledAt||null},nullif(${value(formData,"technicianName")},''),nullif(${value(formData,"technicianPhone")},''),nullif(${value(formData,"notes")},'') from target
      where not exists(select 1 from installation_jobs i where i.order_id=target.id and i.status not in ('completed','cancelled')) returning id,order_id,status),
    audit as (insert into audit_events(actor_id,entity_type,entity_id,action,after_data) select ${access.preview?null:access.user.id},'installation_job',created.id,'created',jsonb_build_object('order_id',created.order_id,'status',created.status) from created returning id)
    select id from created`;
  if(!rows[0]) throw new Error("Order is not ready for installation or already has an active installation job.");
  revalidatePath(`/admin/orders/${orderId}`);revalidatePath("/admin/logistics");
}
