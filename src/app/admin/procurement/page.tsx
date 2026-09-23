import Link from "next/link";
import { getProcurementSnapshot } from "@/lib/admin-procurement";
import {
  createPurchaseOrderFromRequestAction,
  createPurchaseRequestAction,
  createSupplierAction,
  updatePurchaseRequestStatusAction
} from "./actions";

export const dynamic="force-dynamic";

const requestLabels:Record<string,string>={
  draft:"مسودة",
  submitted:"مرسل",
  approved:"معتمد",
  rejected:"مرفوض",
  ordered:"تم إصدار أمر شراء",
  closed:"مغلق",
  cancelled:"ملغي"
};

export default async function ProcurementPage(){
  const data=await getProcurementSnapshot();
  const activeSuppliers=data.suppliers.filter(item=>item.status==="active");

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX PROCUREMENT CONTROL</span>
        <h1>المشتريات والاستلام</h1>
        <p>من الاحتياج إلى طلب الشراء، ثم أمر الشراء، ثم استلام الخامة وإدخال الكمية المقبولة إلى المخزون بسجل تدقيق واحد.</p>
      </div>
      <div className="admin-list-actions">
        <Link className="secondary-button" href="/admin/inventory">المخزون</Link>
        <Link className="secondary-button" href="/admin">مركز القيادة</Link>
      </div>
    </section>

    <section className="procurement-kpis">
      <article><small>موردون نشطون</small><strong>{data.totals.suppliers}</strong></article>
      <article><small>طلبات شراء مفتوحة</small><strong>{data.totals.openRequests}</strong></article>
      <article><small>أوامر شراء مفتوحة</small><strong>{data.totals.openOrders}</strong></article>
      <article><small>إيصالات مسودة</small><strong>{data.totals.draftReceipts}</strong></article>
    </section>

    <section className="procurement-entry-grid">
      <article className="procurement-entry-card">
        <div><span className="eyebrow">SUPPLIER</span><h2>إضافة مورد</h2></div>
        <form action={createSupplierAction}>
          <input name="legalName" required placeholder="الاسم القانوني"/>
          <input name="tradeName" placeholder="الاسم التجاري"/>
          <input name="phone" placeholder="الهاتف"/>
          <input name="email" type="email" placeholder="البريد"/>
          <input name="city" placeholder="المدينة"/>
          <input name="paymentTerms" placeholder="شروط الدفع"/>
          <button type="submit">حفظ المورد</button>
        </form>
      </article>

      <article className="procurement-entry-card">
        <div><span className="eyebrow">PURCHASE REQUEST</span><h2>طلب شراء جديد</h2></div>
        <form action={createPurchaseRequestAction}>
          <select name="itemId" defaultValue="">
            <option value="">خامة غير مسجلة / وصف حر</option>
            {data.items.map(item=><option key={item.id} value={item.id}>{item.sku} · {item.name}</option>)}
          </select>
          <input name="description" placeholder="الوصف إن لم تختر خامة"/>
          <input name="quantity" type="number" min="0.001" step="0.001" required placeholder="الكمية"/>
          <input name="estimatedUnitCost" type="number" min="0" step="0.0001" placeholder="تكلفة تقديرية للوحدة"/>
          <input name="neededBy" type="date"/>
          <input name="reason" placeholder="سبب الاحتياج"/>
          <button type="submit">إنشاء الطلب</button>
        </form>
      </article>
    </section>

    <section className="admin-list-shell procurement-section">
      <div className="logistics-section-head"><h2>طلبات الشراء</h2><span>{data.requests.length}</span></div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>PR</th><th>الحالة</th><th>العناصر</th><th>التقدير</th><th>الحاجة</th><th>الإجراء</th></tr></thead>
          <tbody>
            {data.requests.length?data.requests.map(request=><tr key={request.id}>
              <td><Link className="table-order-link" href={`/admin/procurement/request/${request.id}`}><strong>PR #{request.number}</strong><small>{request.reason??"—"}</small></Link></td>
              <td><span className="status-pill">{requestLabels[request.status]??request.status}</span></td>
              <td>{request.items}</td>
              <td>{request.estimatedTotal.toLocaleString("en-US")} {request.currency}</td>
              <td>{request.neededBy??"—"}</td>
              <td>
                <div className="procurement-actions">
                  {request.status==="draft"?<form action={updatePurchaseRequestStatusAction}>
                    <input type="hidden" name="requestId" value={request.id}/><input type="hidden" name="status" value="submitted"/>
                    <button type="submit">إرسال</button>
                  </form>:null}
                  {request.status==="submitted"?<>
                    <form action={updatePurchaseRequestStatusAction}>
                      <input type="hidden" name="requestId" value={request.id}/><input type="hidden" name="status" value="approved"/>
                      <button type="submit">اعتماد</button>
                    </form>
                    <form action={updatePurchaseRequestStatusAction}>
                      <input type="hidden" name="requestId" value={request.id}/><input type="hidden" name="status" value="rejected"/>
                      <button type="submit">رفض</button>
                    </form>
                  </>:null}
                  {request.status==="approved"?<form action={createPurchaseOrderFromRequestAction} className="procurement-create-po">
                    <input type="hidden" name="requestId" value={request.id}/>
                    <select name="supplierId" required defaultValue="">
                      <option value="" disabled>اختر المورد</option>
                      {activeSuppliers.map(supplier=><option key={supplier.id} value={supplier.id}>{supplier.name}</option>)}
                    </select>
                    <input name="expectedAt" type="date"/>
                    <button type="submit" disabled={!activeSuppliers.length}>إنشاء PO</button>
                  </form>:null}
                </div>
              </td>
            </tr>):<tr><td colSpan={6} className="empty-cell">لا توجد طلبات شراء بعد.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>

    <section className="admin-list-shell procurement-section">
      <div className="logistics-section-head"><h2>أوامر الشراء</h2><span>{data.orders.length}</span></div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>PO</th><th>المورد</th><th>الحالة</th><th>الإجمالي</th><th>الاستلام</th><th>متوقع</th></tr></thead>
          <tbody>
            {data.orders.length?data.orders.map(order=><tr key={order.id}>
              <td><Link className="table-order-link" href={`/admin/procurement/${order.id}`}><strong>PO #{order.number}</strong></Link></td>
              <td>{order.supplier}</td>
              <td><span className="status-pill">{order.status}</span></td>
              <td>{order.total.toLocaleString("en-US")} {order.currency}</td>
              <td>{Math.round(order.receivedRatio*100)}%</td>
              <td>{order.expectedAt??"—"}</td>
            </tr>):<tr><td colSpan={6} className="empty-cell">لا توجد أوامر شراء بعد.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>

    <section className="admin-list-shell procurement-section">
      <div className="logistics-section-head"><h2>سجل الاستلام</h2><span>{data.receipts.length}</span></div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>GR</th><th>PO</th><th>المورد</th><th>المخزن</th><th>الحالة</th><th>التاريخ</th></tr></thead>
          <tbody>
            {data.receipts.length?data.receipts.map(receipt=><tr key={receipt.id}>
              <td><strong>GR #{receipt.number}</strong></td>
              <td>{receipt.poNumber===null?"—":`PO #${receipt.poNumber}`}</td>
              <td>{receipt.supplier??"—"}</td>
              <td>{receipt.warehouse}</td>
              <td><span className="status-pill">{receipt.status}</span></td>
              <td>{new Date(receipt.receivedAt).toLocaleString("ar-YE")}</td>
            </tr>):<tr><td colSpan={6} className="empty-cell">لا توجد استلامات بعد.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  </main>;
}
