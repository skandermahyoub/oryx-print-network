import Link from "next/link";
import { getAdminOrders } from "@/lib/admin-orders";

export default async function AdminOrdersPage(){
  const orders=await getAdminOrders();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX ORDERS</span>
        <h1>الطلبات</h1>
        <p>قائمة تشغيلية تقرأ الطلبات الفعلية من Neon Preview. التعديل والحالات سيخضعان للمصادقة والصلاحيات.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="admin-list-shell">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>الطلب</th><th>العميل</th><th>الحالة</th><th>العناصر</th><th>الإجمالي</th><th>التاريخ</th></tr></thead>
          <tbody>
            {orders.length?orders.map(order=><tr key={order.id}>
              <td><strong>#{order.orderNumber}</strong></td>
              <td><strong>{order.customerName}</strong><small>{order.companyName??order.phone??"—"}</small></td>
              <td><span className="status-pill">{order.statusLabel}</span></td>
              <td>{order.itemCount}</td>
              <td>{order.total.toLocaleString("en-US")} {order.currency}</td>
              <td>{new Date(order.createdAt).toLocaleDateString("ar-YE")}</td>
            </tr>):<tr><td colSpan={6} className="empty-cell">لا توجد طلبات بعد في Preview.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  </main>;
}
