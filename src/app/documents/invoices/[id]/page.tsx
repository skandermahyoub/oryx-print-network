import { notFound } from "next/navigation";
import { getInvoiceDocument } from "@/lib/commercial-documents";
import { requireCommercialDocumentAccess } from "@/lib/commercial-document-access";
import { PrintDocumentButton } from "@/components/print-document-button";

export const dynamic="force-dynamic";

export default async function InvoiceDocumentPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  await requireCommercialDocumentAccess("invoice",id);
  const document=await getInvoiceDocument(id);
  if(!document) notFound();

  const outstanding=Math.max(0,document.invoice.total-document.invoice.paid);

  return <main className="commercial-document-page">
    <PrintDocumentButton/>
    <article className="commercial-document-sheet">
      <header className="commercial-document-header">
        <div>
          <span className="document-brand">ORYX</span>
          <p>للطباعة والإبداع والتصنيع حسب الطلب</p>
        </div>
        <div className="document-title-block">
          <small>INVOICE</small>
          <h1>فاتورة #{document.invoice.number}</h1>
          <span className="status-pill">{document.invoice.status}</span>
        </div>
      </header>

      <section className="document-info-grid">
        <div><small>العميل</small><strong>{document.customer.company??document.customer.name}</strong><span>{document.customer.name}</span></div>
        <div><small>التواصل</small><strong>{document.customer.phone??"—"}</strong><span>{document.customer.email??document.customer.city??"—"}</span></div>
        <div><small>تاريخ الإصدار</small><strong>{document.invoice.issuedAt?new Date(document.invoice.issuedAt).toLocaleDateString("ar-YE"):new Date(document.invoice.createdAt).toLocaleDateString("ar-YE")}</strong><span>{document.invoice.dueDate?`استحقاق ${document.invoice.dueDate}`:"—"}</span></div>
        <div><small>الطلب المرجعي</small><strong>{document.invoice.orderNumber===null?"—":`#${document.invoice.orderNumber}`}</strong><span>{document.invoice.currency}</span></div>
      </section>

      <section className="document-table-wrap">
        <table className="document-table">
          <thead><tr><th>#</th><th>الخدمة</th><th>الكمية</th><th>سعر الوحدة</th><th>الإجمالي</th></tr></thead>
          <tbody>
            {document.items.map((item,index)=><tr key={item.id}>
              <td>{index+1}</td><td><strong>{item.service}</strong></td><td>{item.quantity}</td>
              <td>{item.unitPrice===null?"—":item.unitPrice.toLocaleString("en-US")}</td>
              <td>{item.totalPrice===null?"—":item.totalPrice.toLocaleString("en-US")}</td>
            </tr>)}
          </tbody>
        </table>
      </section>

      <section className="document-summary">
        <div>
          <small>التحصيل</small>
          {document.payments.length?<div className="document-payment-list">{document.payments.map(payment=><span key={payment.id}>
            {payment.amount.toLocaleString("en-US")} {document.invoice.currency} · {payment.method??"دفعة"} · {new Date(payment.paidAt).toLocaleDateString("ar-YE")}{payment.reference?` · ${payment.reference}`:""}
          </span>)}</div>:<p>لم تسجل دفعات بعد.</p>}
        </div>
        <div className="document-totals">
          <span><b>Subtotal</b>{document.invoice.subtotal.toLocaleString("en-US")} {document.invoice.currency}</span>
          {document.invoice.tax!==0?<span><b>Tax</b>{document.invoice.tax.toLocaleString("en-US")} {document.invoice.currency}</span>:null}
          <span><b>Discount</b>{document.invoice.discount.toLocaleString("en-US")} {document.invoice.currency}</span>
          <strong><b>Total</b>{document.invoice.total.toLocaleString("en-US")} {document.invoice.currency}</strong>
          <span><b>Paid</b>{document.invoice.paid.toLocaleString("en-US")} {document.invoice.currency}</span>
          <strong className={outstanding===0?"document-settled":""}><b>Balance</b>{outstanding.toLocaleString("en-US")} {document.invoice.currency}</strong>
        </div>
      </section>

      <footer className="commercial-document-footer">
        <span>ORYX Print Network</span>
        <span>{outstanding===0?"PAID / مسددة":"فاتورة تشغيلية صادرة من ORYX"}</span>
        <span>Invoice ID: {document.invoice.id}</span>
      </footer>
    </article>
  </main>;
}
