import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminOrderDetail } from "@/lib/admin-order-detail";
import { getSql } from "@/lib/db";
import { createDeliveryJobAction, createInstallationJobAction } from "@/app/admin/logistics/actions";
import {
  assignPartnerAction,
  createDesignJobAction,
  createQuoteAction,
  createSourcingAction,
  issueInvoiceAction,
  recordPaymentAction,
  sendQuoteAction,
  setOrderItemPriceAction,
  transitionOrderAction
} from "./actions";

export const dynamic="force-dynamic";

export default async function AdminOrderDetailPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const detail=await getAdminOrderDetail(id);
  if(!detail) notFound();

  const sql=getSql();
  const candidateRows=await sql`
    select
      sc.sourcing_request_id,
      sc.partner_id,
      coalesce(p.trade_name,p.legal_name) as partner_name,
      sc.rank,
      sc.routing_score,
      sc.base_cost,
      sc.currency,
      sc.lead_hours,
      sc.status
    from sourcing_candidates sc
    join partners p on p.id=sc.partner_id
    join sourcing_requests sr on sr.id=sc.sourcing_request_id
    join order_items oi on oi.id=sr.order_item_id
    where oi.order_id=${detail.order.id}
    order by sc.sourcing_request_id,sc.rank
  `;

  const candidateMap=new Map<string,Array<{
    partnerId:string;
    partnerName:string;
    rank:number;
    score:number;
    cost:number|null;
    currency:string;
    leadHours:number|null;
    status:string;
  }>>();

  for(const row of candidateRows){
    const requestId=String(row.sourcing_request_id);
    const list=candidateMap.get(requestId)??[];
    list.push({
      partnerId:String(row.partner_id),
      partnerName:String(row.partner_name),
      rank:Number(row.rank),
      score:Number(row.routing_score),
      cost:row.base_cost===null?null:Number(row.base_cost),
      currency:String(row.currency??"YER"),
      leadHours:row.lead_hours===null?null:Number(row.lead_hours),
      status:String(row.status)
    });
    candidateMap.set(requestId,list);
  }

  return <main className="admin-order-detail-page">
    <section className="admin-order-hero">
      <div>
        <Link href="/admin/orders" className="admin-back-link">الطلبات ←</Link>
        <span className="eyebrow">ORYX ORDER #{detail.order.number}</span>
        <h1>{detail.customer.company??detail.customer.name}</h1>
        <p>{detail.customer.name} · {detail.customer.phone??"بدون هاتف"} · {detail.customer.city??"بدون مدينة"}</p>
      </div>
      <div className="admin-order-hero-status">
        <small>الحالة الحالية</small>
        <strong>{detail.order.statusLabel}</strong>
        <span>{new Date(detail.order.createdAt).toLocaleString("ar-YE")}</span>
      </div>
    </section>

    <section className="admin-order-actions">
      <form action={createQuoteAction}>
        <input type="hidden" name="orderId" value={detail.order.id}/>
        <button type="submit">إنشاء عرض سعر</button>
      </form>
      <form action={issueInvoiceAction}>
        <input type="hidden" name="orderId" value={detail.order.id}/>
        <input type="hidden" name="dueDays" value="7"/>
        <button type="submit">إصدار فاتورة</button>
      </form>
      {detail.nextStatuses.map(status=><form action={transitionOrderAction} key={status.key}>
        <input type="hidden" name="orderId" value={detail.order.id}/>
        <input type="hidden" name="to" value={status.key}/>
        <button type="submit">{status.label}</button>
      </form>)}
    </section>

    <section className="admin-order-body">
      <div className="admin-order-main">
        <div className="admin-order-section">
          <div className="admin-order-section-head"><h2>عناصر الطلب</h2><span>{detail.items.length}</span></div>
          <div className="admin-order-items">
            {detail.items.map((item,index)=>{
              const candidates=item.sourcingRequestId?candidateMap.get(item.sourcingRequestId)??[]:[];
              return <article key={item.id}>
                <header>
                  <div><small>عنصر {index+1}</small><h3>{item.service}</h3></div>
                  <strong>{item.quantity}</strong>
                </header>

                <div className="admin-order-item-meta">
                  <span><b>السعر</b>{item.totalPrice===null?"غير مسعر":`${item.totalPrice.toLocaleString("en-US")} ${detail.order.currency}`}</span>
                  <span><b>التصميم</b>{item.requiresDesignApproval?(item.designApproved?"معتمد":item.designStatus??"يتطلب Design Job"):"غير مطلوب"}</span>
                  <span><b>الإنتاج</b>{item.workOrderNumber?`WO #${item.workOrderNumber} · ${item.workOrderStatus}`:"لم ينشأ أمر عمل"}</span>
                  <span><b>الشريك</b>{item.partner??"غير مسند"}</span>
                </div>

                <details className="spec-details">
                  <summary>المواصفات المسجلة</summary>
                  <pre>{JSON.stringify(item.specifications,null,2)}</pre>
                </details>

                {item.requiresDesignApproval?<div className="order-design-control">
                  {item.designJobId?<Link href={`/admin/design/${item.designJobId}`}>فتح Design Job ←</Link>:<form action={createDesignJobAction}>
                    <input type="hidden" name="orderId" value={detail.order.id}/>
                    <input type="hidden" name="orderItemId" value={item.id}/>
                    <button type="submit">ابدأ Design Job</button>
                  </form>}
                </div>:null}

                <form action={setOrderItemPriceAction} className="order-item-price-form">
                  <input type="hidden" name="orderId" value={detail.order.id}/>
                  <input type="hidden" name="orderItemId" value={item.id}/>
                  <label>سعر الوحدة
                    <input
                      name="unitPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      defaultValue={item.unitPrice??""}
                      placeholder="0"
                    />
                  </label>
                  <button type="submit">حفظ السعر</button>
                </form>

                {!item.sourcingRequestId?<form action={createSourcingAction} className="sourcing-action-form">
                  <input type="hidden" name="orderId" value={detail.order.id}/>
                  <input type="hidden" name="orderItemId" value={item.id}/>
                  <button type="submit">ابحث عن شركاء إنتاج</button>
                </form>:<div className="order-candidate-panel">
                  <div className="order-candidate-head"><strong>مرشحو الإنتاج</strong><span>{item.sourcingStatus}</span></div>
                  {candidates.map(candidate=><div className="order-candidate-row" key={candidate.partnerId}>
                    <span>#{candidate.rank}</span>
                    <div><strong>{candidate.partnerName}</strong><small>{candidate.score}% · {candidate.leadHours??"—"} ساعة</small></div>
                    <b>{candidate.cost===null?"بدون سعر":`${candidate.cost.toLocaleString("en-US")} ${candidate.currency}`}</b>
                    {candidate.status==="selected"?<em>مختار</em>:<form action={assignPartnerAction}>
                      <input type="hidden" name="orderId" value={detail.order.id}/>
                      <input type="hidden" name="sourcingRequestId" value={item.sourcingRequestId??""}/>
                      <input type="hidden" name="partnerId" value={candidate.partnerId}/>
                      <button type="submit">إسناد</button>
                    </form>}
                  </div>)}
                  {!candidates.length?<p className="empty-note">لا يوجد شريك مؤهل حاليًا.</p>:null}
                </div>}
              </article>;
            })}
          </div>
        </div>

        <div className="admin-order-section">
          <div className="admin-order-section-head"><h2>عروض الأسعار</h2><span>{detail.quotes.length}</span></div>
          <div className="quote-list">
            {detail.quotes.length?detail.quotes.map(quote=><article key={quote.id}>
              <div><small>QUOTE</small><strong>#{quote.number}</strong></div>
              <span>{quote.status}</span>
              <b>{quote.total.toLocaleString("en-US")} {quote.currency}</b>
              <small>{quote.validUntil?`صالح حتى ${quote.validUntil}`:"بدون تاريخ انتهاء"}</small>
              {quote.status==="draft"?<form action={sendQuoteAction} className="quote-send-form">
                <input type="hidden" name="orderId" value={detail.order.id}/>
                <input type="hidden" name="quoteId" value={quote.id}/>
                <button type="submit">إرسال للعميل</button>
              </form>:null}
            </article>):<p className="empty-note">لم ينشأ عرض سعر بعد.</p>}
          </div>
        </div>

        <div className="admin-order-section">
          <div className="admin-order-section-head"><h2>الفواتير والتحصيل</h2><span>{detail.invoices.length}</span></div>
          <div className="invoice-admin-list">
            {detail.invoices.length?detail.invoices.map(invoice=>{
              const outstanding=Math.max(0,invoice.total-invoice.paid);
              return <article key={invoice.id}>
                <div><small>INVOICE</small><strong>#{invoice.number}</strong></div>
                <span className="status-pill">{invoice.status}</span>
                <div><small>الإجمالي</small><b>{invoice.total.toLocaleString("en-US")} {invoice.currency}</b></div>
                <div><small>المحصل</small><b>{invoice.paid.toLocaleString("en-US")} {invoice.currency}</b></div>
                {outstanding>0&&invoice.status!=="cancelled"?<form action={recordPaymentAction} className="invoice-payment-form">
                  <input type="hidden" name="orderId" value={detail.order.id}/>
                  <input type="hidden" name="invoiceId" value={invoice.id}/>
                  <input name="amount" type="number" min="0.01" step="0.01" max={outstanding} required placeholder={String(outstanding)}/>
                  <select name="method" defaultValue="cash">
                    <option value="cash">نقدي</option>
                    <option value="bank_transfer">حوالة/بنك</option>
                    <option value="wallet">محفظة</option>
                    <option value="card">بطاقة</option>
                    <option value="other">أخرى</option>
                  </select>
                  <input name="reference" placeholder="مرجع الدفع"/>
                  <button type="submit">تسجيل دفعة</button>
                </form>:<strong className="invoice-paid-label">مسدد</strong>}
              </article>;
            }):<p className="empty-note">لا توجد فواتير لهذا الطلب.</p>}
          </div>
        </div>
      </div>

      <aside className="admin-order-side">
        {detail.order.status==="ready"?<div className="admin-order-section logistics-order-card">
          <h2>تجهيز التسليم</h2>
          <form action={createDeliveryJobAction} className="order-logistics-form">
            <input type="hidden" name="orderId" value={detail.order.id}/>
            <select name="deliveryType" defaultValue="delivery">
              <option value="delivery">توصيل</option>
              <option value="pickup">استلام من النقطة</option>
            </select>
            <input name="recipient" defaultValue={detail.customer.name} placeholder="اسم المستلم"/>
            <input name="phone" defaultValue={detail.customer.phone??""} placeholder="الهاتف"/>
            <input name="address" defaultValue={detail.customer.city??""} placeholder="العنوان"/>
            <input name="scheduledAt" type="datetime-local"/>
            <button type="submit">إنشاء مهمة تسليم</button>
          </form>

          <details className="installation-create-details">
            <summary>يحتاج تركيبًا ميدانيًا؟</summary>
            <form action={createInstallationJobAction} className="order-logistics-form">
              <input type="hidden" name="orderId" value={detail.order.id}/>
              <input name="address" defaultValue={detail.customer.city??""} placeholder="موقع التركيب"/>
              <input name="scheduledAt" type="datetime-local"/>
              <input name="technicianName" placeholder="اسم الفني"/>
              <input name="technicianPhone" placeholder="هاتف الفني"/>
              <button type="submit">إنشاء مهمة تركيب</button>
            </form>
          </details>
        </div>:null}

        <div className="admin-order-finance">
          <small>الإجمالي</small><strong>{detail.order.total.toLocaleString("en-US")} {detail.order.currency}</strong>
          <span>Subtotal {detail.order.subtotal.toLocaleString("en-US")}</span>
          <span>Discount {detail.order.discount.toLocaleString("en-US")}</span>
        </div>

        <div className="admin-order-timeline">
          <h2>سجل الحالة</h2>
          <article><span></span><div><strong>إنشاء الطلب</strong><small>{new Date(detail.order.createdAt).toLocaleString("ar-YE")}</small></div></article>
          {detail.timeline.map((event,index)=><article key={`${event.to}-${index}`}>
            <span></span><div><strong>{event.label}</strong><small>{new Date(event.createdAt).toLocaleString("ar-YE")}</small>{event.reason?<p>{event.reason}</p>:null}</div>
          </article>)}
        </div>
      </aside>
    </section>
  </main>;
}
