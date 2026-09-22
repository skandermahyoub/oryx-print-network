"use client";

import { useState } from "react";

type BuilderField={id:number;label:string;key:string;type:string;required:boolean;affectsPrice:boolean};

export function ServiceBuilderPreview(){
  const [fields,setFields]=useState<BuilderField[]>([
    {id:1,label:"المقاس",key:"size",type:"select",required:true,affectsPrice:true},
    {id:2,label:"الكمية",key:"quantity",type:"number",required:true,affectsPrice:true}
  ]);

  function addField(){
    setFields(current=>[...current,{id:Date.now(),label:"حقل جديد",key:`field_${current.length+1}`,type:"select",required:false,affectsPrice:false}]);
  }

  function patch(id:number,patch:Partial<BuilderField>){
    setFields(current=>current.map(field=>field.id===id?{...field,...patch}:field));
  }

  return <div className="builder-preview">
    <div className="builder-main">
      <section className="builder-card">
        <div className="builder-card-head"><div><small>IDENTITY</small><h2>تعريف الخدمة</h2></div><span>01</span></div>
        <div className="field-grid">
          <label className="field-card"><span>اسم الخدمة بالعربية</span><input defaultValue="خدمة طباعة جديدة"/></label>
          <label className="field-card"><span>Slug</span><input defaultValue="new-print-service" dir="ltr"/></label>
          <label className="field-card"><span>طريقة البيع</span><select defaultValue="quote"><option value="buy">شراء مباشر</option><option value="instant">تسعير مباشر</option><option value="quote">طلب عرض سعر</option><option value="consult">استشارة</option></select></label>
          <label className="field-card"><span>طريقة التسعير</span><select defaultValue="manual"><option value="fixed">ثابت</option><option value="unit">للوحدة</option><option value="area">للمتر المربع</option><option value="tiered">شرائح كمية</option><option value="formula">معادلة</option><option value="manual">يدوي</option></select></label>
        </div>
      </section>

      <section className="builder-card">
        <div className="builder-card-head"><div><small>DYNAMIC SPECIFICATIONS</small><h2>حقول المواصفات</h2></div><span>02</span></div>
        <div className="builder-fields">
          {fields.map((field,index)=><div className="builder-field-row" key={field.id}>
            <b>{String(index+1).padStart(2,"0")}</b>
            <input value={field.label} onChange={e=>patch(field.id,{label:e.target.value})}/>
            <input value={field.key} onChange={e=>patch(field.id,{key:e.target.value})} dir="ltr"/>
            <select value={field.type} onChange={e=>patch(field.id,{type:e.target.value})}><option>select</option><option>number</option><option>text</option><option>boolean</option><option>file</option><option>color</option><option>dimension</option></select>
            <label><input type="checkbox" checked={field.required} onChange={e=>patch(field.id,{required:e.target.checked})}/> مطلوب</label>
            <label><input type="checkbox" checked={field.affectsPrice} onChange={e=>patch(field.id,{affectsPrice:e.target.checked})}/> يؤثر في السعر</label>
            <button type="button" onClick={()=>setFields(current=>current.filter(item=>item.id!==field.id))}>×</button>
          </div>)}
        </div>
        <button className="builder-add" type="button" onClick={addField}>+ إضافة حقل مواصفات</button>
      </section>

      <section className="builder-card">
        <div className="builder-card-head"><div><small>PRODUCTION DNA</small><h2>الإنتاج والتشطيب</h2></div><span>03</span></div>
        <div className="builder-tags">
          {["الخامات المرتبطة","التشطيبات","قواعد التوافق","مسار الإنتاج","فحص الجودة","التعبئة","التوصيل","الاستعجال"].map(tag=><button type="button" key={tag}>{tag}<span>+</span></button>)}
        </div>
      </section>
    </div>

    <aside className="builder-side">
      <span className="eyebrow">SERVICE OBJECT</span>
      <h2>هذه ليست صفحة منتج.</h2>
      <p>الخدمة هي كائن تشغيلي يعرف ماذا يسأل العميل، كيف يُسعّر، ماذا يستهلك، كيف يُنتج، ومن يستطيع تنفيذه.</p>
      <div className="builder-object">Department<br/>↓<br/>Category<br/>↓<br/><b>Service</b><br/>↓<br/>Fields + Materials + Pricing<br/>↓<br/>Workflow + QC + Delivery</div>
      <button className="primary-button" type="button">حفظ كمسودة</button>
    </aside>
  </div>;
}
