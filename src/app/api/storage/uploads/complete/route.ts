import { NextResponse } from "next/server";
import { z } from "zod";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";
import { headObject, storageConfigured } from "@/lib/storage";

export const runtime="nodejs";

const inputSchema=z.object({
  sessionId:z.string().uuid()
});

export async function POST(request:Request){
  const access=await requirePermission("design.manage");

  if(!storageConfigured()){
    return NextResponse.json({error:"storage_not_configured"},{status:503});
  }

  const parsed=inputSchema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success){
    return NextResponse.json({error:"invalid_completion_request"},{status:400});
  }

  const sql=getSql();
  const rows=await sql`
    select *
    from storage_upload_sessions
    where id=${parsed.data.sessionId}
      and status='pending'
      and expires_at>now()
      and (
        ${access.preview}=true
        or requested_by=${access.preview?null:access.user.id}
      )
    limit 1
  `;

  const session=rows[0];
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
        locked_session.owner_type,
        locked_session.owner_id,
        locked_session.file_name,
        locked_session.object_key,
        ${contentType},
        ${size},
        'private',
        jsonb_build_object('upload_session_id',locked_session.id),
        locked_session.bucket_name,
        'private',
        'design_proof',
        ${access.preview?null:access.user.id}
      from locked_session
      returning id
    ),
    verified as (
      update storage_upload_sessions sus
      set status='verified',verified_document_id=document.id
      from document,locked_session
      where sus.id=locked_session.id
      returning document.id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'document',
        verified.id,
        'upload_verified',
        jsonb_build_object('session_id',${parsed.data.sessionId},'size_bytes',${size},'mime_type',${contentType})
      from verified
      returning id
    )
    select id from verified
  `;

  if(!completed[0]){
    return NextResponse.json({error:"upload_completion_conflict"},{status:409});
  }

  return NextResponse.json({documentId:String(completed[0].id)});
}
