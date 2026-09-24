import { databaseConfigured, getSql } from "@/lib/db";
import { nextOrderStatuses, orderStatusLabels, type OrderStatus } from "@/lib/order-state-machine";

export type AdminOrderDetail={
  order:{
    id:string;
    number:number;
    status:string;
    statusLabel:string;
    currency:string;
    subtotal:number;
    discount:number;
    total:number;
    notes:string|null;
    createdAt:string;
  };
  customer:{
    id:string|null;
    name:string;
    company:string|null;
    phone:string|null;
    email:string|null;
    city:string|null;
  };
  items:Array<{
    id:string;
    serviceSlug:string;
    service:string;
    quantity:number;
    specifications:Record<string,unknown>;
    unitPrice:number|null;
    totalPrice:number|null;
    partner:string|null;
    requiresDesignApproval:boolean;
    designJobId:string|null;
    designStatus:string|null;
    designApproved:boolean;
    workOrderNumber:number|null;
    workOrderStatus:string|null;
    sourcingRequestId:string|null;
    sourcingStatus:string|null;
  }>;
  quotes:Array<{
    id:string;
    number:number;
    status:string;
    subtotal:number;
    discount:number;
    total:number;
    currency:string;
    validUntil:string|null;
    createdAt:string;
  }>;
  invoices:Array<{
    id:string;
    number:number;
    status:string;
    total:number;
    paid:number;
    currency:string;
    dueDate:string|null;
    issuedAt:string|null;
  }>;
  timeline:Array<{
    from:string|null;
    to:string;
    label:string;
    reason:string|null;
    createdAt:string;
  }>;
  nextStatuses:Array<{key:string;label:string}>;
};

export async function getAdminOrderDetail(orderId:string):Promise<AdminOrderDetail|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();

  const rows=await sql`
    select
      o.id,o.order_number,o.status,o.currency,o.subtotal,o.discount,o.total,o.notes,o.created_at,
      c.id as customer_id,
      coalesce(c.display_name,'—') as customer_name,
      c.company_name,c.phone,c.email,c.city
    from orders o
    left join customers c on c.id=o.customer_id
    where o.id=${orderId}
    limit 1
  `;
  const order=rows[0];
  if(!order) return null;

  const [items,quotes,invoices,events]=await Promise.all([
    sql`
      select
        oi.id,
        oi.quantity,
        oi.specifications,
        oi.unit_price,
        oi.total_price,
        s.slug as service_slug,
        s.name_ar as service_name,
        s.requires_design_approval,
        coalesce(p.trade_name,p.legal_name) as partner_name,
        dj.id as design_job_id,
        dj.status as design_status,
        exists(
          select 1
          from design_versions dv
          join design_approvals da on da.design_version_id=dv.id
          where dv.design_job_id=dj.id and da.decision='approved'
        ) as design_approved,
        wo.work_order_number,
        wo.status as work_order_status,
        sr.id as sourcing_request_id,
        sr.status as sourcing_status
      from order_items oi
      join services s on s.id=oi.service_id
      left join partners p on p.id=oi.assigned_partner_id
      left join lateral (
        select id,status
        from design_jobs
        where order_item_id=oi.id
        order by created_at desc
        limit 1
      ) dj on true
      left join lateral (
        select work_order_number,status
        from work_orders
        where order_item_id=oi.id
          and status not in ('cancelled')
        order by created_at desc
        limit 1
      ) wo on true
      left join lateral (
        select id,status
        from sourcing_requests
        where order_item_id=oi.id
        order by created_at desc
        limit 1
      ) sr on true
      where oi.order_id=${orderId}
      order by oi.created_at,oi.id
    `,
    sql`
      select id,quote_number,status,subtotal,discount,total,currency,valid_until,created_at
      from quotes
      where source_order_id=${orderId}
      order by created_at desc
    `,
    sql`
      select id,invoice_number,status,total,amount_paid,currency,due_date,issued_at
      from invoices
      where order_id=${orderId}
      order by created_at desc
    `,
    sql`
      select from_status,to_status,reason,created_at
      from order_status_events
      where order_id=${orderId}
      order by created_at asc
    `
  ]);

  const status=String(order.status);
  const next=isOrderStatus(status)?nextOrderStatuses(status):[];

  return {
    order:{
      id:String(order.id),
      number:Number(order.order_number),
      status,
      statusLabel:orderStatusLabels[status as OrderStatus]??status,
      currency:String(order.currency??"YER"),
      subtotal:Number(order.subtotal??0),
      discount:Number(order.discount??0),
      total:Number(order.total??0),
      notes:order.notes?String(order.notes):null,
      createdAt:new Date(String(order.created_at)).toISOString()
    },
    customer:{
      id:order.customer_id?String(order.customer_id):null,
      name:String(order.customer_name),
      company:order.company_name?String(order.company_name):null,
      phone:order.phone?String(order.phone):null,
      email:order.email?String(order.email):null,
      city:order.city?String(order.city):null
    },
    items:items.map(row=>({
      id:String(row.id),
      serviceSlug:String(row.service_slug),
      service:String(row.service_name),
      quantity:Number(row.quantity??1),
      specifications:(row.specifications&&typeof row.specifications==="object"&&!Array.isArray(row.specifications))
        ? row.specifications as Record<string,unknown>
        : {},
      unitPrice:row.unit_price===null?null:Number(row.unit_price),
      totalPrice:row.total_price===null?null:Number(row.total_price),
      partner:row.partner_name?String(row.partner_name):null,
      requiresDesignApproval:Boolean(row.requires_design_approval),
      designJobId:row.design_job_id?String(row.design_job_id):null,
      designStatus:row.design_status?String(row.design_status):null,
      designApproved:Boolean(row.design_approved),
      workOrderNumber:row.work_order_number===null?null:Number(row.work_order_number),
      workOrderStatus:row.work_order_status?String(row.work_order_status):null,
      sourcingRequestId:row.sourcing_request_id?String(row.sourcing_request_id):null,
      sourcingStatus:row.sourcing_status?String(row.sourcing_status):null
    })),
    quotes:quotes.map(row=>({
      id:String(row.id),
      number:Number(row.quote_number),
      status:String(row.status),
      subtotal:Number(row.subtotal??0),
      discount:Number(row.discount??0),
      total:Number(row.total??0),
      currency:String(row.currency??"YER"),
      validUntil:row.valid_until?String(row.valid_until):null,
      createdAt:new Date(String(row.created_at)).toISOString()
    })),
    invoices:invoices.map(row=>({
      id:String(row.id),
      number:Number(row.invoice_number),
      status:String(row.status),
      total:Number(row.total??0),
      paid:Number(row.amount_paid??0),
      currency:String(row.currency??"YER"),
      dueDate:row.due_date?String(row.due_date):null,
      issuedAt:row.issued_at?new Date(String(row.issued_at)).toISOString():null
    })),
    timeline:events.map(row=>{
      const to=String(row.to_status);
      return {
        from:row.from_status?String(row.from_status):null,
        to,
        label:orderStatusLabels[to as OrderStatus]??to,
        reason:row.reason?String(row.reason):null,
        createdAt:new Date(String(row.created_at)).toISOString()
      };
    }),
    nextStatuses:next.map(key=>({key,label:orderStatusLabels[key]}))
  };
}

function isOrderStatus(value:string):value is OrderStatus{
  return Object.prototype.hasOwnProperty.call(orderStatusLabels,value);
}
