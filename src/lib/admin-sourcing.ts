import { databaseConfigured, getSql } from "@/lib/db";

export type SourcingRequestRow={
  id:string;
  orderNumber:number;
  service:string;
  quantity:number;
  status:string;
  urgent:boolean;
  requiredBy:string|null;
  candidates:Array<{
    partnerId:string;
    partnerName:string;
    rank:number;
    score:number;
    cost:number|null;
    currency:string;
    leadHours:number|null;
    candidateStatus:string;
  }>;
};

export async function getSourcingRequests(limit=100):Promise<SourcingRequestRow[]>{
  if(!databaseConfigured()) return [];
  try{
    const sql=getSql();
    const rows=await sql`
      select
        sr.id,
        sr.status,
        sr.requested_quantity,
        sr.required_by,
        sr.urgent,
        o.order_number,
        s.name_ar as service_name,
        coalesce(
          jsonb_agg(
            jsonb_build_object(
              'partnerId',p.id,
              'partnerName',coalesce(p.trade_name,p.legal_name),
              'rank',sc.rank,
              'score',sc.routing_score,
              'cost',sc.base_cost,
              'currency',sc.currency,
              'leadHours',sc.lead_hours,
              'candidateStatus',sc.status
            )
            order by sc.rank
          ) filter (where sc.id is not null),
          '[]'::jsonb
        ) as candidates
      from sourcing_requests sr
      join order_items oi on oi.id=sr.order_item_id
      join orders o on o.id=oi.order_id
      join services s on s.id=oi.service_id
      left join sourcing_candidates sc on sc.sourcing_request_id=sr.id
      left join partners p on p.id=sc.partner_id
      where sr.status not in ('closed','cancelled')
      group by sr.id,o.order_number,s.name_ar
      order by sr.urgent desc,sr.created_at desc
      limit ${limit}
    `;

    return rows.map(row=>({
      id:String(row.id),
      orderNumber:Number(row.order_number),
      service:String(row.service_name),
      quantity:Number(row.requested_quantity??1),
      status:String(row.status),
      urgent:Boolean(row.urgent),
      requiredBy:row.required_by?new Date(String(row.required_by)).toISOString():null,
      candidates:Array.isArray(row.candidates)?row.candidates.map((item:Record<string,unknown>)=>({
        partnerId:String(item.partnerId),
        partnerName:String(item.partnerName),
        rank:Number(item.rank),
        score:Number(item.score),
        cost:item.cost===null||item.cost===undefined?null:Number(item.cost),
        currency:String(item.currency??"YER"),
        leadHours:item.leadHours===null||item.leadHours===undefined?null:Number(item.leadHours),
        candidateStatus:String(item.candidateStatus)
      })):[]
    }));
  }catch{
    return [];
  }
}
