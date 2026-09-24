import { databaseConfigured, getSql } from "@/lib/db";

export type PurchaseOrderDetail={
  order:{
    id:string;
    number:number;
    status:string;
    supplierId:string;
    supplier:string;
    requestNumber:number|null;
    currency:string;
    subtotal:number;
    discount:number;
    total:number;
    expectedAt:string|null;
    notes:string|null;
  };
  items:Array<{
    id:string;
    inventoryItemId:string|null;
    sku:string|null;
    name:string;
    unit:string|null;
    quantity:number;
    receivedQuantity:number;
    remainingQuantity:number;
    unitCost:number;
    totalCost:number;
  }>;
  receipts:Array<{
    id:string;
    number:number;
    status:string;
    warehouse:string;
    receivedAt:string;
    accepted:number;
    rejected:number;
  }>;
  warehouses:Array<{id:string;code:string;name:string}>;
};

export async function getPurchaseOrderDetail(id:string):Promise<PurchaseOrderDetail|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();
  const rows=await sql`
    select
      po.id,po.po_number,po.status,po.supplier_id,po.currency,po.subtotal,po.discount,po.total,
      po.expected_at,po.notes,pr.request_number,
      coalesce(s.trade_name,s.legal_name) as supplier_name
    from purchase_orders po
    join suppliers s on s.id=po.supplier_id
    left join purchase_requests pr on pr.id=po.purchase_request_id
    where po.id=${id}
    limit 1
  `;
  const po=rows[0];
  if(!po) return null;

  const [items,receipts,warehouses]=await Promise.all([
    sql`
      select
        poi.id,poi.inventory_item_id,poi.description,poi.quantity,poi.received_quantity,
        poi.unit_cost,poi.total_cost,
        ii.sku,ii.name_ar,ii.unit
      from purchase_order_items poi
      left join inventory_items ii on ii.id=poi.inventory_item_id
      where poi.purchase_order_id=${id}
      order by poi.id
    `,
    sql`
      select
        gr.id,gr.receipt_number,gr.status,gr.received_at,w.name_ar as warehouse_name,
        coalesce(sum(gri.accepted_quantity),0)::numeric as accepted,
        coalesce(sum(gri.rejected_quantity),0)::numeric as rejected
      from goods_receipts gr
      join warehouses w on w.id=gr.warehouse_id
      left join goods_receipt_items gri on gri.goods_receipt_id=gr.id
      where gr.purchase_order_id=${id}
      group by gr.id,w.id
      order by gr.received_at desc
    `,
    sql`select id,code,name_ar from warehouses where is_active=true order by name_ar`
  ]);

  return {
    order:{
      id:String(po.id),number:Number(po.po_number),status:String(po.status),supplierId:String(po.supplier_id),
      supplier:String(po.supplier_name),requestNumber:po.request_number===null?null:Number(po.request_number),
      currency:String(po.currency??"YER"),subtotal:Number(po.subtotal??0),discount:Number(po.discount??0),
      total:Number(po.total??0),expectedAt:po.expected_at?String(po.expected_at):null,notes:po.notes?String(po.notes):null
    },
    items:items.map(row=>{
      const quantity=Number(row.quantity??0);
      const received=Number(row.received_quantity??0);
      return {
        id:String(row.id),inventoryItemId:row.inventory_item_id?String(row.inventory_item_id):null,
        sku:row.sku?String(row.sku):null,name:String(row.name_ar??row.description),unit:row.unit?String(row.unit):null,
        quantity,receivedQuantity:received,remainingQuantity:Math.max(0,quantity-received),
        unitCost:Number(row.unit_cost??0),totalCost:Number(row.total_cost??0)
      };
    }),
    receipts:receipts.map(row=>({
      id:String(row.id),number:Number(row.receipt_number),status:String(row.status),warehouse:String(row.warehouse_name),
      receivedAt:new Date(String(row.received_at)).toISOString(),accepted:Number(row.accepted??0),rejected:Number(row.rejected??0)
    })),
    warehouses:warehouses.map(row=>({id:String(row.id),code:String(row.code),name:String(row.name_ar)}))
  };
}
