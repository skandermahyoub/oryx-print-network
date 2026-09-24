import { NextResponse } from "next/server";
import { z } from "zod";
import { databaseConfigured, getSql } from "@/lib/db";
import { consumePublicRateLimit, publicClientKey } from "@/lib/public-rate-limit";
import { headObject, storageConfigured } from "@/lib/storage";

export const runtime="nodejs";

const inputSchema=z.object({
  sessionId:z.string().uuid(),
  token:z.string().uuid()
});

export async function POST(request:Request){
  if(!databaseConfigured()||!storageConfigured()){
    return NextResponse.json({error:"upload_service_unavailable"},{status:503});
  }

  const rate=await consumePublicRateLimit({
    endpoint:"public-upload:complete",
    keyHash:publicClientKey(request),
    limit:20,
    windowSeconds:600
  });
  if(!rate.allowed){
    return NextResponse.json(
      {error:"too_many_uploads"},
      {status:429,headers:{"Retry-After":String(rate.retryAfterSeconds)}}
    );
  }

  const parsed=inputSchema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success){
    return NextResponse.json({error:"invalid_completion_request"},{status:400});
  }

  const {sessionId,token}=parsed.data;
  const expectedPrefix=`public-orders/${token}/`;
  const sql=getSql();

  const rows=await sql`
    select *
    from storage_upload_sessions
    where id=${sessionId}
      and status='pending'
      and owner_type='order_draft'
      and owner_id is null
      and requested_by is null
      and bucket_name='customer-documents'
      and object_key like ${expectedPrefix+"%"}
      and expires_at>now()
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
      where id=${sessionId}
        and status='pending'
        and object_key like ${expectedPrefix+"%"}
      for update
    ),
    document as (
      insert into documents (
        owner_type,owner_id,file_name,storage_key,mime_type,size_bytes,visibility,metadata,
        bucket_name,access_level,purpose
      )
      select
        'order_draft',
        null,
        locked_session.file_name,
        locked_session.object_key,
        ${contentType},
        ${size},
        'private',
        jsonb_build_object(
          'upload_session_id',locked_session.id,
          'upload_token',${token},
          'source','smart-order'
        ),
        locked_session.bucket_name,
        'private',
        'customer_artwork'
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
    token,
    fileName:String(document.file_name),
    sizeBytes:Number(document.size_bytes)
  });
}
