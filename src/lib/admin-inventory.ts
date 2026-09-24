import { databaseConfigured, getSql } from "@/lib/db";

export type InventorySnapshot={
  items:Array<{
    id:string;
    sku:string;
    name:string;
    unit:string;
    stock:number;
    reserved:number;
    available:number;
    minStock:number;
    averageCost:number|null;
    currency:string;
  }>;
  warehouses:Array<{id:string;code:string;name:string;city:string|null}>;
  purchases:Array<{
    id:string;
    number:number;
    supplier:string;
    status:string;
    total:number;
    currency:string;
    expectedAt:string|null;
  }>;
  totals:{items:number;lowStock:number;openPurchaseRequests:number;openPurchaseOrders:number};
};

const empty:InventorySnapshot={items:[],warehouses:[],purchases:[],totals:{items:0,lowStock:0,openPurchaseRequests:0,openPurchaseOrders:0}};

export async function getInventorySnapshot():Promise<InventorySnapshot>{
  if(!databaseConfigured()) return empty;
  try{
    const sql=getSql();
    const [items,warehouses,purchases,totals]=await Promise.all([
      sql`
        with on_hand as (
          select
            ii.id,
            coalesce(sum(case
              when sm.movement_type in ('opening','receipt','adjust_in','transfer_in','return') then sm.quantity
              when sm.movement_type in ('consume','waste','adjust_out','transfer_out') then -sm.quantity
              else 0 end),0)::numeric(14,3) as stock
          from inventory_items ii
          left join stock_movements sm on sm.inventory_item_id=ii.id
          where ii.is_active=true
          group by ii.id
        ),
        reservations as (
          select
            inventory_item_id,
            coalesce(sum(quantity-consumed_quantity),0)::numeric(14,3) as reserved
          from material_reservations
          where status in ('reserved','partially_consumed')
          group by inventory_item_id
        )
        select
          ii.id,ii.sku,ii.name_ar,ii.unit,ii.min_stock,ii.average_cost,ii.currency,
          on_hand.stock,
          coalesce(reservations.reserved,0)::numeric(14,3) as reserved,
          greatest(0,on_hand.stock-coalesce(reservations.reserved,0))::numeric(14,3) as available
        from inventory_items ii
        join on_hand on on_hand.id=ii.id
        left join reservations on reservations.inventory_item_id=ii.id
        where ii.is_active=true
        order by ii.name_ar
        limit 200
      `,
      sql`
        select id,code,name_ar,city
        from warehouses
        where is_active=true
        order by name_ar
      `,
      sql`
        select po.id,po.po_number,coalesce(s.trade_name,s.legal_name) as supplier_name,po.status,po.total,po.currency,po.expected_at
        from purchase_orders po
        join suppliers s on s.id=po.supplier_id
        where po.status not in ('closed','cancelled')
        order by po.expected_at nulls last,po.created_at desc
        limit 50
      `,
      sql`
        with balances as (
          select
            ii.id,ii.min_stock,
            coalesce(sum(case
              when sm.movement_type in ('opening','receipt','adjust_in','transfer_in','return') then sm.quantity
              when sm.movement_type in ('consume','waste','adjust_out','transfer_out') then -sm.quantity
              else 0 end),0) as stock
          from inventory_items ii
          left join stock_movements sm on sm.inventory_item_id=ii.id
          where ii.is_active=true
          group by ii.id
        )
        select
          (select count(*)::integer from inventory_items where is_active=true) as items,
          (select count(*)::integer from balances where stock<=min_stock) as low_stock,
          (select count(*)::integer from purchase_requests where status in ('draft','submitted','approved')) as open_purchase_requests,
          (select count(*)::integer from purchase_orders where status in ('draft','approved','sent','partially_received')) as open_purchase_orders
      `
    ]);
    const t=totals[0];
    return {
      items:items.map(row=>({
        id:String(row.id),
        sku:String(row.sku),
        name:String(row.name_ar),
        unit:String(row.unit),
        stock:Number(row.stock??0),
        reserved:Number(row.reserved??0),
        available:Number(row.available??0),
        minStock:Number(row.min_stock??0),
        averageCost:row.average_cost===null?null:Number(row.average_cost),
        currency:String(row.currency??"YER")
      })),
      warehouses:warehouses.map(row=>({
        id:String(row.id),
        code:String(row.code),
        name:String(row.name_ar),
        city:row.city?String(row.city):null
      })),
      purchases:purchases.map(row=>({
        id:String(row.id),
        number:Number(row.po_number),
        supplier:String(row.supplier_name),
        status:String(row.status),
        total:Number(row.total??0),
        currency:String(row.currency??"YER"),
        expectedAt:row.expected_at?String(row.expected_at):null
      })),
      totals:{
        items:Number(t?.items??0),
        lowStock:Number(t?.low_stock??0),
        openPurchaseRequests:Number(t?.open_purchase_requests??0),
        openPurchaseOrders:Number(t?.open_purchase_orders??0)
      }
    };
  }catch{
    return empty;
  }
}
