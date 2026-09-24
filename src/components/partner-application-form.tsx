"use client";

import { FormEvent, useState } from "react";

export function PartnerApplicationForm(){
  const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
  const [message,setMessage]=useState("");

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form=new FormData(event.currentTarget);
    const payload={
      legalName:String(form.get("legalName")??""),
      city:String(form.get("city")??""),
      phone:String(form.get("phone")??""),
      email:String(form.get("email")??""),
      productionArea:String(form.get("productionArea")??""),
      capabilities:String(form.get("capabilities")??""),
      website:String(form.get("website")??"")
    };

    try{
      const response=await fetch("/api/partners/apply",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(payload)
      });
      const data=await response.json();
      if(!response.ok) throw new Error(data.error??"تعذر إرسال الطلب");
      setStatus("success");
      setMessage("تم استلام طلب الانضمام. سيظهر في مركز شركاء الإنتاج للمراجعة.");
      event.currentTarget.reset();
    }catch(error){
      setStatus("error");
      setMessage(error instanceof Error?error.message:"تعذر إرسال الطلب");
    }
  }

  return <form className="partner-form" onSubmit={submit}>
    <h2>طلب انضمام مبدئي</h2>
    <label>اسم المؤسسة<input name="legalName" required placeholder="اسم المطبعة أو الورشة"/></label>
    <label>المدينة<input name="city" required placeholder="صنعاء"/></label>
    <label>رقم التواصل<input name="phone" required placeholder="77xxxxxxx"/></label>
    <label>البريد الإلكتروني<input name="email" type="email" placeholder="name@example.com"/></label>
    <label>مجال الإنتاج<select name="productionArea" required defaultValue=""><option value="" disabled>اختر المجال</option><option>طباعة ورقية</option><option>طباعة رقمية</option><option>لوحات وواجهات</option><option>ليزر وتصنيع</option><option>تغليف</option><option>هدايا ومنتجات دعائية</option><option>ملابس وتطريز</option><option>أكثر من مجال</option></select></label>
    <label>أهم المعدات والخدمات<textarea name="capabilities" required minLength={10} rows={5} placeholder="اكتب نبذة عن المعدات والقدرات والخدمات"/></label>
    <input className="hp-field" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
    <button disabled={status==="sending"}>{status==="sending"?"جاري الإرسال...":"إرسال طلب الانضمام"}</button>
    {message?<p className={status==="success"?"form-success":"form-error"}>{message}</p>:null}
  </form>;
}
