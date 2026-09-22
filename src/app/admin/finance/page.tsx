import Link from "next/link";
import { getFinanceSnapshot } from "@/lib/admin-finance";

export default async function FinancePage(){
  const finance=await getFinanceSnapshot();

  const money=(value:number)=>value.toLocaleString("en-US");

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX FINANCE</span>
        <h1>المالية والربحية</h1>
        <p>الإيراد وحده لا يخبرنا بشيء. نربط سعر العميل بتكلفة الخامة والماكينة والتصميم والشريك والهالك والتوصيل للوصول إلى ربح الطلب الحقيقي.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="finance-kpis">
      <article><small>فواتير</small><strong>{money(finance.totals.invoiced)}</strong></article>
      <article><small>محصل</small><strong>{money(finance.totals.collected)}</strong></article>
      <article><small>ذمم العملاء</small><strong>{money(finance.totals.receivables)}</strong></article>
      <article><small>مصروفات</small><strong>{money(finance.totals.expenses)}</strong></article>
      <article><small>مستحقات شركاء</small><strong>{money(finance.totals.partnerPayables)}</strong></article>
      <article><small>ربح إجمالي محقق</small><strong>{money(finance.totals.realizedGrossProfit)}</strong></article>
    </section>

    <section className="admin-list-shell">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>الفاتورة</th><th>العميل</th><th>الحالة</th><th>الإجمالي</th><th>المدفوع</th><th>الاستحقاق</th></tr></thead>
          <tbody>
            {finance.invoices.length?finance.invoices.map(invoice=><tr key={invoice.id}>
              <td><strong>#{invoice.number}</strong></td><td>{invoice.customer}</td><td><span className="status-pill">{invoice.status}</span></td>
              <td>{money(invoice.total)} {invoice.currency}</td><td>{money(invoice.paid)} {invoice.currency}</td><td>{invoice.dueDate??"—"}</td>
            </tr>):<tr><td colSpan={6} className="empty-cell">لا توجد فواتير بعد.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  </main>;
}
