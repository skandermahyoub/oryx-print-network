import { NextResponse } from "next/server";
import { z } from "zod";
import { databaseConfigured, getSql } from "@/lib/db";

const orderSchema=z.object({
  serviceSlug:z.string().min(1).max(120),
  specs:z.record(z.string(),z.string()).default({}),
  finishings:z.array(z.string().max(160)).max(40).default([]),
  design:z.enum(["ready","oryx","idea"]),
  fulfilment:z.enum(["pickup","delivery"]),
  customer:z.object({
    displayName:z.string().min(2).max(160),
    companyName:z.string().max(180).optional().default(""),
    phone:z.string().min(5).max(40),
    email:z.string().email().optional().or(z.literal("")).default(""),
    city:z.string().max(120).optional().default("")
  })
});

export async function POST(request:Request){
  if(!databaseConfigured()){
    return NextResponse.json({error:"Database is not configured for this environment."},{status:503});
  }

  const parsed=orderSchema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success){
    return NextResponse.json({error:"Invalid order data",details:parsed.error.flatten()},{status:400});
  }

  const data=parsed.data;
  const quantityRaw=Number(data.specs.quantity);
  const quantity=Number.isFinite(quantityRaw)&&quantityRaw>0?quantityRaw:1;
  const specifications=JSON.stringify({
    fields:data.specs,
    finishings:data.finishings,
    design:data.design,
    fulfilment:data.fulfilment,
    source:"web-smart-order"
  });

  const sql=getSql();
  const rows=await sql`
    with svc as (
      select id from services where slug=${data.serviceSlug} and is_active=true and is_public=true limit 1
    ),
    new_customer as (
      insert into customers (customer_type,display_name,company_name,phone,email,city,metadata)
      select
        ${data.customer.companyName?"business":"individual"},
        ${data.customer.displayName},
        nullif(${data.customer.companyName},''),
        ${data.customer.phone},
        nullif(${data.customer.email},''),
        nullif(${data.customer.city},''),
        '{"source":"web-smart-order"}'::jsonb
      where exists(select 1 from svc)
      returning id
    ),
    new_order as (
      insert into orders (customer_id,status,currency,notes)
      select id,'submitted','YER','Created from ORYX Smart Order' from new_customer
      returning id,order_number
    ),
    new_item as (
      insert into order_items (order_id,service_id,quantity,specifications)
      select new_order.id,svc.id,${quantity},${specifications}::jsonb
      from new_order cross join svc
      returning id
    )
    select new_order.id as order_id,new_order.order_number
    from new_order
  `;

  const result=rows[0] as {order_id?:string;order_number?:number}|undefined;
  if(!result?.order_id){
    return NextResponse.json({error:"Service not found or unavailable."},{status:404});
  }

  return NextResponse.json({
    ok:true,
    orderId:result.order_id,
    orderNumber:result.order_number,
    status:"submitted"
  },{status:201});
}
