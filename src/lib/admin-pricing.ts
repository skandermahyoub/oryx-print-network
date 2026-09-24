import { databaseConfigured, getSql } from "@/lib/db";

export type PricingServiceRow={
  slug:string;
  title:string;
  category:string;
  sellingMode:string;
  pricingMode:string;
  activeRules:number;
  partnerPrices:number;
  approvedPartnerPrices:number;
};

export type PricingSnapshot={
  services:PricingServiceRow[];
  totals:{
    services:number;
    automated:number;
    quoteOnly:number;
    withRules:number;
    withApprovedPartnerPrice:number;
  };
};

const empty:PricingSnapshot={
  services:[],
  totals:{services:0,automated:0,quoteOnly:0,withRules:0,withApprovedPartnerPrice:0}
};

export async function getPricingSnapshot(limit=250):Promise<PricingSnapshot>{
  if(!databaseConfigured()) return empty;
  try{
    const sql=getSql();
    const [services,totals]=await Promise.all([
      sql`
        select
          s.slug,
          s.name_ar,
          c.name_ar as category_name,
          s.selling_mode,
          s.pricing_mode,
          count(distinct pr.id) filter (where pr.is_active=true)::integer as active_rules,
          count(distinct pps.id)::integer as partner_prices,
          count(distinct pps.id) filter (
            where pps.status='approved'
              and pps.valid_from<=current_date
              and (pps.valid_until is null or pps.valid_until>=current_date)
          )::integer as approved_partner_prices
        from services s
        join categories c on c.id=s.category_id
        left join pricing_rules pr on pr.service_id=s.id
        left join partner_price_submissions pps on pps.service_id=s.id
        where s.is_active=true
        group by s.id,c.name_ar
        order by
          case when count(distinct pr.id) filter (where pr.is_active=true)=0 then 0 else 1 end,
          c.name_ar,s.name_ar
        limit ${limit}
      `,
      sql`
        select
          count(*)::integer as services,
          count(*) filter (where pricing_mode<>'manual_quote')::integer as automated,
          count(*) filter (where pricing_mode='manual_quote')::integer as quote_only,
          count(*) filter (where exists(select 1 from pricing_rules pr where pr.service_id=services.id and pr.is_active=true))::integer as with_rules,
          count(*) filter (where exists(
            select 1 from partner_price_submissions pps
            where pps.service_id=services.id
              and pps.status='approved'
              and pps.valid_from<=current_date
              and (pps.valid_until is null or pps.valid_until>=current_date)
          ))::integer as with_approved_partner_price
        from services
        where is_active=true
      `
    ]);

    const t=totals[0];
    return {
      services:services.map(row=>({
        slug:String(row.slug),
        title:String(row.name_ar),
        category:String(row.category_name),
        sellingMode:String(row.selling_mode),
        pricingMode:String(row.pricing_mode),
        activeRules:Number(row.active_rules??0),
        partnerPrices:Number(row.partner_prices??0),
        approvedPartnerPrices:Number(row.approved_partner_prices??0)
      })),
      totals:{
        services:Number(t?.services??0),
        automated:Number(t?.automated??0),
        quoteOnly:Number(t?.quote_only??0),
        withRules:Number(t?.with_rules??0),
        withApprovedPartnerPrice:Number(t?.with_approved_partner_price??0)
      }
    };
  }catch{
    return empty;
  }
}
