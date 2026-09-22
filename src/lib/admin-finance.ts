import { databaseConfigured, getSql } from "@/lib/db";

export type FinanceSnapshot={
  totals:{
    invoiced:number;
    collected:number;
    receivables:number;
    expenses:number;
    partnerPayables:number;
    realizedGrossProfit:number;
  };
  invoices:Array<{
    id:string;
    number:number;
    customer:string;
    status:string;
    total:number;
    paid:number;
    currency:string;
    dueDate:string|null;
  }>;
};

const empty:FinanceSnapshot={totals:{invoiced:0,collected:0,receivables:0,expenses:0,partnerPayables:0,realizedGrossProfit:0},invoices:[]};

export async function getFinanceSnapshot():Promise<FinanceSnapshot>{
  if(!databaseConfigured()) return empty;
  try{
    const sql=getSql();
    const [totals,invoices]=await Promise.all([
      sql`
        select
          (select coalesce(sum(total),0)::numeric(16,2) from invoices where status<>'cancelled') as invoiced,
          (select coalesce(sum(amount),0)::numeric(16,2) from payments where status='received') as collected,
          (select coalesce(sum(greatest(total-amount_paid,0)),0)::numeric(16,2) from invoices where status not in ('paid','cancelled')) as receivables,
          (select coalesce(sum(amount),0)::numeric(16,2) from expenses) as expenses,
          (select coalesce(sum(amount),0)::numeric(16,2) from partner_settlements where status='pending') as partner_payables,
          (select coalesce(sum(gross_profit),0)::numeric(16,2) from order_item_profitability where gross_profit is not null) as realized_gross_profit
      `,
      sql`
        select
          i.id,i.invoice_number,i.status,i.total,i.amount_paid,i.currency,i.due_date,
          coalesce(c.company_name,c.display_name,'—') as customer_name
        from invoices i
        left join customers c on c.id=i.customer_id
        order by i.created_at desc
        limit 100
      `
    ]);
    const t=totals[0];
    return {
      totals:{
        invoiced:Number(t?.invoiced??0),
        collected:Number(t?.collected??0),
        receivables:Number(t?.receivables??0),
        expenses:Number(t?.expenses??0),
        partnerPayables:Number(t?.partner_payables??0),
        realizedGrossProfit:Number(t?.realized_gross_profit??0)
      },
      invoices:invoices.map(row=>({
        id:String(row.id),
        number:Number(row.invoice_number),
        customer:String(row.customer_name),
        status:String(row.status),
        total:Number(row.total??0),
        paid:Number(row.amount_paid??0),
        currency:String(row.currency??"YER"),
        dueDate:row.due_date?String(row.due_date):null
      }))
    };
  }catch{
    return empty;
  }
}
