import { getSql } from "@/lib/db";

export type PartnerPortalSnapshot={
  partner:{name:string;status:string;city:string|null;score:number|null};
  jobs:Array<{
    id:string;
    workOrderNumber:number;
    orderNumber:number;
    service:string;
    status:string;
    quotedCost:number|null;
    currency:string;
    leadHours:number|null;
    promisedAt:string|null;
  }>;
  prices:Array<{
    id:string;
    service:string;
    baseCost:number|null;
    currency:string;
    status:string;
    validUntil:string|null;
  }>;
  machines:Array<{id:string;name:string;type:string;status:string}>;
  settlements:Array<{id:string;amount:number;currency:string;status:string;paidAt:string|null}>;
};

export async function getPartnerPortalSnapshot(partnerId:string):Promise<PartnerPortalSnapshot>{
  const sql=getSql();
  const [partnerRows,jobs,prices,machines,settlements]=await Promise.all([
    sql`
      select coalesce(trade_name,legal_name) as name,status,city,performance_score
      from partners where id=${partnerId} limit 1
    `,
    sql`
      select
        pj.id,
        wo.work_order_number,
        o.order_number,
        s.name_ar as service_name,
        pj.status,
        pj.quoted_cost,
        pj.currency,
        pj.lead_hours,
        wo.promised_at
      from partner_jobs pj
      join work_orders wo on wo.id=pj.work_order_id
      join order_items oi on oi.id=wo.order_item_id
      join orders o on o.id=oi.order_id
      join services s on s.id=oi.service_id
      where pj.partner_id=${partnerId}
        and pj.status not in ('completed','cancelled','declined')
      order by wo.promised_at nulls last,pj.created_at desc
      limit 100
    `,
    sql`
      select pps.id,s.name_ar as service_name,pps.base_cost,pps.currency,pps.status,pps.valid_until
      from partner_price_submissions pps
      join services s on s.id=pps.service_id
      where pps.partner_id=${partnerId}
      order by pps.created_at desc
      limit 100
    `,
    sql`
      select id,name,machine_type,status
      from partner_machines
      where partner_id=${partnerId}
      order by status,name
    `,
    sql`
      select id,amount,currency,status,paid_at
      from partner_settlements
      where partner_id=${partnerId}
      order by created_at desc
      limit 50
    `
  ]);

  const partner=partnerRows[0];
  return {
    partner:{
      name:String(partner?.name??"شريك ORYX"),
      status:String(partner?.status??"unknown"),
      city:partner?.city?String(partner.city):null,
      score:partner?.performance_score===null||partner?.performance_score===undefined?null:Number(partner.performance_score)
    },
    jobs:jobs.map(row=>({
      id:String(row.id),
      workOrderNumber:Number(row.work_order_number),
      orderNumber:Number(row.order_number),
      service:String(row.service_name),
      status:String(row.status),
      quotedCost:row.quoted_cost===null?null:Number(row.quoted_cost),
      currency:String(row.currency??"YER"),
      leadHours:row.lead_hours===null?null:Number(row.lead_hours),
      promisedAt:row.promised_at?new Date(String(row.promised_at)).toISOString():null
    })),
    prices:prices.map(row=>({
      id:String(row.id),
      service:String(row.service_name),
      baseCost:row.base_cost===null?null:Number(row.base_cost),
      currency:String(row.currency??"YER"),
      status:String(row.status),
      validUntil:row.valid_until?String(row.valid_until):null
    })),
    machines:machines.map(row=>({
      id:String(row.id),
      name:String(row.name),
      type:String(row.machine_type),
      status:String(row.status)
    })),
    settlements:settlements.map(row=>({
      id:String(row.id),
      amount:Number(row.amount??0),
      currency:String(row.currency??"YER"),
      status:String(row.status),
      paidAt:row.paid_at?new Date(String(row.paid_at)).toISOString():null
    }))
  };
}
