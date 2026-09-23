import { databaseConfigured, getSql } from "@/lib/db";

export type PurchaseRequestDetail={
  request:{
    id:string;
    number:number;
    status:string;
    neededBy:string|null;
    reason:string|null;
    createdAt:string;
    requestedBy:string|null;
    approvedBy:string|null;
  };
  items:Array<{
    id:string;
    inventoryItemId:string|null;
    sku:string|null;
    name:string;
    unit:string|null;
    quantity:number;
    estimatedUnitCost:number|null;
    currency:string;
    notes:string|null;
  }>;
  inventoryItems:Array<{id:string;sku:string;name:string;unit:string}>;
  suppliers:Array<{id:string;name:string;city:string|null;currency:string}>;
  linkedOrders:Array<{id:string;number:number;status:string;supplier:string;total:number;currency:string}>;
};

export async function getPurchaseRequestDetail(id:string):Promise<PurchaseRequestDetail|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();
  const requests=await sql`
    select
      pr.id,pr.request_number,pr.status,pr.needed_by,pr.reason,pr.created_at,
      requester.display_name as requested_by_name,
      approver.display_name as approved_by_name
    from purchase_requests pr
    left join app_users requester on requester.id=pr.requested_by
    left join app_users approver on approver.id=pr.approved_by
    where pr.id=${id}
    limit 1
  `;
  const request=requests[0];
  if(!request) return null;

  const [items,inventoryItems,suppliers,orders]=await Promise.all([
    sql`
      select
        pri.id,pri.inventory_item_id,pri.description,pri.quantity,pri.estimated_unit_cost,pri.currency,pri.notes,
        ii.sku,ii.name_ar,ii.unit
      from purchase_request_items pri
      left join inventory_items ii on ii.id=pri.inventory_item_id
      where pri.purchase_request_id=${id}
      order by pri.id
    `,
    sql`
      select id,sku,name_ar,unit
      from inventory_items
      where is_active=true
      order by name_ar
    `,
    sql`
      select id,coalesce(trade_name,legal_name) as name,city,currency
      from suppliers
      where status='active'
      order by coalesce(trade_name,legal_name)
    `,
    sql`
      select
        po.id,po.po_number,po.status,po.total,po.currency,
        coalesce(s.trade_name,s.legal_name) as supplier_name
      from purchase_orders po
      join suppliers s on s.id=po.supplier_id
      where po.purchase_request_id=${id}
      order by po.created_at desc
    `
  ]);

  return {
    request:{
      id:String(request.id),number:Number(request.request_number),status:String(request.status),
      neededBy:request.needed_by?String(request.needed_by):null,reason:request.reason?String(request.reason):null,
      createdAt:new Date(String(request.created_at)).toISOString(),
      requestedBy:request.requested_by_name?String(request.requested_by_name):null,
      approvedBy:request.approved_by_name?String(request.approved_by_name):null
    },
    items:items.map(row=>({
      id:String(row.id),inventoryItemId:row.inventory_item_id?String(row.inventory_item_id):null,
      sku:row.sku?String(row.sku):null,name:String(row.name_ar??row.description??"Purchase item"),
      unit:row.unit?String(row.unit):null,quantity:Number(row.quantity??0),
      estimatedUnitCost:row.estimated_unit_cost===null?null:Number(row.estimated_unit_cost),
      currency:String(row.currency??"YER"),notes:row.notes?String(row.notes):null
    })),
    inventoryItems:inventoryItems.map(row=>({id:String(row.id),sku:String(row.sku),name:String(row.name_ar),unit:String(row.unit)})),
    suppliers:suppliers.map(row=>({id:String(row.id),name:String(row.name),city:row.city?String(row.city):null,currency:String(row.currency??"YER")})),
    linkedOrders:orders.map(row=>({id:String(row.id),number:Number(row.po_number),status:String(row.status),supplier:String(row.supplier_name),total:Number(row.total??0),currency:String(row.currency??"YER")}))
  };
}
