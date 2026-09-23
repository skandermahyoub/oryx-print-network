import { databaseConfigured, getSql } from "@/lib/db";

export type PricingDetail={
  service:{id:string;slug:string;name:string;pricingMode:string;sellingMode:string;category:string};
  fields:Array<{key:string;label:string;type:string}>;
  rules:Array<{
    id:string;name:string;type:string;priority:number;conditions:Record<string,unknown>;calculation:Record<string,unknown>;
    active:boolean;validFrom:string|null;validUntil:string|null;
    tiers:Array<{id:string;min:number;max:number|null;unitPrice:number;currency:string}>;
  }>;
};

export async function getPricingDetail(slug:string):Promise<PricingDetail|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();

  const services=await sql`
    select s.id,s.slug,s.name_ar,s.pricing_mode,s.selling_mode,c.name_ar as category_name
    from services s
    join categories c on c.id=s.category_id
    where s.slug=${slug}
    limit 1
  `;
  const service=services[0];
  if(!service) return null;

  const [fields,rules,tiers]=await Promise.all([
    sql`
      select field_key,label_ar,field_type
      from service_fields
      where service_id=${service.id}
      order by sort_order,field_key
    `,
    sql`
      select id,name,rule_type,priority,conditions,calculation,valid_from,valid_until,is_active
      from pricing_rules
      where service_id=${service.id}
      order by priority,created_at
    `,
    sql`
      select pt.*
      from price_tiers pt
      join pricing_rules pr on pr.id=pt.pricing_rule_id
      where pr.service_id=${service.id}
      order by pt.pricing_rule_id,pt.min_quantity
    `
  ]);

  const tiersByRule=new Map<string,PricingDetail["rules"][number]["tiers"]>();
  for(const row of tiers){
    const id=String(row.pricing_rule_id);
    const list=tiersByRule.get(id)??[];
    list.push({
      id:String(row.id),
      min:Number(row.min_quantity),
      max:row.max_quantity===null?null:Number(row.max_quantity),
      unitPrice:Number(row.unit_price),
      currency:String(row.currency??"YER")
    });
    tiersByRule.set(id,list);
  }

  return {
    service:{
      id:String(service.id),slug:String(service.slug),name:String(service.name_ar),pricingMode:String(service.pricing_mode),
      sellingMode:String(service.selling_mode),category:String(service.category_name)
    },
    fields:fields.map(row=>({key:String(row.field_key),label:String(row.label_ar),type:String(row.field_type)})),
    rules:rules.map(row=>({
      id:String(row.id),name:String(row.name),type:String(row.rule_type),priority:Number(row.priority),
      conditions:row.conditions&&typeof row.conditions==="object"&&!Array.isArray(row.conditions)?row.conditions as Record<string,unknown>:{},
      calculation:row.calculation&&typeof row.calculation==="object"&&!Array.isArray(row.calculation)?row.calculation as Record<string,unknown>:{},
      active:Boolean(row.is_active),validFrom:row.valid_from?new Date(String(row.valid_from)).toISOString():null,
      validUntil:row.valid_until?new Date(String(row.valid_until)).toISOString():null,
      tiers:tiersByRule.get(String(row.id))??[]
    }))
  };
}
