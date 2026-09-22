import { databaseConfigured, getSql } from "@/lib/db";

export type ProductionSnapshot={
  workOrders:Array<{
    id:string;
    number:number;
    service:string;
    partner:string|null;
    status:string;
    priority:string;
    promisedAt:string|null;
    currentStep:string|null;
    orderNumber:number;
  }>;
  totals:{
    queued:number;
    inProgress:number;
    qc:number;
    rework:number;
    overdue:number;
  };
};

const empty:ProductionSnapshot={workOrders:[],totals:{queued:0,inProgress:0,qc:0,rework:0,overdue:0}};

export async function getProductionSnapshot():Promise<ProductionSnapshot>{
  if(!databaseConfigured()) return empty;
  try{
    const sql=getSql();
    const [orders,totals]=await Promise.all([
      sql`
        select
          wo.id,
          wo.work_order_number,
          wo.status,
          wo.priority,
          wo.current_step_key,
          wo.promised_at,
          s.name_ar as service_name,
          coalesce(p.trade_name,p.legal_name) as partner_name,
          o.order_number
        from work_orders wo
        join order_items oi on oi.id=wo.order_item_id
        join orders o on o.id=oi.order_id
        join services s on s.id=oi.service_id
        left join partners p on p.id=wo.partner_id
        where wo.status not in ('completed','cancelled')
        order by
          case wo.priority when 'urgent' then 0 when 'high' then 1 else 2 end,
          wo.promised_at nulls last,
          wo.created_at asc
        limit 100
      `,
      sql`
        select
          count(*) filter (where status='queued')::integer as queued,
          count(*) filter (where status in ('started','in_progress','paused'))::integer as in_progress,
          (select count(*)::integer from qc_inspections where status='pending') as qc,
          (select count(*)::integer from rework_orders where status not in ('completed','cancelled')) as rework,
          count(*) filter (
            where promised_at is not null
              and promised_at<now()
              and status not in ('completed','cancelled')
          )::integer as overdue
        from work_orders
      `
    ]);
    const t=totals[0];
    return {
      workOrders:orders.map(row=>({
        id:String(row.id),
        number:Number(row.work_order_number),
        service:String(row.service_name),
        partner:row.partner_name?String(row.partner_name):null,
        status:String(row.status),
        priority:String(row.priority),
        promisedAt:row.promised_at?new Date(String(row.promised_at)).toISOString():null,
        currentStep:row.current_step_key?String(row.current_step_key):null,
        orderNumber:Number(row.order_number)
      })),
      totals:{
        queued:Number(t?.queued??0),
        inProgress:Number(t?.in_progress??0),
        qc:Number(t?.qc??0),
        rework:Number(t?.rework??0),
        overdue:Number(t?.overdue??0)
      }
    };
  }catch{
    return empty;
  }
}
