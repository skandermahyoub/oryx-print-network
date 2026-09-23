import Link from "next/link";
import { getAdminReports } from "@/lib/admin-reports";

export const dynamic="force-dynamic";

function money(value:number){
  return value.toLocaleString("en-US");
}

export default async function ReportsPage(){
  const report=await getAdminReports(30);
  const maxCash=Math.max(1,...report.monthlyCash.map(item=>item.amount));

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX MANAGEMENT REPORTS</span>
        <h1>تقارير الإدارة</h1>
        <p>قراءة تشغيلية ومالية من بيانات ORYX الفعلية خلال آخر {report.periodDays} يومًا، دون خلط سعر البيع بتكلفة الشريك.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="report-kpis">
      <article><small>طلبات جديدة</small><strong>{report.kpis.orders}</strong></article>
      <article><small>طلبات مكتملة</small><strong>{report.kpis.completed}</strong></article>
      <article><small>فواتير صادرة</small><strong>{money(report.kpis.invoiced)} YER</strong></article>
      <article><small>تحصيل نقدي</small><strong>{money(report.kpis.cashReceived)} YER</strong></article>
      <article><small>ربح إجمالي مسجل</small><strong>{money(report.kpis.grossProfit)} YER</strong></article>
      <article><small>ذمم مفتوحة</small><strong>{money(report.kpis.openReceivables)} YER</strong></article>
      <article><small>فواتير متأخرة</small><strong>{report.kpis.overdueInvoices}</strong></article>
    </section>

    <section className="report-grid">
      <article className="report-panel">
        <div className="report-panel-head"><h2>التحصيل الشهري</h2><span>6 أشهر</span></div>
        <div className="cash-bars">
          {report.monthlyCash.map(item=><div key={item.month}>
            <span>{item.month}</span>
            <div><i style={{width:`${Math.max(2,(item.amount/maxCash)*100)}%`}}></i></div>
            <strong>{money(item.amount)}</strong>
          </div>)}
        </div>
      </article>

      <article className="report-panel">
        <div className="report-panel-head"><h2>Pipeline الطلبات</h2><span>{report.pipeline.reduce((sum,item)=>sum+item.orders,0)} مفتوح</span></div>
        <div className="report-list">
          {report.pipeline.length?report.pipeline.map(item=><div key={item.status}><strong>{item.status}</strong><span>{item.orders} طلب</span><b>{money(item.value)} YER</b></div>):<p className="empty-note">لا توجد طلبات مفتوحة.</p>}
        </div>
      </article>

      <article className="report-panel report-wide">
        <div className="report-panel-head"><h2>الخدمات الأعلى نشاطًا</h2><span>آخر {report.periodDays} يومًا</span></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>الخدمة</th><th>الطلبات</th><th>الإيراد</th><th>الربح الإجمالي</th></tr></thead>
            <tbody>{report.topServices.length?report.topServices.map(item=><tr key={item.name}><td><strong>{item.name}</strong></td><td>{item.orders}</td><td>{money(item.revenue)} YER</td><td>{money(item.grossProfit)} YER</td></tr>):<tr><td colSpan={4} className="empty-cell">لا توجد بيانات مبيعات كافية بعد.</td></tr>}</tbody>
          </table>
        </div>
      </article>

      <article className="report-panel">
        <div className="report-panel-head"><h2>أداء شركاء الإنتاج</h2><span>{report.partnerPerformance.length}</span></div>
        <div className="report-list">
          {report.partnerPerformance.length?report.partnerPerformance.map(item=><div key={item.name}><strong>{item.name}</strong><span>{item.score===null?"بدون تقييم":`${item.score}%`}</span><b>{item.activeJobs} نشط · {item.completedJobs} مكتمل</b></div>):<p className="empty-note">لا يوجد شركاء نشطون بعد.</p>}
        </div>
      </article>

      <article className="report-panel">
        <div className="report-panel-head"><h2>أوامر عمل متأخرة</h2><span>{report.overdueWork.length}</span></div>
        <div className="report-list overdue">
          {report.overdueWork.length?report.overdueWork.map(item=><Link key={item.id} href={`/admin/production/${item.id}`}><strong>WO #{item.number} · {item.service}</strong><span>{new Date(item.promisedAt).toLocaleString("ar-YE")}</span><b>{item.status}</b></Link>):<p className="empty-note">لا توجد أوامر عمل متأخرة.</p>}
        </div>
      </article>
    </section>
  </main>;
}
