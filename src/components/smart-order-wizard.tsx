"use client";

import { useEffect, useMemo, useState } from "react";
import { findService, serviceCatalog, type CatalogService, type ServiceField } from "@/lib/service-catalog";
import { PricingPreview } from "@/components/pricing-preview";
import { PublicOrderUploader, type PublicOrderAttachment } from "@/components/public-order-uploader";

type Props={initialService?:string};
type SubmitState="idle"|"sending"|"success"|"error";
type CatalogSummary={
  slug:string;
  category:string;
  title:string;
  summary:string;
  pricingMode:"instant"|"quote";
};

type DraftItem={
  serviceSlug:string;
  title:string;
  specs:Record<string,string>;
  finishings:string[];
  design:"ready"|"oryx"|"idea";
  attachments:PublicOrderAttachment[];
};

const steps=["الخدمة","المواصفات","التصميم","التسليم","بياناتك","الملخص"];

function conditionMatches(conditions:Record<string,unknown>,specs:Record<string,string>){
  const field=typeof conditions.field==="string"?conditions.field:null;
  if(!field) return false;
  const value=specs[field]??"";
  if(conditions.equals!==undefined) return String(value)===String(conditions.equals);
  if(conditions.not_equals!==undefined) return String(value)!==String(conditions.not_equals);
  if(conditions.greater_than!==undefined) return Number(value)>Number(conditions.greater_than);
  if(conditions.less_than!==undefined) return Number(value)<Number(conditions.less_than);
  if(Array.isArray(conditions.in)) return conditions.in.map(String).includes(String(value));
  return false;
}

function isFieldVisible(service:CatalogService,fieldKey:string,specs:Record<string,string>){
  const rules=(service.fieldRules??[]).filter(rule=>rule.targetFieldKey===fieldKey);
  const showRules=rules.filter(rule=>rule.ruleType==="show_if");
  if(showRules.length&&!showRules.some(rule=>conditionMatches(rule.conditions,specs))) return false;
  if(rules.some(rule=>rule.ruleType==="hide_if"&&conditionMatches(rule.conditions,specs))) return false;
  return true;
}

function isFieldRequired(service:CatalogService,field:ServiceField,specs:Record<string,string>){
  if(field.required) return true;
  return (service.fieldRules??[]).some(rule=>
    rule.targetFieldKey===field.key&&
    rule.ruleType==="require_if"&&
    conditionMatches(rule.conditions,specs)
  );
}

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
  const [specs,setSpecs]=useState<Record<string,string>>({});
  const [selectedFinishings,setSelectedFinishings]=useState<string[]>([]);
  const [attachments,setAttachments]=useState<PublicOrderAttachment[]>([]);
  const [design,setDesign]=useState("ready");
  const [fulfilment,setFulfilment]=useState("pickup");
  const [customer,setCustomer]=useState({displayName:"",companyName:"",phone:"",email:"",city:""});
  const [submitState,setSubmitState]=useState<SubmitState>("idle");
  const [submitMessage,setSubmitMessage]=useState("");
  const [createdOrder,setCreatedOrder]=useState<number|null>(null);
  const [createdItemCount,setCreatedItemCount]=useState(0);
  const [draftItems,setDraftItems]=useState<DraftItem[]>([]);

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

    fetch(`/api/catalog/${encodeURIComponent(serviceSlug)}`)
      .then(response=>response.ok?response.json():Promise.reject(new Error("service")))
      .then(data=>{
        if(active&&data.service) setService(data.service);
      })
      .catch(()=>{
        if(active) setService(fallback);
      });

    return ()=>{active=false;};
  },[serviceSlug]);

  const serviceLoading=Boolean(serviceSlug&&service?.slug!==serviceSlug);

  const categories=useMemo(()=>Array.from(new Set(catalog.map(item=>item.category))),[catalog]);
  const visibleFields=useMemo(
    ()=>service?service.fields.filter(field=>isFieldVisible(service,field.key,specs)):[],
    [service,specs]
  );

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
    setService(findService(slug));
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

  function currentDraftItem():DraftItem|null{
    if(!service) return null;
    return {
      serviceSlug:service.slug,
      title:service.title,
      specs:{...specs},
      finishings:[...selectedFinishings],
      design:design as DraftItem["design"],
      attachments:[...attachments]
    };
  }

  function addAnotherItem(){
    const item=currentDraftItem();
    if(!item) return;
    setDraftItems(current=>[...current,item]);
    setServiceSlug("");
    setService(undefined);
    setSpecs({});
    setSelectedFinishings([]);
    setAttachments([]);
    setDesign("ready");
    setCatalogSearch("");
    setCategoryFilter("all");
    setSubmitState("idle");
    setSubmitMessage("");
    setStep(0);
  }

  function removeDraftItem(index:number){
    setDraftItems(current=>current.filter((_,itemIndex)=>itemIndex!==index));
  }

  function goNext(){
    setSubmitMessage("");
    if(step===1&&service){
      const missing=visibleFields.filter(field=>isFieldRequired(service,field,specs)&&field.type!=="file"&&!String(specs[field.key]??"").trim());
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
          items:[
            ...draftItems.map(item=>({
              serviceSlug:item.serviceSlug,
              specs:item.specs,
              finishings:item.finishings,
              design:item.design,
              attachments:item.attachments
            })),
            {
              serviceSlug:service.slug,
              specs,
              finishings:selectedFinishings,
              design,
              attachments
            }
          ],
          fulfilment,
          customer
        })
      });
      const data=await response.json();
      if(!response.ok) throw new Error(data.error??"تعذر إنشاء الطلب");

      setCreatedOrder(data.orderNumber??null);
      setCreatedItemCount(Number(data.itemCount??draftItems.length+1));
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
        <div className="wizard-title-row">
          <h2>اختر من موسوعة الخدمات</h2>
          {draftItems.length?<span className="order-cart-badge">{draftItems.length} عنصر محفوظ في الطلب</span>:null}
        </div>
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
            {visibleFields.map(field=><label className="field-card" key={field.key}>
              <span>{field.label}{isFieldRequired(service,field,specs)?" *":""}</span>
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
        <div className="order-files-panel">
          <div>
            <small>FILES & ARTWORK</small>
            <strong>ملفات هذا العنصر</strong>
            <span>ترفع مباشرة إلى التخزين ولا تمر عبر خادم الصفحة.</span>
          </div>
          <PublicOrderUploader attachments={attachments} onChange={setAttachments}/>
        </div>
        {service?.preflight?.length?<div className="preflight-panel">
          <div><small>قبل الإنتاج</small><strong>متطلبات تجهيز هذه الخدمة</strong></div>
          <ul>
            {service.preflight.map(requirement=><li key={requirement.key}>
              <span>{requirement.label}</span>
              <small>{requirement.requiredBeforeQuote?"قبل عرض السعر":requirement.requiredBeforeProduction?"قبل الإنتاج":"للمراجعة"}</small>
            </li>)}
          </ul>
        </div>:null}
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
          <p>{createdOrder?<>رقم الطلب <strong>#{createdOrder}</strong>. </>:null}{createdItemCount>1?<>يحتوي على <strong>{createdItemCount}</strong> عناصر. </>:null}سيتم تحويله الآن إلى التسعير أو المراجعة حسب نوع كل خدمة.</p>
        </div>:<>
          {draftItems.length?<div className="multi-item-cart">
            <div className="multi-item-cart-head"><strong>عناصر إضافية في نفس الطلب</strong><span>{draftItems.length}</span></div>
            {draftItems.map((item,index)=><article key={`${item.serviceSlug}-${index}`}>
              <div><small>عنصر {index+1}</small><strong>{item.title}</strong><span>{item.attachments.length?item.attachments.length+" ملفات مرفقة":"بدون ملفات"}</span></div>
              <button type="button" onClick={()=>removeDraftItem(index)}>إزالة</button>
            </article>)}
          </div>:null}
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
          <PricingPreview serviceSlug={service.slug} specs={specs}/>
          <button type="button" className="add-another-item" onClick={addAnotherItem}>+ أضف خدمة أخرى إلى نفس الطلب</button>
          <div className="customer-summary"><strong>{customer.displayName||"اسم العميل غير مكتمل"}</strong><span>{customer.companyName}</span><span>{customer.phone}</span><span>{customer.city}</span></div>
          {submitState==="error"&&submitMessage?<p className="form-error">{submitMessage}</p>:null}
        </>}
      </section>}
    </div>

    <div className="wizard-footer">
      <button type="button" className="secondary-button" disabled={step===0||submitState==="sending"} onClick={()=>setStep(value=>Math.max(0,value-1))}>السابق</button>
      {step<steps.length-1
        ? <button type="button" className="primary-button" disabled={(step===0&&!serviceSlug)||(step===1&&(!service||serviceLoading))} onClick={goNext}>التالي</button>
        : submitState!=="success"?<button type="button" className="primary-button" disabled={submitState==="sending"} onClick={createOrder}>{submitState==="sending"?"جاري إنشاء الطلب...":"إنشاء الطلب"}</button>
        : <button type="button" className="primary-button" onClick={()=>{setStep(0);setSpecs({});setSelectedFinishings([]);setCreatedOrder(null);setCreatedItemCount(0);setDraftItems([]);setSubmitState("idle");}}>طلب جديد</button>}
    </div>
  </div>;
}
