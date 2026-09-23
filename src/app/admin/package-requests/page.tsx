import Link from "next/link";
import { getPackageRequests } from "@/lib/admin-package-requests";

const labels:Record<string,string>={
  draft:"مسودة",
  submitted:"جديد",
  under_review:"قيد المراجعة",
  quoted:"تم التسعير",
  converted:"تحول إلى طلب",
  cancelled:"ملغي"
};

export default async function PackageRequestsPage(){
  const requests=await getPackageRequests();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX PACKAGE REQUESTS</span>
        <h1>طلبات الباقات</h1>
        <p>الطلبات القادمة من صفحات الباقات المخصصة، مع العميل والعناصر المختارة قبل تحويلها إلى عرض سعر أو طلب متعدد الخدمات.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="admin-list-shell">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>الطلب</th><th>الباقة</th><th>العميل</th><th>الحالة</th><th>العناصر</th><th>التاريخ</th></tr></thead>
          <tbody>
            {requests.length?requests.map(request=><tr key={request.id}>
              <td><Link className="table-order-link" href={`/admin/package-requests/${request.id}`}><strong>#{request.requestNumber}</strong></Link></td>
              <td><strong>{request.packageName}</strong></td>
              <td><strong>{request.customerName}</strong><small>{request.companyName??request.phone??request.city??"—"}</small></td>
              <td><span className="status-pill">{labels[request.status]??request.status}</span></td>
              <td>{request.itemCount}</td>
              <td>{new Date(request.createdAt).toLocaleDateString("ar-YE")}</td>
            </tr>):<tr><td colSpan={6} className="empty-cell">لا توجد طلبات باقات بعد.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  </main>;
}
