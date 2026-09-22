import { databaseConfigured, getSql } from "@/lib/db";
import { findService, serviceCatalog, type CatalogService, type PreflightRequirement, type ServiceField, type ServiceFieldRule } from "@/lib/service-catalog";

export type CatalogSummary={
  slug:string;
  category:string;
  title:string;
  summary:string;
  pricingMode:"instant"|"quote";
};

type FieldRow={
  field_key:string;
  label_ar:string;
  field_type:string;
  is_required:boolean;
  config:unknown;
};

function pricingMode(sellingMode?:string):"instant"|"quote"{
  return sellingMode==="buy_now"||sellingMode==="instant_quote"?"instant":"quote";
}

function configObject(value:unknown):Record<string,unknown>{
  if(value&&typeof value==="object"&&!Array.isArray(value)) return value as Record<string,unknown>;
  return {};
}

function toField(row:FieldRow):ServiceField{
  const config=configObject(row.config);
  const options=Array.isArray(config.options)?config.options.map(String):undefined;
  const unit=typeof config.unit==="string"?config.unit:undefined;
  const supported=["select","number","text","boolean","file","textarea","date","location","color","dimension"] as const;
  const fieldType=supported.includes(row.field_type as (typeof supported)[number])
    ? row.field_type as ServiceField["type"]
    : "text";

  return {
    key:row.field_key,
    label:row.label_ar,
    type:fieldType,
    required:row.is_required,
    options,
    unit
  };
}

export async function getCatalogSummaries():Promise<CatalogSummary[]>{
  if(!databaseConfigured()){
    return serviceCatalog.map(service=>({
      slug:service.slug,
      category:service.category,
      title:service.title,
      summary:service.summary,
      pricingMode:service.pricingMode
    }));
  }

  try{
    const sql=getSql();
    const rows=await sql`
      select
        s.slug,
        s.name_ar,
        coalesce(s.short_description_ar,'') as short_description_ar,
        s.selling_mode,
        c.name_ar as category_name
      from services s
      join categories c on c.id=s.category_id
      join departments d on d.id=c.department_id
      where s.is_active=true and s.is_public=true
      order by d.sort_order,c.sort_order,s.sort_order,s.name_ar
    `;

    return rows.map(row=>({
      slug:String(row.slug),
      category:String(row.category_name),
      title:String(row.name_ar),
      summary:String(row.short_description_ar??""),
      pricingMode:pricingMode(String(row.selling_mode??""))
    }));
  }catch{
    return serviceCatalog.map(service=>({
      slug:service.slug,
      category:service.category,
      title:service.title,
      summary:service.summary,
      pricingMode:service.pricingMode
    }));
  }
}

export async function getCatalogService(slug:string):Promise<CatalogService|undefined>{
  const fallback=findService(slug);
  if(!databaseConfigured()) return fallback;

  try{
    const sql=getSql();
    const services=await sql`
      select
        s.id,
        s.slug,
        s.name_ar,
        coalesce(s.short_description_ar,'') as short_description_ar,
        s.selling_mode,
        c.name_ar as category_name
      from services s
      join categories c on c.id=s.category_id
      where s.slug=${slug} and s.is_active=true and s.is_public=true
      limit 1
    `;

    const service=services[0];
    if(!service) return fallback;

    const fields=await sql`
      select field_key,label_ar,field_type,is_required,config
      from service_fields
      where service_id=${service.id}
        and customer_visible=true
      order by sort_order,label_ar
    `;

    const finishings=await sql`
      select f.name_ar
      from service_finishings sf
      join finishings f on f.id=sf.finishing_id
      where sf.service_id=${service.id} and f.is_active=true
      order by sf.sort_order,f.name_ar
    `;

    const rules=await sql`
      select target_field_key,rule_type,conditions,message_ar
      from service_field_rules
      where service_id=${service.id} and is_active=true
      order by priority,id
    `;

    const preflight=await sql`
      select requirement_key,label_ar,requirement_type,required_before_quote,required_before_production
      from service_preflight_requirements
      where service_id=${service.id}
      order by sort_order,label_ar
    `;

    const workflow=await sql`
      select ws.name_ar
      from production_workflows pw
      join workflow_steps ws on ws.workflow_id=pw.id
      where pw.service_id=${service.id} and pw.is_default=true and pw.is_active=true
      order by pw.version desc,ws.sort_order
    `;

    return {
      slug:String(service.slug),
      category:String(service.category_name),
      title:String(service.name_ar),
      summary:String(service.short_description_ar??""),
      pricingMode:pricingMode(String(service.selling_mode??"")),
      fields:(fields as unknown as FieldRow[]).map(toField),
      finishings:finishings.map(row=>String(row.name_ar)),
      fieldRules:rules.map(row=>({
        targetFieldKey:String(row.target_field_key),
        ruleType:String(row.rule_type) as ServiceFieldRule["ruleType"],
        conditions:configObject(row.conditions),
        message:row.message_ar?String(row.message_ar):undefined
      })),
      preflight:preflight.map(row=>({
        key:String(row.requirement_key),
        label:String(row.label_ar),
        type:String(row.requirement_type) as PreflightRequirement["type"],
        requiredBeforeQuote:Boolean(row.required_before_quote),
        requiredBeforeProduction:Boolean(row.required_before_production)
      })),
      workflow:workflow.map(row=>String(row.name_ar)),
      tags:[]
    };
  }catch{
    return fallback;
  }
}
