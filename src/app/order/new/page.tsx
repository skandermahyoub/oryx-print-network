import { SmartOrderWizard } from "@/components/smart-order-wizard";

export default async function NewOrderPage({searchParams}:{searchParams:Promise<{service?:string}>}){
  const {service}=await searchParams;
  return <main className="order-page">
    <section className="order-page-head">
      <span className="eyebrow">ORYX SMART ORDER</span>
      <h1>أدخل المواصفات مرة واحدة.</h1>
      <p>المعلومات نفسها ستتحرك لاحقًا من الطلب إلى التصميم والتسعير والإنتاج والجودة والتسليم دون إعادة إدخالها.</p>
    </section>
    <SmartOrderWizard initialService={service}/>
  </main>;
}
