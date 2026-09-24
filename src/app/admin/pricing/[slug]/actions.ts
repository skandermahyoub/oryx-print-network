"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

function value(formData:FormData,key:string){return String(formData.get(key)??"").trim();}
function numberOrNull(raw:string){if(!raw) return null;const n=Number(raw);return Number.isFinite(n)?n:null;}

function calculationFor(type:string,formData:FormData){
  if(type==="fixed") return {amount:numberOrNull(value(formData,"amount"))??0,currency:"YER"};
  if(type==="per_unit") return {unit_price:numberOrNull(value(formData,"unitPrice"))??0,currency:"YER"};
  if(type==="per_area") return {price_per_sqm:numberOrNull(value(formData,"pricePerSqm"))??0,min_charge:numberOrNull(value(formData,"minCharge"))??0,currency:"YER"};
  if(type==="per_linear") return {price_per_meter:numberOrNull(value(formData,"pricePerMeter"))??0,currency:"YER"};
  if(type==="formula") return {
    base:numberOrNull(value(formData,"base"))??0,
    quantity_factor:numberOrNull(value(formData,"quantityFactor"))??0,
    area_factor:numberOrNull(value(formData,"areaFactor"))??0,
    currency:"YER"
  };
  if(type==="surcharge"||type==="discount") return {
    amount:numberOrNull(value(formData,"amount"))??0,
    percent:numberOrNull(value(formData,"percent"))??0,
    currency:"YER"
  };
  if(type==="matrix"){
    const field=value(formData,"matrixField");
    const entries=value(formData,"matrixEntries")
      .split("\n")
      .map(line=>line.trim())
      .filter(Boolean)
      .map(line=>line.split("="))
      .filter(parts=>parts.length===2&&parts[0].trim()&&Number.isFinite(Number(parts[1].trim())));
    return {
      field,
      prices:Object.fromEntries(entries.map(([key,price])=>[key.trim(),Number(price.trim())])),
      multiply_by_quantity:value(formData,"matrixMultiply")==="true",
      currency:"YER"
    };
  }
  return {currency:"YER"};
}

export async function createPricingRuleAction(formData:FormData){
  const access=await requirePermission("pricing.manage");
  const serviceId=value(formData,"serviceId");
  const slug=value(formData,"slug");
  const name=value(formData,"name");
  const type=value(formData,"type");
  const priority=Number(value(formData,"priority")||"100");
  const conditionField=value(formData,"conditionField");
  const conditionEquals=value(formData,"conditionEquals");
  const allowed=["fixed","per_unit","per_area","per_linear","tiered","matrix","formula","surcharge","discount"];

  if(name.length<2||!allowed.includes(type)||!Number.isInteger(priority)){
    throw new Error("Pricing rule is invalid.");
  }

  const calculation=calculationFor(type,formData);
  if(type==="matrix"&&(!String(calculation.field)||Object.keys(calculation.prices as Record<string,unknown>).length===0)){
    throw new Error("Matrix pricing needs a field and at least one value=price entry.");
  }

  const conditions=conditionField&&conditionEquals?{field:conditionField,equals:conditionEquals}:{};
  const sql=getSql();
  const rows=await sql`
    with created as (
      insert into pricing_rules (
        service_id,name,rule_type,priority,conditions,calculation,valid_from,valid_until,is_active
      )
      select
        s.id,${name},${type},${priority},${JSON.stringify(conditions)}::jsonb,${JSON.stringify(calculation)}::jsonb,
        ${value(formData,"validFrom")||null},${value(formData,"validUntil")||null},true
      from services s
      where s.id=${serviceId}
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'pricing_rule',created.id,'created',
        jsonb_build_object('service_id',${serviceId},'name',${name},'type',${type},'priority',${priority})
      from created
      returning id
    )
    select id from created
  `;

  if(!rows[0]) throw new Error("Service not found.");
  revalidatePath(`/admin/pricing/${slug}`);
  revalidatePath("/admin/pricing");
  revalidatePath(`/services/${slug}`);
}

export async function addPriceTierAction(formData:FormData){
  await requirePermission("pricing.manage");
  const ruleId=value(formData,"ruleId");
  const slug=value(formData,"slug");
  const min=Number(value(formData,"min"));
  const maxRaw=value(formData,"max");
  const max=maxRaw?Number(maxRaw):null;
  const unitPrice=Number(value(formData,"unitPrice"));
  if(!Number.isFinite(min)||min<0||max!==null&&(!Number.isFinite(max)||max<min)||!Number.isFinite(unitPrice)||unitPrice<=0){
    throw new Error("Tier values are invalid.");
  }

  const sql=getSql();
  const rows=await sql`
    insert into price_tiers (pricing_rule_id,min_quantity,max_quantity,unit_price,currency)
    select id,${min},${max},${unitPrice},'YER'
    from pricing_rules
    where id=${ruleId} and rule_type='tiered'
    on conflict (pricing_rule_id,min_quantity) do update set
      max_quantity=excluded.max_quantity,
      unit_price=excluded.unit_price,
      currency=excluded.currency
    returning id
  `;
  if(!rows[0]) throw new Error("Tiered pricing rule not found.");
  revalidatePath(`/admin/pricing/${slug}`);
}

export async function togglePricingRuleAction(formData:FormData){
  const access=await requirePermission("pricing.manage");
  const ruleId=value(formData,"ruleId");
  const slug=value(formData,"slug");
  const active=value(formData,"active")==="true";
  const sql=getSql();

  const rows=await sql`
    with old as (
      select id,is_active from pricing_rules where id=${ruleId} limit 1
    ),
    updated as (
      update pricing_rules pr
      set is_active=${active}
      from old
      where pr.id=old.id
      returning pr.id,old.is_active as old_active,pr.is_active as new_active
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select
        ${access.preview?null:access.user.id},'pricing_rule',updated.id,'active_changed',
        jsonb_build_object('is_active',updated.old_active),jsonb_build_object('is_active',updated.new_active)
      from updated
      returning id
    )
    select id from updated
  `;

  if(!rows[0]) throw new Error("Pricing rule not found.");
  revalidatePath(`/admin/pricing/${slug}`);
  revalidatePath("/admin/pricing");
}
