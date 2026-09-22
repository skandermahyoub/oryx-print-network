import { databaseConfigured, getSql } from "@/lib/db";

export type AdminPartnerDetail={
  partner:{
    id:string;
    name:string;
    legalName:string;
    tradeName:string|null;
    status:string;
    city:string|null;
    address:string|null;
    phone:string|null;
    email:string|null;
    pricingTerms:string|null;
    settlementTerms:string|null;
    performanceScore:number|null;
    metadata:Record<string,unknown>;
    createdAt:string;
  };
  machines:Array<{
    id:string;
    name:string;
    type:string;
    brand:string|null;
    model:string|null;
    status:string;
  }>;
  prices:Array<{
    id:string;
    service:string;
    serviceSlug:string;
    baseCost:number|null;
    minimumQuantity:number|null;
    normalLeadHours:number|null;
    urgentLeadHours:number|null;
    currency:string;
    status:string;
    validFrom:string;
    validUntil:string|null;
    createdAt:string;
  }>;
  capabilities:Array<{
    service:string;
    baseCost:number|null;
    currency:string;
    normalLeadHours:number|null;
    urgentLeadHours:number|null;
    dailyCapacity:number|null;
    active:boolean;
  }>;
  compliance:Array<{
    id:string;
    type:string;
    reference:string|null;
    expiresAt:string|null;
    status:string;
  }>;
  scoreHistory:Array<{
    overall:number;
    quality:number|null;
    onTime:number|null;
    cost:number|null;
    response:number|null;
    jobs:number;
    calculatedAt:string;
  }>;
  audit:Array<{
    action:string;
    createdAt:string;
    actor:string|null;
  }>;
};

export async function getAdminPartnerDetail(partnerId:string):Promise<AdminPartnerDetail|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();

  const partnerRows=await sql`
    select
      p.*,
      coalesce(p.trade_name,p.legal_name) as display_name
    from partners p
    where p.id=${partnerId}
    limit 1
  `;
  const p=partnerRows[0];
  if(!p) return null;

  const [machines,prices,capabilities,compliance,scores,audit]=await Promise.all([
    sql`
      select id,name,machine_type,brand,model,status
      from partner_machines
      where partner_id=${partnerId}
      order by status,name
    `,
    sql`
      select
        pps.id,
        s.name_ar as service_name,
        s.slug as service_slug,
        pps.base_cost,
        pps.minimum_quantity,
        pps.normal_lead_hours,
        pps.urgent_lead_hours,
        pps.currency,
        pps.status,
        pps.valid_from,
        pps.valid_until,
        pps.created_at
      from partner_price_submissions pps
      join services s on s.id=pps.service_id
      where pps.partner_id=${partnerId}
      order by
        case pps.status when 'submitted' then 0 when 'approved' then 1 else 2 end,
        pps.created_at desc
      limit 200
    `,
    sql`
      select
        s.name_ar as service_name,
        pc.base_cost,
        pc.currency,
        pc.normal_lead_hours,
        pc.urgent_lead_hours,
        pc.daily_capacity,
        pc.is_active
      from partner_capabilities pc
      join services s on s.id=pc.service_id
      where pc.partner_id=${partnerId}
      order by s.name_ar
    `,
    sql`
      select id,document_type,reference_number,expires_at,verification_status
      from partner_compliance_documents
      where partner_id=${partnerId}
      order by expires_at nulls last,created_at desc
    `,
    sql`
      select
        overall_score,quality_score,on_time_score,cost_score,response_score,jobs_count,calculated_at
      from partner_score_snapshots
      where partner_id=${partnerId}
      order by calculated_at desc
      limit 20
    `,
    sql`
      select ae.action,ae.created_at,au.display_name as actor_name
      from audit_events ae
      left join app_users au on au.id=ae.actor_id
      where ae.entity_type='partner' and ae.entity_id=${partnerId}
      order by ae.created_at desc
      limit 30
    `
  ]);

  const metadata=(p.metadata&&typeof p.metadata==="object"&&!Array.isArray(p.metadata))
    ? p.metadata as Record<string,unknown>
    : {};

  return {
    partner:{
      id:String(p.id),
      name:String(p.display_name),
      legalName:String(p.legal_name),
      tradeName:p.trade_name?String(p.trade_name):null,
      status:String(p.status),
      city:p.city?String(p.city):null,
      address:p.address?String(p.address):null,
      phone:p.phone?String(p.phone):null,
      email:p.email?String(p.email):null,
      pricingTerms:p.pricing_terms?String(p.pricing_terms):null,
      settlementTerms:p.settlement_terms?String(p.settlement_terms):null,
      performanceScore:p.performance_score===null?null:Number(p.performance_score),
      metadata,
      createdAt:new Date(String(p.created_at)).toISOString()
    },
    machines:machines.map(row=>({
      id:String(row.id),
      name:String(row.name),
      type:String(row.machine_type),
      brand:row.brand?String(row.brand):null,
      model:row.model?String(row.model):null,
      status:String(row.status)
    })),
    prices:prices.map(row=>({
      id:String(row.id),
      service:String(row.service_name),
      serviceSlug:String(row.service_slug),
      baseCost:row.base_cost===null?null:Number(row.base_cost),
      minimumQuantity:row.minimum_quantity===null?null:Number(row.minimum_quantity),
      normalLeadHours:row.normal_lead_hours===null?null:Number(row.normal_lead_hours),
      urgentLeadHours:row.urgent_lead_hours===null?null:Number(row.urgent_lead_hours),
      currency:String(row.currency??"YER"),
      status:String(row.status),
      validFrom:String(row.valid_from),
      validUntil:row.valid_until?String(row.valid_until):null,
      createdAt:new Date(String(row.created_at)).toISOString()
    })),
    capabilities:capabilities.map(row=>({
      service:String(row.service_name),
      baseCost:row.base_cost===null?null:Number(row.base_cost),
      currency:String(row.currency??"YER"),
      normalLeadHours:row.normal_lead_hours===null?null:Number(row.normal_lead_hours),
      urgentLeadHours:row.urgent_lead_hours===null?null:Number(row.urgent_lead_hours),
      dailyCapacity:row.daily_capacity===null?null:Number(row.daily_capacity),
      active:Boolean(row.is_active)
    })),
    compliance:compliance.map(row=>({
      id:String(row.id),
      type:String(row.document_type),
      reference:row.reference_number?String(row.reference_number):null,
      expiresAt:row.expires_at?String(row.expires_at):null,
      status:String(row.verification_status)
    })),
    scoreHistory:scores.map(row=>({
      overall:Number(row.overall_score),
      quality:row.quality_score===null?null:Number(row.quality_score),
      onTime:row.on_time_score===null?null:Number(row.on_time_score),
      cost:row.cost_score===null?null:Number(row.cost_score),
      response:row.response_score===null?null:Number(row.response_score),
      jobs:Number(row.jobs_count??0),
      calculatedAt:new Date(String(row.calculated_at)).toISOString()
    })),
    audit:audit.map(row=>({
      action:String(row.action),
      createdAt:new Date(String(row.created_at)).toISOString(),
      actor:row.actor_name?String(row.actor_name):null
    }))
  };
}
