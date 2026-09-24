import { databaseConfigured, getSql } from "@/lib/db";

export type SalesCampaignRow={
  id:string;
  slug:string;
  name:string;
  objective:string;
  status:string;
  packageName:string|null;
  startsAt:string|null;
  endsAt:string|null;
  pitch:string|null;
  targetCount:number;
  contactedCount:number;
  wonCount:number;
};

export async function getSalesCampaigns():Promise<SalesCampaignRow[]>{
  if(!databaseConfigured()) return [];
  try{
    const sql=getSql();
    const rows=await sql`
      select
        c.id,
        c.slug,
        c.name_ar,
        c.objective,
        c.status,
        c.starts_at,
        c.ends_at,
        c.pitch,
        p.name_ar as package_name,
        count(t.id)::integer as target_count,
        count(t.id) filter (where t.status not in ('new','researched'))::integer as contacted_count,
        count(t.id) filter (where t.status='won')::integer as won_count
      from sales_campaigns c
      left join packages p on p.id=c.package_id
      left join campaign_targets t on t.campaign_id=c.id
      group by c.id,p.name_ar
      order by
        case c.status when 'active' then 0 when 'planned' then 1 else 2 end,
        c.starts_at nulls last,
        c.created_at desc
    `;

    return rows.map(row=>({
      id:String(row.id),
      slug:String(row.slug),
      name:String(row.name_ar),
      objective:String(row.objective),
      status:String(row.status),
      packageName:row.package_name?String(row.package_name):null,
      startsAt:row.starts_at?String(row.starts_at):null,
      endsAt:row.ends_at?String(row.ends_at):null,
      pitch:row.pitch?String(row.pitch):null,
      targetCount:Number(row.target_count??0),
      contactedCount:Number(row.contacted_count??0),
      wonCount:Number(row.won_count??0)
    }));
  }catch{
    return [];
  }
}
