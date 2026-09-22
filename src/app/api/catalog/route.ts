import { NextResponse } from "next/server";
import { databaseConfigured, getSql } from "@/lib/db";
import { serviceCatalog } from "@/lib/service-catalog";

export async function GET(){
  if(!databaseConfigured()){
    return NextResponse.json({source:"fallback",services:serviceCatalog});
  }

  try{
    const sql=getSql();
    const rows=await sql`
      select
        s.slug,
        s.name_ar as title,
        s.short_description_ar as summary,
        s.selling_mode,
        s.pricing_mode,
        c.name_ar as category
      from services s
      join categories c on c.id=s.category_id
      where s.is_active=true and s.is_public=true
      order by c.sort_order,s.sort_order,s.name_ar
    `;
    return NextResponse.json({source:"neon",services:rows});
  }catch(error){
    return NextResponse.json(
      {source:"fallback",warning:"Database unavailable",services:serviceCatalog},
      {status:200}
    );
  }
}
