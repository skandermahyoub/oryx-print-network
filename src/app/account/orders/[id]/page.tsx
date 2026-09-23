import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCustomerAccess } from "@/lib/auth/customer-access";
import { getCustomerOrderDetail } from "@/lib/customer-order-detail";

export const dynamic="force-dynamic";

const statusLabels:Record<string,string>={
  draft:"مسودة",
  submitted:"تم الاستلام",
  under_review:"قيد المراجعة",
  waiting_quote:"قيد التسعير",
  quote_sent:"تم إرسال عرض السعر",
  waiting_payment:"بانتظار الدفع",
  design_required:"يحتاج تصميم",
  designing:"قيد التصميم",
  waiting_design_approval:"بانتظار اعتماد التصميم",
  approved_for_production:"معتمد للإنتاج",
  in_production:"قيد الإنتاج",
  quality_control:"فحص الجودة",
  ready:"جاهز",
  pickup_scheduled:"تم جدولة الاستلام",
  delivery_scheduled:"تم جدولة التوصيل",
  completed:"مكتمل",
  cancelled:"ملغي"
};

function label(value:string|null){
  if(!value) return "—";
  return statusLabels[value]??value;
}

export default async function CustomerOrderPage({params}:{params:Promise<{id:string}>}){
  const access=await requireCustomerAccess();
  const {id}=await params;
  const detail=await getCustomerOrderDetail(access.customerId,id);
  if(!detail) notFound();

  return <main className="customer-order-detail-page">
    <section className="customer-order-detail-head">
      <div>
        <Link href="/account">المكتب الرقمي ←</Link>
        <span className="eyebrow">ORYX ORDER #{detail.order.number}</span>
        <h1>{label(detail.order.status)}</h1>
        <p>أنشئ في {new Date(detail.order.createdAt).toLocaleString("ar-YE")}</p>
      </div>
      <div className="customer-order-total">
        <small>الإجمالي الحالي</small>
        <strong>{detail.order.total.toLocaleString("en-US")} {detail.order.currency}</strong>
        <span>{detail.items.length} عناصر</span>
      </div>
    </section>

    <section className="customer-order-detail-grid">
      <div className="customer-order-main">
        <section className="customer-account-section">
          <div className="account-section-head"><h2>عناصر الطلب</h2><span>{detail.items.length}</span></div>
          <div className="customer-order-items">
            {detail.items.map(item=><article key={item.id}>
              <div><Link href={`/services/${item.serviceSlug}`}><strong>{item.service}</strong></Link><small>الكمية {item.quantity}</small></div>
              <span><b>التصميم</b>{item.designStatus?label(item.designStatus):"—"}</span>
              <span><b>الإنتاج</b>{item.productionStep??(item.productionStatus?label(item.productionStatus):"—")}</span>
              <span><b>السعر</b>{item.totalPrice===null?"قيد التسعير":`${item.totalPrice.toLocaleString("en-US")} ${detail.order.currency}`}</span>
            </article>)}
          </div>
        </section>

        <section className="customer-account-section">
          <div className="account-section-head"><h2>العروض والفواتير</h2></div>
          <div className="customer-commercial-links">
            {detail.quotes.map(quote=><Link key={quote.id} href={`/documents/quotes/${quote.id}`}><small>QUOTE #{quote.number}</small><strong>{quote.total.toLocaleString("en-US")} {quote.currency}</strong><span>{quote.status}</span></Link>)}
            {detail.invoices.map(invoice=><Link key={invoice.id} href={`/documents/invoices/${invoice.id}`}><small>INVOICE #{invoice.number}</small><strong>{invoice.total.toLocaleString("en-US")} {invoice.currency}</strong><span>{invoice.status} · مدفوع {invoice.paid.toLocaleString("en-US")}</span></Link>)}
            {!detail.quotes.length&&!detail.invoices.length?<p className="account-empty">لم يصدر عرض سعر أو فاتورة بعد.</p>:null}
          </div>
        </section>

        {(detail.delivery.length||detail.installation.length)?<section className="customer-account-section">
          <div className="account-section-head"><h2>التسليم والتركيب</h2></div>
          <div className="customer-logistics-list">
            {detail.delivery.map(job=><article key={job.id}><small>{job.type==="pickup"?"استلام":"توصيل"}</small><strong>{label(job.status)}</strong><span>{job.scheduledAt?new Date(job.scheduledAt).toLocaleString("ar-YE"):"لم يحدد موعد"}</span></article>)}
            {detail.installation.map(job=><article key={job.id}><small>تركيب</small><strong>{label(job.status)}</strong><span>{job.scheduledAt?new Date(job.scheduledAt).toLocaleString("ar-YE"):"لم يحدد موعد"}</span></article>)}
          </div>
        </section>:null}
      </div>

      <aside className="customer-order-timeline">
        <h2>رحلة الطلب</h2>
        {detail.timeline.length?detail.timeline.map((event,index)=><article key={`${event.to}-${index}`}>
          <span></span>
          <div><strong>{label(event.to)}</strong><small>{new Date(event.createdAt).toLocaleString("ar-YE")}</small>{event.reason?<p>{event.reason}</p>:null}</div>
        </article>):<article><span></span><div><strong>{label(detail.order.status)}</strong><small>{new Date(detail.order.createdAt).toLocaleString("ar-YE")}</small></div></article>}
      </aside>
    </section>
  </main>;
}
