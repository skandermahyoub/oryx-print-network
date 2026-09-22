import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findPackage, offerPackages } from "@/lib/packages";

export function generateStaticParams(){
  return offerPackages.map(pack=>({slug:pack.slug}));
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const pack=findPackage(slug);
  if(!pack) return {};
  return {
    title:`${pack.title} | ORYX Print Network`,
    description:pack.summary
  };
}

export default async function PackageDetailPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const pack=findPackage(slug);
  if(!pack) notFound();

  const cta=pack.primaryService?`/order/new?service=${pack.primaryService}`:"/order/new";

  return <main className="package-detail-page">
    <section className="package-detail-hero">
      <div>
        <span className="eyebrow">{pack.seasonal?"عرض موسمي":"ORYX SOLUTION"}</span>
        <small>{pack.audience}</small>
        <h1>{pack.title}</h1>
        <p>{pack.salesAngle}</p>
        <div className="hero-actions">
          <Link className="primary-button" href={cta}>ابدأ طلب هذه الباقة</Link>
          <Link className="secondary-button" href="/packages">كل الباقات</Link>
        </div>
      </div>
      <div className="package-poster">
        <span>ORYX</span>
        <strong>{pack.title}</strong>
        <small>نطبع أي شيء على أي شيء</small>
      </div>
    </section>

    <section className="package-detail-body">
      <div className="package-intro">
        <span className="eyebrow">النتيجة المطلوبة</span>
        <h2>{pack.summary}</h2>
      </div>
      <div className="package-includes">
        {pack.items.map((item,index)=><article key={item}>
          <span>{String(index+1).padStart(2,"0")}</span>
          <strong>{item}</strong>
          <p>يمكن تخصيص المواصفات والكمية والخامة والتنفيذ وفق احتياج المؤسسة.</p>
        </article>)}
      </div>
      <div className="package-sales-strip">
        <div><small>طريقة البيع</small><strong>حل قابل للتخصيص</strong></div>
        <div><small>التسعير</small><strong>عرض موحد بعد تحديد العناصر</strong></div>
        <div><small>التنفيذ</small><strong>شبكة ORYX الإنتاجية</strong></div>
        <Link className="primary-button" href={cta}>ابدأ الآن</Link>
      </div>
    </section>
  </main>;
}
