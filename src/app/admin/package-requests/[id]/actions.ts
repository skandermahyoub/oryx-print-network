"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function mapPackageItemServiceAction(formData:FormData){
  const access=await requirePermission("package_requests.manage");
  const requestId=value(formData,"requestId");
  const requestItemId=value(formData,"requestItemId");
  const serviceId=value(formData,"serviceId");
  const sql=getSql();

  const rows=await sql`
    with target as (
      select pri.id,pri.package_item_id,pri.item_name,pr.package_id
      from package_request_items pri
      join package_requests pr on pr.id=pri.package_request_id
      where pri.id=${requestItemId}
        and pr.id=${requestId}
      limit 1
    ),
    existing_package_item as (
      select pi.id
      from package_items pi
      join target on target.package_item_id=pi.id
    ),
    updated_existing as (
      update package_items pi
      set service_id=${serviceId}
      from existing_package_item
      where pi.id=existing_package_item.id
      returning pi.id
    ),
    created_package_item as (
      insert into package_items (
        package_id,service_id,item_name,quantity,item_role,default_selected,sort_order
      )
      select
        target.package_id,${serviceId},target.item_name,1,'core',true,0
      from target
      where target.package_item_id is null
      returning id
    ),
    chosen_package_item as (
      select id from updated_existing
      union all
      select id from created_package_item
      limit 1
    ),
    linked_request_item as (
      update package_request_items pri
      set package_item_id=(select id from chosen_package_item)
      where pri.id=${requestItemId}
      returning pri.id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'package_request',
        ${requestId},
        'item_service_mapped',
        jsonb_build_object('request_item_id',${requestItemId},'service_id',${serviceId})
      from linked_request_item
      returning id
    )
    select id from linked_request_item
  `;

  if(!rows[0]) throw new Error("Package item could not be mapped.");
  revalidatePath(`/admin/package-requests/${requestId}`);
}

export async function updatePackageRequestStatusAction(formData:FormData){
  const access=await requirePermission("package_requests.manage");
  const requestId=value(formData,"requestId");
  const status=value(formData,"status");
  if(!["submitted","under_review","quoted","cancelled"].includes(status)){
    throw new Error("Invalid package request status.");
  }

  const sql=getSql();
  const rows=await sql`
    with old as (
      select id,status from package_requests where id=${requestId} limit 1
    ),
    updated as (
      update package_requests pr
      set status=${status},updated_at=now()
      from old
      where pr.id=old.id
        and old.status<>'converted'
      returning pr.id,old.status as old_status,pr.status as new_status
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select
        ${access.preview?null:access.user.id},
        'package_request',
        updated.id,
        'status_change',
        jsonb_build_object('status',updated.old_status),
        jsonb_build_object('status',updated.new_status)
      from updated
      returning id
    )
    select id from updated
  `;

  if(!rows[0]) throw new Error("Package request cannot be updated.");
  revalidatePath(`/admin/package-requests/${requestId}`);
  revalidatePath("/admin/package-requests");
}

export async function convertPackageRequestToOrderAction(formData:FormData){
  const access=await requirePermission("package_requests.manage");
  const requestId=value(formData,"requestId");
  const sql=getSql();

  const check=await sql`
    select
      pr.id,pr.status,pr.customer_id,pr.converted_order_id,
      count(pri.id)::integer as item_count,
      count(pi.service_id)::integer as mapped_count
    from package_requests pr
    left join package_request_items pri on pri.package_request_id=pr.id
    left join package_items pi on pi.id=pri.package_item_id
    where pr.id=${requestId}
    group by pr.id
    limit 1
  `;

  const request=check[0];
  if(!request) throw new Error("Package request not found.");
  if(request.converted_order_id){
    redirect(`/admin/orders/${String(request.converted_order_id)}`);
  }
  if(!request.customer_id) throw new Error("Package request has no customer.");
  if(Number(request.item_count)<1||Number(request.item_count)!==Number(request.mapped_count)){
    throw new Error("Map every package item to a catalog service before conversion.");
  }
  if(!["submitted","under_review","quoted"].includes(String(request.status))){
    throw new Error("Package request cannot be converted from its current status.");
  }

  const rows=await sql`
    with locked_request as (
      select id,customer_id,status
      from package_requests
      where id=${requestId}
        and converted_order_id is null
      for update
    ),
    new_order as (
      insert into orders (customer_id,status,currency,notes)
      select
        locked_request.customer_id,
        'under_review',
        'YER',
        concat('Converted from package request #',${requestId})
      from locked_request
      returning id,order_number
    ),
    new_items as (
      insert into order_items (
        order_id,service_id,quantity,specifications
      )
      select
        new_order.id,
        pi.service_id,
        pri.quantity,
        jsonb_build_object(
          'source','package_request',
          'package_request_id',${requestId},
          'package_request_item_id',pri.id,
          'package_item_name',pri.item_name
        )
      from new_order
      join package_request_items pri on pri.package_request_id=${requestId}
      join package_items pi on pi.id=pri.package_item_id
      where pi.service_id is not null
      returning id
    ),
    converted as (
      update package_requests pr
      set
        status='converted',
        converted_order_id=new_order.id,
        updated_at=now()
      from new_order
      where pr.id=${requestId}
      returning pr.id,new_order.id as order_id,new_order.order_number
    ),
    order_event as (
      insert into order_status_events (order_id,from_status,to_status,actor_id,reason)
      select
        converted.order_id,
        null,
        'under_review',
        ${access.preview?null:access.user.id},
        'Converted from package request'
      from converted
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'package_request',
        converted.id,
        'converted_to_order',
        jsonb_build_object(
          'order_id',converted.order_id,
          'order_number',converted.order_number,
          'item_count',(select count(*) from new_items)
        )
      from converted
      returning id
    )
    select order_id,order_number from converted
  `;

  const result=rows[0];
  if(!result) throw new Error("Package request changed concurrently.");
  redirect(`/admin/orders/${String(result.order_id)}`);
}
