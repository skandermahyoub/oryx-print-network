import { notFound } from "next/navigation";
import { getQuoteDocument } from "@/lib/commercial-documents";
import { requireCommercialDocumentAccess } from "@/lib/commercial-document-access";
import { PrintDocumentButton } from "@/components/print-document-button";

export const dynamic="force-dynamic";

function specText(spec:Record<string,unknown>){
  return Object.entries(spec)
    .filter(([,value])=>["string","number","boolean"].includes(typeof value))
    .slice(0,8)
    .map(([key,value])=>`${key}: ${String(value)}`)
    .join(" · ");
}

export default async function QuoteDocumentPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  await requireCommercialDocumentAccess("quote",id);
  const document=await getQuoteDocument(id);
  if(!document) notFound();

  return <main className="commercial-document-page">
    <PrintDocumentButton/>
    <article className="commercial-document-sheet">
      <header className="commercial-document-header">
        <div>
          <span className="document-brand">ORYX</span>
          <p>للطباعة والإبداع والتصنيع حسب الطلب</p>
        </div>
        <div className="document-title-block">
          <small>QUOTATION</small>
          <h1>عرض سعر #{document.quote.number}</h1>
          <span className="status-pill">{document.quote.status}</span>
        </div>
      </header>

      <section className="document-info-grid">
        <div><small>العميل</small><strong>{document.customer.company??document.customer.name}</strong><span>{document.customer.name}</span></div>
        <div><small>التواصل</small><strong>{document.customer.phone??"—"}</strong><span>{document.customer.email??document.customer.city??"—"}</span></div>
        <div><small>التاريخ</small><strong>{new Date(document.quote.createdAt).toLocaleDateString("ar-YE")}</strong><span>{document.quote.validUntil?`صالح حتى ${document.quote.validUntil}`:"بدون تاريخ انتهاء"}</span></div>
        <div><small>الطلب المرجعي</small><strong>{document.quote.orderNumber===null?"—":`#${document.quote.orderNumber}`}</strong><span>{document.quote.currency}</span></div>
      </section>

      <section className="document-table-wrap">
        <table className="document-table">
          <thead><tr><th>#</th><th>الخدمة</th><th>المواصفات</th><th>الكمية</th><th>سعر الوحدة</th><th>الإجمالي</th></tr></thead>
          <tbody>
            {document.items.map((item,index)=><tr key={item.id}>
              <td>{index+1}</td>
              <td><strong>{item.service}</strong></td>
              <td><small>{specText(item.specifications)||"حسب المواصفات المعتمدة"}</small></td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice===null?"—":item.unitPrice.toLocaleString("en-US")}</td>
              <td>{item.totalPrice===null?"—":item.totalPrice.toLocaleString("en-US")}</td>
            </tr>)}
          </tbody>
        </table>
      </section>

      <section className="document-summary">
        <div>
          <small>ملاحظات</small>
          <p>{document.quote.notes??"ينفذ الطلب وفق المواصفات المعتمدة في النظام، ويبدأ الإنتاج بعد استكمال المتطلبات التجارية واعتماد التصميم عند الحاجة."}</p>
        </div>
        <div className="document-totals">
          <span><b>Subtotal</b>{document.quote.subtotal.toLocaleString("en-US")} {document.quote.currency}</span>
          <span><b>Discount</b>{document.quote.discount.toLocaleString("en-US")} {document.quote.currency}</span>
          <strong><b>Total</b>{document.quote.total.toLocaleString("en-US")} {document.quote.currency}</strong>
        </div>
      </section>

      <footer className="commercial-document-footer">
        <span>ORYX Print Network</span>
        <span>نطبع أي شيء على أي شيء.</span>
        <span>Quote ID: {document.quote.id}</span>
      </footer>
    </article>
  </main>;
}
