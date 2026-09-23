import Link from "next/link";
import { requireCustomerAccess } from "@/lib/auth/customer-access";
import { getCustomerPortalSnapshot } from "@/lib/customer-portal";
import { acceptCustomerQuoteAction } from "./actions";

export const dynamic="force-dynamic";

export default async function AccountPage(){
  const access=await requireCustomerAccess();
  const snapshot=await getCustomerPortalSnapshot(access.customerId);

  return <main className="customer-account-page">
    <section className="customer-account-head">
      <div>
        <span className="eyebrow">ORYX DIGITAL OFFICE</span>
        <h1>مرحبًا، {access.name}</h1>
        <p>طلباتك وفواتيرك ومكافآتك في مكان واحد.</p>
      </div>
      <div className="account-actions">
        <Link className="primary-button" href="/order/new">طلب جديد</Link>
        <Link className="secondary-button" href="/auth/sign-out">تسجيل الخروج</Link>
      </div>
    </section>

    <section className="customer-account-kpis">
      <article><small>طلباتك</small><strong>{snapshot.orders.length}</strong></article>
      <article><small>النقاط</small><strong>{snapshot.loyalty.points}</strong></article>
      <article><small>المستوى</small><strong>{snapshot.loyalty.tier}</strong></article>
      <article><small>عروض أسعار</small><strong>{snapshot.quotes.length}</strong></article>
    </section>

    <section className="customer-account-section">
      <div className="account-section-head"><h2>الطلبات</h2><Link href="/track">تتبع برقم الطلب ←</Link></div>
      <div className="customer-order-list">
        {snapshot.orders.length?snapshot.orders.map(order=><article key={order.id}>
          <div><small>طلب ORYX</small><strong>#{order.number}</strong></div>
          <span>{order.items} عنصر</span>
          <span className="status-pill">{order.status}</span>
          <span>{new Date(order.createdAt).toLocaleDateString("ar-YE")}</span>
          <b>{order.total.toLocaleString("en-US")} {order.currency}</b>
        </article>):<div className="account-empty"><strong>لا توجد طلبات مرتبطة بالحساب بعد.</strong><p>ابدأ طلبًا جديدًا أو استخدم التتبع للطلبات السابقة.</p></div>}
      </div>
    </section>

    <section className="customer-account-section">
      <div className="account-section-head"><h2>عروض الأسعار</h2></div>
      <div className="customer-order-list">
        {snapshot.quotes.length?snapshot.quotes.map(quote=><article key={quote.id}>
          <div><small>عرض سعر</small><strong>#{quote.number}</strong></div>
          <span className="status-pill">{quote.status}</span>
          <span>{quote.validUntil??"—"}</span>
          <b>{quote.total.toLocaleString("en-US")} {quote.currency}</b>
          {quote.status==="sent"?<form action={acceptCustomerQuoteAction}>
            <input type="hidden" name="quoteId" value={quote.id}/>
            <button className="quote-accept-button" type="submit">اعتماد العرض</button>
          </form>:<span>{quote.status==="accepted"?"معتمد":"مغلق"}</span>}
        </article>):<div className="account-empty">لا توجد عروض أسعار مرسلة إليك.</div>}
      </div>
    </section>

    <section className="customer-account-section">
      <div className="account-section-head"><h2>الفواتير</h2></div>
      <div className="customer-order-list">
        {snapshot.invoices.length?snapshot.invoices.map(invoice=><article key={invoice.id}>
          <div><small>فاتورة</small><strong>#{invoice.number}</strong></div>
          <span className="status-pill">{invoice.status}</span>
          <span>{invoice.dueDate??"—"}</span>
          <b>{invoice.total.toLocaleString("en-US")} {invoice.currency}</b>
        </article>):<div className="account-empty">لا توجد فواتير بعد.</div>}
      </div>
    </section>
  </main>;
}
