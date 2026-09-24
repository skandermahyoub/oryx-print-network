import { NextResponse } from "next/server";
import { z } from "zod";
import { databaseConfigured, getSql } from "@/lib/db";
import { consumePublicRateLimit, publicClientKey } from "@/lib/public-rate-limit";

const schema=z.object({
  legalName:z.string().min(2).max(180),
  city:z.string().min(2).max(120),
  phone:z.string().min(5).max(40),
  email:z.string().email().optional().or(z.literal("")).default(""),
  productionArea:z.string().min(2).max(160),
  capabilities:z.string().min(10).max(4000),
  website:z.string().max(200).optional().default("")
});

export async function POST(request:Request){
  if(!databaseConfigured()){
    return NextResponse.json({error:"Database is not configured for this environment."},{status:503});
  }

  const parsed=schema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success){
    return NextResponse.json({error:"Invalid partner application",details:parsed.error.flatten()},{status:400});
  }

  const data=parsed.data;

  const rate=await consumePublicRateLimit({
    endpoint:"partners:apply",
    keyHash:publicClientKey(request),
    limit:4,
    windowSeconds:3600
  });
  if(!rate.allowed){
    return NextResponse.json(
      {error:"Too many partner applications. Try again later."},
      {status:429,headers:{"Retry-After":String(rate.retryAfterSeconds)}}
    );
  }

  if(data.website){
    return NextResponse.json({ok:true});
  }

  const sql=getSql();
  const rows=await sql`
    with existing as (
      select id
      from partners
      where
        regexp_replace(coalesce(phone,''),'[^0-9]','','g')=
          regexp_replace(${data.phone},'[^0-9]','','g')
        or (
          ${data.email}<>'' and lower(coalesce(email,''))=lower(${data.email})
        )
      order by created_at desc
      limit 1
    ),
    created as (
      insert into partners (
        legal_name,trade_name,partner_type,status,city,phone,email,metadata
      )
      select
        ${data.legalName},${data.legalName},'production_partner','applicant',
        ${data.city},${data.phone},nullif(${data.email},''),
        ${JSON.stringify({productionArea:data.productionArea,capabilities:data.capabilities,source:"web-partner-application"})}::jsonb
      where not exists(select 1 from existing)
      returning id
    ),
    result as (
      select id,false as created from existing
      union all
      select id,true as created from created
      limit 1
    ),
    audit as (
      insert into audit_events (entity_type,entity_id,action,after_data)
      select
        'partner',
        result.id,
        case when result.created then 'partner_application_created' else 'partner_application_reused' end,
        jsonb_build_object('source','web-partner-application')
      from result
      returning id
    )
    select id,created from result
  `;

  const result=rows[0] as {id?:string;created?:boolean}|undefined;
  if(!result?.id){
    return NextResponse.json({error:"Partner application could not be saved."},{status:500});
  }

  return NextResponse.json({
    ok:true,
    applicationId:result.id,
    created:Boolean(result.created)
  },{status:201});
}
