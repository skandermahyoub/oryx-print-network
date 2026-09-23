import Link from "next/link";
import { getFinanceSnapshot } from "@/lib/admin-finance";
import { createExpenseAction, createPartnerSettlementAction, markSettlementPaidAction } from "./actions";

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

    <section className="finance-ops-grid">
      <article className="finance-op-card">
        <h2>تسجيل مصروف</h2>
        <form action={createExpenseAction}>
          <input name="category" required placeholder="التصنيف: توصيل، مكتب، تسويق..."/>
          <input name="vendor" placeholder="المورد/الجهة"/>
          <input name="amount" type="number" min="0.01" step="0.01" required placeholder="المبلغ"/>
          <input name="date" type="date"/>
          <textarea name="notes" rows={3} placeholder="ملاحظات"/>
          <button type="submit">تسجيل المصروف</button>
        </form>
      </article>

      <article className="finance-op-card">
        <h2>تسوية شريك إنتاج</h2>
        <form action={createPartnerSettlementAction}>
          <select name="partnerId" required defaultValue="">
            <option value="" disabled>اختر الشريك</option>
            {finance.partners.map(partner=><option key={partner.id} value={partner.id}>{partner.name}</option>)}
          </select>
          <input name="periodStart" type="date" required/>
          <input name="periodEnd" type="date" required/>
          <input name="amount" type="number" min="0.01" step="0.01" required placeholder="المبلغ"/>
          <input name="reference" placeholder="مرجع داخلي"/>
          <button type="submit">إنشاء التسوية</button>
        </form>
      </article>
    </section>

    <section className="admin-list-shell finance-settlement-shell">
      <div className="logistics-section-head"><h2>تسويات الشركاء</h2><span>{finance.settlements.length}</span></div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>الشريك</th><th>الفترة</th><th>المبلغ</th><th>الحالة</th><th>المرجع</th><th>الإجراء</th></tr></thead>
          <tbody>{finance.settlements.length?finance.settlements.map(item=><tr key={item.id}>
            <td><strong>{item.partner}</strong></td>
            <td>{item.periodStart??"—"} → {item.periodEnd??"—"}</td>
            <td>{money(item.amount)} {item.currency}</td>
            <td><span className="status-pill">{item.status}</span></td>
            <td>{item.reference??"—"}</td>
            <td>{item.status==="pending"?<form action={markSettlementPaidAction} className="settlement-pay-form">
              <input type="hidden" name="settlementId" value={item.id}/>
              <input name="reference" placeholder="مرجع الدفع"/>
              <button type="submit">تم الدفع</button>
            </form>:item.paidAt?new Date(item.paidAt).toLocaleString("ar-YE"):"—"}</td>
          </tr>):<tr><td colSpan={6} className="empty-cell">لا توجد تسويات بعد.</td></tr>}</tbody>
        </table>
      </div>
    </section>

    <section className="admin-list-shell finance-expense-shell">
      <div className="logistics-section-head"><h2>آخر المصروفات</h2><span>{finance.expenses.length}</span></div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>التاريخ</th><th>التصنيف</th><th>الجهة</th><th>المبلغ</th><th>الملاحظات</th></tr></thead>
          <tbody>{finance.expenses.length?finance.expenses.map(item=><tr key={item.id}>
            <td>{item.date}</td><td>{item.category}</td><td>{item.vendor??"—"}</td><td>{money(item.amount)} {item.currency}</td><td>{item.notes??"—"}</td>
          </tr>):<tr><td colSpan={5} className="empty-cell">لا توجد مصروفات مسجلة.</td></tr>}</tbody>
        </table>
      </div>
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
