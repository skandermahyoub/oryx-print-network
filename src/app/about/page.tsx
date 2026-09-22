import Link from "next/link";
import type { Metadata } from "next";

export const metadata:Metadata={
  title:"من هي ORYX | المؤسسة الرقمية للطباعة والإنتاج الإبداعي",
  description:"ORYX مؤسسة رقمية تدير التصميم والطباعة والإعلان والتغليف والتصنيع الإبداعي عبر شبكة إنتاج موحدة ونظام تشغيل واحد."
};

const capabilities=[
  ["التصميم والهوية","من الاستراتيجية والشعار إلى البروفايل والحملات والتغليف والبيئة البصرية."],
  ["الطباعة والنشر","مطبوعات الشركات والكتب والمجلات والتقاويم والنماذج والملصقات والتشطيبات."],
  ["الإعلان والواجهات","لوحات، حروف مضيئة، واجهات، حملات شوارع، مركبات وإرشاد مكاني."],
  ["التصنيع الإبداعي","ليزر، أكريليك، خشب، ستاندات، مجسمات، دروع وعناصر عرض مخصصة."],
  ["التغليف والهدايا","علب وأكياس وليبل وهدايا مؤسسية وملابس ومنتجات دعائية."],
  ["المعارض والفعاليات","هوية وتجهيز شامل للمؤتمرات والمعارض والافتتاحات والحملات الموسمية."]
];

const principles=[
  ["واجهة واحدة","العميل لا يطارد المصمم والمطبعة والليزر والمركب والمورد. ORYX تدير النتيجة كاملة."],
  ["المواصفة تدخل مرة واحدة","بيانات الطلب تنتقل من العرض إلى التصميم والإنتاج والجودة والتسليم دون إعادة كتابة."],
  ["إنتاج موزع ومسؤولية موحدة","يمكن أن ينفذ الطلب أكثر من شريك إنتاج، بينما تبقى ORYX مسؤولة عن الجودة والموعد والتجربة."],
  ["التسعير لا يُخمن","الخدمة التي لا تملك قاعدة سعر معتمدة أو تكلفة شريك صالحة تتحول إلى عرض سعر حقيقي."],
  ["الشريك يكبر معنا","المطابع والورش والمصانع المساندة تدخل الشبكة بقدراتها وأسعار ORYX وطاقتها الإنتاجية."],
  ["نبتكر الطلب أيضًا","Projects Lab يصنع مجلات وأدلة وحملات ومبادرات ومنتجات موسمية ثم يبني حولها صفقات ورعايات."]
];

export default function AboutPage(){
  return <main className="about-page">
    <section className="about-hero">
      <div>
        <span className="eyebrow">ORYX PRINT NETWORK</span>
        <h1>مؤسسة رقمية تدير عالم الطباعة كمنظومة واحدة.</h1>
        <p>ORYX ليست موقع مطبعة تقليدية ولا وسيطًا يرسل الطلب وينساه. نحن واجهة رقمية للتصميم والطباعة والإعلان والتغليف والتصنيع الإبداعي، ندير العمل من الفكرة والمواصفة حتى الجودة والتسليم عبر شبكة إنتاج معتمدة ونظام تشغيل واحد.</p>
        <div className="hero-actions">
          <Link className="primary-button" href="/order/new">ابدأ طلبًا</Link>
          <Link className="secondary-button" href="/partners">انضم كشريك إنتاج</Link>
        </div>
      </div>
      <div className="about-manifesto">
        <small>الوعد المختصر</small>
        <strong>نطبع أي شيء<br/>على أي شيء.</strong>
        <span>نصمم · نطبع · نصنع · ننفذ</span>
      </div>
    </section>

    <section className="about-model">
      <div className="about-section-title">
        <span className="eyebrow">THE MODEL</span>
        <h2>العميل يرى مؤسسة واحدة. خلفها تعمل شبكة كاملة.</h2>
      </div>
      <div className="about-flow">
        <article><span>01</span><strong>العميل</strong><p>هدف، فكرة، مواصفات أو مشكلة يريد حلها.</p></article>
        <b>←</b>
        <article className="focus"><span>02</span><strong>ORYX</strong><p>تصميم، تسعير، إدارة الطلب، جودة، دعم وملكية العلاقة.</p></article>
        <b>←</b>
        <article><span>03</span><strong>محرك التوزيع</strong><p>يوازن القدرة والتكلفة والوقت والجودة والطاقة المتاحة.</p></article>
        <b>←</b>
        <article><span>04</span><strong>شبكة الإنتاج</strong><p>مطابع وورش ومصانع وموردون متخصصون ينفذون تحت معايير ORYX.</p></article>
      </div>
    </section>

    <section className="about-capabilities">
      <div className="about-section-title">
        <span className="eyebrow">WHAT WE OPERATE</span>
        <h2>من ملف الشعار إلى واجهة المبنى.</h2>
      </div>
      <div className="about-capability-grid">
        {capabilities.map(([title,description],index)=><article key={title}>
          <span>{String(index+1).padStart(2,"0")}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>)}
      </div>
      <Link className="about-inline-link" href="/services">استكشف موسوعة الخدمات ←</Link>
    </section>

    <section className="about-operating">
      <div className="about-section-title light">
        <span className="eyebrow light">HOW ORYX THINKS</span>
        <h2>لا نبيع مطبوعًا فقط. ندير نتيجة.</h2>
      </div>
      <div className="about-principle-grid">
        {principles.map(([title,description],index)=><article key={title}>
          <span>{String(index+1).padStart(2,"0")}</span>
          <strong>{title}</strong>
          <p>{description}</p>
        </article>)}
      </div>
    </section>

    <section className="about-audiences">
      <div>
        <span className="eyebrow">WHO WE SERVE</span>
        <h2>من طلب فردي دقيق إلى عقد مؤسسي سنوي.</h2>
      </div>
      <div className="about-audience-cloud">
        {["الشركات","المصانع","البنوك","المنظمات","المتاجر","المطاعم","الفنادق","المدارس","الجامعات","العيادات","المقاولون","العلامات التجارية","الفعاليات","الناشرون","المؤسسات الحكومية","الأفراد"].map(item=><span key={item}>{item}</span>)}
      </div>
    </section>

    <section className="about-lab">
      <div>
        <span className="eyebrow">ORYX PROJECTS LAB</span>
        <h2>وأحيانًا لا ننتظر العميل أصلًا.</h2>
        <p>نبتكر مجلة، دليلًا، حملة توعية، منتجًا موسميًا أو مشروع رعاية من الصفر، ثم نحوله داخل النظام إلى ميزانية ومخرجات وشركاء ورعاة وصفقات قابلة للقياس.</p>
      </div>
      <Link className="primary-button" href="/projects">دخول مختبر المشاريع</Link>
    </section>

    <section className="about-closing">
      <span>ORYX</span>
      <h2>طباعة أكثر ذكاءً. إنتاج أكثر اتساعًا. مسؤولية واحدة.</h2>
      <Link href="/order/new">ماذا تريد أن نصنع لك اليوم؟ ←</Link>
    </section>
  </main>;
}
