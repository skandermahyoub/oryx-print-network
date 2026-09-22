import { NextResponse } from "next/server";
import { z } from "zod";
import { priceService } from "@/lib/pricing-engine";

const schema=z.object({
  serviceSlug:z.string().min(1).max(120),
  specs:z.record(z.string(),z.string()).default({})
});

export async function POST(request:Request){
  const parsed=schema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success){
    return NextResponse.json({error:"Invalid pricing request",details:parsed.error.flatten()},{status:400});
  }

  const result=await priceService(parsed.data.serviceSlug,parsed.data.specs);
  return NextResponse.json(result);
}
