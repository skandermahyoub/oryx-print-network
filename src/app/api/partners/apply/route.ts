import { NextResponse } from "next/server";
import { z } from "zod";
import { databaseConfigured, getSql } from "@/lib/db";

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
  if(data.website){
    return NextResponse.json({ok:true});
  }

  const sql=getSql();
  const rows=await sql`
    insert into partners (
      legal_name,trade_name,partner_type,status,city,phone,email,metadata
    ) values (
      ${data.legalName},${data.legalName},'production_partner','applicant',
      ${data.city},${data.phone},nullif(${data.email},''),
      ${JSON.stringify({productionArea:data.productionArea,capabilities:data.capabilities,source:"web-partner-application"})}::jsonb
    )
    returning id
  `;

  return NextResponse.json({ok:true,applicationId:(rows[0] as {id:string}).id},{status:201});
}
