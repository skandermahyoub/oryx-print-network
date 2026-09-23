import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkOrderDetail } from "@/lib/admin-work-order-detail";
import {
  addWorkOrderCostAction,
  consumeWorkOrderMaterialAction,
  releaseWorkOrderMaterialAction,
  reserveWorkOrderMaterialAction
} from "./actions";

export const dynamic="force-dynamic";

export default async function WorkOrderPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const detail=await getWorkOrderDetail(id);
  if(!detail) notFound();

  const actualCost=detail.costs.filter(line=>!line.estimate).reduce((sum,line)=>sum+line.totalCost,0);
  const estimatedCost=detail.costs.filter(line=>line.estimate).reduce((sum,line)=>sum+line.totalCost,0);
  const openReservations=detail.reservations.filter(item=>["reserved","partially_consumed"].includes(item.status));

  return <main className="admin-work-order-page">
    <section className="admin-order-hero">
      <div>
        <Link href="/admin/production" className="admin-back-link">الإنتاج ←</Link>
        <span className="eyebrow">ORYX WORK ORDER</span>
        <h1>WO #{detail.workOrder.number}</h1>
        <p>{detail.workOrder.service} · طلب #{detail.workOrder.orderNumber} · {detail.workOrder.partner??"تنفيذ داخلي"}</p>
      </div>
      <div className="admin-order-hero-status">
        <small>الحالة</small>
        <strong>{detail.workOrder.status}</strong>
        <span>{detail.workOrder.currentStepName??detail.workOrder.currentStep??"بدون مرحلة نشطة"}</span>
      </div>
    </section>

    <section className="work-order-kpis">
      <article><small>كمية الطلب</small><strong>{detail.workOrder.quantity}</strong></article>
      <article><small>مواد محجوزة</small><strong>{openReservations.length}</strong></article>
      <article><small>تكلفة فعلية</small><strong>{actualCost.toLocaleString("en-US")}</strong></article>
      <article><small>تكلفة تقديرية</small><strong>{estimatedCost.toLocaleString("en-US")}</strong></article>
      <article><small>أحداث</small><strong>{detail.events.length}</strong></article>
    </section>

    <section className="admin-order-body">
      <div className="admin-order-main">
        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>حجز خامة للإنتاج</h2><span>{detail.stock.length}</span></div>
          {detail.stock.length?<form action={reserveWorkOrderMaterialAction} className="work-material-reserve-form">
            <input type="hidden" name="workOrderId" value={detail.workOrder.id}/>
            <select name="inventoryItemId" required defaultValue="">
              <option value="" disabled>اختر الخامة</option>
              {detail.stock.filter(item=>item.available>0).map(item=><option key={`${item.inventoryItemId}-${item.warehouseId}`} value={item.inventoryItemId}>{item.sku} · {item.name}</option>)}
            </select>
            <select name="warehouseId" required defaultValue="">
              <option value="" disabled>اختر المخزن</option>
              {Array.from(new Map(detail.stock.map(item=>[item.warehouseId,{id:item.warehouseId,name:item.warehouse}])).values()).map(warehouse=><option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
            </select>
            <input name="quantity" type="number" min="0.001" step="0.001" required placeholder="الكمية"/>
            <button type="submit">حجز الخامة</button>
          </form>:<p className="empty-note">لا يوجد مخزون متاح للحجز.</p>}
          <div className="work-stock-grid">
            {detail.stock.map(item=><article key={`${item.inventoryItemId}-${item.warehouseId}`}>
              <strong>{item.name}</strong><small>{item.sku} · {item.warehouse}</small>
              <span><b>On hand</b>{item.onHand} {item.unit}</span>
              <span><b>Reserved</b>{item.reserved} {item.unit}</span>
              <span><b>Available</b>{item.available} {item.unit}</span>
            </article>)}
          </div>
        </section>

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>الحجوزات والاستهلاك</h2><span>{detail.reservations.length}</span></div>
          <div className="material-reservation-list">
            {detail.reservations.length?detail.reservations.map(reservation=><article key={reservation.id}>
              <div><strong>{reservation.name}</strong><small>{reservation.sku} · {reservation.warehouse}</small></div>
              <span><b>محجوز</b>{reservation.quantity} {reservation.unit}</span>
              <span><b>مستهلك</b>{reservation.consumed} {reservation.unit}</span>
              <span><b>متبقي</b>{reservation.remaining} {reservation.unit}</span>
              <span className="status-pill">{reservation.status}</span>
              {["reserved","partially_consumed"].includes(reservation.status)&&reservation.remaining>0?<div className="material-reservation-actions">
                <form action={consumeWorkOrderMaterialAction}>
                  <input type="hidden" name="workOrderId" value={detail.workOrder.id}/>
                  <input type="hidden" name="reservationId" value={reservation.id}/>
                  <input name="goodQuantity" type="number" min="0" max={reservation.remaining} step="0.001" placeholder="جيد"/>
                  <input name="wasteQuantity" type="number" min="0" max={reservation.remaining} step="0.001" placeholder="هالك"/>
                  <button type="submit">تسجيل استهلاك</button>
                </form>
                <form action={releaseWorkOrderMaterialAction}>
                  <input type="hidden" name="workOrderId" value={detail.workOrder.id}/>
                  <input type="hidden" name="reservationId" value={reservation.id}/>
                  <button className="release" type="submit">تحرير المتبقي</button>
                </form>
              </div>:null}
            </article>):<p className="empty-note">لم تُحجز خامات لأمر العمل.</p>}
          </div>
        </section>

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>تكلفة أمر العمل</h2><span>{detail.costs.length}</span></div>
          <form action={addWorkOrderCostAction} className="work-cost-form">
            <input type="hidden" name="workOrderId" value={detail.workOrder.id}/>
            <select name="costType" defaultValue="labor">
              <option value="labor">عمالة</option><option value="machine">ماكينة</option><option value="design">تصميم</option>
              <option value="partner">شريك إنتاج</option><option value="outsource">تعهد خارجي</option>
              <option value="delivery">توصيل</option><option value="installation">تركيب</option><option value="other">أخرى</option>
            </select>
            <input name="description" placeholder="وصف التكلفة"/>
            <input name="quantity" type="number" min="0.001" step="0.001" defaultValue="1"/>
            <input name="unitCost" type="number" min="0" step="0.0001" required placeholder="تكلفة الوحدة"/>
            <button type="submit">إضافة تكلفة فعلية</button>
          </form>
          <div className="work-cost-list">
            {detail.costs.length?detail.costs.map(line=><article key={line.id}>
              <strong>{line.type}</strong><span>{line.description??"—"}</span>
              <span>{line.quantity} × {line.unitCost.toLocaleString("en-US")}</span>
              <b>{line.totalCost.toLocaleString("en-US")} {line.currency}</b>
              <em className={line.estimate?"status-pill warning":"status-pill ready"}>{line.estimate?"تقديري":"فعلي"}</em>
            </article>):<p className="empty-note">لا توجد تكاليف مسجلة بعد.</p>}
          </div>
        </section>

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>استهلاك الخامات</h2><span>{detail.consumptions.length}</span></div>
          <div className="receipt-history">
            {detail.consumptions.length?detail.consumptions.map(item=><article key={item.id}>
              <strong>{item.name}</strong><span>{item.warehouse}</span><span>جيد {item.good}</span><span>هالك {item.waste}</span>
              <span>{item.unitCost===null?"—":`${item.unitCost.toLocaleString("en-US")} ${item.currency}`}</span>
              <small>{new Date(item.recordedAt).toLocaleString("ar-YE")}</small>
            </article>):<p className="empty-note">لا يوجد استهلاك بعد.</p>}
          </div>
        </section>
      </div>

      <aside className="admin-order-side">
        <div className="admin-order-finance">
          <small>Actual job cost</small>
          <strong>{actualCost.toLocaleString("en-US")} YER</strong>
          <span>{detail.workOrder.partner??"ORYX internal production"}</span>
          <span>Priority {detail.workOrder.priority}</span>
          <span>{detail.workOrder.promisedAt?new Date(detail.workOrder.promisedAt).toLocaleString("ar-YE"):"No promise date"}</span>
        </div>
        <div className="admin-order-timeline">
          <h2>Work Order Log</h2>
          {detail.events.length?detail.events.map(event=><article key={event.id}>
            <span></span><div><strong>{event.type}</strong><small>{new Date(event.createdAt).toLocaleString("ar-YE")}</small>
            {event.step?<p>{event.step}</p>:null}{event.notes?<p>{event.notes}</p>:null}</div>
          </article>):<p className="empty-note">لا توجد أحداث.</p>}
        </div>
        <Link className="secondary-button work-order-order-link" href={`/admin/orders/${detail.workOrder.orderId}`}>فتح الطلب الأصلي</Link>
      </aside>
    </section>
  </main>;
}
