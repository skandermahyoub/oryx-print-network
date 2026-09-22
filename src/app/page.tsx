import { ServiceGrid } from "@/components/service-grid";
import { SiteHeader } from "@/components/site-header";

export default function Home(){
  return <main><div className="page-shell">
    <SiteHeader />

    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">ORYX PRINT NETWORK</span>
        <h1>نطبع أي شيء<br/><span>على أي شيء.</span></h1>
        <p>صمّم، اطبع، اصنع ونفّذ ما تحتاجه من مكان واحد. أوريكس تدير الفكرة والمواصفات والتسعير والإنتاج والجودة والتسليم عبر شبكة تنفيذ متخصصة.</p>
        <div className="hero-actions">
          <a className="primary-button" href="#start">ابدأ طلبك الآن</a>
          <a className="secondary-button" href="#services">استكشف الخدمات</a>
        </div>
      </div>
      <div className="hero-panel" aria-label="مؤشرات المنصة">
        <div className="panel-orbit"><span>DESIGN</span><span>PRINT</span><span>MAKE</span><span>DELIVER</span></div>
        <div className="panel-center"><strong>ORYX</strong><small>ONE DIGITAL OFFICE</small></div>
      </div>
    </section>

    <section className="search-strip" id="start">
      <div><span className="eyebrow">ابدأ من احتياجك</span><h2>ماذا تريد أن نصنع لك اليوم؟</h2></div>
      <div className="search-box"><input aria-label="ابحث عن خدمة" placeholder="مثال: تقويم مكتبي 2027، مجلة مؤسسة، علب منتج، لوحة واجهة..."/><button type="button">بحث</button></div>
    </section>

    <section className="section" id="services">
      <div className="section-heading">
        <div><span className="eyebrow">موسوعة إنتاجية قابلة للتوسع</span><h2>كل ما يمكن تصميمه، طباعته أو تصنيعه</h2></div>
        <p>كل خدمة ستملك صفحة مستقلة ومواصفات وتسعير وتشطيبات ومسار إنتاج خاصًا بها.</p>
      </div>
      <ServiceGrid />
    </section>

    <section className="split-section" id="packages">
      <div className="feature-card red">
        <span className="eyebrow light">حلول جاهزة للبيع</span>
        <h2>باقات تُبنى حول العميل، لا حول الماكينة.</h2>
        <p>افتتاح متجر، إطلاق منتج، مجلة ذكرى مؤسسة، موسم 2027، تجهيز فعالية، هوية أسطول والمزيد.</p>
        <button className="ghost-button" type="button">استكشف الباقات</button>
      </div>
      <div className="feature-card dark" id="projects">
        <span className="eyebrow light">ORYX PROJECTS LAB</span>
        <h2>نخلق المشاريع بدل انتظار الطلبات.</h2>
        <p>مجلات، أدلة، حملات توعية، مبادرات مجتمعية، مشاريع رعاية وإصدارات نبتكرها ثم نبني حولها الصفقات.</p>
        <button className="ghost-button" type="button">مشاريعنا</button>
      </div>
    </section>

    <section className="network-section" id="partners">
      <span className="eyebrow">شبكة الإنتاج</span>
      <h2>أوريكس أمام العميل. شبكة محترفة خلف الكواليس.</h2>
      <p>المطابع ومراكز الليزر واللوحات والتغليف والهدايا يمكنها الانضمام كشركاء إنتاج، تقديم أسعار ORYX الخاصة، واستلام الأعمال وفق القدرة والجودة والموعد.</p>
      <div className="network-flow"><span>العميل</span><b>←</b><span>ORYX</span><b>←</b><span>محرك التوزيع</span><b>←</b><span>شريك الإنتاج</span></div>
    </section>

    <section className="section compact" id="magazine">
      <div className="section-heading">
        <div><span className="eyebrow">المجلة الرقمية</span><h2>المعرفة تتحول إلى زيارات، والزيارات إلى طلبات.</h2></div>
        <p>محتوى عربي متخصص في الطباعة والتغليف والتصميم والإعلانات، مرتبط مباشرة بالخدمات والباقات.</p>
      </div>
    </section>

    <footer><strong>ORYX PRINT NETWORK</strong><span>نطبع أي شيء على أي شيء.</span><small>Foundation Preview · 2026</small></footer>
  </div></main>;
}
