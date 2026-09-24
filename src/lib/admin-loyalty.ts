import { databaseConfigured, getSql } from "@/lib/db";

export type LoyaltyAdminSnapshot={
  rewards:Array<{
    id:string;slug:string;name:string;pointsCost:number;type:string;value:number|null;currency:string|null;active:boolean;validUntil:string|null;inventoryLimit:number|null;redemptions:number;
  }>;
  redemptions:Array<{
    id:string;customerId:string;customer:string;reward:string;points:number;status:string;createdAt:string;
  }>;
  customers:Array<{id:string;name:string;points:number;tier:string}>;
};

export async function getLoyaltyAdminSnapshot():Promise<LoyaltyAdminSnapshot>{
  if(!databaseConfigured()) return {rewards:[],redemptions:[],customers:[]};
  const sql=getSql();

  try{
    const [rewards,redemptions,customers]=await Promise.all([
      sql`
        select
          rc.*,
          count(rr.id)::integer as redemptions
        from reward_catalog rc
        left join reward_redemptions rr on rr.reward_id=rc.id and rr.status in ('requested','approved','used')
        group by rc.id
        order by rc.is_active desc,rc.points_cost,rc.name_ar
      `,
      sql`
        select
          rr.id,rr.points_spent,rr.status,rr.created_at,
          c.id as customer_id,
          coalesce(c.company_name,c.display_name) as customer_name,
          rc.name_ar as reward_name
        from reward_redemptions rr
        join loyalty_accounts la on la.id=rr.loyalty_account_id
        join customers c on c.id=la.customer_id
        join reward_catalog rc on rc.id=rr.reward_id
        order by case rr.status when 'requested' then 0 when 'approved' then 1 else 2 end,rr.created_at desc
        limit 150
      `,
      sql`
        select
          c.id,coalesce(c.company_name,c.display_name) as customer_name,
          la.points_balance,la.tier_key
        from loyalty_accounts la
        join customers c on c.id=la.customer_id
        order by la.points_balance desc,c.display_name
        limit 300
      `
    ]);

    return {
      rewards:rewards.map(row=>({
        id:String(row.id),slug:String(row.slug),name:String(row.name_ar),pointsCost:Number(row.points_cost),type:String(row.reward_type),
        value:row.reward_value===null?null:Number(row.reward_value),currency:row.currency?String(row.currency):null,active:Boolean(row.is_active),
        validUntil:row.valid_until?new Date(String(row.valid_until)).toISOString():null,inventoryLimit:row.inventory_limit===null?null:Number(row.inventory_limit),
        redemptions:Number(row.redemptions??0)
      })),
      redemptions:redemptions.map(row=>({
        id:String(row.id),customerId:String(row.customer_id),customer:String(row.customer_name),reward:String(row.reward_name),
        points:Number(row.points_spent),status:String(row.status),createdAt:new Date(String(row.created_at)).toISOString()
      })),
      customers:customers.map(row=>({
        id:String(row.id),name:String(row.customer_name),points:Number(row.points_balance??0),tier:String(row.tier_key)
      }))
    };
  }catch{
    return {rewards:[],redemptions:[],customers:[]};
  }
}
