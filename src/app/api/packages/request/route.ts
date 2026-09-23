import { NextResponse } from "next/server";
import { z } from "zod";
import { databaseConfigured, getSql } from "@/lib/db";
import { findOrCreateCustomer } from "@/lib/customer-identity";
import { consumePublicRateLimit, publicClientKey } from "@/lib/public-rate-limit";

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

  const rate=await consumePublicRateLimit({
    endpoint:"packages:request",
    keyHash:publicClientKey(request),
    limit:6,
    windowSeconds:1800
  });
  if(!rate.allowed){
    return NextResponse.json(
      {error:"طلبات كثيرة خلال فترة قصيرة. حاول لاحقًا."},
      {status:429,headers:{"Retry-After":String(rate.retryAfterSeconds)}}
    );
  }

  if(data.website) return NextResponse.json({ok:true},{status:201});

  const sql=getSql();
  const packageRows=await sql`
    select id,name_ar
    from packages
    where slug=${data.packageSlug} and is_active=true
    limit 1
  `;
  const selectedPackage=packageRows[0];
  if(!selectedPackage){
    return NextResponse.json({error:"الباقة غير متاحة حاليًا."},{status:404});
  }

  const customer=await findOrCreateCustomer({
    displayName:data.customer.displayName,
    companyName:data.customer.companyName,
    phone:data.customer.phone,
    email:data.customer.email,
    city:data.customer.city,
    source:"package-configurator"
  });

  const selectedJson=JSON.stringify(data.selectedItems.map(itemName=>({item_name:itemName})));

  const rows=await sql`
    with pkg as (
      select
        ${String(selectedPackage.id)}::uuid as id,
        ${String(selectedPackage.name_ar)}::text as name_ar
    ),
    input_items as (
      select *
      from jsonb_to_recordset(${selectedJson}::jsonb)
        as x(item_name text)
    ),
    valid_items as (
      select input_items.item_name,pi.id as package_item_id
      from input_items
      join pkg on true
      left join package_items pi
        on pi.package_id=pkg.id
       and pi.item_name=input_items.item_name
    ),
    new_request as (
      insert into package_requests (package_id,customer_id,status,notes,preferred_contact,metadata)
      select
        pkg.id,
        ${customer.customerId},
        'submitted',
        nullif(${data.notes},''),
        'phone',
        '{"source":"web-package-configurator"}'::jsonb
      from pkg
      returning id,request_number,package_id,customer_id
    ),
    new_items as (
      insert into package_request_items (package_request_id,package_item_id,item_name,quantity)
      select
        new_request.id,
        valid_items.package_item_id,
        valid_items.item_name,
        1
      from new_request cross join valid_items
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
        jsonb_build_object('package_request_id',new_request.id,'customer_id',${customer.customerId})
      from new_request
      returning id
    ),
    new_opportunity as (
      insert into opportunities (lead_id,customer_id,name,stage,currency)
      select
        new_lead.id,
        ${customer.customerId},
        concat('باقة: ',pkg.name_ar),
        'new',
        'YER'
      from new_lead cross join pkg
      returning id
    ),
    audit as (
      insert into audit_events (entity_type,entity_id,action,after_data)
      select
        'package_request',
        new_request.id,
        'public_package_request_created',
        jsonb_build_object(
          'customer_id',${customer.customerId},
          'item_count',(select count(*) from new_items),
          'source','web-package-configurator'
        )
      from new_request
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
    return NextResponse.json({error:"تعذر حفظ طلب الباقة."},{status:500});
  }

  return NextResponse.json({
    ok:true,
    requestId:result.id,
    requestNumber:result.request_number,
    itemCount:result.item_count??data.selectedItems.length
  },{status:201});
}
