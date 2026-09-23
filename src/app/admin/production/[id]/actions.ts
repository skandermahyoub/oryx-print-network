"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

function refresh(workOrderId:string){
  revalidatePath(`/admin/production/${workOrderId}`);
  revalidatePath("/admin/production");
  revalidatePath("/admin/inventory");
  revalidatePath("/admin/finance");
}

export async function reserveWorkOrderMaterialAction(formData:FormData){
  const access=await requirePermission("production.manage");
  const workOrderId=value(formData,"workOrderId");
  const inventoryItemId=value(formData,"inventoryItemId");
  const warehouseId=value(formData,"warehouseId");
  const quantity=Number(value(formData,"quantity"));

  if(!Number.isFinite(quantity)||quantity<=0){
    throw new Error("Reservation quantity must be greater than zero.");
  }

  const sql=getSql();
  const rows=await sql`
    with advisory as (
      select pg_advisory_xact_lock(hashtextextended(${inventoryItemId}||':'||${warehouseId},0))
    ),
    target_work as (
      select wo.id
      from work_orders wo cross join advisory
      where wo.id=${workOrderId}
        and wo.status not in ('completed','cancelled')
      limit 1
    ),
    target_item as (
      select ii.id,ii.unit
      from inventory_items ii
      where ii.id=${inventoryItemId} and ii.is_active=true
      limit 1
    ),
    target_warehouse as (
      select id from warehouses where id=${warehouseId} and is_active=true limit 1
    ),
    on_hand as (
      select coalesce(sum(case
        when sm.movement_type in ('opening','receipt','adjust_in','transfer_in','return') then sm.quantity
        when sm.movement_type in ('consume','waste','adjust_out','transfer_out') then -sm.quantity
        else 0 end),0)::numeric(14,3) as quantity
      from stock_movements sm
      where sm.inventory_item_id=${inventoryItemId}
        and sm.warehouse_id=${warehouseId}
    ),
    reserved as (
      select coalesce(sum(mr.quantity-mr.consumed_quantity),0)::numeric(14,3) as quantity
      from material_reservations mr
      where mr.inventory_item_id=${inventoryItemId}
        and mr.warehouse_id=${warehouseId}
        and mr.status in ('reserved','partially_consumed')
    ),
    capacity as (
      select greatest(0,on_hand.quantity-reserved.quantity)::numeric(14,3) as available
      from on_hand cross join reserved
    ),
    inserted as (
      insert into material_reservations (
        work_order_id,inventory_item_id,warehouse_id,quantity,consumed_quantity,status
      )
      select
        target_work.id,target_item.id,target_warehouse.id,${quantity},0,'reserved'
      from target_work cross join target_item cross join target_warehouse cross join capacity
      where capacity.available>=${quantity}
      on conflict (work_order_id,inventory_item_id,warehouse_id)
        where status in ('reserved','partially_consumed')
      do update set
        quantity=material_reservations.quantity+excluded.quantity,
        status=case when material_reservations.consumed_quantity>0 then 'partially_consumed' else 'reserved' end,
        released_at=null
      returning id,quantity,consumed_quantity
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'work_order',${workOrderId},'material_reserved',
        jsonb_build_object(
          'reservation_id',inserted.id,'inventory_item_id',${inventoryItemId},
          'warehouse_id',${warehouseId},'added_quantity',${quantity},'total_reserved',inserted.quantity
        )
      from inserted returning id
    )
    select id,quantity,consumed_quantity from inserted
  `;

  if(!rows[0]) throw new Error("Insufficient available stock or work order is closed.");
  refresh(workOrderId);
}

export async function releaseWorkOrderMaterialAction(formData:FormData){
  const access=await requirePermission("production.manage");
  const workOrderId=value(formData,"workOrderId");
  const reservationId=value(formData,"reservationId");
  const sql=getSql();

  const rows=await sql`
    with updated as (
      update material_reservations
      set status='released',released_at=now()
      where id=${reservationId}
        and work_order_id=${workOrderId}
        and status in ('reserved','partially_consumed')
        and consumed_quantity<quantity
      returning id,inventory_item_id,warehouse_id,quantity,consumed_quantity
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'work_order',${workOrderId},'material_released',
        jsonb_build_object(
          'reservation_id',updated.id,
          'released_quantity',updated.quantity-updated.consumed_quantity
        )
      from updated returning id
    )
    select id from updated
  `;

  if(!rows[0]) throw new Error("Reservation cannot be released.");
  refresh(workOrderId);
}

export async function consumeWorkOrderMaterialAction(formData:FormData){
  const access=await requirePermission("production.manage");
  const workOrderId=value(formData,"workOrderId");
  const reservationId=value(formData,"reservationId");
  const good=Number(value(formData,"goodQuantity")||"0");
  const waste=Number(value(formData,"wasteQuantity")||"0");
  const total=good+waste;

  if(!Number.isFinite(good)||good<0||!Number.isFinite(waste)||waste<0||total<=0){
    throw new Error("Consumption quantities are invalid.");
  }

  const sql=getSql();
  const rows=await sql`
    with target as (
      select
        mr.id,mr.work_order_id,mr.inventory_item_id,mr.warehouse_id,mr.quantity,mr.consumed_quantity,mr.status,
        ii.average_cost,ii.currency,ii.name_ar,
        wo.order_item_id
      from material_reservations mr
      join inventory_items ii on ii.id=mr.inventory_item_id
      join work_orders wo on wo.id=mr.work_order_id
      where mr.id=${reservationId}
        and mr.work_order_id=${workOrderId}
        and mr.status in ('reserved','partially_consumed')
        and wo.status not in ('completed','cancelled')
      limit 1
    ),
    advisory as (
      select pg_advisory_xact_lock(hashtextextended(
        (select inventory_item_id::text||':'||warehouse_id::text from target),0
      ))
    ),
    on_hand as (
      select coalesce(sum(case
        when sm.movement_type in ('opening','receipt','adjust_in','transfer_in','return') then sm.quantity
        when sm.movement_type in ('consume','waste','adjust_out','transfer_out') then -sm.quantity
        else 0 end),0)::numeric(14,3) as quantity
      from stock_movements sm cross join advisory
      where sm.inventory_item_id=(select inventory_item_id from target)
        and sm.warehouse_id=(select warehouse_id from target)
    ),
    eligible as (
      select target.*
      from target cross join on_hand
      where target.quantity-target.consumed_quantity>=${total}
        and on_hand.quantity>=${total}
    ),
    consumption as (
      insert into material_consumptions (
        work_order_id,inventory_item_id,warehouse_id,quantity_good,quantity_waste,
        unit_cost,currency,notes,recorded_by
      )
      select
        eligible.work_order_id,eligible.inventory_item_id,eligible.warehouse_id,
        ${good},${waste},eligible.average_cost,eligible.currency,${value(formData,"notes")||null},
        ${access.preview?null:access.user.id}
      from eligible
      returning id,work_order_id,inventory_item_id,warehouse_id,quantity_good,quantity_waste,unit_cost,currency
    ),
    good_stock as (
      insert into stock_movements (
        inventory_item_id,warehouse_id,movement_type,quantity,unit_cost,currency,
        reference_type,reference_id,notes,created_by
      )
      select
        consumption.inventory_item_id,consumption.warehouse_id,'consume',consumption.quantity_good,
        consumption.unit_cost,consumption.currency,'material_consumption',consumption.id,
        'Production material consumption',${access.preview?null:access.user.id}
      from consumption
      where consumption.quantity_good>0
      returning id
    ),
    waste_stock as (
      insert into stock_movements (
        inventory_item_id,warehouse_id,movement_type,quantity,unit_cost,currency,
        reference_type,reference_id,notes,created_by
      )
      select
        consumption.inventory_item_id,consumption.warehouse_id,'waste',consumption.quantity_waste,
        consumption.unit_cost,consumption.currency,'material_consumption',consumption.id,
        'Production material waste',${access.preview?null:access.user.id}
      from consumption
      where consumption.quantity_waste>0
      returning id
    ),
    reservation_update as (
      update material_reservations mr
      set
        consumed_quantity=mr.consumed_quantity+${total},
        status=case when mr.consumed_quantity+${total}>=mr.quantity then 'consumed' else 'partially_consumed' end
      from consumption
      where mr.id=${reservationId}
      returning mr.id,mr.quantity,mr.consumed_quantity,mr.status
    ),
    prior_cost as (
      select coalesce(sum(jcl.total_cost),0)::numeric(14,2) as total
      from job_cost_lines jcl
      where jcl.work_order_id=${workOrderId}
        and jcl.is_estimate=false
    ),
    material_cost as (
      insert into job_cost_lines (
        order_item_id,work_order_id,cost_type,description,quantity,unit_cost,total_cost,currency,
        source_type,source_id,is_estimate
      )
      select
        eligible.order_item_id,eligible.work_order_id,'material',
        'Material: '||eligible.name_ar,${good},coalesce(eligible.average_cost,0),
        round((${good}*coalesce(eligible.average_cost,0))::numeric,2),eligible.currency,
        'material_consumption',consumption.id,false
      from eligible join consumption on consumption.work_order_id=eligible.work_order_id
      where ${good}>0
      returning total_cost
    ),
    waste_cost as (
      insert into job_cost_lines (
        order_item_id,work_order_id,cost_type,description,quantity,unit_cost,total_cost,currency,
        source_type,source_id,is_estimate
      )
      select
        eligible.order_item_id,eligible.work_order_id,'waste',
        'Waste: '||eligible.name_ar,${waste},coalesce(eligible.average_cost,0),
        round((${waste}*coalesce(eligible.average_cost,0))::numeric,2),eligible.currency,
        'material_consumption',consumption.id,false
      from eligible join consumption on consumption.work_order_id=eligible.work_order_id
      where ${waste}>0
      returning total_cost
    ),
    new_cost as (
      select
        coalesce((select sum(total_cost) from material_cost),0)+
        coalesce((select sum(total_cost) from waste_cost),0) as total
    ),
    work_cost as (
      update work_orders
      set cost_actual=(select total from prior_cost)+(select total from new_cost)
      where id=${workOrderId}
      returning id,cost_actual
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'work_order',${workOrderId},'material_consumed',
        jsonb_build_object(
          'reservation_id',${reservationId},'good_quantity',${good},'waste_quantity',${waste},
          'consumption_id',consumption.id
        )
      from consumption returning id
    )
    select consumption.id,reservation_update.status,work_cost.cost_actual
    from consumption cross join reservation_update cross join work_cost
  `;

  if(!rows[0]) throw new Error("Consumption exceeds reserved quantity or current on-hand stock.");
  refresh(workOrderId);
}

export async function addWorkOrderCostAction(formData:FormData){
  const access=await requirePermission("production.manage");
  const workOrderId=value(formData,"workOrderId");
  const costType=value(formData,"costType");
  const quantity=Number(value(formData,"quantity")||"1");
  const unitCost=Number(value(formData,"unitCost"));
  const allowed=["labor","machine","design","partner","outsource","delivery","installation","other"];

  if(!allowed.includes(costType)||!Number.isFinite(quantity)||quantity<=0||!Number.isFinite(unitCost)||unitCost<0){
    throw new Error("Cost line is invalid.");
  }

  const sql=getSql();
  const rows=await sql`
    with target as (
      select wo.id,wo.order_item_id
      from work_orders wo
      where wo.id=${workOrderId}
      limit 1
    ),
    created as (
      insert into job_cost_lines (
        order_item_id,work_order_id,cost_type,description,quantity,unit_cost,total_cost,currency,is_estimate
      )
      select
        target.order_item_id,target.id,${costType},${value(formData,"description")||null},
        ${quantity},${unitCost},round((${quantity}*${unitCost})::numeric,2),'YER',false
      from target
      returning id,total_cost
    ),
    prior as (
      select coalesce(sum(total_cost),0)::numeric(14,2) as total
      from job_cost_lines
      where work_order_id=${workOrderId}
        and is_estimate=false
        and id<>(select id from created)
    ),
    updated as (
      update work_orders
      set cost_actual=(select total from prior)+(select total_cost from created)
      where id=${workOrderId}
      returning id,cost_actual
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'work_order',${workOrderId},'actual_cost_added',
        jsonb_build_object('cost_line_id',created.id,'cost_type',${costType},'total_cost',created.total_cost)
      from created returning id
    )
    select created.id,updated.cost_actual
    from created cross join updated
  `;

  if(!rows[0]) throw new Error("Cost line could not be recorded.");
  refresh(workOrderId);
}
