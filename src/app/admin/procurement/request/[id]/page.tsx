import Link from "next/link";
import { notFound } from "next/navigation";
import { getPurchaseRequestDetail } from "@/lib/admin-purchase-request-detail";
import {
  addPurchaseRequestItemAction,
  createPurchaseOrderFromRequestAction,
  removePurchaseRequestItemAction,
  updatePurchaseRequestStatusAction
} from "../../actions";

export const dynamic="force-dynamic";

const labels:Record<string,string>={
  draft:"مسودة",submitted:"مرسل",approved:"معتمد",rejected:"مرفوض",
  ordered:"تم إصدار أمر شراء",closed:"مغلق",cancelled:"ملغي"
};

export default async function PurchaseRequestPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const detail=await getPurchaseRequestDetail(id);
  if(!detail) notFound();

  const estimated=detail.items.reduce((sum,item)=>sum+item.quantity*(item.estimatedUnitCost??0),0);
  const hasActivePo=detail.linkedOrders.some(order=>order.status!=="cancelled");

  return <main className="admin-purchase-request-page">
    <section className="admin-order-hero">
      <div>
        <Link href="/admin/procurement" className="admin-back-link">المشتريات ←</Link>
        <span className="eyebrow">PURCHASE REQUEST</span>
        <h1>PR #{detail.request.number}</h1>
        <p>{detail.request.reason??"احتياج شراء"} · {new Date(detail.request.createdAt).toLocaleString("ar-YE")}</p>
      </div>
      <div className="admin-order-hero-status">
        <small>الحالة</small>
        <strong>{labels[detail.request.status]??detail.request.status}</strong>
        <span>{detail.items.length} بنود · {estimated.toLocaleString("en-US")} YER تقديري</span>
      </div>
    </section>

    <section className="partner-review-actions">
      {detail.request.status==="draft"?<form action={updatePurchaseRequestStatusAction}>
        <input type="hidden" name="requestId" value={detail.request.id}/><input type="hidden" name="status" value="submitted"/>
        <button type="submit">إرسال للاعتماد</button>
      </form>:null}
      {detail.request.status==="submitted"?<>
        <form action={updatePurchaseRequestStatusAction}>
          <input type="hidden" name="requestId" value={detail.request.id}/><input type="hidden" name="status" value="approved"/>
          <button type="submit">اعتماد الطلب</button>
        </form>
        <form action={updatePurchaseRequestStatusAction}>
          <input type="hidden" name="requestId" value={detail.request.id}/><input type="hidden" name="status" value="rejected"/>
          <button type="submit">رفض</button>
        </form>
      </>:null}
      {detail.request.status==="approved"&&!hasActivePo?<form action={createPurchaseOrderFromRequestAction} className="purchase-request-create-po">
        <input type="hidden" name="requestId" value={detail.request.id}/>
        <select name="supplierId" required defaultValue="">
          <option value="" disabled>اختر المورد</option>
          {detail.suppliers.map(supplier=><option key={supplier.id} value={supplier.id}>{supplier.name}{supplier.city?` · ${supplier.city}`:""}</option>)}
        </select>
        <input name="expectedAt" type="date"/>
        <button type="submit">إنشاء أمر شراء</button>
      </form>:null}
    </section>

    <section className="admin-order-body">
      <div className="admin-order-main">
        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>بنود الطلب</h2><span>{detail.items.length}</span></div>
          <div className="purchase-request-items">
            {detail.items.map(item=><article key={item.id}>
              <div><strong>{item.name}</strong><small>{item.sku??"وصف حر"}</small></div>
              <span><b>الكمية</b>{item.quantity} {item.unit??""}</span>
              <span><b>التقدير</b>{item.estimatedUnitCost===null?"—":`${item.estimatedUnitCost.toLocaleString("en-US")} ${item.currency}`}</span>
              <span><b>الإجمالي</b>{(item.quantity*(item.estimatedUnitCost??0)).toLocaleString("en-US")} {item.currency}</span>
              {detail.request.status==="draft"&&detail.items.length>1?<form action={removePurchaseRequestItemAction}>
                <input type="hidden" name="requestId" value={detail.request.id}/>
                <input type="hidden" name="requestItemId" value={item.id}/>
                <button type="submit">حذف</button>
              </form>:null}
            </article>)}
          </div>

          {detail.request.status==="draft"?<form action={addPurchaseRequestItemAction} className="purchase-request-add-item">
            <input type="hidden" name="requestId" value={detail.request.id}/>
            <select name="itemId" defaultValue="">
              <option value="">وصف حر</option>
              {detail.inventoryItems.map(item=><option key={item.id} value={item.id}>{item.sku} · {item.name}</option>)}
            </select>
            <input name="description" placeholder="الوصف"/>
            <input name="quantity" type="number" min="0.001" step="0.001" required placeholder="الكمية"/>
            <input name="estimatedUnitCost" type="number" min="0" step="0.0001" placeholder="تكلفة تقديرية"/>
            <button type="submit">+ إضافة بند</button>
          </form>:null}
        </section>

        <section className="admin-order-section">
          <div className="admin-order-section-head"><h2>أوامر الشراء المرتبطة</h2><span>{detail.linkedOrders.length}</span></div>
          <div className="project-simple-list">
            {detail.linkedOrders.length?detail.linkedOrders.map(order=><div key={order.id}>
              <Link className="table-order-link" href={`/admin/procurement/${order.id}`}><strong>PO #{order.number}</strong></Link>
              <span>{order.supplier} · {order.status}</span>
              <b>{order.total.toLocaleString("en-US")} {order.currency}</b>
            </div>):<p className="empty-note">لم يصدر أمر شراء بعد.</p>}
          </div>
        </section>
      </div>

      <aside className="admin-order-side">
        <div className="admin-order-finance">
          <small>القيمة التقديرية</small>
          <strong>{estimated.toLocaleString("en-US")} YER</strong>
          <span>Needed by {detail.request.neededBy??"—"}</span>
          <span>Requested by {detail.request.requestedBy??"System"}</span>
          <span>Approved by {detail.request.approvedBy??"—"}</span>
        </div>
      </aside>
    </section>
  </main>;
}
