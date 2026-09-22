"use client";

import { useMemo, useState } from "react";
import { serviceCatalog } from "@/lib/service-catalog";

type Props={initialService?:string};

const steps=["الخدمة","المواصفات","التصميم","التسليم","الملخص"];

export function SmartOrderWizard({initialService}:Props){
  const [step,setStep]=useState(0);
  const [serviceSlug,setServiceSlug]=useState(initialService && serviceCatalog.some(s=>s.slug===initialService)?initialService:serviceCatalog[0]?.slug ?? "");
  const [specs,setSpecs]=useState<Record<string,string>>({});
  const [design,setDesign]=useState("ready");
  const [fulfilment,setFulfilment]=useState("pickup");
  const service=useMemo(()=>serviceCatalog.find(s=>s.slug===serviceSlug),[serviceSlug]);

  function setSpec(key:string,value:string){
    setSpecs(current=>({...current,[key]:value}));
  }

  return <div className="order-wizard">
    <div className="wizard-progress">
      {steps.map((label,index)=><button key={label} type="button" className={index===step?"active":index<step?"done":""} onClick={()=>index<=step&&setStep(index)}>
        <span>{index+1}</span><b>{label}</b>
      </button>)}
    </div>

    <div className="wizard-body">
      {step===0&&<section>
        <span className="eyebrow">STEP 01</span>
        <h2>اختر الخدمة</h2>
        <div className="wizard-service-list">
          {serviceCatalog.map(item=><button type="button" key={item.slug} className={item.slug===serviceSlug?"selected":""} onClick={()=>{setServiceSlug(item.slug);setSpecs({});}}>
            <small>{item.category}</small><strong>{item.title}</strong><span>{item.pricingMode==="instant"?"تسعير مباشر":"عرض سعر"}</span>
          </button>)}
        </div>
      </section>}

      {step===1&&service&&<section>
        <span className="eyebrow">STEP 02 · {service.category}</span>
        <h2>{service.title}</h2>
        <p className="wizard-lead">{service.summary}</p>
        <div className="field-grid">
          {service.fields.map(field=><label className="field-card" key={field.key}>
            <span>{field.label}{field.required?" *":""}</span>
            {field.type==="select"
              ? <select value={specs[field.key]??""} onChange={e=>setSpec(field.key,e.target.value)}><option value="">اختر</option>{field.options?.map(o=><option key={o}>{o}</option>)}</select>
              : field.type==="boolean"
              ? <select value={specs[field.key]??""} onChange={e=>setSpec(field.key,e.target.value)}><option value="">اختر</option><option value="yes">نعم</option><option value="no">لا</option></select>
              : field.type==="file"
              ? <input type="file"/>
              : <input type={field.type==="number"?"number":"text"} value={specs[field.key]??""} onChange={e=>setSpec(field.key,e.target.value)} placeholder={field.unit??"أدخل القيمة"}/>}
          </label>)}
        </div>
        {service.finishings?.length?<div className="wizard-finishing"><h3>التشطيبات المتاحة</h3><div className="option-grid">{service.finishings.map(item=><label className="check-option" key={item}><input type="checkbox"/><span>{item}</span></label>)}</div></div>:null}
      </section>}

      {step===2&&<section>
        <span className="eyebrow">STEP 03</span><h2>التصميم والملفات</h2>
        <div className="choice-grid">
          {[["ready","لدي تصميم جاهز","ارفع ملفاتك وسيتم فحص الجاهزية للطباعة."],["oryx","أحتاج تصميم من أوريكس","ننشئ Design Job ونسير معك عبر النسخ والاعتماد."],["idea","لدي فكرة فقط","حوّل الفكرة إلى Brief ونبني الحل معك."]].map(([value,title,desc])=>
            <button type="button" key={value} className={design===value?"selected":""} onClick={()=>setDesign(value)}><strong>{title}</strong><span>{desc}</span></button>
          )}
        </div>
      </section>}

      {step===3&&<section>
        <span className="eyebrow">STEP 04</span><h2>كيف تريد استلام الطلب؟</h2>
        <div className="choice-grid two">
          <button type="button" className={fulfilment==="pickup"?"selected":""} onClick={()=>setFulfilment("pickup")}><strong>استلام</strong><span>من نقطة تسليم ORYX أو شريك معتمد.</span></button>
          <button type="button" className={fulfilment==="delivery"?"selected":""} onClick={()=>setFulfilment("delivery")}><strong>توصيل</strong><span>حدد العنوان والموقع عند إنشاء الطلب.</span></button>
        </div>
      </section>}

      {step===4&&service&&<section>
        <span className="eyebrow">STEP 05</span><h2>ملخص الطلب</h2>
        <div className="order-summary">
          <div><small>الخدمة</small><strong>{service.title}</strong></div>
          <div><small>آلية السعر</small><strong>{service.pricingMode==="instant"?"تسعير مباشر":"عرض سعر بعد المراجعة"}</strong></div>
          <div><small>التصميم</small><strong>{design==="ready"?"جاهز":design==="oryx"?"تصميم من أوريكس":"تطوير الفكرة"}</strong></div>
          <div><small>الاستلام</small><strong>{fulfilment==="pickup"?"استلام":"توصيل"}</strong></div>
        </div>
        <div className="spec-summary">
          {Object.entries(specs).length?Object.entries(specs).map(([key,value])=><span key={key}><b>{service.fields.find(f=>f.key===key)?.label??key}</b>{value||"—"}</span>):<p>لم تدخل مواصفات بعد.</p>}
        </div>
        <div className="order-next-note">في مرحلة الربط التالية سيحفظ هذا الطلب في Neon، يولّد رقم طلب، ويبدأ التسعير أو مسار عرض السعر تلقائيًا.</div>
      </section>}
    </div>

    <div className="wizard-footer">
      <button type="button" className="secondary-button" disabled={step===0} onClick={()=>setStep(v=>Math.max(0,v-1))}>السابق</button>
      {step<steps.length-1
        ? <button type="button" className="primary-button" onClick={()=>setStep(v=>Math.min(steps.length-1,v+1))}>التالي</button>
        : <button type="button" className="primary-button">إنشاء الطلب</button>}
    </div>
  </div>;
}
