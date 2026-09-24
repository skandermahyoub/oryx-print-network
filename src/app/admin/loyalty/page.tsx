import Link from "next/link";
import { getLoyaltyAdminSnapshot } from "@/lib/admin-loyalty";
import { adjustPointsAction, createRewardAction, reviewRedemptionAction } from "./actions";

export const dynamic="force-dynamic";

export default async function LoyaltyAdminPage(){
  const loyalty=await getLoyaltyAdminSnapshot();
  const pending=loyalty.redemptions.filter(item=>item.status==="requested").length;

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX LOYALTY ENGINE</span>
        <h1>الولاء والمكافآت</h1>
        <p>رصيد نقاط قابل للتدقيق، مكافآت محددة التكلفة، وطلبات استبدال لا تسمح بصرف الرصيد مرتين.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="production-kpis four">
      <article><small>مكافآت</small><strong>{loyalty.rewards.length}</strong></article>
      <article><small>طلبات استبدال</small><strong>{pending}</strong></article>
      <article><small>حسابات ولاء</small><strong>{loyalty.customers.length}</strong></article>
      <article><small>إجمالي النقاط</small><strong>{loyalty.customers.reduce((sum,item)=>sum+item.points,0).toLocaleString("en-US")}</strong></article>
    </section>

    <section className="loyalty-ops-grid">
      <article className="loyalty-panel">
        <h2>مكافأة جديدة</h2>
        <form action={createRewardAction} className="loyalty-form">
          <input name="name" required placeholder="اسم المكافأة"/>
          <input name="slug" required pattern="[a-z0-9-]+" placeholder="reward-slug" dir="ltr"/>
          <input name="pointsCost" type="number" min="1" step="1" required placeholder="تكلفة النقاط"/>
          <select name="type" defaultValue="discount">
            <option value="discount">خصم</option>
            <option value="free_delivery">توصيل مجاني</option>
            <option value="free_design">تصميم مجاني</option>
            <option value="product">منتج</option>
            <option value="service">خدمة</option>
            <option value="custom">مخصص</option>
          </select>
          <input name="rewardValue" type="number" min="0" step="0.01" placeholder="قيمة المكافأة"/>
          <input name="inventoryLimit" type="number" min="1" step="1" placeholder="الحد المتاح"/>
          <input name="validUntil" type="date"/>
          <textarea name="description" rows={3} placeholder="وصف وشروط المكافأة"/>
          <button type="submit">إنشاء المكافأة</button>
        </form>
      </article>

      <article className="loyalty-panel">
        <h2>تعديل نقاط عميل</h2>
        <form action={adjustPointsAction} className="loyalty-form">
          <select name="customerId" required defaultValue="">
            <option value="" disabled>اختر العميل</option>
            {loyalty.customers.map(customer=><option key={customer.id} value={customer.id}>{customer.name} · {customer.points} نقطة</option>)}
          </select>
          <input name="points" type="number" step="1" required placeholder="+100 أو -50"/>
          <textarea name="description" rows={3} placeholder="سبب التعديل"/>
          <button type="submit">تسجيل التعديل</button>
        </form>
      </article>
    </section>

    <section className="admin-list-shell loyalty-redemptions">
      <div className="logistics-section-head"><h2>طلبات الاستبدال</h2><span>{loyalty.redemptions.length}</span></div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>العميل</th><th>المكافأة</th><th>النقاط</th><th>الحالة</th><th>التاريخ</th><th>الإجراء</th></tr></thead>
          <tbody>{loyalty.redemptions.length?loyalty.redemptions.map(item=><tr key={item.id}>
            <td><strong>{item.customer}</strong></td>
            <td>{item.reward}</td>
            <td>{item.points}</td>
            <td><span className="status-pill">{item.status}</span></td>
            <td>{new Date(item.createdAt).toLocaleString("ar-YE")}</td>
            <td><div className="loyalty-review-actions">
              {item.status==="requested"?<>
                <form action={reviewRedemptionAction}><input type="hidden" name="redemptionId" value={item.id}/><button name="decision" value="approved">اعتماد</button></form>
                <form action={reviewRedemptionAction}><input type="hidden" name="redemptionId" value={item.id}/><button name="decision" value="cancelled">إلغاء وإرجاع النقاط</button></form>
              </>:null}
              {item.status==="approved"?<form action={reviewRedemptionAction}><input type="hidden" name="redemptionId" value={item.id}/><button name="decision" value="used">تم الاستخدام</button></form>:null}
            </div></td>
          </tr>):<tr><td colSpan={6} className="empty-cell">لا توجد طلبات استبدال بعد.</td></tr>}</tbody>
        </table>
      </div>
    </section>

    <section className="admin-list-shell">
      <div className="logistics-section-head"><h2>كتالوج المكافآت</h2><span>{loyalty.rewards.length}</span></div>
      <div className="loyalty-reward-grid">
        {loyalty.rewards.map(reward=><article key={reward.id}>
          <span>{reward.type}</span><h3>{reward.name}</h3><strong>{reward.pointsCost} نقطة</strong>
          <small>{reward.redemptions} استبدالات · {reward.active?"نشطة":"متوقفة"}</small>
        </article>)}
      </div>
    </section>
  </main>;
}
