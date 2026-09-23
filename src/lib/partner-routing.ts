export type RoutingCandidate={
  partnerId:string;
  partnerName:string;
  baseCost:number|null;
  normalLeadHours:number|null;
  dailyCapacity:number|null;
  performanceScore:number|null;
  activeJobs?:number;
  isActive?:boolean;
  isApproved?:boolean;
  complianceValid?:boolean;
  serviceEligible?:boolean;
  availableCapacity?:number|null;
};

export type RankedCandidate=RoutingCandidate&{
  score:number;
  reasons:string[];
};

function clamp(value:number,min=0,max=1){
  return Math.min(max,Math.max(min,value));
}

export function isRoutingCandidateEligible(candidate:RoutingCandidate){
  if(candidate.baseCost===null||!Number.isFinite(candidate.baseCost)||candidate.baseCost<0) return false;
  if(candidate.isActive===false||candidate.isApproved===false||candidate.complianceValid===false||candidate.serviceEligible===false) return false;
  if(candidate.availableCapacity!==undefined&&candidate.availableCapacity!==null&&candidate.availableCapacity<=0) return false;
  return true;
}

export function rankProductionPartners(candidates:RoutingCandidate[]):RankedCandidate[]{
  const eligible=candidates.filter(isRoutingCandidateEligible);
  if(!eligible.length) return [];

  const costs=eligible.map(candidate=>candidate.baseCost as number);
  const knownLeads=eligible.map(candidate=>candidate.normalLeadHours).filter((value):value is number=>value!==null&&Number.isFinite(value)&&value>=0);
  const fallbackLead=Math.max(...knownLeads,1);
  const leads=eligible.map(candidate=>candidate.normalLeadHours??fallbackLead);
  const minCost=Math.min(...costs);
  const maxCost=Math.max(...costs);
  const minLead=Math.min(...leads);
  const maxLead=Math.max(...leads);

  return eligible.map(candidate=>{
    const cost=candidate.baseCost as number;
    const lead=candidate.normalLeadHours??fallbackLead;
    const quality=clamp((candidate.performanceScore??70)/100);
    const costScore=maxCost===minCost?1:1-(cost-minCost)/(maxCost-minCost);
    const speedScore=maxLead===minLead?1:1-(lead-minLead)/(maxLead-minLead);
    const capacity=Math.max(0,candidate.availableCapacity??candidate.dailyCapacity??0);
    const capacityScore=clamp(capacity/(capacity+10));
    const workloadScore=1-clamp(Math.max(0,candidate.activeJobs??0)/10);

    const score=(
      costScore*0.30+
      quality*0.30+
      speedScore*0.20+
      capacityScore*0.10+
      workloadScore*0.10
    )*100;

    const reasons=[
      `تكلفة: ${Math.round(costScore*100)}%`,
      `جودة: ${Math.round(quality*100)}%`,
      `سرعة: ${Math.round(speedScore*100)}%`,
      `طاقة: ${Math.round(capacityScore*100)}%`,
      `حمل حالي: ${Math.round(workloadScore*100)}%`
    ];

    return {...candidate,score:Number(score.toFixed(2)),reasons};
  }).sort((a,b)=>b.score-a.score||a.partnerId.localeCompare(b.partnerId));
}
