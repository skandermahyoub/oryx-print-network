import { NextResponse } from "next/server";
import { auth, authConfigured } from "@/lib/auth/server";
import { databaseConfigured, getSql } from "@/lib/db";
import { presignDownload, storageConfigured } from "@/lib/storage";

export const runtime="nodejs";

export async function GET(
  _request:Request,
  {params}:{params:Promise<{id:string}>}
){
  if(!authConfigured||!databaseConfigured()||!storageConfigured()){
    return NextResponse.json({error:"service_unavailable"},{status:503});
  }

  const {data:session}=await auth.getSession();
  if(!session?.user){
    return NextResponse.json({error:"unauthorized"},{status:401});
  }

  const {id}=await params;
  const sql=getSql();
  const documents=await sql`
    select id,owner_type,owner_id,file_name,bucket_name,storage_key,access_level
    from documents
    where id=${id}
    limit 1
  `;
  const document=documents[0];
  if(!document){
    return NextResponse.json({error:"not_found"},{status:404});
  }

  const users=await sql`
    select id,user_type,status,customer_id
    from app_users
    where auth_user_id=${String(session.user.id)}
    limit 1
  `;
  const user=users[0];
  if(!user||user.status!=="active"){
    return NextResponse.json({error:"forbidden"},{status:403});
  }

  let allowed=user.user_type==="staff";

  if(!allowed&&user.user_type==="customer"&&user.customer_id){
    if(document.owner_type==="customer"){
      allowed=String(document.owner_id)===String(user.customer_id);
    }else if(document.owner_type==="order"){
      const access=await sql`
        select exists(
          select 1 from orders
          where id=${document.owner_id} and customer_id=${user.customer_id}
        ) as allowed
      `;
      allowed=Boolean(access[0]?.allowed);
    }else if(document.owner_type==="design_job"){
      const access=await sql`
        select exists(
          select 1
          from design_jobs dj
          join order_items oi on oi.id=dj.order_item_id
          join orders o on o.id=oi.order_id
          where dj.id=${document.owner_id}
            and o.customer_id=${user.customer_id}
        ) as allowed
      `;
      allowed=Boolean(access[0]?.allowed);
    }
  }

  if(!allowed){
    return NextResponse.json({error:"forbidden"},{status:403});
  }

  const url=await presignDownload({
    bucket:String(document.bucket_name),
    key:String(document.storage_key),
    fileName:String(document.file_name),
    expiresIn:300
  });

  return NextResponse.redirect(url,307);
}
