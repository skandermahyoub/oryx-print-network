import { databaseConfigured, getSql } from "@/lib/db";

export type PricingResult=
  | {status:"requires_quote";reason:string;currency?:string}
  | {status:"priced";subtotal:number;currency:string;breakdown:Array<{label:string;amount:number}>};

function numberValue(value:unknown){
  const parsed=Number(value);
  return Number.isFinite(parsed)?parsed:0;
}

function configObject(value:unknown):Record<string,unknown>{
  if(value&&typeof value==="object"&&!Array.isArray(value)) return value as Record<string,unknown>;
  return {};
}

export async function priceService(serviceSlug:string,specs:Record<string,string>):Promise<PricingResult>{
  if(!databaseConfigured()){
    return {status:"requires_quote",reason:"Pricing database is not configured in this environment."};
  }

  const sql=getSql();
  const services=await sql`
    select id,pricing_mode
    from services
    where slug=${serviceSlug} and is_active=true and is_public=true
    limit 1
  `;
  const service=services[0];
  if(!service) return {status:"requires_quote",reason:"Service not found."};

  const rules=await sql`
    select id,name,rule_type,priority,conditions,calculation
    from pricing_rules
    where service_id=${service.id}
      and is_active=true
      and (valid_from is null or valid_from<=now())
      and (valid_until is null or valid_until>=now())
    order by priority asc,created_at asc
  `;

  if(!rules.length){
    return {status:"requires_quote",reason:"No active pricing rule is configured for this service."};
  }

  const quantity=Math.max(1,numberValue(specs.quantity||specs.copies||specs.sets||"1"));
  const width=numberValue(specs.width);
  const height=numberValue(specs.height);
  const area=width>0&&height>0?width*height:0;
  const breakdown:Array<{label:string;amount:number}>=[];
  let subtotal=0;
  let currency="YER";

  for(const row of rules){
    const calc=configObject(row.calculation);
    const conditions=configObject(row.conditions);

    if(typeof conditions.field==="string"&&conditions.equals!==undefined){
      if(String(specs[String(conditions.field)]??"")!==String(conditions.equals)) continue;
    }

    if(typeof calc.currency==="string") currency=calc.currency;

    if(row.rule_type==="fixed"){
      const amount=numberValue(calc.amount);
      if(amount>0){subtotal+=amount;breakdown.push({label:String(row.name),amount});}
      continue;
    }

    if(row.rule_type==="per_unit"){
      const amount=numberValue(calc.unit_price)*quantity;
      if(amount>0){subtotal+=amount;breakdown.push({label:String(row.name),amount});}
      continue;
    }

    if(row.rule_type==="per_area"){
      if(area<=0) return {status:"requires_quote",reason:"Width and height are required for area pricing.",currency};
      const raw=numberValue(calc.price_per_sqm)*area*quantity;
      const minCharge=numberValue(calc.min_charge);
      const amount=Math.max(raw,minCharge);
      if(amount>0){subtotal+=amount;breakdown.push({label:String(row.name),amount});}
      continue;
    }

    if(row.rule_type==="per_linear"){
      const length=numberValue(specs.length||specs.height||specs.width);
      if(length<=0) return {status:"requires_quote",reason:"A length value is required for linear pricing.",currency};
      const amount=numberValue(calc.price_per_meter)*length*quantity;
      if(amount>0){subtotal+=amount;breakdown.push({label:String(row.name),amount});}
      continue;
    }

    if(row.rule_type==="tiered"){
      const tiers=await sql`
        select min_quantity,max_quantity,unit_price,currency
        from price_tiers
        where pricing_rule_id=${row.id}
          and min_quantity<=${quantity}
          and (max_quantity is null or max_quantity>=${quantity})
        order by min_quantity desc
        limit 1
      `;
      const tier=tiers[0];
      if(!tier) return {status:"requires_quote",reason:"No quantity tier matches this order.",currency};
      currency=String(tier.currency||currency);
      const amount=numberValue(tier.unit_price)*quantity;
      subtotal+=amount;
      breakdown.push({label:String(row.name),amount});
      continue;
    }

    if(row.rule_type==="matrix"){
      const field=typeof calc.field==="string"?calc.field:"";
      const prices=configObject(calc.prices);
      const selected=field?String(specs[field]??""):"";
      const unitPrice=numberValue(prices[selected]);
      if(!field||!selected||unitPrice<=0){
        return {status:"requires_quote",reason:"No matrix price matches the selected specification.",currency};
      }
      const amount=unitPrice*(calc.multiply_by_quantity===false?1:quantity);
      subtotal+=amount;
      breakdown.push({label:String(row.name),amount});
      continue;
    }

    if(row.rule_type==="formula"){
      const base=numberValue(calc.base);
      const quantityFactor=numberValue(calc.quantity_factor);
      const areaFactor=numberValue(calc.area_factor);
      const amount=base+(quantityFactor*quantity)+(areaFactor*area*quantity);
      if(amount>0){subtotal+=amount;breakdown.push({label:String(row.name),amount});}
      continue;
    }

    if(row.rule_type==="surcharge"){
      const fixed=numberValue(calc.amount);
      const percent=numberValue(calc.percent);
      const amount=fixed+(subtotal*(percent/100));
      if(amount>0){subtotal+=amount;breakdown.push({label:String(row.name),amount});}
      continue;
    }

    if(row.rule_type==="discount"){
      const fixed=numberValue(calc.amount);
      const percent=numberValue(calc.percent);
      const amount=Math.min(subtotal,fixed+(subtotal*(percent/100)));
      if(amount>0){subtotal-=amount;breakdown.push({label:String(row.name),amount:-amount});}
    }
  }

  if(subtotal<=0){
    return {status:"requires_quote",reason:"Pricing rules did not produce a sell price.",currency};
  }

  return {
    status:"priced",
    subtotal:Number(subtotal.toFixed(2)),
    currency,
    breakdown
  };
}
