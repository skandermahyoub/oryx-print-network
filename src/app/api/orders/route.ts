import { NextResponse } from "next/server";
import { z } from "zod";
import { databaseConfigured, getSql } from "@/lib/db";
import { findOrCreateCustomer } from "@/lib/customer-identity";
import { consumePublicRateLimit, publicClientKey } from "@/lib/public-rate-limit";

const customerSchema=z.object({
  displayName:z.string().min(2).max(160),
  companyName:z.string().max(180).optional().default(""),
  phone:z.string().min(5).max(40),
  email:z.string().email().optional().or(z.literal("")).default(""),
  city:z.string().max(120).optional().default("")
});

const itemSchema=z.object({
  serviceSlug:z.string().min(1).max(120),
  specs:z.record(z.string(),z.string()).default({}),
  finishings:z.array(z.string().max(160)).max(40).default([]),
  design:z.enum(["ready","oryx","idea"]).default("ready")
});

const orderSchema=z.object({
  items:z.array(itemSchema).min(1).max(50).optional(),
  serviceSlug:z.string().min(1).max(120).optional(),
  specs:z.record(z.string(),z.string()).default({}),
  finishings:z.array(z.string().max(160)).max(40).default([]),
  design:z.enum(["ready","oryx","idea"]).default("ready"),
  fulfilment:z.enum(["pickup","delivery"]),
  customer:customerSchema,
  website:z.string().max(200).optional().default("")
}).refine(data=>Boolean(data.items?.length||data.serviceSlug),{
  message:"At least one order item is required."
});

function quantityFromSpecs(specs:Record<string,string>){
  const raw=Number(specs.quantity||specs.copies||specs.sets||"1");
  return Number.isFinite(raw)&&raw>0?raw:1;
}

export async function POST(request:Request){
  if(!databaseConfigured()){
    return NextResponse.json({error:"Database is not configured for this environment."},{status:503});
  }

  const parsed=orderSchema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success){
    return NextResponse.json({error:"Invalid order data",details:parsed.error.flatten()},{status:400});
  }

  const data=parsed.data;
  if(data.website){
    return NextResponse.json({ok:true},{status:201});
  }

  const rate=await consumePublicRateLimit({
    endpoint:"orders:create",
    keyHash:publicClientKey(request),
    limit:8,
    windowSeconds:600
  });
  if(!rate.allowed){
    return NextResponse.json(
      {error:"Too many order requests. Try again shortly."},
      {status:429,headers:{"Retry-After":String(rate.retryAfterSeconds)}}
    );
  }

  const normalizedItems=(data.items?.length?data.items:[{
    serviceSlug:data.serviceSlug as string,
    specs:data.specs,
    finishings:data.finishings,
    design:data.design
  }]).map(item=>({
    service_slug:item.serviceSlug,
    quantity:quantityFromSpecs(item.specs),
    specifications:{
      fields:item.specs,
      finishings:item.finishings,
      design:item.design,
      fulfilment:data.fulfilment,
      source:"web-smart-order"
    }
  }));

  const itemsJson=JSON.stringify(normalizedItems);
  const sql=getSql();

  const validity=await sql`
    with input_items as (
      select *
      from jsonb_to_recordset(${itemsJson}::jsonb)
        as x(service_slug text)
    )
    select
      count(*)::integer as requested_count,
      count(s.id)::integer as resolved_count
    from input_items
    left join services s
      on s.slug=input_items.service_slug
     and s.is_active=true
     and s.is_public=true
  `;

  if(Number(validity[0]?.requested_count??0)<1||
     Number(validity[0]?.requested_count)!==Number(validity[0]?.resolved_count)){
    return NextResponse.json({error:"One or more services are unavailable."},{status:404});
  }

  const customer=await findOrCreateCustomer({
    displayName:data.customer.displayName,
    companyName:data.customer.companyName,
    phone:data.customer.phone,
    email:data.customer.email,
    city:data.customer.city,
    source:"web-smart-order"
  });

  const rows=await sql`
    with input_items as (
      select *
      from jsonb_to_recordset(${itemsJson}::jsonb)
        as x(service_slug text,quantity numeric,specifications jsonb)
    ),
    resolved_items as (
      select x.service_slug,x.quantity,x.specifications,s.id as service_id
      from input_items x
      join services s on s.slug=x.service_slug
      where s.is_active=true and s.is_public=true
    ),
    new_order as (
      insert into orders (customer_id,status,currency,notes)
      values (${customer.customerId},'submitted','YER','Created from ORYX Smart Order')
      returning id,order_number
    ),
    new_items as (
      insert into order_items (order_id,service_id,quantity,specifications)
      select new_order.id,resolved_items.service_id,resolved_items.quantity,resolved_items.specifications
      from new_order cross join resolved_items
      returning id
    ),
    audit as (
      insert into audit_events (entity_type,entity_id,action,after_data)
      select
        'order',new_order.id,'public_order_created',
        jsonb_build_object('source','web-smart-order','item_count',(select count(*) from new_items),'customer_id',${customer.customerId})
      from new_order
      returning id
    )
    select
      new_order.id as order_id,
      new_order.order_number,
      (select count(*)::integer from new_items) as item_count
    from new_order
  `;

  const result=rows[0] as {order_id?:string;order_number?:number;item_count?:number}|undefined;
  if(!result?.order_id){
    return NextResponse.json({error:"One or more services are unavailable."},{status:404});
  }

  return NextResponse.json({
    ok:true,
    orderId:result.order_id,
    orderNumber:result.order_number,
    itemCount:result.item_count??normalizedItems.length,
    status:"submitted"
  },{status:201});
}
