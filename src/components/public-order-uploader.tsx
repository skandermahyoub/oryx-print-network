"use client";

import { useRef, useState } from "react";

export type PublicOrderAttachment={
  documentId:string;
  token:string;
  fileName:string;
  sizeBytes:number;
};

type Props={
  attachments:PublicOrderAttachment[];
  onChange:(attachments:PublicOrderAttachment[])=>void;
  maxFiles?:number;
};

function humanSize(bytes:number){
  if(bytes<1024) return `${bytes} B`;
  if(bytes<1024*1024) return `${(bytes/1024).toFixed(1)} KB`;
  return `${(bytes/(1024*1024)).toFixed(1)} MB`;
}

export function PublicOrderUploader({attachments,onChange,maxFiles=8}:Props){
  const [uploading,setUploading]=useState(false);
  const [error,setError]=useState("");
  const inputRef=useRef<HTMLInputElement|null>(null);

  async function uploadOne(file:File){
    const init=await fetch("/api/public-uploads",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        fileName:file.name,
        mimeType:file.type||"application/octet-stream",
        sizeBytes:file.size
      })
    });
    const initPayload=await init.json();
    if(!init.ok) throw new Error(initPayload.error||"تعذر بدء رفع الملف.");

    const uploaded=await fetch(initPayload.url,{
      method:initPayload.method||"PUT",
      headers:initPayload.headers||{"Content-Type":file.type||"application/octet-stream"},
      body:file
    });
    if(!uploaded.ok) throw new Error("تعذر إرسال الملف إلى التخزين.");

    const complete=await fetch("/api/public-uploads/complete",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        sessionId:initPayload.sessionId,
        token:initPayload.token
      })
    });
    const payload=await complete.json();
    if(!complete.ok) throw new Error(payload.error||"تعذر توثيق الملف.");

    return {
      documentId:String(payload.documentId),
      token:String(payload.token),
      fileName:String(payload.fileName??file.name),
      sizeBytes:Number(payload.sizeBytes??file.size)
    } satisfies PublicOrderAttachment;
  }

  async function chooseFiles(files:FileList|null){
    if(!files?.length) return;
    const available=Math.max(0,maxFiles-attachments.length);
    const selected=Array.from(files).slice(0,available);
    if(!selected.length){
      setError(`الحد الأقصى ${maxFiles} ملفات لكل عنصر.`);
      return;
    }

    setUploading(true);
    setError("");
    try{
      const uploaded:PublicOrderAttachment[]=[];
      for(const file of selected){
        uploaded.push(await uploadOne(file));
      }
      onChange([...attachments,...uploaded]);
      if(inputRef.current) inputRef.current.value="";
    }catch(err){
      setError(err instanceof Error?err.message:"تعذر رفع الملف.");
    }finally{
      setUploading(false);
    }
  }

  return <div className="public-order-uploader">
    <label className="public-upload-drop">
      <input
        ref={inputRef}
        type="file"
        multiple
        disabled={uploading||attachments.length>=maxFiles}
        accept=".pdf,.png,.jpg,.jpeg,.webp,.svg,.ai,.eps,.psd,.tif,.tiff,.zip,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        onChange={event=>void chooseFiles(event.target.files)}
      />
      <strong>{uploading?"جاري الرفع...":"اسحب أو اختر ملفات المشروع"}</strong>
      <span>PDF / صور / ملفات تصميم / Office / ZIP — حتى 50MB للملف</span>
    </label>

    {error?<p className="form-error">{error}</p>:null}

    {attachments.length?<div className="public-upload-list">
      {attachments.map((file,index)=><article key={file.documentId}>
        <div><strong>{file.fileName}</strong><small>{humanSize(file.sizeBytes)}</small></div>
        <button type="button" onClick={()=>onChange(attachments.filter((_,i)=>i!==index))}>إزالة من الطلب</button>
      </article>)}
    </div>:null}
  </div>;
}
