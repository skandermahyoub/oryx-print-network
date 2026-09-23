import { describe, expect, it } from "vitest";
import { rankProductionPartners } from "@/lib/partner-routing";

describe("partner routing",()=>{
  it("excludes partners without a usable internal cost",()=>{
    const ranked=rankProductionPartners([
      {partnerId:"a",partnerName:"A",baseCost:null,normalLeadHours:12,dailyCapacity:50,performanceScore:95},
      {partnerId:"b",partnerName:"B",baseCost:100,normalLeadHours:24,dailyCapacity:50,performanceScore:80}
    ]);
    expect(ranked.map(item=>item.partnerId)).toEqual(["b"]);
  });

  it("balances cost quality speed capacity and workload",()=>{
    const ranked=rankProductionPartners([
      {partnerId:"cheap",partnerName:"Cheap",baseCost:80,normalLeadHours:48,dailyCapacity:20,performanceScore:70,activeJobs:8},
      {partnerId:"balanced",partnerName:"Balanced",baseCost:95,normalLeadHours:18,dailyCapacity:60,performanceScore:94,activeJobs:1},
      {partnerId:"fast",partnerName:"Fast",baseCost:120,normalLeadHours:8,dailyCapacity:40,performanceScore:86,activeJobs:3}
    ]);

    expect(ranked[0].partnerId).toBe("balanced");
    expect(ranked[0].score).toBeGreaterThan(ranked[1].score);
    expect(ranked[0].reasons).toHaveLength(5);
  });

  it("returns deterministic scores when candidates have the same cost and lead time",()=>{
    const ranked=rankProductionPartners([
      {partnerId:"a",partnerName:"A",baseCost:100,normalLeadHours:24,dailyCapacity:10,performanceScore:80,activeJobs:0},
      {partnerId:"b",partnerName:"B",baseCost:100,normalLeadHours:24,dailyCapacity:10,performanceScore:80,activeJobs:0}
    ]);
    expect(ranked).toHaveLength(2);
    expect(ranked[0].score).toBe(ranked[1].score);
  });
});
