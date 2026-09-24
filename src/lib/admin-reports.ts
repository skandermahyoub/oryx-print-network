import { databaseConfigured, getSql } from "@/lib/db";

export type AdminReports={
  periodDays:number;
  kpis:{
    orders:number;
    completed:number;
    invoiced:number;
    cashReceived:number;
    grossProfit:number;
    openReceivables:number;
    overdueInvoices:number;
  };
  pipeline:Array<{status:string;orders:number;value:number}>;
  topServices:Array<{name:string;orders:number;revenue:number;grossProfit:number}>;
  monthlyCash:Array<{month:string;amount:number}>;
  partnerPerformance:Array<{name:string;score:number|null;activeJobs:number;completedJobs:number}>;
  overdueWork:Array<{id:string;number:number;service:string;promisedAt:string;status:string}>;
};

const empty:AdminReports={
  periodDays:30,
  kpis:{orders:0,completed:0,invoiced:0,cashReceived:0,grossProfit:0,openReceivables:0,overdueInvoices:0},
  pipeline:[],topServices:[],monthlyCash:[],partnerPerformance:[],overdueWork:[]
};

export async function getAdminReports(periodDays=30):Promise<AdminReports>{
  if(!databaseConfigured()) return {...empty,periodDays};
  const sql=getSql();
  try{
    const [kpis,pipeline,topServices,monthlyCash,partnerPerformance,overdueWork]=await Promise.all([
      sql`
        select
          (select count(*)::integer from orders where created_at>=now()-make_interval(days=>${periodDays})) as orders,
          (select count(*)::integer from orders where status='completed' and updated_at>=now()-make_interval(days=>${periodDays})) as completed,
          (select coalesce(sum(total),0)::numeric(14,2) from invoices where status<>'cancelled' and created_at>=now()-make_interval(days=>${periodDays})) as invoiced,
          (select coalesce(sum(amount),0)::numeric(14,2) from payments where status='received' and paid_at>=now()-make_interval(days=>${periodDays})) as cash_received,
          (
            select coalesce(sum(oip.gross_profit),0)::numeric(14,2)
            from order_item_profitability oip
            join orders o on o.id=oip.order_id
            where o.created_at>=now()-make_interval(days=>${periodDays})
          ) as gross_profit,
          (
            select coalesce(sum(greatest(total-amount_paid,0)),0)::numeric(14,2)
            from invoices
            where status in ('issued','partial','overdue')
          ) as open_receivables,
          (
            select count(*)::integer
            from invoices
            where status in ('issued','partial','overdue')
              and due_date is not null
              and due_date<current_date
              and total>amount_paid
          ) as overdue_invoices
      `,
      sql`
        select
          status,
          count(*)::integer as orders,
          coalesce(sum(total),0)::numeric(14,2) as value
        from orders
        where status not in ('completed','cancelled')
        group by status
        order by count(*) desc,status
      `,
      sql`
        select
          s.name_ar,
          count(distinct oi.order_id)::integer as orders,
          coalesce(sum(oi.total_price),0)::numeric(14,2) as revenue,
          coalesce(sum(oip.gross_profit),0)::numeric(14,2) as gross_profit
        from order_items oi
        join services s on s.id=oi.service_id
        left join order_item_profitability oip on oip.order_item_id=oi.id
        join orders o on o.id=oi.order_id
        where o.created_at>=now()-make_interval(days=>${periodDays})
        group by s.id
        order by coalesce(sum(oi.total_price),0) desc,count(distinct oi.order_id) desc
        limit 12
      `,
      sql`
        with months as (
          select generate_series(
            date_trunc('month',current_date)-interval '5 months',
            date_trunc('month',current_date),
            interval '1 month'
          ) as month_start
        )
        select
          to_char(months.month_start,'YYYY-MM') as month_key,
          coalesce(sum(p.amount) filter (
            where p.status='received'
              and p.paid_at>=months.month_start
              and p.paid_at<months.month_start+interval '1 month'
          ),0)::numeric(14,2) as amount
        from months
        left join payments p
          on p.paid_at>=months.month_start
         and p.paid_at<months.month_start+interval '1 month'
        group by months.month_start
        order by months.month_start
      `,
      sql`
        select
          p.id,
          coalesce(p.trade_name,p.legal_name) as name,
          p.performance_score,
          count(distinct pj.id) filter (where pj.status not in ('completed','cancelled','declined'))::integer as active_jobs,
          count(distinct pj.id) filter (where pj.status='completed')::integer as completed_jobs
        from partners p
        left join partner_jobs pj on pj.partner_id=p.id
        where p.status='active'
        group by p.id
        order by p.performance_score desc nulls last,active_jobs desc
        limit 12
      `,
      sql`
        select
          wo.id,wo.work_order_number,wo.promised_at,wo.status,s.name_ar as service_name
        from work_orders wo
        join order_items oi on oi.id=wo.order_item_id
        join services s on s.id=oi.service_id
        where wo.promised_at is not null
          and wo.promised_at<now()
          and wo.status not in ('completed','cancelled')
        order by wo.promised_at asc
        limit 30
      `
    ]);

    const k=kpis[0];
    return {
      periodDays,
      kpis:{
        orders:Number(k?.orders??0),
        completed:Number(k?.completed??0),
        invoiced:Number(k?.invoiced??0),
        cashReceived:Number(k?.cash_received??0),
        grossProfit:Number(k?.gross_profit??0),
        openReceivables:Number(k?.open_receivables??0),
        overdueInvoices:Number(k?.overdue_invoices??0)
      },
      pipeline:pipeline.map(row=>({status:String(row.status),orders:Number(row.orders??0),value:Number(row.value??0)})),
      topServices:topServices.map(row=>({
        name:String(row.name_ar),orders:Number(row.orders??0),revenue:Number(row.revenue??0),grossProfit:Number(row.gross_profit??0)
      })),
      monthlyCash:monthlyCash.map(row=>({month:String(row.month_key),amount:Number(row.amount??0)})),
      partnerPerformance:partnerPerformance.map(row=>({
        name:String(row.name),score:row.performance_score===null?null:Number(row.performance_score),
        activeJobs:Number(row.active_jobs??0),completedJobs:Number(row.completed_jobs??0)
      })),
      overdueWork:overdueWork.map(row=>({
        id:String(row.id),number:Number(row.work_order_number),service:String(row.service_name),
        promisedAt:new Date(String(row.promised_at)).toISOString(),status:String(row.status)
      }))
    };
  }catch{
    return {...empty,periodDays};
  }
}
