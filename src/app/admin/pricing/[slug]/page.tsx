import Link from "next/link";
import { notFound } from "next/navigation";
import { getPricingDetail } from "@/lib/admin-pricing-detail";
import { addPriceTierAction, createPricingRuleAction, togglePricingRuleAction } from "./actions";

export const dynamic="force-dynamic";

export default async function PricingDetailPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const detail=await getPricingDetail(slug);
  if(!detail) notFound();

  return <main className="admin-pricing-detail-page">
    <section className="admin-order-hero">
      <div>
        <Link href="/admin/pricing" className="admin-back-link">التسعير ←</Link>
        <span className="eyebrow">ORYX PRICING RULES</span>
        <h1>{detail.service.name}</h1>
        <p>{detail.service.category} · {detail.service.pricingMode} · {detail.service.sellingMode}</p>
      </div>
      <div className="admin-order-hero-status">
        <small>قواعد السعر</small><strong>{detail.rules.filter(rule=>rule.active).length}</strong><span>{detail.rules.length} إجمالي</span>
      </div>
    </section>

    <section className="pricing-detail-grid">
      <section className="admin-order-section">
        <div className="admin-order-section-head"><h2>قواعد ORYX</h2><span>{detail.rules.length}</span></div>
        <div className="pricing-rule-list">
          {detail.rules.length?detail.rules.map(rule=><article key={rule.id}>
            <header><div><strong>{rule.name}</strong><small>{rule.type} · Priority {rule.priority}</small></div><span className={rule.active?"status-pill ready":"status-pill warning"}>{rule.active?"Active":"Off"}</span></header>
            <pre>{JSON.stringify({conditions:rule.conditions,calculation:rule.calculation},null,2)}</pre>
            {rule.type==="tiered"?<div className="price-tier-list">
              {rule.tiers.map(tier=><span key={tier.id}>{tier.min}–{tier.max??"∞"} = {tier.unitPrice.toLocaleString("en-US")} {tier.currency}</span>)}
              <form action={addPriceTierAction}>
                <input type="hidden" name="ruleId" value={rule.id}/><input type="hidden" name="slug" value={detail.service.slug}/>
                <input name="min" type="number" min="0" step="0.001" required placeholder="Min"/>
                <input name="max" type="number" min="0" step="0.001" placeholder="Max"/>
                <input name="unitPrice" type="number" min="0.01" step="0.01" required placeholder="سعر الوحدة"/>
                <button type="submit">+ شريحة</button>
              </form>
            </div>:null}
            <form action={togglePricingRuleAction} className="pricing-rule-toggle">
              <input type="hidden" name="ruleId" value={rule.id}/><input type="hidden" name="slug" value={detail.service.slug}/><input type="hidden" name="active" value={rule.active?"false":"true"}/>
              <button type="submit">{rule.active?"إيقاف القاعدة":"تفعيل القاعدة"}</button>
            </form>
          </article>):<p className="empty-note">لا توجد قواعد سعر بعد.</p>}
        </div>
      </section>

      <aside className="admin-order-section pricing-rule-builder">
        <h2>قاعدة سعر جديدة</h2>
        <form action={createPricingRuleAction}>
          <input type="hidden" name="serviceId" value={detail.service.id}/><input type="hidden" name="slug" value={detail.service.slug}/>
          <label>اسم القاعدة<input name="name" required placeholder="مثال: سعر النسخة الأساسي"/></label>
          <label>النوع<select name="type" defaultValue="per_unit">
            <option value="fixed">Fixed</option><option value="per_unit">Per unit</option><option value="per_area">Per area</option><option value="per_linear">Per linear</option><option value="tiered">Tiered</option><option value="matrix">Matrix</option><option value="formula">Formula</option><option value="surcharge">Surcharge</option><option value="discount">Discount</option>
          </select></label>
          <label>Priority<input name="priority" type="number" step="1" defaultValue="100"/></label>
          <label>شرط على الحقل<select name="conditionField" defaultValue=""><option value="">بدون شرط</option>{detail.fields.map(field=><option key={field.key} value={field.key}>{field.label} · {field.key}</option>)}</select></label>
          <label>يساوي<input name="conditionEquals" placeholder="قيمة الشرط"/></label>
          <div className="pricing-calc-grid">
            <input name="amount" type="number" min="0" step="0.01" placeholder="Amount"/>
            <input name="unitPrice" type="number" min="0" step="0.01" placeholder="Unit price"/>
            <input name="pricePerSqm" type="number" min="0" step="0.01" placeholder="Price / m²"/>
            <input name="minCharge" type="number" min="0" step="0.01" placeholder="Min charge"/>
            <input name="pricePerMeter" type="number" min="0" step="0.01" placeholder="Price / meter"/>
            <input name="base" type="number" min="0" step="0.01" placeholder="Formula base"/>
            <input name="quantityFactor" type="number" step="0.0001" placeholder="Quantity factor"/>
            <input name="areaFactor" type="number" step="0.0001" placeholder="Area factor"/>
            <input name="percent" type="number" step="0.01" placeholder="Percent"/>
          </div>
          <label>Matrix field<input name="matrixField" placeholder="مثال: size"/></label>
          <label>Matrix values<textarea name="matrixEntries" rows={5} placeholder={"A4=100\nA3=180\ncustom=250"}/></label>
          <label>Matrix × quantity<select name="matrixMultiply" defaultValue="true"><option value="true">نعم</option><option value="false">لا</option></select></label>
          <label>من<input name="validFrom" type="datetime-local"/></label>
          <label>حتى<input name="validUntil" type="datetime-local"/></label>
          <button type="submit">حفظ قاعدة السعر</button>
        </form>
      </aside>
    </section>
  </main>;
}
