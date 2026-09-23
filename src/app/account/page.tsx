import Link from "next/link";
import { requireCustomerAccess } from "@/lib/auth/customer-access";
import { getCustomerPortalSnapshot } from "@/lib/customer-portal";
import { acceptCustomerQuoteAction, decideCustomerDesignAction } from "./actions";

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
      <article><small>تصاميم للمراجعة</small><strong>{snapshot.designs.filter(item=>item.status==="waiting_approval").length}</strong></article>
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
      <div className="account-section-head"><h2>اعتماد التصميم</h2></div>
      <div className="customer-design-list">
        {snapshot.designs.length?snapshot.designs.map(design=><article key={design.designVersionId}>
          <header>
            <div><small>طلب #{design.orderNumber} · V{design.versionNumber}</small><strong>{design.service}</strong></div>
            <span className="status-pill">{design.decision??design.status}</span>
          </header>
          <div className="customer-design-meta">
            <span><b>النسخة</b>V{design.versionNumber}</span>
            <span><b>الملف</b>{design.fileName??"سيظهر الملف عند ربط التخزين"}</span>
            <span><b>التاريخ</b>{new Date(design.createdAt).toLocaleString("ar-YE")}</span>
          </div>
          {design.notes?<p>{design.notes}</p>:null}
          {design.status==="waiting_approval"&&!design.decision?<form action={decideCustomerDesignAction} className="customer-design-decision">
            <input type="hidden" name="designVersionId" value={design.designVersionId}/>
            <textarea name="notes" rows={2} placeholder="ملاحظاتك على النسخة — اختياري"/>
            <div>
              <button name="decision" value="approved" className="approve" type="submit">APPROVED FOR PRODUCTION</button>
              <button name="decision" value="revision_requested" className="revision" type="submit">طلب تعديل</button>
              <button name="decision" value="rejected" className="reject" type="submit">رفض النسخة</button>
            </div>
          </form>:null}
        </article>):<div className="account-empty">لا توجد تصاميم مرتبطة بحسابك بعد.</div>}
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
