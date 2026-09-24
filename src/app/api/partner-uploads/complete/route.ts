import { NextResponse } from "next/server";
import { z } from "zod";
import { requirePartnerAccess } from "@/lib/auth/partner-access";
import { getSql } from "@/lib/db";
import { headObject, storageConfigured } from "@/lib/storage";

export const runtime="nodejs";

const inputSchema=z.object({
  sessionId:z.string().uuid(),
  partnerJobId:z.string().uuid()
});

export async function POST(request:Request){
  const access=await requirePartnerAccess();
  if(!storageConfigured()){
    return NextResponse.json({error:"storage_not_configured"},{status:503});
  }

  const parsed=inputSchema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success){
    return NextResponse.json({error:"invalid_completion_request"},{status:400});
  }

  const sql=getSql();
  const jobs=await sql`
    select pj.work_order_id
    from partner_jobs pj
    where pj.id=${parsed.data.partnerJobId}
      and pj.partner_id=${access.partnerId}
      and pj.status='in_progress'
    limit 1
  `;
  const job=jobs[0];
  if(!job){
    return NextResponse.json({error:"partner_job_unavailable"},{status:404});
  }

  const sessions=await sql`
    select *
    from storage_upload_sessions
    where id=${parsed.data.sessionId}
      and status='pending'
      and owner_type='work_order'
      and owner_id=${String(job.work_order_id)}
      and bucket_name='customer-documents'
      and requested_by=${access.appUserId}
      and expires_at>now()
    limit 1
  `;
  const session=sessions[0];
  if(!session){
    return NextResponse.json({error:"upload_session_unavailable"},{status:404});
  }

  const head=await headObject({
    bucket:String(session.bucket_name),
    key:String(session.object_key)
  });
  const size=Number(head.ContentLength??0);
  if(size<=0||size>Number(session.max_size_bytes)){
    return NextResponse.json({error:"uploaded_object_size_invalid"},{status:422});
  }

  const contentType=String(head.ContentType??session.mime_type??"application/octet-stream");
  if(session.mime_type&&contentType!==String(session.mime_type)){
    return NextResponse.json({error:"uploaded_object_type_mismatch"},{status:422});
  }

  const completed=await sql`
    with locked_session as (
      select *
      from storage_upload_sessions
      where id=${parsed.data.sessionId}
        and status='pending'
      for update
    ),
    document as (
      insert into documents (
        owner_type,owner_id,file_name,storage_key,mime_type,size_bytes,visibility,metadata,
        bucket_name,access_level,purpose,uploaded_by
      )
      select
        'work_order',
        locked_session.owner_id,
        locked_session.file_name,
        locked_session.object_key,
        ${contentType},
        ${size},
        'private',
        jsonb_build_object('partner_id',${access.partnerId},'partner_job_id',${parsed.data.partnerJobId}),
        locked_session.bucket_name,
        'private',
        'production_proof',
        ${access.appUserId}
      from locked_session
      returning id,file_name,size_bytes
    ),
    verified as (
      update storage_upload_sessions sus
      set status='verified',verified_document_id=document.id
      from document,locked_session
      where sus.id=locked_session.id
      returning document.id,document.file_name,document.size_bytes
    )
    select * from verified
  `;

  const document=completed[0];
  if(!document){
    return NextResponse.json({error:"upload_completion_conflict"},{status:409});
  }

  return NextResponse.json({
    documentId:String(document.id),
    fileName:String(document.file_name),
    sizeBytes:Number(document.size_bytes)
  });
}
