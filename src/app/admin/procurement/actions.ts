"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

function refresh(){
  revalidatePath("/admin/procurement");
  revalidatePath("/admin/inventory");
  revalidatePath("/admin");
}

export async function createSupplierAction(formData:FormData){
  const access=await requirePermission("inventory.manage");
  const legalName=value(formData,"legalName");
  const tradeName=value(formData,"tradeName");
  if(legalName.length<2) throw new Error("Supplier legal name is required.");

  const sql=getSql();
  const rows=await sql`
    with created as (
      insert into suppliers (
        legal_name,trade_name,status,phone,email,city,address,payment_terms,currency
      ) values (
        ${legalName},${tradeName||null},'active',${value(formData,"phone")||null},
        ${value(formData,"email")||null},${value(formData,"city")||null},
        ${value(formData,"address")||null},${value(formData,"paymentTerms")||null},'YER'
      )
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'supplier',created.id,'created',
        jsonb_build_object('legal_name',${legalName},'trade_name',${tradeName||null})
      from created
      returning id
    )
    select id from created
  `;
  if(!rows[0]) throw new Error("Supplier could not be created.");
  refresh();
}

export async function createPurchaseRequestAction(formData:FormData){
  const access=await requirePermission("inventory.manage");
  const itemId=value(formData,"itemId");
  const description=value(formData,"description");
  const quantity=Number(value(formData,"quantity"));
  const estimatedRaw=value(formData,"estimatedUnitCost");
  const estimated=estimatedRaw?Number(estimatedRaw):null;
  const neededBy=value(formData,"neededBy");

  if(!itemId&&!description) throw new Error("Choose an inventory item or enter a description.");
  if(!Number.isFinite(quantity)||quantity<=0) throw new Error("Purchase quantity must be greater than zero.");
  if(estimated!==null&&(!Number.isFinite(estimated)||estimated<0)) throw new Error("Estimated unit cost is invalid.");

  const sql=getSql();
  const rows=await sql`
    with created_request as (
      insert into purchase_requests (
        status,requested_by,needed_by,reason
      ) values (
        'draft',${access.preview?null:access.user.id},${neededBy||null},${value(formData,"reason")||null}
      )
      returning id,request_number
    ),
    created_item as (
      insert into purchase_request_items (
        purchase_request_id,inventory_item_id,description,quantity,estimated_unit_cost,currency,notes
      )
      select
        created_request.id,
        nullif(${itemId},'')::uuid,
        coalesce(nullif(${description},''),ii.name_ar),
        ${quantity},
        ${estimated},
        'YER',
        ${value(formData,"notes")||null}
      from created_request
      left join inventory_items ii on ii.id=nullif(${itemId},'')::uuid
      where ${itemId}='' or ii.id is not null
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'purchase_request',created_request.id,'created',
        jsonb_build_object('request_number',created_request.request_number,'quantity',${quantity})
      from created_request
      where exists(select 1 from created_item)
      returning id
    )
    select created_request.id,created_request.request_number
    from created_request
    where exists(select 1 from created_item)
  `;

  if(!rows[0]) throw new Error("Purchase request could not be created.");
  refresh();
}

export async function updatePurchaseRequestStatusAction(formData:FormData){
  const access=await requirePermission("inventory.manage");
  const requestId=value(formData,"requestId");
  const to=value(formData,"status");
  const allowed:Record<string,string[]>={
    draft:["submitted","cancelled"],
    submitted:["approved","rejected","cancelled"],
    approved:["cancelled"],
    rejected:[],
    ordered:["closed"],
    closed:[],
    cancelled:[]
  };

  const sql=getSql();
  const current=await sql`select id,status from purchase_requests where id=${requestId} limit 1`;
  if(!current[0]) throw new Error("Purchase request not found.");
  const from=String(current[0].status);
  if(!(allowed[from]??[]).includes(to)) throw new Error("Invalid purchase request transition.");

  const rows=await sql`
    with updated as (
      update purchase_requests
      set
        status=${to},
        approved_by=case when ${to}='approved' then ${access.preview?null:access.user.id} else approved_by end,
        updated_at=now()
      where id=${requestId} and status=${from}
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select
        ${access.preview?null:access.user.id},
        'purchase_request',updated.id,'status_change',
        jsonb_build_object('status',${from}),jsonb_build_object('status',${to})
      from updated returning id
    )
    select id from updated
  `;
  if(!rows[0]) throw new Error("Purchase request changed concurrently.");
  refresh();
}

export async function createPurchaseOrderFromRequestAction(formData:FormData){
  const access=await requirePermission("inventory.manage");
  const requestId=value(formData,"requestId");
  const supplierId=value(formData,"supplierId");
  const expectedAt=value(formData,"expectedAt");
  const sql=getSql();

  const rows=await sql`
    with request_row as (
      select pr.id
      from purchase_requests pr
      where pr.id=${requestId}
        and pr.status='approved'
        and not exists(
          select 1 from purchase_orders po
          where po.purchase_request_id=pr.id
            and po.status<>'cancelled'
        )
      for update
    ),
    supplier_row as (
      select id,currency from suppliers
      where id=${supplierId} and status='active'
      limit 1
    ),
    totals as (
      select
        coalesce(sum(pri.quantity*coalesce(pri.estimated_unit_cost,0)),0)::numeric(14,2) as subtotal
      from purchase_request_items pri
      join request_row rr on rr.id=pri.purchase_request_id
    ),
    new_po as (
      insert into purchase_orders (
        supplier_id,purchase_request_id,status,currency,subtotal,discount,total,expected_at,notes
      )
      select
        supplier_row.id,request_row.id,'draft',supplier_row.currency,
        totals.subtotal,0,totals.subtotal,${expectedAt||null},${value(formData,"notes")||null}
      from request_row cross join supplier_row cross join totals
      returning id,po_number
    ),
    po_items as (
      insert into purchase_order_items (
        purchase_order_id,inventory_item_id,description,quantity,unit_cost,total_cost
      )
      select
        new_po.id,pri.inventory_item_id,coalesce(pri.description,ii.name_ar,'Purchase item'),
        pri.quantity,coalesce(pri.estimated_unit_cost,0),
        round((pri.quantity*coalesce(pri.estimated_unit_cost,0))::numeric,2)
      from new_po
      join purchase_request_items pri on pri.purchase_request_id=${requestId}
      left join inventory_items ii on ii.id=pri.inventory_item_id
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'purchase_order',new_po.id,'created_from_request',
        jsonb_build_object('po_number',new_po.po_number,'purchase_request_id',${requestId},'items',(select count(*) from po_items))
      from new_po returning id
    )
    select id,po_number from new_po
  `;

  const row=rows[0];
  if(!row) throw new Error("Purchase order could not be created. The request may already have an active PO.");
  refresh();
  redirect(`/admin/procurement/${String(row.id)}`);
}

export async function updatePurchaseOrderStatusAction(formData:FormData){
  const access=await requirePermission("inventory.manage");
  const orderId=value(formData,"orderId");
  const to=value(formData,"status");
  const allowed:Record<string,string[]>={
    draft:["approved","cancelled"],
    approved:["sent","cancelled"],
    sent:["cancelled"],
    partially_received:["cancelled"],
    received:["closed"],
    closed:[],
    cancelled:[]
  };

  const sql=getSql();
  const current=await sql`
    select id,status,purchase_request_id,total
    from purchase_orders where id=${orderId} limit 1
  `;
  if(!current[0]) throw new Error("Purchase order not found.");
  const from=String(current[0].status);
  if(!(allowed[from]??[]).includes(to)) throw new Error("Invalid purchase order transition.");
  if(to==="approved"&&Number(current[0].total)<0) throw new Error("Purchase order total is invalid.");

  const rows=await sql`
    with updated as (
      update purchase_orders
      set
        status=${to},
        approved_by=case when ${to}='approved' then ${access.preview?null:access.user.id} else approved_by end,
        updated_at=now()
      where id=${orderId} and status=${from}
      returning id,purchase_request_id
    ),
    request_update as (
      update purchase_requests pr
      set status='ordered',updated_at=now()
      from updated
      where pr.id=updated.purchase_request_id
        and ${to}='sent'
        and pr.status='approved'
      returning pr.id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select
        ${access.preview?null:access.user.id},
        'purchase_order',updated.id,'status_change',
        jsonb_build_object('status',${from}),jsonb_build_object('status',${to})
      from updated returning id
    )
    select id from updated
  `;
  if(!rows[0]) throw new Error("Purchase order changed concurrently.");
  revalidatePath(`/admin/procurement/${orderId}`);
  refresh();
}

type ReceiptLine={
  purchaseOrderItemId:string;
  accepted:number;
  rejected:number;
};

export async function postGoodsReceiptAction(formData:FormData){
  const access=await requirePermission("inventory.manage");
  const orderId=value(formData,"orderId");
  const warehouseId=value(formData,"warehouseId");
  const lines:ReceiptLine[]=[];

  for(const [key,raw] of formData.entries()){
    if(!key.startsWith("accepted:")) continue;
    const itemId=key.slice("accepted:".length);
    const accepted=Number(String(raw||"0"));
    const rejected=Number(value(formData,`rejected:${itemId}`)||"0");
    if(!Number.isFinite(accepted)||accepted<0||!Number.isFinite(rejected)||rejected<0){
      throw new Error("Receipt quantities are invalid.");
    }
    if(accepted>0||rejected>0) lines.push({purchaseOrderItemId:itemId,accepted,rejected});
  }

  if(!lines.length) throw new Error("Enter at least one received quantity.");

  const sql=getSql();
  const linesJson=JSON.stringify(lines);

  const rows=await sql`
    with locked_po as (
      select po.id,po.supplier_id,po.status,po.purchase_request_id,po.currency
      from purchase_orders po
      where po.id=${orderId}
        and po.status in ('sent','partially_received')
      for update
    ),
    input_lines as (
      select *
      from jsonb_to_recordset(${linesJson}::jsonb)
        as x("purchaseOrderItemId" uuid,accepted numeric,rejected numeric)
    ),
    locked_items as (
      select
        poi.id,poi.inventory_item_id,poi.quantity,poi.received_quantity,poi.unit_cost,
        input_lines.accepted,input_lines.rejected
      from purchase_order_items poi
      join locked_po on locked_po.id=poi.purchase_order_id
      join input_lines on input_lines."purchaseOrderItemId"=poi.id
      for update of poi
    ),
    validation as (
      select
        count(*) filter (
          where inventory_item_id is null
             or accepted<0
             or rejected<0
             or accepted+rejected<=0
             or accepted>quantity-received_quantity
        )::integer as invalid_count,
        count(*)::integer as matched_count
      from locked_items
    ),
    warehouse as (
      select id from warehouses where id=${warehouseId} and is_active=true limit 1
    ),
    receipt as (
      insert into goods_receipts (
        purchase_order_id,supplier_id,warehouse_id,status,received_by,received_at,notes
      )
      select
        locked_po.id,locked_po.supplier_id,warehouse.id,'posted',
        ${access.preview?null:access.user.id},now(),${value(formData,"notes")||null}
      from locked_po cross join warehouse cross join validation
      where validation.invalid_count=0
        and validation.matched_count=(select count(*) from input_lines)
      returning id,receipt_number,purchase_order_id,warehouse_id
    ),
    receipt_items as (
      insert into goods_receipt_items (
        goods_receipt_id,purchase_order_item_id,inventory_item_id,quantity,unit_cost,
        accepted_quantity,rejected_quantity,notes
      )
      select
        receipt.id,li.id,li.inventory_item_id,li.accepted+li.rejected,li.unit_cost,
        li.accepted,li.rejected,null
      from receipt join locked_items li on true
      returning id,purchase_order_item_id,inventory_item_id,accepted_quantity,unit_cost
    ),
    stock as (
      insert into stock_movements (
        inventory_item_id,warehouse_id,movement_type,quantity,unit_cost,currency,
        reference_type,reference_id,notes,created_by
      )
      select
        receipt_items.inventory_item_id,receipt.warehouse_id,'receipt',
        receipt_items.accepted_quantity,receipt_items.unit_cost,locked_po.currency,
        'goods_receipt',receipt.id,'Posted from purchase receipt',
        ${access.preview?null:access.user.id}
      from receipt_items cross join receipt cross join locked_po
      where receipt_items.accepted_quantity>0
      returning id
    ),
    item_updates as (
      update purchase_order_items poi
      set received_quantity=poi.received_quantity+ri.accepted_quantity
      from receipt_items ri
      where poi.id=ri.purchase_order_item_id
      returning poi.id
    ),
    po_balance as (
      select
        locked_po.id,
        bool_and(poi.received_quantity>=poi.quantity) as fully_received
      from locked_po
      join purchase_order_items poi on poi.purchase_order_id=locked_po.id
      group by locked_po.id
    ),
    po_update as (
      update purchase_orders po
      set
        status=case when po_balance.fully_received then 'received' else 'partially_received' end,
        updated_at=now()
      from po_balance
      where po.id=po_balance.id
      returning po.id,po.status,po.purchase_request_id
    ),
    request_close as (
      update purchase_requests pr
      set status='closed',updated_at=now()
      from po_update
      where pr.id=po_update.purchase_request_id
        and po_update.status='received'
      returning pr.id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'goods_receipt',receipt.id,'posted',
        jsonb_build_object(
          'receipt_number',receipt.receipt_number,
          'purchase_order_id',receipt.purchase_order_id,
          'accepted_total',(select coalesce(sum(accepted_quantity),0) from receipt_items),
          'item_count',(select count(*) from receipt_items)
        )
      from receipt returning id
    )
    select receipt.id,receipt.receipt_number,po_update.status as po_status
    from receipt join po_update on po_update.id=receipt.purchase_order_id
  `;

  if(!rows[0]){
    throw new Error("Receipt could not be posted. Check warehouse, remaining quantities, and PO status.");
  }

  revalidatePath(`/admin/procurement/${orderId}`);
  refresh();
}
