import { databaseConfigured, getSql } from "@/lib/db";

export type QuoteDocument={
  quote:{id:string;number:number;status:string;currency:string;subtotal:number;discount:number;total:number;validUntil:string|null;notes:string|null;createdAt:string;orderNumber:number|null};
  customer:{name:string;company:string|null;phone:string|null;email:string|null;city:string|null};
  items:Array<{id:string;service:string;quantity:number;unitPrice:number|null;totalPrice:number|null;specifications:Record<string,unknown>}>;
};

export type InvoiceDocument={
  invoice:{id:string;number:number;status:string;currency:string;subtotal:number;tax:number;discount:number;total:number;paid:number;dueDate:string|null;issuedAt:string|null;createdAt:string;orderNumber:number|null};
  customer:{name:string;company:string|null;phone:string|null;email:string|null;city:string|null};
  items:Array<{id:string;service:string;quantity:number;unitPrice:number|null;totalPrice:number|null}>;
  payments:Array<{id:string;amount:number;method:string|null;reference:string|null;paidAt:string}>;
};

export async function getQuoteDocument(id:string):Promise<QuoteDocument|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();
  const rows=await sql`
    select
      q.id,q.quote_number,q.status,q.currency,q.subtotal,q.discount,q.total,q.valid_until,q.notes,q.created_at,
      o.order_number,
      coalesce(c.display_name,c.company_name,'—') as customer_name,
      c.company_name,c.phone,c.email,c.city
    from quotes q
    left join orders o on o.id=q.source_order_id
    left join customers c on c.id=q.customer_id
    where q.id=${id}
    limit 1
  `;
  const q=rows[0];
  if(!q) return null;

  const items=await sql`
    select qi.id,qi.quantity,qi.unit_price,qi.total_price,qi.specifications,s.name_ar as service_name
    from quote_items qi
    join services s on s.id=qi.service_id
    where qi.quote_id=${id}
    order by qi.id
  `;

  return {
    quote:{
      id:String(q.id),number:Number(q.quote_number),status:String(q.status),currency:String(q.currency??"YER"),
      subtotal:Number(q.subtotal??0),discount:Number(q.discount??0),total:Number(q.total??0),
      validUntil:q.valid_until?String(q.valid_until):null,notes:q.notes?String(q.notes):null,
      createdAt:new Date(String(q.created_at)).toISOString(),orderNumber:q.order_number===null?null:Number(q.order_number)
    },
    customer:{
      name:String(q.customer_name),company:q.company_name?String(q.company_name):null,
      phone:q.phone?String(q.phone):null,email:q.email?String(q.email):null,city:q.city?String(q.city):null
    },
    items:items.map(row=>({
      id:String(row.id),service:String(row.service_name),quantity:Number(row.quantity??0),
      unitPrice:row.unit_price===null?null:Number(row.unit_price),totalPrice:row.total_price===null?null:Number(row.total_price),
      specifications:row.specifications&&typeof row.specifications==="object"&&!Array.isArray(row.specifications)
        ? row.specifications as Record<string,unknown>
        : {}
    }))
  };
}

export async function getInvoiceDocument(id:string):Promise<InvoiceDocument|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();
  const rows=await sql`
    select
      i.id,i.invoice_number,i.status,i.currency,i.subtotal,i.tax,i.discount,i.total,i.amount_paid,
      i.due_date,i.issued_at,i.created_at,o.order_number,
      coalesce(c.display_name,c.company_name,'—') as customer_name,
      c.company_name,c.phone,c.email,c.city
    from invoices i
    left join orders o on o.id=i.order_id
    left join customers c on c.id=i.customer_id
    where i.id=${id}
    limit 1
  `;
  const inv=rows[0];
  if(!inv) return null;

  const [items,payments]=await Promise.all([
    sql`
      select oi.id,oi.quantity,oi.unit_price,oi.total_price,s.name_ar as service_name
      from order_items oi
      join invoices i on i.order_id=oi.order_id
      join services s on s.id=oi.service_id
      where i.id=${id}
      order by oi.id
    `,
    sql`
      select id,amount,method,reference,paid_at
      from payments
      where invoice_id=${id} and status='received'
      order by paid_at
    `
  ]);

  return {
    invoice:{
      id:String(inv.id),number:Number(inv.invoice_number),status:String(inv.status),currency:String(inv.currency??"YER"),
      subtotal:Number(inv.subtotal??0),tax:Number(inv.tax??0),discount:Number(inv.discount??0),
      total:Number(inv.total??0),paid:Number(inv.amount_paid??0),dueDate:inv.due_date?String(inv.due_date):null,
      issuedAt:inv.issued_at?new Date(String(inv.issued_at)).toISOString():null,
      createdAt:new Date(String(inv.created_at)).toISOString(),orderNumber:inv.order_number===null?null:Number(inv.order_number)
    },
    customer:{
      name:String(inv.customer_name),company:inv.company_name?String(inv.company_name):null,
      phone:inv.phone?String(inv.phone):null,email:inv.email?String(inv.email):null,city:inv.city?String(inv.city):null
    },
    items:items.map(row=>({
      id:String(row.id),service:String(row.service_name),quantity:Number(row.quantity??0),
      unitPrice:row.unit_price===null?null:Number(row.unit_price),totalPrice:row.total_price===null?null:Number(row.total_price)
    })),
    payments:payments.map(row=>({
      id:String(row.id),amount:Number(row.amount??0),method:row.method?String(row.method):null,
      reference:row.reference?String(row.reference):null,paidAt:new Date(String(row.paid_at)).toISOString()
    }))
  };
}
