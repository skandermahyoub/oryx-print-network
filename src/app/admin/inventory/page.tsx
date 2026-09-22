import Link from "next/link";
import { getInventorySnapshot } from "@/lib/admin-inventory";

export default async function InventoryPage(){
  const inventory=await getInventorySnapshot();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX INVENTORY & PROCUREMENT</span>
        <h1>المخزون والمشتريات</h1>
        <p>الخامات، الحجوزات، الاستهلاك والهالك، ثم طلب الشراء وأمر الشراء والاستلام. التكلفة الفعلية ترجع إلى Job Costing.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="production-kpis four">
      <article><small>مواد نشطة</small><strong>{inventory.totals.items}</strong></article>
      <article><small>منخفضة المخزون</small><strong>{inventory.totals.lowStock}</strong></article>
      <article><small>طلبات شراء مفتوحة</small><strong>{inventory.totals.openPurchaseRequests}</strong></article>
      <article><small>أوامر شراء مفتوحة</small><strong>{inventory.totals.openPurchaseOrders}</strong></article>
    </section>

    <section className="admin-list-shell">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>SKU</th><th>الخامة</th><th>المتوفر</th><th>حد إعادة الطلب</th><th>متوسط التكلفة</th><th>الحالة</th></tr></thead>
          <tbody>
            {inventory.items.length?inventory.items.map(item=><tr key={item.id}>
              <td>{item.sku}</td><td><strong>{item.name}</strong></td><td>{item.stock} {item.unit}</td><td>{item.minStock} {item.unit}</td>
              <td>{item.averageCost===null?"—":`${item.averageCost.toLocaleString("en-US")} ${item.currency}`}</td>
              <td><span className={item.stock<=item.minStock?"status-pill warning":"status-pill ready"}>{item.stock<=item.minStock?"منخفض":"جيد"}</span></td>
            </tr>):<tr><td colSpan={6} className="empty-cell">لم تُدخل مواد مخزون بعد.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  </main>;
}
