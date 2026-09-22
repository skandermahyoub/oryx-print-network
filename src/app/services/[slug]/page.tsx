import { notFound } from "next/navigation";
import { findService, serviceCatalog } from "@/lib/service-catalog";

export function generateStaticParams(){
  return serviceCatalog.map(service=>({slug:service.slug}));
}

export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const service=findService(slug);
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
            {field.type==="select"
              ? <select defaultValue=""><option value="" disabled>اختر</option>{field.options?.map(option=><option key={option}>{option}</option>)}</select>
              : field.type==="boolean"
              ? <select defaultValue=""><option value="" disabled>اختر</option><option>نعم</option><option>لا</option></select>
              : field.type==="file"
              ? <input type="file"/>
              : <input type={field.type==="number"?"number":"text"} placeholder={field.unit?field.unit:"أدخل القيمة"}/>}
          </label>)}
        </div>
      </div>

      {service.finishings?.length?<div className="config-panel">
        <div className="config-title"><span>02</span><h2>التشطيب والإضافات</h2></div>
        <div className="option-grid">
          {service.finishings.map(item=><label className="check-option" key={item}><input type="checkbox"/><span>{item}</span></label>)}
        </div>
      </div>:null}

      <div className="config-panel">
        <div className="config-title"><span>{service.finishings?.length?"03":"02"}</span><h2>التصميم والملفات</h2></div>
        <div className="option-grid">
          <label className="check-option"><input type="radio" name="design"/><span>لدي تصميم جاهز</span></label>
          <label className="check-option"><input type="radio" name="design"/><span>أحتاج تصميم من أوريكس</span></label>
          <label className="check-option"><input type="radio" name="design"/><span>لدي فكرة فقط</span></label>
        </div>
      </div>

      <div className="sticky-order-bar">
        <div><small>ORYX SMART ORDER</small><strong>المواصفات تُحفظ مرة واحدة وتتحرك مع الطلب حتى التسليم.</strong></div>
        <button type="button">متابعة الطلب</button>
      </div>
    </section>
  </main>;
}
