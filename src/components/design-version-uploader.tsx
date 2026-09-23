"use client";

import { useState } from "react";
import { createDesignVersionAction } from "@/app/admin/design/[id]/actions";

type UploadState={
  documentId:string|null;
  fileName:string|null;
  error:string|null;
  uploading:boolean;
};

export function DesignVersionUploader({designJobId}:{designJobId:string}){
  const [state,setState]=useState<UploadState>({
    documentId:null,
    fileName:null,
    error:null,
    uploading:false
  });

  async function uploadFile(file:File){
    setState({documentId:null,fileName:file.name,error:null,uploading:true});
    try{
      const init=await fetch("/api/storage/uploads",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          bucket:"design-files",
          ownerType:"design_job",
          ownerId:designJobId,
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
      if(!uploaded.ok) throw new Error("فشل رفع الملف إلى التخزين.");

      const complete=await fetch("/api/storage/uploads/complete",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({sessionId:initPayload.sessionId})
      });
      const completePayload=await complete.json();
      if(!complete.ok) throw new Error(completePayload.error||"تعذر توثيق الملف.");

      setState({
        documentId:String(completePayload.documentId),
        fileName:file.name,
        error:null,
        uploading:false
      });
    }catch(error){
      setState({
        documentId:null,
        fileName:file.name,
        error:error instanceof Error?error.message:"تعذر رفع الملف.",
        uploading:false
      });
    }
  }

  return <div className="design-uploader">
    <label className="design-upload-drop">
      <span>{state.uploading?"جاري رفع الملف...":"ارفع Proof / Artwork لهذه النسخة"}</span>
      <small>PDF, PNG, JPG, SVG, AI, EPS, PSD, TIFF أو ZIP — بحد أقصى 50MB</small>
      <input
        type="file"
        disabled={state.uploading}
        accept=".pdf,.png,.jpg,.jpeg,.webp,.svg,.ai,.eps,.psd,.tif,.tiff,.zip"
        onChange={event=>{
          const file=event.target.files?.[0];
          if(file) void uploadFile(file);
        }}
      />
    </label>

    {state.error?<p className="form-error">{state.error}</p>:null}

    {state.documentId?<form action={createDesignVersionAction} className="design-version-create-form">
      <input type="hidden" name="designJobId" value={designJobId}/>
      <input type="hidden" name="documentId" value={state.documentId}/>
      <div className="design-upload-success">
        <small>تم رفع الملف</small>
        <strong>{state.fileName}</strong>
      </div>
      <label className="wide">ملاحظات النسخة
        <textarea name="notes" rows={4} placeholder="ما الذي تغير في هذه النسخة وما الذي يجب على العميل مراجعته؟"/>
      </label>
      <button type="submit">إنشاء نسخة وإرسالها للاعتماد</button>
    </form>:null}
  </div>;
}
