import { databaseConfigured, getSql } from "@/lib/db";

export type AdminPartnerRow={
  id:string;
  name:string;
  city:string|null;
  phone:string|null;
  email:string|null;
  status:string;
  partnerType:string;
  performanceScore:number|null;
  capabilities:string|null;
  createdAt:string;
};

export async function getAdminPartners(limit=100):Promise<AdminPartnerRow[]>{
  if(!databaseConfigured()) return [];
  try{
    const sql=getSql();
    const rows=await sql`
      select
        p.id,
        coalesce(p.trade_name,p.legal_name) as name,
        p.city,
        p.phone,
        p.email,
        p.status,
        p.partner_type,
        p.performance_score,
        p.metadata,
        p.created_at
      from partners p
      order by
        case p.status
          when 'applicant' then 0
          when 'under_review' then 1
          when 'active' then 2
          else 3
        end,
        p.created_at desc
      limit ${limit}
    `;

    return rows.map(row=>{
      const metadata=(row.metadata&&typeof row.metadata==="object"&&!Array.isArray(row.metadata))
        ? row.metadata as Record<string,unknown>
        : {};
      const parts=[
        typeof metadata.productionArea==="string"?metadata.productionArea:null,
        typeof metadata.capabilities==="string"?metadata.capabilities:null
      ].filter(Boolean);
      return {
        id:String(row.id),
        name:String(row.name),
        city:row.city?String(row.city):null,
        phone:row.phone?String(row.phone):null,
        email:row.email?String(row.email):null,
        status:String(row.status),
        partnerType:String(row.partner_type),
        performanceScore:row.performance_score===null?null:Number(row.performance_score),
        capabilities:parts.length?parts.join(" · "):null,
        createdAt:new Date(String(row.created_at)).toISOString()
      };
    });
  }catch{
    return [];
  }
}
