import Link from "next/link";
import { getLogisticsSnapshot } from "@/lib/admin-logistics";
import { updateDeliveryStatusAction, updateInstallationStatusAction } from "./actions";

export const dynamic="force-dynamic";

const deliveryNext:Record<string,Array<[string,string]>>={
  pending:[["scheduled","جدولة"],["cancelled","إلغاء"]],
  scheduled:[["picked_up","تم الاستلام"],["rescheduled","إعادة جدولة"],["cancelled","إلغاء"]],
  rescheduled:[["scheduled","تأكيد الموعد"],["cancelled","إلغاء"]],
  picked_up:[["out_for_delivery","خرج للتسليم"],["failed","تعذر"]],
  out_for_delivery:[["delivered","تم التسليم"],["failed","تعذر"],["rescheduled","إعادة جدولة"]],
  failed:[["rescheduled","إعادة جدولة"],["cancelled","إلغاء"]]
};

const installationNext:Record<string,Array<[string,string]>>={
  pending:[["scheduled","جدولة"],["cancelled","إلغاء"]],
  scheduled:[["on_site","في الموقع"],["rescheduled","إعادة جدولة"],["cancelled","إلغاء"]],
  rescheduled:[["scheduled","تأكيد الموعد"],["cancelled","إلغاء"]],
  on_site:[["completed","اكتمل التركيب"],["failed","تعذر"]],
  failed:[["rescheduled","إعادة جدولة"],["cancelled","إلغاء"]]
};

export default async function LogisticsPage(){
  const snapshot=await getLogisticsSnapshot();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX LOGISTICS CONTROL</span>
        <h1>التسليم والتركيب</h1>
        <p>آخر متر من الصفقة مهم بقدر الطباعة نفسها. هنا نرى الاستلام، الخروج للتسليم، إثبات الوصول، والتركيب الميداني كجزء من الطلب لا كعمل منفصل.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="logistics-kpis">
      <article><small>توصيل جديد</small><strong>{snapshot.totals.pendingDeliveries}</strong></article>
      <article><small>توصيل نشط</small><strong>{snapshot.totals.activeDeliveries}</strong></article>
      <article><small>تم التسليم</small><strong>{snapshot.totals.delivered}</strong></article>
      <article><small>تركيب جديد</small><strong>{snapshot.totals.pendingInstallations}</strong></article>
      <article><small>تركيب نشط</small><strong>{snapshot.totals.activeInstallations}</strong></article>
      <article><small>تركيب مكتمل</small><strong>{snapshot.totals.completedInstallations}</strong></article>
    </section>

    <section className="admin-list-shell logistics-section">
      <div className="logistics-section-head"><h2>التوصيل</h2><span>{snapshot.deliveries.length} مهمة</span></div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>الطلب</th><th>العميل</th><th>المستلم</th><th>العنوان</th><th>الحالة</th><th>الموعد</th><th>الإجراء</th></tr></thead>
          <tbody>
            {snapshot.deliveries.length?snapshot.deliveries.map(job=><tr key={job.id}>
              <td><Link className="table-order-link" href={`/admin/orders/${job.orderId}`}><strong>#{job.orderNumber}</strong></Link></td>
              <td>{job.customer}</td>
              <td>{job.recipient??job.phone??"—"}</td>
              <td>{job.address??"—"}</td>
              <td><span className="status-pill">{job.status}</span></td>
              <td>{job.scheduledAt?new Date(job.scheduledAt).toLocaleString("ar-YE"):"—"}</td>
              <td><div className="logistics-actions">{(deliveryNext[job.status]??[]).map(([to,label])=><form action={updateDeliveryStatusAction} key={to}>
                <input type="hidden" name="id" value={job.id}/>
                <input type="hidden" name="to" value={to}/>
                <button type="submit">{label}</button>
              </form>)}</div></td>
            </tr>):<tr><td colSpan={7} className="empty-cell">لا توجد مهام توصيل بعد.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>

    <section className="admin-list-shell logistics-section">
      <div className="logistics-section-head"><h2>التركيب الميداني</h2><span>{snapshot.installations.length} مهمة</span></div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>الطلب</th><th>العميل</th><th>الموقع</th><th>الفني/الشريك</th><th>الحالة</th><th>الموعد</th><th>الإجراء</th></tr></thead>
          <tbody>
            {snapshot.installations.length?snapshot.installations.map(job=><tr key={job.id}>
              <td><Link className="table-order-link" href={`/admin/orders/${job.orderId}`}><strong>#{job.orderNumber}</strong></Link></td>
              <td>{job.customer}</td>
              <td>{job.address??"—"}</td>
              <td>{job.partner??job.technicianName??job.technicianPhone??"—"}</td>
              <td><span className="status-pill">{job.status}</span></td>
              <td>{job.scheduledAt?new Date(job.scheduledAt).toLocaleString("ar-YE"):"—"}</td>
              <td><div className="logistics-actions">{(installationNext[job.status]??[]).map(([to,label])=><form action={updateInstallationStatusAction} key={to}>
                <input type="hidden" name="id" value={job.id}/>
                <input type="hidden" name="to" value={to}/>
                <button type="submit">{label}</button>
              </form>)}</div></td>
            </tr>):<tr><td colSpan={7} className="empty-cell">لا توجد مهام تركيب بعد.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  </main>;
}
