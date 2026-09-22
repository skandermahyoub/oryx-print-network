"use client";

import { useEffect, useMemo, useState } from "react";
import { findService, serviceCatalog, type CatalogService, type ServiceField } from "@/lib/service-catalog";

type Props={initialService?:string};
type SubmitState="idle"|"sending"|"success"|"error";
type CatalogSummary={
  slug:string;
  category:string;
  title:string;
  summary:string;
  pricingMode:"instant"|"quote";
};

const steps=["الخدمة","المواصفات","التصميم","التسليم","بياناتك","الملخص"];

function fallbackSummaries():CatalogSummary[]{
  return serviceCatalog.map(service=>({
    slug:service.slug,
    category:service.category,
    title:service.title,
    summary:service.summary,
    pricingMode:service.pricingMode
  }));
}

function FieldInput({
  field,
  value,
  onChange
}:{
  field:ServiceField;
  value:string;
  onChange:(value:string)=>void;
}){
  if(field.type==="select"){
    return <select value={value} onChange={event=>onChange(event.target.value)}>
      <option value="">اختر</option>
      {field.options?.map(option=><option key={option}>{option}</option>)}
    </select>;
  }
  if(field.type==="boolean"){
    return <select value={value} onChange={event=>onChange(event.target.value)}>
      <option value="">اختر</option>
      <option value="yes">نعم</option>
      <option value="no">لا</option>
    </select>;
  }
  if(field.type==="file"){
    return <input type="file"/>;
  }
  if(field.type==="textarea"){
    return <textarea rows={4} value={value} onChange={event=>onChange(event.target.value)} placeholder="اكتب التفاصيل"/>;
  }
  if(field.type==="date"){
    return <input type="date" value={value} onChange={event=>onChange(event.target.value)}/>;
  }
  if(field.type==="color"){
    return <input type="color" value={value||"#000000"} onChange={event=>onChange(event.target.value)}/>;
  }
  return <input
    type={field.type==="number"?"number":"text"}
    value={value}
    onChange={event=>onChange(event.target.value)}
    placeholder={field.unit??(field.type==="location"?"اكتب الموقع أو العنوان":"أدخل القيمة")}
  />;
}

export function SmartOrderWizard({initialService}:Props){
  const initialFallback=findService(initialService??"")??serviceCatalog[0];
  const [catalog,setCatalog]=useState<CatalogSummary[]>(fallbackSummaries());
  const [catalogSearch,setCatalogSearch]=useState("");
  const [categoryFilter,setCategoryFilter]=useState("all");
  const [catalogLoading,setCatalogLoading]=useState(true);
  const [step,setStep]=useState(0);
  const [serviceSlug,setServiceSlug]=useState(initialFallback?.slug??"");
  const [service,setService]=useState<CatalogService|undefined>(initialFallback);
  const [serviceLoading,setServiceLoading]=useState(false);
  const [specs,setSpecs]=useState<Record<string,string>>({});
  const [selectedFinishings,setSelectedFinishings]=useState<string[]>([]);
  const [design,setDesign]=useState("ready");
  const [fulfilment,setFulfilment]=useState("pickup");
  const [customer,setCustomer]=useState({displayName:"",companyName:"",phone:"",email:"",city:""});
  const [submitState,setSubmitState]=useState<SubmitState>("idle");
  const [submitMessage,setSubmitMessage]=useState("");
  const [createdOrder,setCreatedOrder]=useState<number|null>(null);

  useEffect(()=>{
    let active=true;
    fetch("/api/catalog")
      .then(response=>response.ok?response.json():Promise.reject(new Error("catalog")))
      .then(data=>{
        if(!active||!Array.isArray(data.services)) return;
        setCatalog(data.services);
        const requested=initialService&&data.services.some((item:CatalogSummary)=>item.slug===initialService)?initialService:null;
        if(requested) setServiceSlug(requested);
      })
      .catch(()=>{})
      .finally(()=>active&&setCatalogLoading(false));
    return ()=>{active=false;};
  },[initialService]);

  useEffect(()=>{
    if(!serviceSlug) return;
    let active=true;
    const fallback=findService(serviceSlug);
    if(fallback) setService(fallback);
    setServiceLoading(true);

    fetch(`/api/catalog/${encodeURIComponent(serviceSlug)}`)
      .then(response=>response.ok?response.json():Promise.reject(new Error("service")))
      .then(data=>{
        if(active&&data.service) setService(data.service);
      })
      .catch(()=>{
        if(active) setService(fallback);
      })
      .finally(()=>active&&setServiceLoading(false));

    return ()=>{active=false;};
  },[serviceSlug]);

  const categories=useMemo(()=>Array.from(new Set(catalog.map(item=>item.category))),[catalog]);
  const filteredCatalog=useMemo(()=>{
    const needle=catalogSearch.trim().toLowerCase();
    return catalog.filter(item=>{
      const categoryOk=categoryFilter==="all"||item.category===categoryFilter;
      const searchOk=!needle||`${item.title} ${item.summary} ${item.category}`.toLowerCase().includes(needle);
      return categoryOk&&searchOk;
    });
  },[catalog,catalogSearch,categoryFilter]);

  function chooseService(slug:string){
    setServiceSlug(slug);
    setSpecs({});
    setSelectedFinishings([]);
    setSubmitState("idle");
    setSubmitMessage("");
  }

  function setSpec(key:string,value:string){
    setSpecs(current=>({...current,[key]:value}));
  }

  function setCustomerField(key:keyof typeof customer,value:string){
    setCustomer(current=>({...current,[key]:value}));
  }

  function toggleFinishing(name:string){
    setSelectedFinishings(current=>current.includes(name)?current.filter(item=>item!==name):[...current,name]);
  }

  function goNext(){
    setSubmitMessage("");
    if(step===1&&service){
      const missing=service.fields.filter(field=>field.required&&field.type!=="file"&&!String(specs[field.key]??"").trim());
      if(missing.length){
        setSubmitState("error");
        setSubmitMessage(`أكمل الحقول المطلوبة: ${missing.map(field=>field.label).join("، ")}`);
        return;
      }
    }
    if(step===4&&(customer.displayName.trim().length<2||customer.phone.trim().length<5)){
      setSubmitState("error");
      setSubmitMessage("أدخل الاسم ورقم التواصل قبل المتابعة.");
      return;
    }
    setSubmitState("idle");
    setStep(value=>Math.min(steps.length-1,value+1));
  }

  async function createOrder(){
    if(!service) return;
    if(customer.displayName.trim().length<2 || customer.phone.trim().length<5){
      setSubmitState("error");
      setSubmitMessage("أدخل الاسم ورقم التواصل قبل إنشاء الطلب.");
      setStep(4);
      return;
    }

    setSubmitState("sending");
    setSubmitMessage("");

    try{
      const response=await fetch("/api/orders",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
          serviceSlug:service.slug,
          specs,
          finishings:selectedFinishings,
          design,
          fulfilment,
          customer
        })
      });
      const data=await response.json();
      if(!response.ok) throw new Error(data.error??"تعذر إنشاء الطلب");

      setCreatedOrder(data.orderNumber??null);
      setSubmitState("success");
      setSubmitMessage("تم إنشاء الطلب وإرساله للمراجعة.");
    }catch(error){
      setSubmitState("error");
      setSubmitMessage(error instanceof Error?error.message:"تعذر إنشاء الطلب");
    }
  }

  return <div className="order-wizard">
    <div className="wizard-progress six">
      {steps.map((label,index)=><button key={label} type="button" className={index===step?"active":index<step?"done":""} onClick={()=>index<=step&&setStep(index)}>
        <span>{index+1}</span><b>{label}</b>
      </button>)}
    </div>

    <div className="wizard-body">
      {step===0&&<section>
        <span className="eyebrow">STEP 01</span>
        <h2>اختر من موسوعة الخدمات</h2>
        <p className="wizard-lead">{catalogLoading?"جاري تحميل الكتالوج الكامل...":`${catalog.length} خدمة متاحة داخل ORYX.`}</p>
        <div className="catalog-picker-tools">
          <input value={catalogSearch} onChange={event=>setCatalogSearch(event.target.value)} placeholder="ابحث: مجلة، تقويم، استيكر، علبة، لوحة، هدية..."/>
          <select value={categoryFilter} onChange={event=>setCategoryFilter(event.target.value)}>
            <option value="all">كل التصنيفات</option>
            {categories.map(category=><option key={category} value={category}>{category}</option>)}
          </select>
          <span>{filteredCatalog.length} نتيجة</span>
        </div>
        <div className="wizard-service-list">
          {filteredCatalog.slice(0,80).map(item=><button type="button" key={item.slug} className={item.slug===serviceSlug?"selected":""} onClick={()=>chooseService(item.slug)}>
            <small>{item.category}</small><strong>{item.title}</strong><span>{item.pricingMode==="instant"?"تسعير مباشر":"عرض سعر"}</span>
          </button>)}
        </div>
        {filteredCatalog.length>80?<p className="catalog-limit-note">تظهر أول 80 نتيجة. استخدم البحث أو التصنيف للوصول للخدمة المطلوبة بسرعة.</p>:null}
      </section>}

      {step===1&&<section>
        {serviceLoading&&!service?<p>جاري تحميل مواصفات الخدمة...</p>:service?<>
          <span className="eyebrow">STEP 02 · {service.category}</span>
          <h2>{service.title}</h2>
          <p className="wizard-lead">{service.summary}</p>
          <div className="field-grid">
            {service.fields.map(field=><label className="field-card" key={field.key}>
              <span>{field.label}{field.required?" *":""}</span>
              <FieldInput field={field} value={specs[field.key]??""} onChange={value=>setSpec(field.key,value)}/>
            </label>)}
          </div>
          {service.finishings?.length?<div className="wizard-finishing">
            <h3>التشطيبات والإضافات المتوافقة</h3>
            <div className="option-grid">{service.finishings.map(item=><label className="check-option" key={item}>
              <input type="checkbox" checked={selectedFinishings.includes(item)} onChange={()=>toggleFinishing(item)}/>
              <span>{item}</span>
            </label>)}</div>
          </div>:null}
          {submitState==="error"&&submitMessage?<p className="form-error">{submitMessage}</p>:null}
        </>:<p className="form-error">تعذر تحميل الخدمة. اختر خدمة أخرى.</p>}
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
          <button type="button" className={fulfilment==="delivery"?"selected":""} onClick={()=>setFulfilment("delivery")}><strong>توصيل</strong><span>سيتم تأكيد العنوان والتكلفة والموعد بعد المراجعة.</span></button>
        </div>
      </section>}

      {step===4&&<section>
        <span className="eyebrow">STEP 05</span><h2>بيانات العميل</h2>
        <p className="wizard-lead">هذه البيانات تنشئ سجل العميل والطلب وتستخدم في المتابعة وعرض السعر.</p>
        <div className="field-grid">
          <label className="field-card"><span>الاسم *</span><input value={customer.displayName} onChange={event=>setCustomerField("displayName",event.target.value)} placeholder="الاسم الكامل"/></label>
          <label className="field-card"><span>المؤسسة</span><input value={customer.companyName} onChange={event=>setCustomerField("companyName",event.target.value)} placeholder="اختياري"/></label>
          <label className="field-card"><span>رقم التواصل *</span><input value={customer.phone} onChange={event=>setCustomerField("phone",event.target.value)} placeholder="77xxxxxxx"/></label>
          <label className="field-card"><span>البريد الإلكتروني</span><input type="email" value={customer.email} onChange={event=>setCustomerField("email",event.target.value)} placeholder="name@example.com"/></label>
          <label className="field-card"><span>المدينة</span><input value={customer.city} onChange={event=>setCustomerField("city",event.target.value)} placeholder="صنعاء"/></label>
        </div>
        {submitState==="error"&&submitMessage?<p className="form-error">{submitMessage}</p>:null}
      </section>}

      {step===5&&service&&<section>
        <span className="eyebrow">STEP 06</span><h2>ملخص الطلب</h2>
        {submitState==="success"?<div className="order-created">
          <span>تم</span>
          <h3>طلبك أصبح داخل ORYX</h3>
          <p>{createdOrder?<>رقم الطلب <strong>#{createdOrder}</strong>. </>:null}سيتم تحويله الآن إلى التسعير أو المراجعة حسب نوع الخدمة.</p>
        </div>:<>
          <div className="order-summary">
            <div><small>الخدمة</small><strong>{service.title}</strong></div>
            <div><small>آلية السعر</small><strong>{service.pricingMode==="instant"?"تسعير مباشر":"عرض سعر بعد المراجعة"}</strong></div>
            <div><small>التصميم</small><strong>{design==="ready"?"جاهز":design==="oryx"?"تصميم من أوريكس":"تطوير الفكرة"}</strong></div>
            <div><small>الاستلام</small><strong>{fulfilment==="pickup"?"استلام":"توصيل"}</strong></div>
          </div>
          <div className="spec-summary">
            {Object.entries(specs).length?Object.entries(specs).map(([key,value])=><span key={key}><b>{service.fields.find(field=>field.key===key)?.label??key}</b>{value||"—"}</span>):<p>لم تدخل مواصفات بعد.</p>}
          </div>
          {selectedFinishings.length?<div className="spec-summary">{selectedFinishings.map(item=><span key={item}><b>تشطيب</b>{item}</span>)}</div>:null}
          <div className="customer-summary"><strong>{customer.displayName||"اسم العميل غير مكتمل"}</strong><span>{customer.companyName}</span><span>{customer.phone}</span><span>{customer.city}</span></div>
          {submitState==="error"&&submitMessage?<p className="form-error">{submitMessage}</p>:null}
        </>}
      </section>}
    </div>

    <div className="wizard-footer">
      <button type="button" className="secondary-button" disabled={step===0||submitState==="sending"} onClick={()=>setStep(value=>Math.max(0,value-1))}>السابق</button>
      {step<steps.length-1
        ? <button type="button" className="primary-button" disabled={step===1&&(!service||serviceLoading)} onClick={goNext}>التالي</button>
        : submitState!=="success"?<button type="button" className="primary-button" disabled={submitState==="sending"} onClick={createOrder}>{submitState==="sending"?"جاري إنشاء الطلب...":"إنشاء الطلب"}</button>
        : <button type="button" className="primary-button" onClick={()=>{setStep(0);setSpecs({});setSelectedFinishings([]);setCreatedOrder(null);setSubmitState("idle");}}>طلب جديد</button>}
    </div>
  </div>;
}
