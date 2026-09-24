import { databaseConfigured, getSql } from "@/lib/db";

export type AdminCampaignDetail={
  campaign:{id:string;slug:string;name:string;objective:string;status:string;pitch:string|null;startsAt:string|null;endsAt:string|null;currency:string;targetRevenue:number|null};
  targets:Array<{id:string;company:string|null;contact:string|null;phone:string|null;email:string|null;city:string|null;status:string;score:number;nextActionAt:string|null;notes:string|null}>;
  offers:Array<{id:string;name:string;headline:string|null;description:string|null;discountType:string|null;discountValue:number|null;active:boolean;validUntil:string|null}>;
  results:Array<{id:string;type:string;revenue:number|null;grossProfit:number|null;currency:string;createdAt:string}>;
};

export async function getAdminCampaignDetail(campaignId:string):Promise<AdminCampaignDetail|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();
  const campaigns=await sql`
    select id,slug,name_ar,objective,status,pitch,starts_at,ends_at,currency,target_revenue
    from sales_campaigns where id=${campaignId} limit 1
  `;
  const c=campaigns[0];
  if(!c) return null;

  const [targets,offers,results]=await Promise.all([
    sql`
      select id,company_name,contact_name,phone,email,city,status,score,next_action_at,notes
      from campaign_targets
      where campaign_id=${campaignId}
      order by score desc,next_action_at nulls last,created_at desc
    `,
    sql`
      select id,name_ar,headline_ar,description_ar,discount_type,discount_value,is_active,valid_until
      from campaign_offers
      where campaign_id=${campaignId}
      order by is_active desc,created_at desc
    `,
    sql`
      select id,result_type,revenue,gross_profit,currency,created_at
      from campaign_results
      where campaign_id=${campaignId}
      order by created_at desc
    `
  ]);

  return {
    campaign:{
      id:String(c.id),slug:String(c.slug),name:String(c.name_ar),objective:String(c.objective),status:String(c.status),
      pitch:c.pitch?String(c.pitch):null,startsAt:c.starts_at?String(c.starts_at):null,endsAt:c.ends_at?String(c.ends_at):null,
      currency:String(c.currency??"YER"),targetRevenue:c.target_revenue===null?null:Number(c.target_revenue)
    },
    targets:targets.map(row=>({id:String(row.id),company:row.company_name?String(row.company_name):null,contact:row.contact_name?String(row.contact_name):null,phone:row.phone?String(row.phone):null,email:row.email?String(row.email):null,city:row.city?String(row.city):null,status:String(row.status),score:Number(row.score??0),nextActionAt:row.next_action_at?new Date(String(row.next_action_at)).toISOString():null,notes:row.notes?String(row.notes):null})),
    offers:offers.map(row=>({id:String(row.id),name:String(row.name_ar),headline:row.headline_ar?String(row.headline_ar):null,description:row.description_ar?String(row.description_ar):null,discountType:row.discount_type?String(row.discount_type):null,discountValue:row.discount_value===null?null:Number(row.discount_value),active:Boolean(row.is_active),validUntil:row.valid_until?String(row.valid_until):null})),
    results:results.map(row=>({id:String(row.id),type:String(row.result_type),revenue:row.revenue===null?null:Number(row.revenue),grossProfit:row.gross_profit===null?null:Number(row.gross_profit),currency:String(row.currency??"YER"),createdAt:new Date(String(row.created_at)).toISOString()}))
  };
}
