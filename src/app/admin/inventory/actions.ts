"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function createWarehouseAction(formData:FormData){
  const access=await requirePermission("inventory.manage");
  const code=value(formData,"code").toUpperCase();
  const name=value(formData,"name");
  const city=value(formData,"city");
  const address=value(formData,"address");

  if(!/^[A-Z0-9_-]{2,30}$/.test(code)||name.length<2){
    throw new Error("Warehouse data is invalid.");
  }

  const sql=getSql();
  const rows=await sql`
    with created as (
      insert into warehouses (code,name_ar,city,address,is_active)
      values (${code},${name},${city||null},${address||null},true)
      on conflict (code) do nothing
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'warehouse',
        created.id,
        'created',
        jsonb_build_object('code',${code},'name',${name})
      from created
      returning id
    )
    select id from created
  `;

  if(!rows[0]) throw new Error("Warehouse code is already in use.");
  revalidatePath("/admin/inventory");
}

export async function createInventoryItemAction(formData:FormData){
  const access=await requirePermission("inventory.manage");
  const sku=value(formData,"sku").toUpperCase();
  const name=value(formData,"name");
  const unit=value(formData,"unit")||"unit";
  const minStock=Number(value(formData,"minStock")||"0");
  const reorderQuantityRaw=value(formData,"reorderQuantity");
  const reorderQuantity=reorderQuantityRaw?Number(reorderQuantityRaw):null;
  const averageCostRaw=value(formData,"averageCost");
  const averageCost=averageCostRaw?Number(averageCostRaw):null;

  if(!/^[A-Z0-9._-]{2,50}$/.test(sku)||name.length<2||!Number.isFinite(minStock)||minStock<0){
    throw new Error("Inventory item data is invalid.");
  }

  const sql=getSql();
  const rows=await sql`
    with created as (
      insert into inventory_items (
        sku,name_ar,unit,min_stock,reorder_quantity,average_cost,currency,is_active
      ) values (
        ${sku},${name},${unit},${minStock},${reorderQuantity},${averageCost},'YER',true
      )
      on conflict (sku) do nothing
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'inventory_item',
        created.id,
        'created',
        jsonb_build_object('sku',${sku},'name',${name},'unit',${unit})
      from created
      returning id
    )
    select id from created
  `;

  if(!rows[0]) throw new Error("SKU is already in use.");
  revalidatePath("/admin/inventory");
}

export async function recordStockMovementAction(formData:FormData){
  const access=await requirePermission("inventory.manage");
  const itemId=value(formData,"itemId");
  const warehouseId=value(formData,"warehouseId");
  const movementType=value(formData,"movementType");
  const quantity=Number(value(formData,"quantity"));
  const unitCostRaw=value(formData,"unitCost");
  const unitCost=unitCostRaw?Number(unitCostRaw):null;
  const notes=value(formData,"notes");

  const allowed=["opening","receipt","adjust_in","adjust_out","return","waste"];
  if(!allowed.includes(movementType)||!Number.isFinite(quantity)||quantity<=0){
    throw new Error("Stock movement data is invalid.");
  }

  const sql=getSql();

  const balanceRows=await sql`
    select
      coalesce(sum(case
        when movement_type in ('opening','receipt','release','adjust_in','transfer_in','return') then quantity
        when movement_type in ('reserve','consume','waste','adjust_out','transfer_out') then -quantity
        else 0 end),0)::numeric(14,3) as balance
    from stock_movements
    where inventory_item_id=${itemId}
      and warehouse_id=${warehouseId}
  `;
  const balance=Number(balanceRows[0]?.balance??0);
  const outflow=["adjust_out","waste"].includes(movementType);
  if(outflow&&quantity>balance){
    throw new Error("Stock movement would make warehouse balance negative.");
  }

  const rows=await sql`
    with movement as (
      insert into stock_movements (
        inventory_item_id,warehouse_id,movement_type,quantity,unit_cost,currency,notes,created_by
      )
      select
        ii.id,w.id,${movementType},${quantity},${unitCost},'YER',${notes||null},${access.preview?null:access.user.id}
      from inventory_items ii
      join warehouses w on w.id=${warehouseId} and w.is_active=true
      where ii.id=${itemId} and ii.is_active=true
      returning id,inventory_item_id
    ),
    update_cost as (
      update inventory_items ii
      set
        average_cost=case when ${unitCost} is null then ii.average_cost else ${unitCost} end,
        updated_at=now()
      from movement
      where ii.id=movement.inventory_item_id
      returning ii.id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'inventory_item',
        movement.inventory_item_id,
        'stock_movement',
        jsonb_build_object('movement_type',${movementType},'quantity',${quantity},'warehouse_id',${warehouseId})
      from movement
      returning id
    )
    select id from movement
  `;

  if(!rows[0]) throw new Error("Inventory item or warehouse is unavailable.");
  revalidatePath("/admin/inventory");
}
