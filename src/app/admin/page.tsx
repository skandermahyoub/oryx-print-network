import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminStats } from "@/lib/admin-stats";

const modules=[
["الكتالوج ومحرك الخدمات","الأقسام، الخدمات، الحقول الديناميكية، الخامات والتشطيبات","/admin/catalog"],
["التسعير","قواعد السعر، الكميات، المعادلات، العاجل والخصومات","#"],
["الطلبات وعروض الأسعار","رحلة الطلب من المسودة إلى التسليم","/admin/orders"],
["استوديو التصميم","Brief، الإصدارات، المراجعات والاعتماد","#"],
["الإنتاج والجودة","أوامر العمل، المراحل، الهالك، الصور وQC","#"],
["شبكة الشركاء","القدرات، أسعار ORYX، التقييم وتوزيع الأعمال","/admin/partners"],
["CRM والمبيعات","Leads، Opportunities، المتابعات والصفقات","#"],
["الباقات","حلول القطاعات والعروض الموسمية","#"],
["ORYX Projects Lab","المجلات، المبادرات، الرعايات والمشاريع","#"],
["المخزون والمشتريات","الخامات، المخازن، الحجز، الشراء والاستلام","#"],
["المالية","الفواتير، الدفعات، التكاليف، الهوامش ومستحقات الشركاء","#"],
["المجلة وSEO","المقالات، الكلمات، الربط بالخدمات والصفحات المقصودة","#"],
["الإعدادات والصلاحيات","RBAC، التدقيق، الهوية والإعدادات العامة","#"]
];

export default async function AdminPage(){
  if(process.env.ENABLE_ADMIN_PREVIEW!=="true") notFound();
  const stats=await getAdminStats();

  return <main className="admin-preview">
    <section className="admin-top">
      <div>
        <span className="eyebrow">ORYX OPERATING SYSTEM</span>
        <h1>مركز القيادة</h1>
        <p>لوحة تشغيل داخلية. تبقى مغلقة افتراضيًا حتى اكتمال Neon Auth والصلاحيات قبل أي نشر عام.</p>
      </div>
      <div className="admin-status"><b>PREVIEW</b><span>Neon + GitHub branch</span></div>
    </section>

    <section className="admin-kpis">
      <article><small>الخدمات النشطة</small><strong>{stats.services}</strong></article>
      <article><small>التصنيفات</small><strong>{stats.categories}</strong></article>
      <article><small>الباقات</small><strong>{stats.packages}</strong></article>
      <article><small>مشاريع ORYX</small><strong>{stats.projects}</strong></article>
      <article><small>طلبات مفتوحة</small><strong>{stats.openOrders}</strong></article>
      <article><small>عروض أسعار مفتوحة</small><strong>{stats.openQuotes}</strong></article>
      <article><small>طلبات انضمام شركاء</small><strong>{stats.partnerApplicants}</strong></article>
      <article><small>شركاء إنتاج نشطون</small><strong>{stats.activePartners}</strong></article>
    </section>

    <section className="admin-modules">
      {modules.map(([title,desc,href],index)=><article key={title}>
        <span>{String(index+1).padStart(2,"0")}</span>
        <h2>{title}</h2>
        <p>{desc}</p>
        {href==="#"?<button type="button" disabled>قيد البناء</button>:<Link className="admin-module-link" href={href}>فتح الوحدة</Link>}
      </article>)}
    </section>
  </main>;
}
