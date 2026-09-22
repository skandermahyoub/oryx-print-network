export type RoutingCandidate={
  partnerId:string;
  partnerName:string;
  baseCost:number|null;
  normalLeadHours:number|null;
  dailyCapacity:number|null;
  performanceScore:number|null;
  activeJobs?:number;
};

export type RankedCandidate=RoutingCandidate&{
  score:number;
  reasons:string[];
};

function clamp(value:number,min=0,max=1){
  return Math.min(max,Math.max(min,value));
}

export function rankProductionPartners(candidates:RoutingCandidate[]):RankedCandidate[]{
  const eligible=candidates.filter(candidate=>candidate.baseCost!==null);
  if(!eligible.length) return [];

  const costs=eligible.map(candidate=>candidate.baseCost as number);
  const leads=eligible.map(candidate=>candidate.normalLeadHours??Math.max(...eligible.map(c=>c.normalLeadHours??0),1));
  const minCost=Math.min(...costs);
  const maxCost=Math.max(...costs);
  const minLead=Math.min(...leads);
  const maxLead=Math.max(...leads);

  return eligible.map(candidate=>{
    const cost=candidate.baseCost as number;
    const lead=candidate.normalLeadHours??maxLead;
    const quality=clamp((candidate.performanceScore??70)/100);
    const costScore=maxCost===minCost?1:1-(cost-minCost)/(maxCost-minCost);
    const speedScore=maxLead===minLead?1:1-(lead-minLead)/(maxLead-minLead);
    const capacity=candidate.dailyCapacity??0;
    const capacityScore=clamp(capacity/(capacity+10));
    const workloadScore=1-clamp((candidate.activeJobs??0)/10);

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
  }).sort((a,b)=>b.score-a.score);
}
