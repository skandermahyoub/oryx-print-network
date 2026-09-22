import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalogService } from "@/lib/catalog-repository";
import { serviceCatalog, type ServiceField } from "@/lib/service-catalog";

export function generateStaticParams(){
  return serviceCatalog.map(service=>({slug:service.slug}));
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const service=await getCatalogService(slug);
  if(!service) return {};
  return {
    title:`${service.title} | ORYX Print Network`,
    description:service.summary,
    openGraph:{title:service.title,description:service.summary,type:"website"}
  };
}

function FieldControl({field}:{field:ServiceField}){
  if(field.type==="select"){
    return <select defaultValue=""><option value="" disabled>اختر</option>{field.options?.map(option=><option key={option}>{option}</option>)}</select>;
  }
  if(field.type==="boolean"){
    return <select defaultValue=""><option value="" disabled>اختر</option><option>نعم</option><option>لا</option></select>;
  }
  if(field.type==="file"){
    return <input type="file"/>;
  }
  if(field.type==="textarea"){
    return <textarea rows={4} placeholder="اكتب التفاصيل"/>;
  }
  if(field.type==="date"){
    return <input type="date"/>;
  }
  if(field.type==="color"){
    return <input type="color"/>;
  }
  return <input type={field.type==="number"?"number":"text"} placeholder={field.unit??(field.type==="location"?"اكتب الموقع أو العنوان":"أدخل القيمة")}/>;
}

export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const service=await getCatalogService(slug);
  if(!service) notFound();

  return <main className="service-detail">
    <section className="service-detail-hero">
      <div>
        <span className="eyebrow">{service.category}</span>
        <h1>{service.title}</h1>
        <p>{service.summary}</p>
      </div>
      <div className="service-badge">{service.pricingMode==="instant"?"قابل للتسعير المباشر":"يحتاج مراجعة وعرض سعر"}</div>
    </section>

    <section className="configurator">
      <div className="config-panel">
        <div className="config-title"><span>01</span><h2>مواصفات طلبك</h2></div>
        <div className="field-grid">
          {service.fields.map(field=><label className="field-card" key={field.key}>
            <span>{field.label}{field.required?" *":""}</span>
            <FieldControl field={field}/>
          </label>)}
        </div>
      </div>

      {service.finishings?.length?<div className="config-panel">
        <div className="config-title"><span>02</span><h2>التشطيب والإضافات</h2></div>
        <div className="option-grid">
          {service.finishings.map(item=><label className="check-option" key={item}><input type="checkbox"/><span>{item}</span></label>)}
        </div>
      </div>:null}

      {service.workflow?.length?<div className="config-panel">
        <div className="config-title"><span>{service.finishings?.length?"03":"02"}</span><h2>كيف سينفذ العمل؟</h2></div>
        <div className="workflow-preview">
          {service.workflow.map((step,index)=><article key={`${step}-${index}`}>
            <span>{String(index+1).padStart(2,"0")}</span>
            <strong>{step}</strong>
          </article>)}
        </div>
      </div>:null}

      {service.preflight?.length?<div className="config-panel">
        <div className="config-title"><span>{service.workflow?.length?(service.finishings?.length?"04":"03"):(service.finishings?.length?"03":"02")}</span><h2>متطلبات تجهيز العمل</h2></div>
        <div className="preflight-service-grid">
          {service.preflight.map(requirement=><article key={requirement.key}>
            <strong>{requirement.label}</strong>
            <small>{requirement.requiredBeforeQuote?"مطلوب قبل عرض السعر":requirement.requiredBeforeProduction?"مطلوب قبل الإنتاج":"للمراجعة"}</small>
          </article>)}
        </div>
      </div>:null}

      <div className="config-panel">
        <div className="config-title"><span>{2+(service.finishings?.length?1:0)+(service.workflow?.length?1:0)+(service.preflight?.length?1:0)}</span><h2>التصميم والملفات</h2></div>
        <div className="option-grid">
          <label className="check-option"><input type="radio" name="design"/><span>لدي تصميم جاهز</span></label>
          <label className="check-option"><input type="radio" name="design"/><span>أحتاج تصميم من أوريكس</span></label>
          <label className="check-option"><input type="radio" name="design"/><span>لدي فكرة فقط</span></label>
        </div>
      </div>

      <div className="sticky-order-bar">
        <div><small>ORYX SMART ORDER</small><strong>المواصفات تُحفظ مرة واحدة وتتحرك مع الطلب حتى التسليم.</strong></div>
        <Link className="primary-button" href={`/order/new?service=${service.slug}`}>متابعة الطلب</Link>
      </div>
    </section>
  </main>;
}
