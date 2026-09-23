import Link from "next/link";
import { getInventorySnapshot } from "@/lib/admin-inventory";
import { createInventoryItemAction, createWarehouseAction, recordStockMovementAction } from "./actions";

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

    <section className="inventory-ops-grid">
      <article className="inventory-op-card">
        <div><span className="eyebrow">WAREHOUSE</span><h2>إضافة مخزن</h2></div>
        <form action={createWarehouseAction}>
          <input name="code" required placeholder="CODE" dir="ltr"/>
          <input name="name" required placeholder="اسم المخزن"/>
          <input name="city" placeholder="المدينة"/>
          <input name="address" placeholder="العنوان"/>
          <button type="submit">حفظ المخزن</button>
        </form>
      </article>

      <article className="inventory-op-card">
        <div><span className="eyebrow">INVENTORY ITEM</span><h2>إضافة خامة</h2></div>
        <form action={createInventoryItemAction}>
          <input name="sku" required placeholder="SKU" dir="ltr"/>
          <input name="name" required placeholder="اسم الخامة"/>
          <input name="unit" required defaultValue="unit" placeholder="الوحدة"/>
          <input name="minStock" type="number" min="0" step="0.001" defaultValue="0" placeholder="حد إعادة الطلب"/>
          <input name="reorderQuantity" type="number" min="0" step="0.001" placeholder="كمية إعادة الطلب"/>
          <input name="averageCost" type="number" min="0" step="0.0001" placeholder="متوسط التكلفة"/>
          <button type="submit">حفظ الخامة</button>
        </form>
      </article>

      <article className="inventory-op-card inventory-op-wide">
        <div><span className="eyebrow">STOCK MOVEMENT</span><h2>تسجيل حركة مخزون</h2></div>
        <form action={recordStockMovementAction} className="inventory-movement-form">
          <select name="itemId" required defaultValue=""><option value="" disabled>الخامة</option>{inventory.items.map(item=><option key={item.id} value={item.id}>{item.sku} · {item.name}</option>)}</select>
          <select name="warehouseId" required defaultValue=""><option value="" disabled>المخزن</option>{inventory.warehouses.map(warehouse=><option key={warehouse.id} value={warehouse.id}>{warehouse.code} · {warehouse.name}</option>)}</select>
          <select name="movementType" defaultValue="receipt">
            <option value="opening">رصيد افتتاحي</option>
            <option value="receipt">استلام</option>
            <option value="adjust_in">تسوية إضافة</option>
            <option value="adjust_out">تسوية خصم</option>
            <option value="return">مرتجع</option>
            <option value="waste">هالك</option>
          </select>
          <input name="quantity" type="number" min="0.001" step="0.001" required placeholder="الكمية"/>
          <input name="unitCost" type="number" min="0" step="0.0001" placeholder="تكلفة الوحدة"/>
          <input name="notes" placeholder="ملاحظات"/>
          <button type="submit" disabled={!inventory.items.length||!inventory.warehouses.length}>تسجيل الحركة</button>
        </form>
      </article>
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
