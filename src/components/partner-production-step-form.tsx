"use client";

import { useState } from "react";
import { completeProductionStepAction } from "@/app/partner-portal/actions";
import { PartnerProofUploader } from "@/components/partner-proof-uploader";

export function PartnerProductionStepForm({
  partnerJobId,
  stepName,
  requiresPhoto
}:{
  partnerJobId:string;
  stepName:string|null;
  requiresPhoto:boolean;
}){
  const [proof,setProof]=useState<{documentId:string;fileName:string}|null>(null);

  return <form action={completeProductionStepAction} className="partner-production-step-card">
    <input type="hidden" name="partnerJobId" value={partnerJobId}/>
    <input type="hidden" name="proofDocumentId" value={proof?.documentId??""}/>

    <div className="partner-production-step-title">
      <small>CURRENT STEP</small>
      <strong>{stepName??"مرحلة الإنتاج الحالية"}</strong>
    </div>

    <div className="partner-production-quantities">
      <label>كمية جيدة<input name="goodQuantity" type="number" min="0" step="0.001" placeholder="0"/></label>
      <label>هالك<input name="wasteQuantity" type="number" min="0" step="0.001" placeholder="0"/></label>
    </div>

    <label className="partner-production-notes">ملاحظات
      <textarea name="notes" rows={2} placeholder="ملاحظات هذه المرحلة"/>
    </label>

    <PartnerProofUploader
      partnerJobId={partnerJobId}
      required={requiresPhoto}
      documentId={proof?.documentId??null}
      fileName={proof?.fileName??null}
      onUploaded={setProof}
    />

    <button type="submit" disabled={requiresPhoto&&!proof?.documentId}>
      {stepName?"أكمل المرحلة":"إرسال للجودة"}
    </button>
  </form>;
}
