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
  partners:Array<{id:string;name:string}>;
  settlements:Array<{
    id:string;partner:string;periodStart:string|null;periodEnd:string|null;amount:number;currency:string;status:string;paidAt:string|null;reference:string|null;
  }>;
  expenses:Array<{
    id:string;category:string;vendor:string|null;amount:number;currency:string;date:string;notes:string|null;
  }>;
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

const empty:FinanceSnapshot={totals:{invoiced:0,collected:0,receivables:0,expenses:0,partnerPayables:0,realizedGrossProfit:0},partners:[],settlements:[],expenses:[],invoices:[]};

export async function getFinanceSnapshot():Promise<FinanceSnapshot>{
  if(!databaseConfigured()) return empty;
  try{
    const sql=getSql();
    const [totals,invoices,partners,settlements,expenses]=await Promise.all([
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
      `,
      sql`
        select id,coalesce(trade_name,legal_name) as name
        from partners
        where status='active'
        order by coalesce(trade_name,legal_name)
      `,
      sql`
        select
          ps.id,ps.period_start,ps.period_end,ps.amount,ps.currency,ps.status,ps.paid_at,ps.reference,
          coalesce(p.trade_name,p.legal_name) as partner_name
        from partner_settlements ps
        join partners p on p.id=ps.partner_id
        order by ps.created_at desc
        limit 100
      `,
      sql`
        select id,category,vendor_name,amount,currency,expense_date,notes
        from expenses
        order by expense_date desc,created_at desc
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
      partners:partners.map(row=>({id:String(row.id),name:String(row.name)})),
      settlements:settlements.map(row=>({
        id:String(row.id),partner:String(row.partner_name),periodStart:row.period_start?String(row.period_start):null,
        periodEnd:row.period_end?String(row.period_end):null,amount:Number(row.amount??0),currency:String(row.currency??"YER"),
        status:String(row.status),paidAt:row.paid_at?new Date(String(row.paid_at)).toISOString():null,reference:row.reference?String(row.reference):null
      })),
      expenses:expenses.map(row=>({
        id:String(row.id),category:String(row.category),vendor:row.vendor_name?String(row.vendor_name):null,
        amount:Number(row.amount??0),currency:String(row.currency??"YER"),date:String(row.expense_date),notes:row.notes?String(row.notes):null
      })),
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
