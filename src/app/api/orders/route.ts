import { NextResponse } from "next/server";
import { z } from "zod";
import { databaseConfigured, getSql } from "@/lib/db";
import { findOrCreateCustomer } from "@/lib/customer-identity";
import { queueInAppNotification } from "@/lib/notifications";
import { priceService } from "@/lib/pricing-engine";
import { consumePublicRateLimit, publicClientKey } from "@/lib/public-rate-limit";

const customerSchema=z.object({
  displayName:z.string().min(2).max(160),
  companyName:z.string().max(180).optional().default(""),
  phone:z.string().min(5).max(40),
  email:z.string().email().optional().or(z.literal("")).default(""),
  city:z.string().max(120).optional().default("")
});

const attachmentSchema=z.object({
  documentId:z.string().uuid(),
  token:z.string().uuid(),
  fileName:z.string().min(1).max(240),
  sizeBytes:z.number().int().positive().max(52_428_800)
});

const itemSchema=z.object({
  serviceSlug:z.string().min(1).max(120),
  specs:z.record(z.string(),z.string()).default({}),
  finishings:z.array(z.string().max(160)).max(40).default([]),
  design:z.enum(["ready","oryx","idea"]).default("ready"),
  attachments:z.array(attachmentSchema).max(8).default([])
});

const orderSchema=z.object({
  items:z.array(itemSchema).min(1).max(50).optional(),
  serviceSlug:z.string().min(1).max(120).optional(),
  specs:z.record(z.string(),z.string()).default({}),
  finishings:z.array(z.string().max(160)).max(40).default([]),
  design:z.enum(["ready","oryx","idea"]).default("ready"),
  attachments:z.array(attachmentSchema).max(8).default([]),
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

  const inputItems=data.items?.length?data.items:[{
    serviceSlug:data.serviceSlug as string,
    specs:data.specs,
    finishings:data.finishings,
    design:data.design,
    attachments:data.attachments
  }];

  const sql=getSql();
  const serviceInput=JSON.stringify(inputItems.map((item,index)=>({
    item_index:index,
    service_slug:item.serviceSlug
  })));

  const serviceRows=await sql`
    with input_items as (
      select *
      from jsonb_to_recordset(${serviceInput}::jsonb)
        as x(item_index integer,service_slug text)
    )
    select
      input_items.item_index,
      input_items.service_slug,
      s.id as service_id,
      s.selling_mode,
      s.pricing_mode,
      s.requires_design_approval
    from input_items
    left join services s
      on s.slug=input_items.service_slug
     and s.is_active=true
     and s.is_public=true
    order by input_items.item_index
  `;

  if(serviceRows.length!==inputItems.length||serviceRows.some(row=>!row.service_id)){
    return NextResponse.json({error:"One or more services are unavailable."},{status:404});
  }

  const attachmentPairs=inputItems.flatMap((item,itemIndex)=>
    item.attachments.map(file=>({
      item_index:itemIndex,
      document_id:file.documentId,
      token:file.token
    }))
  );

  if(attachmentPairs.length){
    const attachmentsJson=JSON.stringify(attachmentPairs);
    const validity=await sql`
      with input_attachments as (
        select *
        from jsonb_to_recordset(${attachmentsJson}::jsonb)
          as x(item_index integer,document_id uuid,token text)
      )
      select
        count(*)::integer as requested_count,
        count(d.id)::integer as valid_count
      from input_attachments ia
      left join documents d
        on d.id=ia.document_id
       and d.owner_type='order_draft'
       and d.owner_id is null
       and d.bucket_name='customer-documents'
       and d.purpose='customer_artwork'
       and d.metadata->>'upload_token'=ia.token
    `;
    if(Number(validity[0]?.requested_count??0)!==Number(validity[0]?.valid_count??0)){
      return NextResponse.json({error:"One or more uploaded files are unavailable."},{status:409});
    }
  }

  const normalizedItems=await Promise.all(inputItems.map(async (item,index)=>{
    const meta=serviceRows.find(row=>Number(row.item_index)===index);
    const quantity=quantityFromSpecs(item.specs);
    const automatic=meta&&["buy_now","instant_quote"].includes(String(meta.selling_mode));
    const pricing=automatic
      ? await priceService(item.serviceSlug,item.specs)
      : {status:"requires_quote" as const,reason:"Service requires staff quotation."};

    const priced=pricing.status==="priced"&&pricing.currency==="YER";
    const totalPrice=priced?pricing.subtotal:null;
    const unitPrice=priced?Number((pricing.subtotal/quantity).toFixed(4)):null;

    return {
      item_index:index,
      service_slug:item.serviceSlug,
      quantity,
      unit_price:unitPrice,
      total_price:totalPrice,
      attachments:item.attachments,
      specifications:{
        fields:item.specs,
        finishings:item.finishings,
        design:item.design,
        fulfilment:data.fulfilment,
        source:"web-smart-order",
        pricing_snapshot:pricing,
        system:{client_item_index:index}
      }
    };
  }));

  const itemsJson=JSON.stringify(normalizedItems);
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
        as x(
          item_index integer,
          service_slug text,
          quantity numeric,
          unit_price numeric,
          total_price numeric,
          attachments jsonb,
          specifications jsonb
        )
    ),
    resolved_items as (
      select
        x.item_index,x.quantity,x.unit_price,x.total_price,x.attachments,x.specifications,
        s.id as service_id,s.requires_design_approval
      from input_items x
      join services s on s.slug=x.service_slug
      where s.is_active=true and s.is_public=true
    ),
    totals as (
      select
        bool_and(total_price is not null) as all_priced,
        coalesce(sum(total_price),0)::numeric(14,2) as subtotal
      from resolved_items
    ),
    new_order as (
      insert into orders (customer_id,status,currency,subtotal,total,notes)
      select
        ${customer.customerId},
        'submitted',
        'YER',
        case when totals.all_priced then totals.subtotal else 0 end,
        case when totals.all_priced then totals.subtotal else 0 end,
        case when totals.all_priced
          then 'Created from ORYX Smart Order · all items auto-priced'
          else 'Created from ORYX Smart Order · staff quotation required'
        end
      from totals
      returning id,order_number
    ),
    new_items as (
      insert into order_items (
        order_id,service_id,quantity,unit_price,total_price,specifications
      )
      select
        new_order.id,
        resolved_items.service_id,
        resolved_items.quantity,
        resolved_items.unit_price,
        resolved_items.total_price,
        resolved_items.specifications
      from new_order cross join resolved_items
      order by resolved_items.item_index
      returning id,service_id,specifications
    ),
    attachment_input as (
      select
        resolved_items.item_index,
        (attachment->>'documentId')::uuid as document_id,
        attachment->>'token' as token
      from resolved_items
      cross join lateral jsonb_array_elements(coalesce(resolved_items.attachments,'[]'::jsonb)) attachment
    ),
    claimed_documents as (
      update documents d
      set
        owner_type='order_item',
        owner_id=new_items.id,
        metadata=(d.metadata-'upload_token')||jsonb_build_object(
          'claimed_order_id',(select id from new_order),
          'claimed_at',now()
        )
      from attachment_input ai
      join new_items
        on (new_items.specifications->'system'->>'client_item_index')::integer=ai.item_index
      where d.id=ai.document_id
        and d.owner_type='order_draft'
        and d.owner_id is null
        and d.metadata->>'upload_token'=ai.token
      returning d.id
    ),
    attachment_guard as (
      select
        1/case
          when (select count(*) from claimed_documents)=(select count(*) from attachment_input)
          then 1 else 0
        end as ok
    ),
    design_jobs_created as (
      insert into design_jobs (order_item_id,status,brief)
      select
        new_items.id,
        'brief',
        case new_items.specifications->>'design'
          when 'oryx' then 'Customer requested ORYX design service.'
          when 'idea' then 'Customer submitted an idea and needs design development.'
          else 'Customer supplied artwork; verify proof before production.'
        end
      from new_items
      join services s on s.id=new_items.service_id
      where s.requires_design_approval=true
         or new_items.specifications->>'design' in ('oryx','idea')
      on conflict do nothing
      returning id
    ),
    audit as (
      insert into audit_events (entity_type,entity_id,action,after_data)
      select
        'order',
        new_order.id,
        'public_order_created',
        jsonb_build_object(
          'source','web-smart-order',
          'item_count',(select count(*) from new_items),
          'attachment_count',(select count(*) from claimed_documents),
          'design_job_count',(select count(*) from design_jobs_created),
          'customer_id',${customer.customerId}
        )
      from new_order cross join attachment_guard
      returning id
    )
    select
      new_order.id as order_id,
      new_order.order_number,
      (select count(*)::integer from new_items) as item_count,
      (select count(*)::integer from claimed_documents) as attachment_count,
      (select count(*)::integer from design_jobs_created) as design_job_count,
      (select all_priced from totals) as all_priced
    from new_order cross join attachment_guard
  `;

  const result=rows[0] as {
    order_id?:string;
    order_number?:number;
    item_count?:number;
    attachment_count?:number;
    design_job_count?:number;
    all_priced?:boolean;
  }|undefined;

  if(!result?.order_id){
    return NextResponse.json({error:"Order could not be created."},{status:409});
  }

  await queueInAppNotification({
    recipientType:"customer",
    recipientId:customer.customerId,
    templateKey:"order_created",
    subject:`تم استلام طلب ORYX #${result.order_number}`,
    body:result.all_priced
      ?"تم استلام الطلب وتسعير عناصره آليًا. سيخضع للمراجعة قبل إرسال عرض السعر."
      :"تم استلام الطلب. بعض العناصر تحتاج مراجعة وتسعيرًا من فريق ORYX.",
    relatedType:"order",
    relatedId:String(result.order_id)
  });

  return NextResponse.json({
    ok:true,
    orderId:result.order_id,
    orderNumber:result.order_number,
    itemCount:result.item_count??normalizedItems.length,
    attachmentCount:result.attachment_count??0,
    designJobCount:result.design_job_count??0,
    status:"submitted"
  },{status:201});
}
