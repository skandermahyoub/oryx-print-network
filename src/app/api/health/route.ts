import { NextResponse } from "next/server";
import { authConfigured } from "@/lib/auth/server";
import { databaseConfigured, getSql } from "@/lib/db";
import { storageConfigured } from "@/lib/storage";

export const runtime="nodejs";
export const dynamic="force-dynamic";

export async function GET(){
  const database=databaseConfigured();
  let databaseReachable=false;

  if(database){
    try{
      const sql=getSql();
      const rows=await sql`select 1 as ok`;
      databaseReachable=Number(rows[0]?.ok??0)===1;
    }catch{
      databaseReachable=false;
    }
  }

  const checks={
    database:databaseReachable,
    auth:authConfigured,
    storage:storageConfigured()
  };

  const criticalOk=checks.database&&checks.auth;

  return NextResponse.json(
    {
      ok:criticalOk,
      service:"oryx-print-network",
      environment:process.env.NODE_ENV??"unknown",
      checks
    },
    {status:criticalOk?200:503}
  );
}
