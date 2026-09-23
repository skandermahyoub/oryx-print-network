export type PricingRule={
  name:string;
  ruleType:"fixed"|"per_unit"|"per_area"|"per_linear"|"formula"|"surcharge"|"discount";
  calculation:Record<string,unknown>;
  conditions?:Record<string,unknown>;
};

export type CorePricingResult=
  | {status:"requires_quote";reason:string;currency:string}
  | {status:"priced";subtotal:number;currency:string;breakdown:Array<{label:string;amount:number}>};

const n=(value:unknown)=>{const parsed=Number(value);return Number.isFinite(parsed)?parsed:0;};

function matches(specs:Record<string,string>,conditions:Record<string,unknown>={}){
  if(typeof conditions.field==="string"&&conditions.equals!==undefined){
    return String(specs[conditions.field]??"")===String(conditions.equals);
  }
  return true;
}

export function calculatePricing(rules:PricingRule[],specs:Record<string,string>):CorePricingResult{
  const quantity=Math.max(1,n(specs.quantity||specs.copies||specs.sets||"1"));
  const width=n(specs.width);
  const height=n(specs.height);
  const area=width>0&&height>0?width*height:0;
  const breakdown:Array<{label:string;amount:number}>=[];
  let subtotal=0;
  let currency="YER";

  for(const rule of rules){
    if(!matches(specs,rule.conditions)) continue;
    const calc=rule.calculation;
    if(typeof calc.currency==="string") currency=calc.currency;
    let amount=0;
    if(rule.ruleType==="fixed") amount=n(calc.amount);
    if(rule.ruleType==="per_unit") amount=n(calc.unit_price)*quantity;
    if(rule.ruleType==="per_area"){
      if(area<=0) return {status:"requires_quote",reason:"Width and height are required for area pricing.",currency};
      amount=Math.max(n(calc.price_per_sqm)*area*quantity,n(calc.min_charge));
    }
    if(rule.ruleType==="per_linear"){
      const length=n(specs.length||specs.height||specs.width);
      if(length<=0) return {status:"requires_quote",reason:"A length value is required for linear pricing.",currency};
      amount=n(calc.price_per_meter)*length*quantity;
    }
    if(rule.ruleType==="formula") amount=n(calc.base)+n(calc.quantity_factor)*quantity+n(calc.area_factor)*area*quantity;
    if(rule.ruleType==="surcharge") amount=n(calc.amount)+subtotal*(n(calc.percent)/100);
    if(rule.ruleType==="discount") amount=-Math.min(subtotal,n(calc.amount)+subtotal*(n(calc.percent)/100));
    if(amount!==0){subtotal+=amount;breakdown.push({label:rule.name,amount:Number(amount.toFixed(2))});}
  }
  if(subtotal<=0) return {status:"requires_quote",reason:"Pricing rules did not produce a sell price.",currency};
  return {status:"priced",subtotal:Number(subtotal.toFixed(2)),currency,breakdown};
}
