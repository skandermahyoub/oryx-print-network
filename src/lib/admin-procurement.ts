import { databaseConfigured, getSql } from "@/lib/db";

export type ProcurementSnapshot={
  suppliers:Array<{
    id:string;
    name:string;
    status:string;
    phone:string|null;
    city:string|null;
    paymentTerms:string|null;
    currency:string;
  }>;
  requests:Array<{
    id:string;
    number:number;
    status:string;
    neededBy:string|null;
    reason:string|null;
    items:number;
    estimatedTotal:number;
    currency:string;
  }>;
  orders:Array<{
    id:string;
    number:number;
    supplier:string;
    status:string;
    total:number;
    currency:string;
    expectedAt:string|null;
    itemCount:number;
    receivedRatio:number;
  }>;
  receipts:Array<{
    id:string;
    number:number;
    poNumber:number|null;
    supplier:string|null;
    warehouse:string;
    status:string;
    receivedAt:string;
    itemCount:number;
  }>;
  items:Array<{id:string;sku:string;name:string;unit:string}>;
  warehouses:Array<{id:string;code:string;name:string}>;
  totals:{
    suppliers:number;
    openRequests:number;
    openOrders:number;
    draftReceipts:number;
  };
};

const empty:ProcurementSnapshot={
  suppliers:[],requests:[],orders:[],receipts:[],items:[],warehouses:[],
  totals:{suppliers:0,openRequests:0,openOrders:0,draftReceipts:0}
};

export async function getProcurementSnapshot():Promise<ProcurementSnapshot>{
  if(!databaseConfigured()) return empty;
  try{
    const sql=getSql();
    const [suppliers,requests,orders,receipts,items,warehouses,totals]=await Promise.all([
      sql`
        select id,coalesce(trade_name,legal_name) as name,status,phone,city,payment_terms,currency
        from suppliers
        order by case status when 'active' then 0 else 1 end,coalesce(trade_name,legal_name)
        limit 200
      `,
      sql`
        select
          pr.id,pr.request_number,pr.status,pr.needed_by,pr.reason,
          count(pri.id)::integer as item_count,
          coalesce(sum(pri.quantity*coalesce(pri.estimated_unit_cost,0)),0)::numeric(14,2) as estimated_total,
          coalesce(min(pri.currency),'YER') as currency
        from purchase_requests pr
        left join purchase_request_items pri on pri.purchase_request_id=pr.id
        where pr.status not in ('closed','cancelled')
        group by pr.id
        order by
          case pr.status when 'submitted' then 0 when 'approved' then 1 when 'draft' then 2 else 3 end,
          pr.created_at desc
        limit 100
      `,
      sql`
        select
          po.id,po.po_number,coalesce(s.trade_name,s.legal_name) as supplier_name,
          po.status,po.total,po.currency,po.expected_at,
          count(poi.id)::integer as item_count,
          coalesce(
            case when sum(poi.quantity)>0 then sum(poi.received_quantity)/sum(poi.quantity) else 0 end,
            0
          )::numeric as received_ratio
        from purchase_orders po
        join suppliers s on s.id=po.supplier_id
        left join purchase_order_items poi on poi.purchase_order_id=po.id
        where po.status not in ('closed','cancelled')
        group by po.id,s.id
        order by po.created_at desc
        limit 100
      `,
      sql`
        select
          gr.id,gr.receipt_number,gr.status,gr.received_at,
          po.po_number,
          coalesce(s.trade_name,s.legal_name) as supplier_name,
          w.name_ar as warehouse_name,
          count(gri.id)::integer as item_count
        from goods_receipts gr
        left join purchase_orders po on po.id=gr.purchase_order_id
        left join suppliers s on s.id=gr.supplier_id
        join warehouses w on w.id=gr.warehouse_id
        left join goods_receipt_items gri on gri.goods_receipt_id=gr.id
        group by gr.id,po.po_number,s.id,w.id
        order by gr.received_at desc
        limit 100
      `,
      sql`
        select id,sku,name_ar,unit
        from inventory_items
        where is_active=true
        order by name_ar
      `,
      sql`
        select id,code,name_ar
        from warehouses
        where is_active=true
        order by name_ar
      `,
      sql`
        select
          (select count(*)::integer from suppliers where status='active') as suppliers,
          (select count(*)::integer from purchase_requests where status in ('draft','submitted','approved','ordered')) as open_requests,
          (select count(*)::integer from purchase_orders where status in ('draft','approved','sent','partially_received')) as open_orders,
          (select count(*)::integer from goods_receipts where status='draft') as draft_receipts
      `
    ]);

    const t=totals[0];
    return {
      suppliers:suppliers.map(row=>({
        id:String(row.id),name:String(row.name),status:String(row.status),
        phone:row.phone?String(row.phone):null,city:row.city?String(row.city):null,
        paymentTerms:row.payment_terms?String(row.payment_terms):null,currency:String(row.currency??"YER")
      })),
      requests:requests.map(row=>({
        id:String(row.id),number:Number(row.request_number),status:String(row.status),
        neededBy:row.needed_by?String(row.needed_by):null,reason:row.reason?String(row.reason):null,
        items:Number(row.item_count??0),estimatedTotal:Number(row.estimated_total??0),currency:String(row.currency??"YER")
      })),
      orders:orders.map(row=>({
        id:String(row.id),number:Number(row.po_number),supplier:String(row.supplier_name),status:String(row.status),
        total:Number(row.total??0),currency:String(row.currency??"YER"),expectedAt:row.expected_at?String(row.expected_at):null,
        itemCount:Number(row.item_count??0),receivedRatio:Number(row.received_ratio??0)
      })),
      receipts:receipts.map(row=>({
        id:String(row.id),number:Number(row.receipt_number),poNumber:row.po_number===null?null:Number(row.po_number),
        supplier:row.supplier_name?String(row.supplier_name):null,warehouse:String(row.warehouse_name),status:String(row.status),
        receivedAt:new Date(String(row.received_at)).toISOString(),itemCount:Number(row.item_count??0)
      })),
      items:items.map(row=>({id:String(row.id),sku:String(row.sku),name:String(row.name_ar),unit:String(row.unit)})),
      warehouses:warehouses.map(row=>({id:String(row.id),code:String(row.code),name:String(row.name_ar)})),
      totals:{
        suppliers:Number(t?.suppliers??0),openRequests:Number(t?.open_requests??0),
        openOrders:Number(t?.open_orders??0),draftReceipts:Number(t?.draft_receipts??0)
      }
    };
  }catch{
    return empty;
  }
}
