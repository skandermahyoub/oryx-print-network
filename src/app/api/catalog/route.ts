import { NextResponse } from "next/server";
import { getCatalogSummaries } from "@/lib/catalog-repository";

export async function GET(){
  const services=await getCatalogSummaries();
  return NextResponse.json({services});
}
