import { NextResponse } from "next/server";
import { auth, authConfigured } from "@/lib/auth/server";

const handlers=auth.handler();

export async function GET(request:Request){
  if(!authConfigured){
    return NextResponse.json({error:"Authentication is not configured."},{status:503});
  }
  return handlers.GET(request);
}

export async function POST(request:Request){
  if(!authConfigured){
    return NextResponse.json({error:"Authentication is not configured."},{status:503});
  }
  return handlers.POST(request);
}
