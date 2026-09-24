import { getSql } from "@/lib/db";
import { rankProductionPartners, type RankedCandidate } from "@/lib/partner-routing";

export async function getRankedPartnersForService(serviceSlug:string):Promise<RankedCandidate[]>{
  const sql=getSql();
  const rows=await sql`
    select
      prc.partner_id,
      prc.partner_name,
      prc.base_cost,
      prc.normal_lead_hours,
      prc.daily_capacity,
      prc.performance_score,
      prc.active_jobs
    from partner_routing_candidates prc
    join services s on s.id=prc.service_id
    where s.slug=${serviceSlug}
  `;

  return rankProductionPartners(rows.map(row=>({
    partnerId:String(row.partner_id),
    partnerName:String(row.partner_name),
    baseCost:row.base_cost===null?null:Number(row.base_cost),
    normalLeadHours:row.normal_lead_hours===null?null:Number(row.normal_lead_hours),
    dailyCapacity:row.daily_capacity===null?null:Number(row.daily_capacity),
    performanceScore:row.performance_score===null?null:Number(row.performance_score),
    activeJobs:Number(row.active_jobs??0)
  })));
}
