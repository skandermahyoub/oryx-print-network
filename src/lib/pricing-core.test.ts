import {describe,expect,it} from "vitest";
import {calculatePricing} from "./pricing-core";

describe("pricing core",()=>{
  it("combines unit price surcharge and discount deterministically",()=>{
    const result=calculatePricing([
      {name:"طباعة",ruleType:"per_unit",calculation:{unit_price:100,currency:"YER"}},
      {name:"عاجل",ruleType:"surcharge",calculation:{percent:10}},
      {name:"خصم",ruleType:"discount",calculation:{percent:5}}
    ],{quantity:"10"});
    expect(result.status).toBe("priced");
    if(result.status==="priced"){
      expect(result.subtotal).toBe(1045);
      expect(result.breakdown.map(x=>x.amount)).toEqual([1000,100,-55]);
    }
  });

  it("honors conditional rules without leaking unrelated charges",()=>{
    const result=calculatePricing([
      {name:"أساس",ruleType:"fixed",calculation:{amount:500}},
      {name:"تغليف",ruleType:"fixed",calculation:{amount:200},conditions:{field:"lamination",equals:"yes"}}
    ],{lamination:"no"});
    expect(result.status).toBe("priced");
    if(result.status==="priced") expect(result.subtotal).toBe(500);
  });

  it("requires dimensions for area pricing",()=>{
    expect(calculatePricing([{name:"مساحة",ruleType:"per_area",calculation:{price_per_sqm:100}}],{quantity:"2"}).status).toBe("requires_quote");
  });

  it("enforces minimum area charge",()=>{
    const result=calculatePricing([{name:"لوحة",ruleType:"per_area",calculation:{price_per_sqm:100,min_charge:500}}],{quantity:"2",width:"1",height:"1"});
    expect(result.status).toBe("priced");
    if(result.status==="priced") expect(result.subtotal).toBe(500);
  });
});
