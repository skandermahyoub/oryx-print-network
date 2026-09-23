import { createHash } from "crypto";
import { getSql } from "@/lib/db";

function floorWindow(date:Date,windowSeconds:number){
  const milliseconds=windowSeconds*1000;
  return new Date(Math.floor(date.getTime()/milliseconds)*milliseconds);
}

export function publicClientKey(request:Request){
  const forwarded=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp=request.headers.get("x-real-ip")?.trim();
  const userAgent=request.headers.get("user-agent")?.slice(0,300)??"unknown";
  const source=`${forwarded||realIp||"unknown"}|${userAgent}`;
  return createHash("sha256").update(source).digest("hex");
}

export async function consumePublicRateLimit(input:{
  endpoint:string;
  keyHash:string;
  limit:number;
  windowSeconds:number;
}){
  const sql=getSql();
  const windowStart=floorWindow(new Date(),input.windowSeconds).toISOString();

  try{
    const rows=await sql`
      insert into api_rate_limits (endpoint,key_hash,window_start,hits,updated_at)
      values (${input.endpoint},${input.keyHash},${windowStart},1,now())
      on conflict (endpoint,key_hash,window_start)
      do update set hits=api_rate_limits.hits+1,updated_at=now()
      returning hits
    `;

    const hits=Number(rows[0]?.hits??1);
    return {
      allowed:hits<=input.limit,
      remaining:Math.max(0,input.limit-hits),
      retryAfterSeconds:input.windowSeconds
    };
  }catch{
    // Keep requests available if the migration has not reached an ephemeral
    // preview yet; CI and release-readiness checks still flag the missing table.
    return {
      allowed:true,
      remaining:input.limit,
      retryAfterSeconds:input.windowSeconds
    };
  }
}
