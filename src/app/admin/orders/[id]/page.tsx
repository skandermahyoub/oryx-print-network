import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminOrderDetail } from "@/lib/admin-order-detail";
import { getSql } from "@/lib/db";
import {
  assignPartnerAction,
  createQuoteAction,
  createSourcingAction,
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
                  <span><b>التصميم</b>{item.designApproved?"معتمد":item.designStatus??"لا يوجد Design Job"}</span>
                  <span><b>الإنتاج</b>{item.workOrderNumber?`WO #${item.workOrderNumber} · ${item.workOrderStatus}`:"لم ينشأ أمر عمل"}</span>
                  <span><b>الشريك</b>{item.partner??"غير مسند"}</span>
                </div>

                <details className="spec-details">
                  <summary>المواصفات المسجلة</summary>
                  <pre>{JSON.stringify(item.specifications,null,2)}</pre>
                </details>

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
            </article>):<p className="empty-note">لم ينشأ عرض سعر بعد.</p>}
          </div>
        </div>
      </div>

      <aside className="admin-order-side">
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
