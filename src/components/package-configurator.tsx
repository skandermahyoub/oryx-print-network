"use client";

import { FormEvent, useMemo, useState } from "react";

export function PackageConfigurator({
  packageSlug,
  packageTitle,
  items
}:{
  packageSlug:string;
  packageTitle:string;
  items:string[];
}){
  const [selected,setSelected]=useState<string[]>(items);
  const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
  const [message,setMessage]=useState("");
  const [requestNumber,setRequestNumber]=useState<number|null>(null);

  const allSelected=selected.length===items.length;
  const summary=useMemo(()=>selected.join("، "),[selected]);

  function toggle(item:string){
    setSelected(current=>current.includes(item)?current.filter(value=>value!==item):[...current,item]);
  }

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(!selected.length){
      setStatus("error");
      setMessage("اختر عنصرًا واحدًا على الأقل من الباقة.");
      return;
    }

    setStatus("sending");
    setMessage("");
    const form=new FormData(event.currentTarget);
    const payload={
      packageSlug,
      selectedItems:selected,
      notes:String(form.get("notes")??""),
      website:String(form.get("website")??""),
      customer:{
        displayName:String(form.get("displayName")??""),
        companyName:String(form.get("companyName")??""),
        phone:String(form.get("phone")??""),
        email:String(form.get("email")??""),
        city:String(form.get("city")??"")
      }
    };

    try{
      const response=await fetch("/api/packages/request",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(payload)
      });
      const data=await response.json();
      if(!response.ok) throw new Error(data.error??"تعذر إرسال الطلب.");
      setRequestNumber(data.requestNumber??null);
      setStatus("success");
      setMessage("تم إرسال طلب الباقة إلى فريق ORYX للمراجعة وبناء العرض.");
    }catch(error){
      setStatus("error");
      setMessage(error instanceof Error?error.message:"تعذر إرسال الطلب.");
    }
  }

  return <section className="package-configurator">
    <div className="package-config-head">
      <span className="eyebrow">CONFIGURE YOUR SOLUTION</span>
      <h2>اختر ما تحتاجه من {packageTitle}</h2>
      <p>الباقة مرنة. اختر كل العناصر أو بعضها، وسنبني عرضًا واحدًا متماسكًا بدل شراء خدمات منفصلة.</p>
    </div>

    {status==="success"?<div className="package-request-success">
      <span>تم</span>
      <h3>وصل طلب الباقة</h3>
      <p>{requestNumber?<>رقم الطلب المبدئي <strong>#{requestNumber}</strong>. </>:null}{message}</p>
    </div>:<form onSubmit={submit}>
      <div className="package-config-toolbar">
        <button type="button" onClick={()=>setSelected(allSelected?[]:items)}>{allSelected?"إلغاء تحديد الكل":"تحديد الكل"}</button>
        <span>{selected.length} من {items.length} عناصر</span>
      </div>

      <div className="package-config-items">
        {items.map((item,index)=><label className={selected.includes(item)?"selected":""} key={item}>
          <input type="checkbox" checked={selected.includes(item)} onChange={()=>toggle(item)}/>
          <span>{String(index+1).padStart(2,"0")}</span>
          <strong>{item}</strong>
        </label>)}
      </div>

      <div className="package-request-form">
        <label>الاسم *<input name="displayName" required placeholder="الاسم الكامل"/></label>
        <label>المؤسسة<input name="companyName" placeholder="اسم الشركة أو المؤسسة"/></label>
        <label>رقم التواصل *<input name="phone" required placeholder="77xxxxxxx"/></label>
        <label>البريد الإلكتروني<input type="email" name="email" placeholder="name@example.com"/></label>
        <label>المدينة<input name="city" placeholder="صنعاء"/></label>
        <label className="wide">ملاحظات الطلب<textarea name="notes" rows={4} placeholder="الكميات المتوقعة، الموعد، أو أي تفاصيل مهمة"/></label>
        <input className="hp-field" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
      </div>

      <div className="package-request-summary">
        <div><small>العناصر المختارة</small><strong>{summary||"لم يتم اختيار عناصر"}</strong></div>
        <button className="primary-button" disabled={status==="sending"}>{status==="sending"?"جاري الإرسال...":"اطلب عرض هذه الباقة"}</button>
      </div>
      {message?<p className="form-error">{message}</p>:null}
    </form>}
  </section>;
}
