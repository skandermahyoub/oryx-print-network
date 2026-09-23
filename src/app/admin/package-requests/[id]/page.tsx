import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackageRequestDetail } from "@/lib/admin-package-request-detail";
import {
  convertPackageRequestToOrderAction,
  mapPackageItemServiceAction,
  updatePackageRequestStatusAction
} from "./actions";

export const dynamic="force-dynamic";

const labels:Record<string,string>={
  submitted:"جديد",
  under_review:"قيد المراجعة",
  quoted:"تم التسعير",
  converted:"تحول إلى طلب",
  cancelled:"ملغي"
};

export default async function PackageRequestDetailPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const detail=await getPackageRequestDetail(id);
  if(!detail) notFound();

  const mapped=detail.items.filter(item=>item.serviceId).length;
  const readyToConvert=detail.items.length>0&&mapped===detail.items.length&&!detail.request.convertedOrderId;

  return <main className="admin-package-request-detail-page">
    <section className="admin-order-hero">
      <div>
        <Link href="/admin/package-requests" className="admin-back-link">طلبات الباقات ←</Link>
        <span className="eyebrow">PACKAGE REQUEST #{detail.request.number}</span>
        <h1>{detail.request.packageName}</h1>
        <p>{detail.request.companyName??detail.request.customerName} · {detail.request.phone??"بدون هاتف"} · {detail.request.city??"—"}</p>
      </div>
      <div className="admin-order-hero-status">
        <small>الحالة</small>
        <strong>{labels[detail.request.status]??detail.request.status}</strong>
        <span>{mapped}/{detail.items.length} عناصر مرتبطة بالكتالوج</span>
      </div>
    </section>

    <section className="partner-review-actions">
      {!detail.request.convertedOrderId?<>
        {["under_review","quoted","cancelled"].filter(status=>status!==detail.request.status).map(status=><form action={updatePackageRequestStatusAction} key={status}>
          <input type="hidden" name="requestId" value={detail.request.id}/>
          <input type="hidden" name="status" value={status}/>
          <button type="submit">{labels[status]}</button>
        </form>)}
        {readyToConvert?<form action={convertPackageRequestToOrderAction}>
          <input type="hidden" name="requestId" value={detail.request.id}/>
          <button type="submit">تحويل إلى طلب تشغيلي</button>
        </form>:null}
      </>:<Link className="service-public-link" href={`/admin/orders/${detail.request.convertedOrderId}`}>فتح الطلب الناتج ←</Link>}
    </section>

    <section className="package-request-detail-grid">
      <section className="admin-order-section">
        <div className="admin-order-section-head"><h2>العناصر المختارة</h2><span>{detail.items.length}</span></div>
        <div className="package-request-item-map">
          {detail.items.map(item=><article key={item.id}>
            <div><strong>{item.itemName}</strong><small>الكمية {item.quantity}</small></div>
            <span className={item.serviceId?"status-pill ready":"status-pill warning"}>{item.serviceName??"غير مربوط بخدمة"}</span>
            <form action={mapPackageItemServiceAction}>
              <input type="hidden" name="requestId" value={detail.request.id}/>
              <input type="hidden" name="requestItemId" value={item.id}/>
              <select name="serviceId" required defaultValue={item.serviceId??""}>
                <option value="" disabled>اختر خدمة الكتالوج</option>
                {detail.services.map(service=><option key={service.id} value={service.id}>{service.category} · {service.name}</option>)}
              </select>
              <button type="submit">ربط</button>
            </form>
          </article>)}
        </div>
      </section>

      <aside className="admin-order-side">
        <div className="admin-order-finance">
          <small>العميل</small>
          <strong>{detail.request.customerName}</strong>
          <span>{detail.request.companyName??"فرد"}</span>
          <span>{detail.request.email??detail.request.phone??"—"}</span>
        </div>
        <div className="admin-order-section service-side-card">
          <h2>ملاحظات الطلب</h2>
          <p className="package-request-notes">{detail.request.notes??"لا توجد ملاحظات."}</p>
        </div>
      </aside>
    </section>
  </main>;
}
