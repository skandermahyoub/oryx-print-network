"use client";

import { useEffect, useState } from "react";

type Result=
  | {status:"requires_quote";reason:string;currency?:string}
  | {status:"priced";subtotal:number;currency:string;breakdown:Array<{label:string;amount:number}>};

export function PricingPreview({serviceSlug,specs}:{serviceSlug:string;specs:Record<string,string>}){
  const [result,setResult]=useState<Result|null>(null);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    if(!serviceSlug) return;
    let active=true;
    setLoading(true);
    fetch("/api/pricing/preview",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({serviceSlug,specs})
    })
      .then(response=>response.ok?response.json():Promise.reject(new Error("pricing")))
      .then(data=>active&&setResult(data))
      .catch(()=>active&&setResult({status:"requires_quote",reason:"تعذر احتساب السعر آليًا."}))
      .finally(()=>active&&setLoading(false));
    return ()=>{active=false;};
  },[serviceSlug,specs]);

  if(loading) return <div className="pricing-preview muted">جاري فحص قواعد التسعير…</div>;
  if(!result) return null;

  if(result.status==="requires_quote"){
    return <div className="pricing-preview quote">
      <small>التسعير</small>
      <strong>يتطلب عرض سعر</strong>
      <span>لن نخمن السعر. يراجع فريق ORYX المواصفات أو أسعار شركاء الإنتاج أولًا.</span>
    </div>;
  }

  return <div className="pricing-preview priced">
    <small>السعر المبدئي</small>
    <strong>{result.subtotal.toLocaleString("en-US")} {result.currency}</strong>
    <span>يُثبت السعر النهائي بعد التحقق من الملفات والتوفر والتنفيذ.</span>
  </div>;
}
