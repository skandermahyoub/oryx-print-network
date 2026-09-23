import Link from "next/link";
import { getAdminStats } from "@/lib/admin-stats";

const modules=[
["الكتالوج ومحرك الخدمات","الأقسام، الخدمات، الحقول الديناميكية، الخامات والتشطيبات","/admin/catalog"],
["التسعير","قواعد السعر، الكميات، المعادلات، العاجل والخصومات","/admin/pricing"],
["الطلبات وعروض الأسعار","رحلة الطلب من المسودة إلى التسليم","/admin/orders"],
["استوديو التصميم","Brief، الإصدارات، المراجعات والاعتماد","/admin/design"],
["الإنتاج والجودة","أوامر العمل، المراحل، الهالك، الصور وQC","/admin/production"],
["اللوجستيات والتسليم","التوصيل، الاستلام، التركيب وإثبات الإتمام","/admin/logistics"],
["شبكة الشركاء","القدرات، أسعار ORYX، التقييم وتوزيع الأعمال","/admin/partners"],
["توزيع الإنتاج","ترشيح الشركاء، التكلفة، السرعة وقرار الإسناد","/admin/sourcing"],
["CRM والمبيعات","Leads، Opportunities، المتابعات والصفقات","/admin/crm"],
["الحملات البيعية","مواسم، استهداف قطاعات، Touchpoints وقياس الصفقات","/admin/campaigns"],
["طلبات الباقات","حلول القطاعات والعروض الموسمية الواردة","/admin/package-requests"],
["ORYX Projects Lab","المجلات، المبادرات، الرعايات والمشاريع","/admin/projects"],
["المخزون","الخامات، المخازن، الحجز، الاستهلاك والهالك","/admin/inventory"],
["المشتريات والتوريد","طلبات الشراء، الموردون، أوامر الشراء والاستلام","/admin/procurement"],
["المالية","الفواتير، الدفعات، التكاليف، الهوامش ومستحقات الشركاء","/admin/finance"],
["المجلة وSEO","المقالات، الكلمات، الربط بالخدمات والصفحات المقصودة","/admin/content"],
["المستخدمون والصلاحيات","RBAC، الأدوار وحالة الحسابات","/admin/users"],
["سجل التدقيق","تتبع التغييرات والقرارات الحساسة","/admin/audit"],
["بوابة الجاهزية","فحص البنية الحرجة قبل Netlify Preview","/admin/readiness"]
];

export default async function AdminPage(){
  const stats=await getAdminStats();

  return <main className="admin-preview">
    <section className="admin-top">
      <div>
        <span className="eyebrow">ORYX OPERATING SYSTEM</span>
        <h1>مركز القيادة</h1>
        <p>لوحة تشغيل داخلية محمية بـNeon Auth وRBAC. يبقى النشر العام خارج المسار حتى اجتياز بوابة الجاهزية.</p>
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
      <article><small>طلبات باقات جديدة</small><strong>{stats.packageRequests}</strong></article>
      <article><small>حملات بيعية نشطة</small><strong>{stats.activeSalesCampaigns}</strong></article>
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
