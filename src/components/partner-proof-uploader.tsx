"use client";

import { useRef, useState } from "react";

type Props={
  partnerJobId:string;
  required:boolean;
  documentId:string|null;
  fileName:string|null;
  onUploaded:(value:{documentId:string;fileName:string})=>void;
};

export function PartnerProofUploader({partnerJobId,required,documentId,fileName,onUploaded}:Props){
  const [uploading,setUploading]=useState(false);
  const [error,setError]=useState("");
  const inputRef=useRef<HTMLInputElement|null>(null);

  async function upload(file:File){
    setUploading(true);
    setError("");
    try{
      const init=await fetch("/api/partner-uploads",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          partnerJobId,
          fileName:file.name,
          mimeType:file.type||"application/octet-stream",
          sizeBytes:file.size
        })
      });
      const initPayload=await init.json();
      if(!init.ok) throw new Error(initPayload.error||"تعذر بدء رفع الإثبات.");

      const sent=await fetch(initPayload.url,{
        method:initPayload.method||"PUT",
        headers:initPayload.headers||{"Content-Type":file.type||"application/octet-stream"},
        body:file
      });
      if(!sent.ok) throw new Error("تعذر رفع الملف.");

      const complete=await fetch("/api/partner-uploads/complete",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({sessionId:initPayload.sessionId,partnerJobId})
      });
      const payload=await complete.json();
      if(!complete.ok) throw new Error(payload.error||"تعذر تثبيت الإثبات.");

      onUploaded({documentId:String(payload.documentId),fileName:String(payload.fileName??file.name)});
      if(inputRef.current) inputRef.current.value="";
    }catch(err){
      setError(err instanceof Error?err.message:"تعذر رفع الإثبات.");
    }finally{
      setUploading(false);
    }
  }

  return <div className="partner-proof-uploader">
    <label>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.webp,.tif,.tiff,.zip"
        disabled={uploading}
        onChange={event=>{
          const file=event.target.files?.[0];
          if(file) void upload(file);
        }}
      />
      <span>{uploading?"جاري الرفع...":documentId?"استبدال الإثبات":"رفع إثبات"}</span>
      {required?<b>مطلوب لهذه المرحلة</b>:null}
    </label>
    {fileName?<small>{fileName}</small>:null}
    {error?<p className="form-error">{error}</p>:null}
  </div>;
}
