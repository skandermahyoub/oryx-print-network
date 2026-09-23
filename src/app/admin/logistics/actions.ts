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
    ),
    closeable as (
      select
        updated.order_id,
        not exists(
          select 1 from delivery_jobs dj
          where dj.order_id=updated.order_id
            and dj.status not in ('delivered','cancelled')
        ) as deliveries_done,
        not exists(
          select 1 from installation_jobs ij
          where ij.order_id=updated.order_id
            and ij.status not in ('completed','cancelled')
        ) as installations_done
      from updated
    ),
    old_order as (
      select o.id,o.status
      from orders o
      join closeable c on c.order_id=o.id
    ),
    completed_order as (
      update orders o
      set status='completed',updated_at=now()
      from closeable,old_order
      where o.id=closeable.order_id
        and ${to}='delivered'
        and closeable.deliveries_done=true
        and closeable.installations_done=true
        and old_order.status in ('delivery_scheduled','pickup_scheduled','ready')
      returning o.id
    ),
    order_event as (
      insert into order_status_events (order_id,from_status,to_status,actor_id,reason)
      select old_order.id,old_order.status,'completed',${access.preview?null:access.user.id},'Delivery and installation obligations completed'
      from old_order join completed_order on completed_order.id=old_order.id
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
    ),
    closeable as (
      select
        updated.order_id,
        not exists(
          select 1 from delivery_jobs dj
          where dj.order_id=updated.order_id
            and dj.status not in ('delivered','cancelled')
        ) as deliveries_done,
        not exists(
          select 1 from installation_jobs ij
          where ij.order_id=updated.order_id
            and ij.status not in ('completed','cancelled')
        ) as installations_done
      from updated
    ),
    old_order as (
      select o.id,o.status
      from orders o
      join closeable c on c.order_id=o.id
    ),
    completed_order as (
      update orders o
      set status='completed',updated_at=now()
      from closeable,old_order
      where o.id=closeable.order_id
        and ${to}='completed'
        and closeable.deliveries_done=true
        and closeable.installations_done=true
        and old_order.status in ('delivery_scheduled','pickup_scheduled','ready')
      returning o.id
    ),
    order_event as (
      insert into order_status_events (order_id,from_status,to_status,actor_id,reason)
      select old_order.id,old_order.status,'completed',${access.preview?null:access.user.id},'Delivery and installation obligations completed'
      from old_order join completed_order on completed_order.id=old_order.id
      returning id
    )
    select id from updated
  `;

  revalidatePath("/admin/logistics");
}


export async function createDeliveryJobAction(formData:FormData){
  const access=await requirePermission("delivery.manage");
  const orderId=value(formData,"orderId");
  const deliveryType=value(formData,"deliveryType")==="pickup"?"pickup":"delivery";
  const scheduledAt=value(formData,"scheduledAt");
  const sql=getSql();

  const rows=await sql`
    with target as (
      select
        o.id,o.status,o.customer_id,
        c.display_name,c.phone,c.city
      from orders o
      left join customers c on c.id=o.customer_id
      where o.id=${orderId}
        and o.status='ready'
      limit 1
    ),
    created as (
      insert into delivery_jobs (
        order_id,delivery_type,status,recipient_name,phone,address,scheduled_at,currency,notes
      )
      select
        target.id,
        ${deliveryType},
        case when ${scheduledAt||null} is null then 'pending' else 'scheduled' end,
        coalesce(nullif(${value(formData,"recipient")},''),target.display_name),
        coalesce(nullif(${value(formData,"phone")},''),target.phone),
        coalesce(nullif(${value(formData,"address")},''),target.city),
        ${scheduledAt||null},
        'YER',
        nullif(${value(formData,"notes")},'')
      from target
      where not exists(
        select 1 from delivery_jobs dj
        where dj.order_id=target.id
          and dj.status not in ('delivered','cancelled')
      )
      returning id,order_id,status
    ),
    old_order as (
      select id,status from target
    ),
    updated_order as (
      update orders o
      set status=case when ${deliveryType}='pickup' then 'pickup_scheduled' else 'delivery_scheduled' end,
          updated_at=now()
      from created
      where o.id=created.order_id
      returning o.id,o.status
    ),
    event as (
      insert into order_status_events (order_id,from_status,to_status,actor_id,reason)
      select
        old_order.id,
        old_order.status,
        case when ${deliveryType}='pickup' then 'pickup_scheduled' else 'delivery_scheduled' end,
        ${access.preview?null:access.user.id},
        'Logistics job created'
      from old_order join updated_order on updated_order.id=old_order.id
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'delivery_job',
        created.id,
        'created',
        jsonb_build_object('order_id',created.order_id,'type',${deliveryType},'status',created.status)
      from created
      returning id
    )
    select id from created
  `;

  if(!rows[0]) throw new Error("Order is not ready or already has an active delivery job.");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/logistics");
  revalidatePath("/admin");
}

export async function createInstallationJobAction(formData:FormData){
  const access=await requirePermission("delivery.manage");
  const orderId=value(formData,"orderId");
  const scheduledAt=value(formData,"scheduledAt");
  const sql=getSql();

  const rows=await sql`
    with target as (
      select id,status
      from orders
      where id=${orderId}
        and status in ('ready','delivery_scheduled','pickup_scheduled')
      limit 1
    ),
    created as (
      insert into installation_jobs (
        order_id,status,address,scheduled_at,technician_name,technician_phone,notes
      )
      select
        target.id,
        case when ${scheduledAt||null} is null then 'pending' else 'scheduled' end,
        nullif(${value(formData,"address")},''),
        ${scheduledAt||null},
        nullif(${value(formData,"technicianName")},''),
        nullif(${value(formData,"technicianPhone")},''),
        nullif(${value(formData,"notes")},'')
      from target
      where not exists(
        select 1 from installation_jobs ij
        where ij.order_id=target.id
          and ij.status not in ('completed','cancelled')
      )
      returning id,order_id,status
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'installation_job',
        created.id,
        'created',
        jsonb_build_object('order_id',created.order_id,'status',created.status)
      from created
      returning id
    )
    select id from created
  `;

  if(!rows[0]) throw new Error("Order is not ready for installation or already has an active installation job.");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/logistics");
}
