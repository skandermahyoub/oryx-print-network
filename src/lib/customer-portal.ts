import { getSql } from "@/lib/db";

export type CustomerPortalSnapshot={
  orders:Array<{
    id:string;
    number:number;
    status:string;
    total:number;
    currency:string;
    items:number;
    createdAt:string;
  }>;
  quotes:Array<{
    id:string;
    number:number;
    status:string;
    total:number;
    currency:string;
    validUntil:string|null;
    orderId:string|null;
  }>;
  invoices:Array<{
    id:string;
    number:number;
    status:string;
    total:number;
    paid:number;
    currency:string;
    dueDate:string|null;
  }>;
  loyalty:{
    points:number;
    lifetimePoints:number;
    tier:string;
  };
};

export async function getCustomerPortalSnapshot(customerId:string):Promise<CustomerPortalSnapshot>{
  const sql=getSql();
  const [orders,quotes,invoices,loyalty]=await Promise.all([
    sql`
      select
        o.id,o.order_number,o.status,o.total,o.currency,o.created_at,
        count(oi.id)::integer as item_count
      from orders o
      left join order_items oi on oi.order_id=o.id
      where o.customer_id=${customerId}
      group by o.id
      order by o.created_at desc
      limit 50
    `,
    sql`
      select id,quote_number,status,total,currency,valid_until,source_order_id
      from quotes
      where customer_id=${customerId}
        and status in ('sent','accepted','rejected','expired')
      order by created_at desc
      limit 50
    `,
    sql`
      select id,invoice_number,status,total,amount_paid,currency,due_date
      from invoices
      where customer_id=${customerId}
      order by created_at desc
      limit 50
    `,
    sql`
      select points_balance,lifetime_points,tier_key
      from loyalty_accounts
      where customer_id=${customerId}
      limit 1
    `
  ]);

  const points=loyalty[0];
  return {
    orders:orders.map(row=>({
      id:String(row.id),
      number:Number(row.order_number),
      status:String(row.status),
      total:Number(row.total??0),
      currency:String(row.currency??"YER"),
      items:Number(row.item_count??0),
      createdAt:new Date(String(row.created_at)).toISOString()
    })),
    quotes:quotes.map(row=>({
      id:String(row.id),
      number:Number(row.quote_number),
      status:String(row.status),
      total:Number(row.total??0),
      currency:String(row.currency??"YER"),
      validUntil:row.valid_until?String(row.valid_until):null,
      orderId:row.source_order_id?String(row.source_order_id):null
    })),
    invoices:invoices.map(row=>({
      id:String(row.id),
      number:Number(row.invoice_number),
      status:String(row.status),
      total:Number(row.total??0),
      paid:Number(row.amount_paid??0),
      currency:String(row.currency??"YER"),
      dueDate:row.due_date?String(row.due_date):null
    })),
    loyalty:{
      points:Number(points?.points_balance??0),
      lifetimePoints:Number(points?.lifetime_points??0),
      tier:String(points?.tier_key??"member")
    }
  };
}
