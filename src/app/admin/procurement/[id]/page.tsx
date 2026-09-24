import Link from "next/link";
import { notFound } from "next/navigation";
import { getPurchaseOrderDetail } from "@/lib/admin-purchase-order-detail";
import { postGoodsReceiptAction, updatePurchaseOrderStatusAction } from "../actions";

export const dynamic="force-dynamic";

export default async function PurchaseOrderPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const detail=await getPurchaseOrderDetail(id);
  if(!detail) notFound();

  const canReceive=["sent","partially_received"].includes(detail.order.status);
  const hasRemaining=detail.items.some(item=>item.remainingQuantity>0);

  return <main className="admin-purchase-order-page">
    <section className="admin-order-hero">
      <div>
        <Link href="/admin/procurement" className="admin-back-link">المشتريات ←</Link>
        <span className="eyebrow">PURCHASE ORDER</span>
        <h1>PO #{detail.order.number}</h1>
        <p>{detail.order.supplier}{detail.order.requestNumber?` · PR #${detail.order.requestNumber}`:""}</p>
      </div>
      <div className="admin-order-hero-status">
        <small>الحالة</small>
        <strong>{detail.order.status}</strong>
        <span>{detail.order.total.toLocaleString("en-US")} {detail.order.currency}</span>
      </div>
    </section>

    <section className="partner-review-actions">
      {detail.order.status==="draft"?<form action={updatePurchaseOrderStatusAction}>
        <input type="hidden" name="orderId" value={detail.order.id}/><input type="hidden" name="status" value="approved"/>
        <button type="submit">اعتماد PO</button>
      </form>:null}
      {detail.order.status==="approved"?<form action={updatePurchaseOrderStatusAction}>
        <input type="hidden" name="orderId" value={detail.order.id}/><input type="hidden" name="status" value="sent"/>
        <button type="submit">إرسال للمورد</button>
      </form>:null}
      {detail.order.status==="received"?<form action={updatePurchaseOrderStatusAction}>
        <input type="hidden" name="orderId" value={detail.order.id}/><input type="hidden" name="status" value="closed"/>
        <button type="submit">إغلاق أمر الشراء</button>
      </form>:null}
    </section>

    <section className="admin-order-body">
      <div className="admin-order-main">
        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>بنود أمر الشراء</h2><span>{detail.items.length}</span></div>
          <div className="po-item-list">
            {detail.items.map(item=><article key={item.id}>
              <div><strong>{item.name}</strong><small>{item.sku??"بدون SKU"}</small></div>
              <span><b>المطلوب</b>{item.quantity} {item.unit??""}</span>
              <span><b>المستلم</b>{item.receivedQuantity} {item.unit??""}</span>
              <span><b>المتبقي</b>{item.remainingQuantity} {item.unit??""}</span>
              <span><b>السعر</b>{item.unitCost.toLocaleString("en-US")} {detail.order.currency}</span>
            </article>)}
          </div>
        </section>

        {canReceive&&hasRemaining?<section className="admin-order-section">
          <div className="admin-order-section-head"><h2>استلام شحنة</h2></div>
          <form action={postGoodsReceiptAction} className="goods-receipt-form">
            <input type="hidden" name="orderId" value={detail.order.id}/>
            <label className="receipt-warehouse">المخزن
              <select name="warehouseId" required defaultValue="">
                <option value="" disabled>اختر المخزن المستلم</option>
                {detail.warehouses.map(warehouse=><option key={warehouse.id} value={warehouse.id}>{warehouse.code} · {warehouse.name}</option>)}
              </select>
            </label>
            <div className="receipt-lines">
              {detail.items.filter(item=>item.remainingQuantity>0).map(item=><article key={item.id}>
                <div><strong>{item.name}</strong><small>متبقي {item.remainingQuantity} {item.unit??""}</small></div>
                <label>مقبول
                  <input name={`accepted:${item.id}`} type="number" min="0" max={item.remainingQuantity} step="0.001" defaultValue={item.remainingQuantity}/>
                </label>
                <label>مرفوض
                  <input name={`rejected:${item.id}`} type="number" min="0" max={item.remainingQuantity} step="0.001" defaultValue="0"/>
                </label>
              </article>)}
            </div>
            <textarea name="notes" rows={3} placeholder="ملاحظات الاستلام أو العيوب"/>
            <button type="submit">Post Goods Receipt</button>
          </form>
        </section>:null}

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>الاستلامات السابقة</h2><span>{detail.receipts.length}</span></div>
          <div className="receipt-history">
            {detail.receipts.length?detail.receipts.map(receipt=><article key={receipt.id}>
              <strong>GR #{receipt.number}</strong>
              <span>{receipt.warehouse}</span>
              <span>{receipt.status}</span>
              <span>مقبول {receipt.accepted}</span>
              <span>مرفوض {receipt.rejected}</span>
              <small>{new Date(receipt.receivedAt).toLocaleString("ar-YE")}</small>
            </article>):<p className="empty-note">لم يتم استلام أي شحنة بعد.</p>}
          </div>
        </section>
      </div>

      <aside className="admin-order-side">
        <div className="admin-order-finance">
          <small>الإجمالي</small>
          <strong>{detail.order.total.toLocaleString("en-US")} {detail.order.currency}</strong>
          <span>Subtotal {detail.order.subtotal.toLocaleString("en-US")}</span>
          <span>Discount {detail.order.discount.toLocaleString("en-US")}</span>
        </div>
        <div className="admin-order-section service-side-card">
          <h2>التوريد</h2>
          <div className="portal-list">
            <div><strong>{detail.order.supplier}</strong><small>المورد</small></div>
            <div><strong>{detail.order.expectedAt??"—"}</strong><small>موعد متوقع</small></div>
          </div>
          {detail.order.notes?<p className="package-request-notes">{detail.order.notes}</p>:null}
        </div>
      </aside>
    </section>
  </main>;
}
