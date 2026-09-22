const modules=[
["الكتالوج ومحرك الخدمات","الأقسام، الخدمات، الحقول الديناميكية، الخامات والتشطيبات"],
["التسعير","قواعد السعر، الكميات، المعادلات، العاجل والخصومات"],
["الطلبات وعروض الأسعار","رحلة الطلب من المسودة إلى التسليم"],
["استوديو التصميم","Brief، الإصدارات، المراجعات والاعتماد"],
["الإنتاج والجودة","أوامر العمل، المراحل، الهالك، الصور وQC"],
["شبكة الشركاء","القدرات، أسعار ORYX، التقييم وتوزيع الأعمال"],
["CRM والمبيعات","Leads، Opportunities، المتابعات والصفقات"],
["الباقات","حلول القطاعات والعروض الموسمية"],
["ORYX Projects Lab","المجلات، المبادرات، الرعايات والمشاريع"],
["المالية","الفواتير، الدفعات، التكاليف، الهوامش ومستحقات الشركاء"],
["المجلة وSEO","المقالات، الكلمات، الربط بالخدمات والصفحات المقصودة"],
["الإعدادات والصلاحيات","RBAC، التدقيق، الهوية والإعدادات العامة"]
];

export default function AdminPage(){
  return <main className="admin-preview">
    <section className="admin-top">
      <div><span className="eyebrow">ORYX OPERATING SYSTEM</span><h1>مركز القيادة</h1><p>نسخة البناء الأولية. المصادقة والصلاحيات ستغلق هذه المنطقة قبل أول نشر عام.</p></div>
      <div className="admin-status"><b>FOUNDATION</b><span>Preview branch</span></div>
    </section>
    <section className="admin-kpis">
      <article><small>خدمات أولية في Neon</small><strong>21</strong></article>
      <article><small>عائلات إنتاج عليا</small><strong>8</strong></article>
      <article><small>باقات مبدئية</small><strong>12</strong></article>
      <article><small>مشاريع مختبر أولية</small><strong>6</strong></article>
    </section>
    <section className="admin-modules">
      {modules.map(([title,desc],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h2>{title}</h2><p>{desc}</p><button type="button">فتح الوحدة</button></article>)}
    </section>
  </main>;
}
