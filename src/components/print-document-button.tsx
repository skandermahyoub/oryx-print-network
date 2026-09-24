"use client";

export function PrintDocumentButton(){
  return <button className="document-print-button no-print" type="button" onClick={()=>window.print()}>
    طباعة / حفظ PDF
  </button>;
}
