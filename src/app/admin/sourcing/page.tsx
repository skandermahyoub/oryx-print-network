import Link from "next/link";
import { getSourcingRequests } from "@/lib/admin-sourcing";

export default async function SourcingPage(){
  const requests=await getSourcingRequests();

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX SOURCING ENGINE</span>
        <h1>توزيع الإنتاج</h1>
        <p>لكل عنصر طلب نحتفظ بقائمة مرشحين ودرجة توجيه وتكلفة ووقت تنفيذ، ثم نسجل قرار الإسناد بدل أن تختفي الصفقة داخل محادثة واتساب.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="sourcing-grid">
      {requests.length?requests.map(request=><article key={request.id}>
        <header>
          <div>
            <small>طلب #{request.orderNumber}</small>
            <h2>{request.service}</h2>
          </div>
          <span className="status-pill">{request.status}</span>
        </header>
        <div className="sourcing-meta">
          <span><b>الكمية</b>{request.quantity}</span>
          <span><b>عاجل</b>{request.urgent?"نعم":"لا"}</span>
          <span><b>المطلوب</b>{request.requiredBy?new Date(request.requiredBy).toLocaleString("ar-YE"):"غير محدد"}</span>
        </div>
        <div className="candidate-list">
          {request.candidates.length?request.candidates.slice(0,5).map(candidate=><div key={candidate.partnerId}>
            <span className="candidate-rank">#{candidate.rank}</span>
            <div><strong>{candidate.partnerName}</strong><small>درجة {candidate.score}% · {candidate.leadHours??"—"} ساعة</small></div>
            <b>{candidate.cost===null?"بدون سعر":`${candidate.cost.toLocaleString("en-US")} ${candidate.currency}`}</b>
            <em>{candidate.candidateStatus}</em>
          </div>):<p className="empty-note">لا يوجد شريك مؤهل لهذه الخدمة حتى الآن.</p>}
        </div>
      </article>):<div className="empty-panel">لا توجد طلبات Sourcing مفتوحة بعد.</div>}
    </section>
  </main>;
}
