import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requirePartnerAccess } from "@/lib/auth/partner-access";
import { getSql } from "@/lib/db";
import { maxUploadBytes, presignUpload, storageConfigured } from "@/lib/storage";

export const runtime="nodejs";

const inputSchema=z.object({
  partnerJobId:z.string().uuid(),
  fileName:z.string().min(1).max(240),
  mimeType:z.string().min(1).max(180),
  sizeBytes:z.number().int().positive()
});

const allowedExtensions=new Set(["pdf","png","jpg","jpeg","webp","tif","tiff","zip"]);

function extension(name:string){
  return name.split(".").pop()?.toLowerCase()??"";
}

function safeName(name:string){
  return name
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}._-]+/gu,"-")
    .replace(/-+/g,"-")
    .replace(/^[-.]+|[-.]+$/g,"")
    .slice(0,120)||"proof";
}

export async function POST(request:Request){
  const access=await requirePartnerAccess();
  if(!storageConfigured()){
    return NextResponse.json({error:"storage_not_configured"},{status:503});
  }

  const parsed=inputSchema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success){
    return NextResponse.json({error:"invalid_upload_request"},{status:400});
  }
  const data=parsed.data;
  if(!allowedExtensions.has(extension(data.fileName))){
    return NextResponse.json({error:"file_type_not_allowed"},{status:415});
  }

  const limit=maxUploadBytes();
  if(data.sizeBytes>limit){
    return NextResponse.json({error:"file_too_large",maxBytes:limit},{status:413});
  }

  const sql=getSql();
  const jobs=await sql`
    select pj.work_order_id
    from partner_jobs pj
    join work_orders wo on wo.id=pj.work_order_id
    where pj.id=${data.partnerJobId}
      and pj.partner_id=${access.partnerId}
      and pj.status='in_progress'
      and wo.status='in_progress'
    limit 1
  `;
  const job=jobs[0];
  if(!job){
    return NextResponse.json({error:"partner_job_unavailable"},{status:404});
  }

  const objectKey=`partner-work/${access.partnerId}/${String(job.work_order_id)}/${randomUUID()}-${safeName(data.fileName)}`;
  const expiresAt=new Date(Date.now()+10*60*1000);

  const sessions=await sql`
    insert into storage_upload_sessions (
      bucket_name,object_key,owner_type,owner_id,file_name,mime_type,max_size_bytes,status,requested_by,expires_at
    ) values (
      'customer-documents',${objectKey},'work_order',${String(job.work_order_id)},
      ${data.fileName},${data.mimeType},${limit},'pending',${access.appUserId},${expiresAt.toISOString()}
    )
    returning id
  `;

  const signed=await presignUpload({
    bucket:"customer-documents",
    key:objectKey,
    contentType:data.mimeType,
    expiresIn:600
  });

  return NextResponse.json({
    sessionId:String(sessions[0].id),
    ...signed
  });
}
