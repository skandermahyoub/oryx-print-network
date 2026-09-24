import { OrderTracker } from "@/components/order-tracker";

export default function TrackPage(){
  return <main className="track-page">
    <section className="track-hero">
      <span className="eyebrow">ORYX ORDER TRACKING</span>
      <h1>أين وصل طلبك؟</h1>
      <p>أدخل رقم الطلب ورقم التواصل المسجل. لن نعرض تفاصيل أي طلب دون تطابق البيانات.</p>
    </section>
    <OrderTracker/>
  </main>;
}
