import { NextResponse } from "next/server";
import { z } from "zod";
import { databaseConfigured, getSql } from "@/lib/db";

const schema=z.object({
  packageSlug:z.string().min(1).max(120),
  selectedItems:z.array(z.string().min(1).max(220)).min(1).max(50),
  notes:z.string().max(4000).optional().default(""),
  website:z.string().max(200).optional().default(""),
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
    return NextResponse.json({error:"Package requests are not configured in this environment."},{status:503});
  }

  const parsed=schema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success){
    return NextResponse.json({error:"تحقق من بيانات الطلب والعناصر المختارة."},{status:400});
  }

  const data=parsed.data;
  if(data.website) return NextResponse.json({ok:true},{status:201});

  const selectedJson=JSON.stringify(data.selectedItems.map(itemName=>({item_name:itemName})));
  const sql=getSql();

  const rows=await sql`
    with pkg as (
      select id,name_ar
      from packages
      where slug=${data.packageSlug} and is_active=true
      limit 1
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
        '{"source":"package-configurator"}'::jsonb
      where exists(select 1 from pkg)
      returning id
    ),
    new_request as (
      insert into package_requests (package_id,customer_id,status,notes,preferred_contact,metadata)
      select
        pkg.id,
        new_customer.id,
        'submitted',
        nullif(${data.notes},''),
        'phone',
        '{"source":"web-package-configurator"}'::jsonb
      from pkg cross join new_customer
      returning id,request_number,package_id,customer_id
    ),
    input_items as (
      select *
      from jsonb_to_recordset(${selectedJson}::jsonb)
        as x(item_name text)
    ),
    new_items as (
      insert into package_request_items (package_request_id,package_item_id,item_name,quantity)
      select
        new_request.id,
        pi.id,
        input_items.item_name,
        1
      from new_request
      cross join input_items
      left join package_items pi
        on pi.package_id=new_request.package_id
       and pi.item_name=input_items.item_name
      returning id
    ),
    new_lead as (
      insert into leads (full_name,company_name,phone,email,source,status,notes,metadata)
      select
        ${data.customer.displayName},
        nullif(${data.customer.companyName},''),
        ${data.customer.phone},
        nullif(${data.customer.email},''),
        'package_landing',
        'new',
        nullif(${data.notes},''),
        jsonb_build_object('package_request_id',new_request.id)
      from new_request
      returning id
    ),
    new_opportunity as (
      insert into opportunities (lead_id,customer_id,name,stage,currency)
      select
        new_lead.id,
        new_request.customer_id,
        concat('باقة: ',pkg.name_ar),
        'new',
        'YER'
      from new_lead cross join new_request cross join pkg
      returning id
    )
    select
      new_request.id,
      new_request.request_number,
      (select count(*)::integer from new_items) as item_count
    from new_request
  `;

  const result=rows[0] as {id?:string;request_number?:number;item_count?:number}|undefined;
  if(!result?.id){
    return NextResponse.json({error:"الباقة غير متاحة حاليًا."},{status:404});
  }

  return NextResponse.json({
    ok:true,
    requestId:result.id,
    requestNumber:result.request_number,
    itemCount:result.item_count??data.selectedItems.length
  },{status:201});
}
