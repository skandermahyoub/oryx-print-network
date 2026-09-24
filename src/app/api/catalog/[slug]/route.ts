import { NextResponse } from "next/server";
import { getCatalogService } from "@/lib/catalog-repository";

export async function GET(_request:Request,{params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const service=await getCatalogService(slug);
  if(!service){
    return NextResponse.json({error:"Service not found"},{status:404});
  }
  return NextResponse.json({service});
}
