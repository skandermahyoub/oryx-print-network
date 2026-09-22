import { offerPackages } from "@/lib/packages";

export default function PackagesPage(){
  return <main className="catalog-page">
    <section className="catalog-hero red-hero">
      <span className="eyebrow light">ORYX SOLUTIONS</span>
      <h1>لا تبحث عن 12 خدمة. اطلب النتيجة.</h1>
      <p>باقات صممت لتباع مباشرة لقطاعات وأهداف واضحة، ويمكن تخصيص عناصرها وعروضها.</p>
    </section>
    <section className="package-grid page-grid">
      {offerPackages.map((pack,index)=><article className="package-card" key={pack.slug}>
        <span className="package-index">{String(index+1).padStart(2,"0")}</span>
        <small>{pack.audience}{pack.seasonal?" · موسمي":""}</small>
        <h2>{pack.title}</h2>
        <p>{pack.summary}</p>
        <div className="package-items">{pack.items.map(item=><span key={item}>{item}</span>)}</div>
        <button type="button">ابنِ العرض لهذه الباقة</button>
      </article>)}
    </section>
  </main>;
}
