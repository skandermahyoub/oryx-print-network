"use client";

import { useMemo, useState } from "react";
import { serviceCatalog } from "@/lib/service-catalog";

type Props={initialService?:string};
type SubmitState="idle"|"sending"|"success"|"error";

const steps=["الخدمة","المواصفات","التصميم","التسليم","بياناتك","الملخص"];

export function SmartOrderWizard({initialService}:Props){
  const [step,setStep]=useState(0);
  const [serviceSlug,setServiceSlug]=useState(initialService && serviceCatalog.some(s=>s.slug===initialService)?initialService:serviceCatalog[0]?.slug ?? "");
  const [specs,setSpecs]=useState<Record<string,string>>({});
  const [design,setDesign]=useState("ready");
  const [fulfilment,setFulfilment]=useState("pickup");
  const [customer,setCustomer]=useState({displayName:"",companyName:"",phone:"",email:"",city:""});
  const [submitState,setSubmitState]=useState<SubmitState>("idle");
  const [submitMessage,setSubmitMessage]=useState("");
  const [createdOrder,setCreatedOrder]=useState<number|null>(null);

  const service=useMemo(()=>serviceCatalog.find(s=>s.slug===serviceSlug),[serviceSlug]);

  function setSpec(key:string,value:string){
    setSpecs(current=>({...current,[key]:value}));
  }

  function setCustomerField(key:keyof typeof customer,value:string){
    setCustomer(current=>({...current,[key]:value}));
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
          <button type="button" className={fulfilment==="delivery"?"selected":""} onClick={()=>setFulfilment("delivery")}><strong>توصيل</strong><span>سيتم تأكيد العنوان والتكلفة والموعد بعد المراجعة.</span></button>
        </div>
      </section>}

      {step===4&&<section>
        <span className="eyebrow">STEP 05</span><h2>بيانات العميل</h2>
        <p className="wizard-lead">هذه البيانات تنشئ سجل العميل والطلب وتستخدم في المتابعة وعرض السعر.</p>
        <div className="field-grid">
          <label className="field-card"><span>الاسم *</span><input value={customer.displayName} onChange={e=>setCustomerField("displayName",e.target.value)} placeholder="الاسم الكامل"/></label>
          <label className="field-card"><span>المؤسسة</span><input value={customer.companyName} onChange={e=>setCustomerField("companyName",e.target.value)} placeholder="اختياري"/></label>
          <label className="field-card"><span>رقم التواصل *</span><input value={customer.phone} onChange={e=>setCustomerField("phone",e.target.value)} placeholder="77xxxxxxx"/></label>
          <label className="field-card"><span>البريد الإلكتروني</span><input type="email" value={customer.email} onChange={e=>setCustomerField("email",e.target.value)} placeholder="name@example.com"/></label>
          <label className="field-card"><span>المدينة</span><input value={customer.city} onChange={e=>setCustomerField("city",e.target.value)} placeholder="صنعاء"/></label>
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
            {Object.entries(specs).length?Object.entries(specs).map(([key,value])=><span key={key}><b>{service.fields.find(f=>f.key===key)?.label??key}</b>{value||"—"}</span>):<p>لم تدخل مواصفات بعد.</p>}
          </div>
          <div className="customer-summary"><strong>{customer.displayName||"اسم العميل غير مكتمل"}</strong><span>{customer.companyName}</span><span>{customer.phone}</span><span>{customer.city}</span></div>
          {submitState==="error"&&submitMessage?<p className="form-error">{submitMessage}</p>:null}
        </>}
      </section>}
    </div>

    <div className="wizard-footer">
      <button type="button" className="secondary-button" disabled={step===0||submitState==="sending"} onClick={()=>setStep(v=>Math.max(0,v-1))}>السابق</button>
      {step<steps.length-1
        ? <button type="button" className="primary-button" onClick={()=>setStep(v=>Math.min(steps.length-1,v+1))}>التالي</button>
        : submitState!=="success"?<button type="button" className="primary-button" disabled={submitState==="sending"} onClick={createOrder}>{submitState==="sending"?"جاري إنشاء الطلب...":"إنشاء الطلب"}</button>
        : <button type="button" className="primary-button" onClick={()=>{setStep(0);setSpecs({});setCreatedOrder(null);setSubmitState("idle");}}>طلب جديد</button>}
    </div>
  </div>;
}
