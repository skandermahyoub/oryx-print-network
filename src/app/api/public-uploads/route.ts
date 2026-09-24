import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { databaseConfigured, getSql } from "@/lib/db";
import { consumePublicRateLimit, publicClientKey } from "@/lib/public-rate-limit";
import { maxUploadBytes, presignUpload, storageConfigured } from "@/lib/storage";

export const runtime="nodejs";

const inputSchema=z.object({
  fileName:z.string().min(1).max(240),
  mimeType:z.string().min(1).max(180),
  sizeBytes:z.number().int().positive()
});

const allowedExtensions=new Set([
  "pdf","png","jpg","jpeg","webp","svg","ai","eps","psd","tif","tiff",
  "zip","doc","docx","xls","xlsx","ppt","pptx"
]);

function extension(name:string){
  return name.split(".").pop()?.toLowerCase()??"";
}

function safeName(name:string){
  return name
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}._-]+/gu,"-")
    .replace(/-+/g,"-")
    .replace(/^[-.]+|[-.]+$/g,"")
    .slice(0,120)||"file";
}

export async function POST(request:Request){
  if(!databaseConfigured()||!storageConfigured()){
    return NextResponse.json({error:"upload_service_unavailable"},{status:503});
  }

  const rate=await consumePublicRateLimit({
    endpoint:"public-upload:init",
    keyHash:publicClientKey(request),
    limit:12,
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

  const token=randomUUID();
  const objectKey=`public-orders/${token}/${randomUUID()}-${safeName(data.fileName)}`;
  const expiresAt=new Date(Date.now()+10*60*1000);
  const sql=getSql();

  const sessions=await sql`
    insert into storage_upload_sessions (
      bucket_name,object_key,owner_type,owner_id,file_name,mime_type,max_size_bytes,status,expires_at
    ) values (
      'customer-documents',${objectKey},'order_draft',null,
      ${data.fileName},${data.mimeType},${limit},'pending',${expiresAt.toISOString()}
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
    token,
    ...signed
  });
}
