"use client";

import { useActionState, useMemo, useState } from "react";
import { createServiceDraftAction } from "@/app/admin/catalog/actions";

type BuilderField={
  id:number;
  label:string;
  key:string;
  type:"select"|"number"|"text"|"boolean"|"file"|"textarea"|"date"|"location"|"color"|"dimension";
  required:boolean;
  affectsPrice:boolean;
  affectsMaterial:boolean;
  affectsProduction:boolean;
  options:string;
};

type Props={
  categories:Array<{id:string;name:string;department:string}>;
  finishings:Array<{id:string;key:string;name:string;category:string|null}>;
};

const fieldTypes=["select","number","text","boolean","file","textarea","date","location","color","dimension"] as const;

export function ServiceBuilderPreview({categories,finishings}:Props){
  const [state,formAction,isPending]=useActionState(createServiceDraftAction,null);
  const [fields,setFields]=useState<BuilderField[]>([
    {id:1,label:"المقاس",key:"size",type:"select",required:true,affectsPrice:true,affectsMaterial:true,affectsProduction:true,options:"A4, A5, مخصص"},
    {id:2,label:"الكمية",key:"quantity",type:"number",required:true,affectsPrice:true,affectsMaterial:false,affectsProduction:true,options:""}
  ]);
  const [selectedFinishings,setSelectedFinishings]=useState<string[]>([]);
  const [finishingSearch,setFinishingSearch]=useState("");

  function addField(){
    setFields(current=>[
      ...current,
      {
        id:Date.now(),
        label:"حقل جديد",
        key:`field_${current.length+1}`,
        type:"select",
        required:false,
        affectsPrice:false,
        affectsMaterial:false,
        affectsProduction:true,
        options:""
      }
    ]);
  }

  function patch(id:number,patch:Partial<BuilderField>){
    setFields(current=>current.map(field=>field.id===id?{...field,...patch}:field));
  }

  function toggleFinishing(id:string){
    setSelectedFinishings(current=>current.includes(id)?current.filter(value=>value!==id):[...current,id]);
  }

  const serializedFields=JSON.stringify(fields.map(field=>({
    label:field.label.trim(),
    key:field.key.trim(),
    type:field.type,
    required:field.required,
    affectsPrice:field.affectsPrice,
    affectsMaterial:field.affectsMaterial,
    affectsProduction:field.affectsProduction,
    options:field.options.split(",").map(option=>option.trim()).filter(Boolean)
  })));

  const filteredFinishings=useMemo(()=>{
    const needle=finishingSearch.trim().toLowerCase();
    if(!needle) return finishings;
    return finishings.filter(item=>`${item.name} ${item.key} ${item.category??""}`.toLowerCase().includes(needle));
  },[finishings,finishingSearch]);

  return <form action={formAction} className="builder-preview">
    <input type="hidden" name="fields" value={serializedFields}/>
    <input type="hidden" name="finishings" value={JSON.stringify(selectedFinishings)}/>

    <div className="builder-main">
      <section className="builder-card">
        <div className="builder-card-head"><div><small>IDENTITY</small><h2>تعريف الخدمة</h2></div><span>01</span></div>
        <div className="field-grid">
          <label className="field-card"><span>اسم الخدمة بالعربية</span><input name="name" required minLength={3} placeholder="مثال: طباعة بطاقة عضوية PVC"/></label>
          <label className="field-card"><span>Slug</span><input name="slug" required pattern="[a-z0-9-]+" placeholder="pvc-membership-card" dir="ltr"/></label>
          <label className="field-card"><span>التصنيف</span><select name="categoryId" required defaultValue=""><option value="" disabled>اختر التصنيف</option>{categories.map(category=><option key={category.id} value={category.id}>{category.department} · {category.name}</option>)}</select></label>
          <label className="field-card"><span>طريقة البيع</span><select name="sellingMode" defaultValue="request_quote"><option value="buy_now">شراء مباشر</option><option value="instant_quote">تسعير مباشر</option><option value="request_quote">طلب عرض سعر</option><option value="consultation">استشارة</option></select></label>
          <label className="field-card"><span>طريقة التسعير</span><select name="pricingMode" defaultValue="manual_quote"><option value="fixed">ثابت</option><option value="per_unit">للوحدة</option><option value="per_area">للمتر المربع</option><option value="per_linear">للمتر الطولي</option><option value="tiered">شرائح كمية</option><option value="matrix">مصفوفة</option><option value="formula">معادلة</option><option value="manual_quote">يدوي</option></select></label>
          <label className="field-card"><span>اعتماد التصميم قبل الإنتاج</span><select name="requiresDesignApproval" defaultValue="true"><option value="true">نعم</option><option value="false">لا</option></select></label>
          <label className="field-card builder-wide"><span>وصف مختصر</span><textarea name="summary" rows={3} placeholder="ما الذي تبيعه هذه الخدمة ولمن؟"/></label>
        </div>
      </section>

      <section className="builder-card">
        <div className="builder-card-head"><div><small>DYNAMIC SPECIFICATIONS</small><h2>حقول المواصفات</h2></div><span>02</span></div>
        <div className="builder-fields">
          {fields.map((field,index)=><div className="builder-field-row advanced" key={field.id}>
            <b>{String(index+1).padStart(2,"0")}</b>
            <input value={field.label} onChange={event=>patch(field.id,{label:event.target.value})} placeholder="اسم الحقل"/>
            <input value={field.key} onChange={event=>patch(field.id,{key:event.target.value})} dir="ltr" placeholder="field_key"/>
            <select value={field.type} onChange={event=>patch(field.id,{type:event.target.value as BuilderField["type"]})}>{fieldTypes.map(type=><option key={type}>{type}</option>)}</select>
            <input className="builder-options-input" value={field.options} onChange={event=>patch(field.id,{options:event.target.value})} placeholder="خيارات مفصولة بفاصلة"/>
            <label><input type="checkbox" checked={field.required} onChange={event=>patch(field.id,{required:event.target.checked})}/> مطلوب</label>
            <label><input type="checkbox" checked={field.affectsPrice} onChange={event=>patch(field.id,{affectsPrice:event.target.checked})}/> سعر</label>
            <label><input type="checkbox" checked={field.affectsMaterial} onChange={event=>patch(field.id,{affectsMaterial:event.target.checked})}/> خامة</label>
            <label><input type="checkbox" checked={field.affectsProduction} onChange={event=>patch(field.id,{affectsProduction:event.target.checked})}/> إنتاج</label>
            <button type="button" onClick={()=>setFields(current=>current.filter(item=>item.id!==field.id))}>×</button>
          </div>)}
        </div>
        <button className="builder-add" type="button" onClick={addField}>+ إضافة حقل مواصفات</button>
      </section>

      <section className="builder-card">
        <div className="builder-card-head"><div><small>FINISHING LIBRARY</small><h2>التشطيبات المتوافقة</h2></div><span>03</span></div>
        <input className="builder-finishing-search" value={finishingSearch} onChange={event=>setFinishingSearch(event.target.value)} placeholder="ابحث في مكتبة التشطيبات"/>
        <div className="builder-finishing-grid">
          {filteredFinishings.map(item=><label className={selectedFinishings.includes(item.id)?"selected":""} key={item.id}>
            <input type="checkbox" checked={selectedFinishings.includes(item.id)} onChange={()=>toggleFinishing(item.id)}/>
            <span>{item.name}</span>
            <small>{item.category??item.key}</small>
          </label>)}
        </div>
      </section>
    </div>

    <aside className="builder-side">
      <span className="eyebrow">SERVICE OBJECT</span>
      <h2>هذه ليست صفحة منتج.</h2>
      <p>الخدمة هي كائن تشغيلي يعرف ماذا يسأل العميل، كيف يُسعّر، ماذا يستهلك، كيف يُنتج، ومن يستطيع تنفيذه.</p>
      <div className="builder-object">Department<br/>↓<br/>Category<br/>↓<br/><b>Service</b><br/>↓<br/>Fields + Finishings + Pricing<br/>↓<br/>Workflow + QC + Delivery</div>
      <div className="builder-save-summary">
        <span>{fields.length} حقول</span>
        <span>{selectedFinishings.length} تشطيبات</span>
      </div>
      {state?<p className={state.ok?"form-success":"form-error"}>{state.message}{state.slug?<><br/><b>{state.slug}</b></>:null}</p>:null}
      <button className="primary-button" type="submit" disabled={isPending}>{isPending?"جاري الحفظ في Neon...":"حفظ كمسودة تشغيلية"}</button>
      <small className="builder-security-note">المسودة لا تظهر للعامة حتى يتم اعتمادها وتفعيلها.</small>
    </aside>
  </form>;
}
