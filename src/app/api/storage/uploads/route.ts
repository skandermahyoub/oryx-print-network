import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { z } from "zod";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";
import { maxUploadBytes, presignUpload, storageConfigured } from "@/lib/storage";

export const runtime="nodejs";

const inputSchema=z.object({
  bucket:z.literal("design-files"),
  ownerType:z.literal("design_job"),
  ownerId:z.string().uuid(),
  fileName:z.string().min(1).max(240),
  mimeType:z.string().min(1).max(180),
  sizeBytes:z.number().int().positive()
});

const allowedExtensions=new Set(["pdf","png","jpg","jpeg","webp","svg","ai","eps","psd","tif","tiff","zip"]);

function extension(name:string){
  const value=name.split(".").pop()?.toLowerCase()??"";
  return value;
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
  const access=await requirePermission("design.manage");

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
  const owner=await sql`
    select id
    from design_jobs
    where id=${data.ownerId}
    limit 1
  `;
  if(!owner[0]){
    return NextResponse.json({error:"owner_not_found"},{status:404});
  }

  const objectKey=`design-jobs/${data.ownerId}/${randomUUID()}-${safeName(data.fileName)}`;
  const expiresAt=new Date(Date.now()+5*60*1000);
  const sessions=await sql`
    insert into storage_upload_sessions (
      bucket_name,object_key,owner_type,owner_id,file_name,mime_type,max_size_bytes,status,requested_by,expires_at
    ) values (
      ${data.bucket},${objectKey},${data.ownerType},${data.ownerId},
      ${data.fileName},${data.mimeType},${limit},'pending',
      ${access.preview?null:access.user.id},${expiresAt.toISOString()}
    )
    returning id
  `;

  const signed=await presignUpload({
    bucket:data.bucket,
    key:objectKey,
    contentType:data.mimeType,
    expiresIn:300
  });

  return NextResponse.json({
    sessionId:String(sessions[0].id),
    ...signed
  });
}
