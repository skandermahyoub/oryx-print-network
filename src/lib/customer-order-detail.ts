import { getSql } from "@/lib/db";

export type CustomerOrderDetail={
  order:{
    id:string;
    number:number;
    status:string;
    total:number;
    currency:string;
    createdAt:string;
    notes:string|null;
  };
  items:Array<{
    id:string;
    service:string;
    serviceSlug:string;
    quantity:number;
    unitPrice:number|null;
    totalPrice:number|null;
    specifications:Record<string,unknown>;
    designStatus:string|null;
    productionStatus:string|null;
    productionStep:string|null;
  }>;
  timeline:Array<{
    from:string|null;
    to:string;
    reason:string|null;
    createdAt:string;
  }>;
  delivery:Array<{
    id:string;
    type:string;
    status:string;
    scheduledAt:string|null;
    deliveredAt:string|null;
  }>;
  installation:Array<{
    id:string;
    status:string;
    scheduledAt:string|null;
    completedAt:string|null;
  }>;
  quotes:Array<{id:string;number:number;status:string;total:number;currency:string}>;
  invoices:Array<{id:string;number:number;status:string;total:number;paid:number;currency:string}>;
};

export async function getCustomerOrderDetail(customerId:string,orderId:string):Promise<CustomerOrderDetail|null>{
  const sql=getSql();
  const rows=await sql`
    select id,order_number,status,total,currency,created_at,notes
    from orders
    where id=${orderId} and customer_id=${customerId}
    limit 1
  `;
  const order=rows[0];
  if(!order) return null;

  const [items,timeline,delivery,installation,quotes,invoices]=await Promise.all([
    sql`
      select
        oi.id,oi.quantity,oi.unit_price,oi.total_price,oi.specifications,
        s.name_ar as service_name,s.slug as service_slug,
        dj.status as design_status,
        wo.status as production_status,
        ws.name_ar as production_step
      from order_items oi
      join services s on s.id=oi.service_id
      left join lateral (
        select status
        from design_jobs
        where order_item_id=oi.id
        order by created_at desc
        limit 1
      ) dj on true
      left join lateral (
        select status,current_step_key,workflow_id
        from work_orders
        where order_item_id=oi.id
        order by created_at desc
        limit 1
      ) wo on true
      left join workflow_steps ws on ws.workflow_id=wo.workflow_id and ws.step_key=wo.current_step_key
      where oi.order_id=${orderId}
      order by oi.id
    `,
    sql`
      select from_status,to_status,reason,created_at
      from order_status_events
      where order_id=${orderId}
      order by created_at asc
    `,
    sql`
      select id,delivery_type,status,scheduled_at,delivered_at
      from delivery_jobs
      where order_id=${orderId}
      order by created_at desc
    `,
    sql`
      select id,status,scheduled_at,completed_at
      from installation_jobs
      where order_id=${orderId}
      order by created_at desc
    `,
    sql`
      select id,quote_number,status,total,currency
      from quotes
      where source_order_id=${orderId} and customer_id=${customerId}
      order by created_at desc
    `,
    sql`
      select id,invoice_number,status,total,amount_paid,currency
      from invoices
      where order_id=${orderId} and customer_id=${customerId}
      order by created_at desc
    `
  ]);

  return {
    order:{
      id:String(order.id),
      number:Number(order.order_number),
      status:String(order.status),
      total:Number(order.total??0),
      currency:String(order.currency??"YER"),
      createdAt:new Date(String(order.created_at)).toISOString(),
      notes:order.notes?String(order.notes):null
    },
    items:items.map(row=>({
      id:String(row.id),
      service:String(row.service_name),
      serviceSlug:String(row.service_slug),
      quantity:Number(row.quantity??0),
      unitPrice:row.unit_price===null?null:Number(row.unit_price),
      totalPrice:row.total_price===null?null:Number(row.total_price),
      specifications:row.specifications&&typeof row.specifications==="object"&&!Array.isArray(row.specifications)
        ? row.specifications as Record<string,unknown>
        : {},
      designStatus:row.design_status?String(row.design_status):null,
      productionStatus:row.production_status?String(row.production_status):null,
      productionStep:row.production_step?String(row.production_step):null
    })),
    timeline:timeline.map(row=>({
      from:row.from_status?String(row.from_status):null,
      to:String(row.to_status),
      reason:row.reason?String(row.reason):null,
      createdAt:new Date(String(row.created_at)).toISOString()
    })),
    delivery:delivery.map(row=>({
      id:String(row.id),type:String(row.delivery_type),status:String(row.status),
      scheduledAt:row.scheduled_at?new Date(String(row.scheduled_at)).toISOString():null,
      deliveredAt:row.delivered_at?new Date(String(row.delivered_at)).toISOString():null
    })),
    installation:installation.map(row=>({
      id:String(row.id),status:String(row.status),
      scheduledAt:row.scheduled_at?new Date(String(row.scheduled_at)).toISOString():null,
      completedAt:row.completed_at?new Date(String(row.completed_at)).toISOString():null
    })),
    quotes:quotes.map(row=>({
      id:String(row.id),number:Number(row.quote_number),status:String(row.status),
      total:Number(row.total??0),currency:String(row.currency??"YER")
    })),
    invoices:invoices.map(row=>({
      id:String(row.id),number:Number(row.invoice_number),status:String(row.status),
      total:Number(row.total??0),paid:Number(row.amount_paid??0),currency:String(row.currency??"YER")
    }))
  };
}
