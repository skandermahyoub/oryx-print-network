"use client";

import { FormEvent, useState } from "react";

type TrackResult={
  order:{
    orderNumber:number;
    customerName:string;
    status:string;
    statusLabel:string;
    itemCount:number;
    createdAt:string;
  };
  timeline:Array<{from:string|null;to:string;label:string;createdAt:string}>;
};

export function OrderTracker(){
  const [orderNumber,setOrderNumber]=useState("");
  const [phone,setPhone]=useState("");
  const [result,setResult]=useState<TrackResult|null>(null);
  const [status,setStatus]=useState<"idle"|"loading"|"error">("idle");
  const [message,setMessage]=useState("");

  async function submit(event:FormEvent){
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setResult(null);
    try{
      const response=await fetch("/api/orders/track",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({orderNumber,phone})
      });
      const data=await response.json();
      if(!response.ok) throw new Error(data.error??"تعذر العثور على الطلب.");
      setResult(data);
      setStatus("idle");
    }catch(error){
      setStatus("error");
      setMessage(error instanceof Error?error.message:"تعذر العثور على الطلب.");
    }
  }

  return <div className="track-shell">
    <form className="track-form" onSubmit={submit}>
      <label>رقم الطلب<input inputMode="numeric" value={orderNumber} onChange={event=>setOrderNumber(event.target.value)} placeholder="مثال: 1024" required/></label>
      <label>رقم التواصل<input value={phone} onChange={event=>setPhone(event.target.value)} placeholder="نفس الرقم المسجل في الطلب" required/></label>
      <button className="primary-button" disabled={status==="loading"}>{status==="loading"?"جاري البحث...":"تتبع الطلب"}</button>
    </form>

    {message?<p className="track-error">{message}</p>:null}

    {result?<section className="track-result">
      <div className="track-order-head">
        <div><small>طلب ORYX</small><strong>#{result.order.orderNumber}</strong></div>
        <span className="status-pill">{result.order.statusLabel}</span>
      </div>
      <div className="track-order-meta">
        <span><b>العميل</b>{result.order.customerName}</span>
        <span><b>عدد العناصر</b>{result.order.itemCount}</span>
        <span><b>تاريخ الطلب</b>{new Date(result.order.createdAt).toLocaleDateString("ar-YE")}</span>
      </div>
      <div className="track-timeline">
        <article className="done"><span></span><div><strong>تم استلام الطلب</strong><small>{new Date(result.order.createdAt).toLocaleString("ar-YE")}</small></div></article>
        {result.timeline.map((event,index)=><article className="done" key={`${event.to}-${event.createdAt}-${index}`}>
          <span></span><div><strong>{event.label}</strong><small>{new Date(event.createdAt).toLocaleString("ar-YE")}</small></div>
        </article>)}
        {!result.timeline.length?<article className="current"><span></span><div><strong>{result.order.statusLabel}</strong><small>الحالة الحالية</small></div></article>:null}
      </div>
    </section>:null}
  </div>;
}
