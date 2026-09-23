import { describe, expect, it } from "vitest";
import { isRoutingCandidateEligible, rankProductionPartners } from "./partner-routing";

describe("partner routing",()=>{
  it("excludes partners without a usable internal cost",()=>{
    const ranked=rankProductionPartners([
      {partnerId:"a",partnerName:"A",baseCost:null,normalLeadHours:12,dailyCapacity:50,performanceScore:95},
      {partnerId:"b",partnerName:"B",baseCost:100,normalLeadHours:24,dailyCapacity:50,performanceScore:80}
    ]);
    expect(ranked.map(item=>item.partnerId)).toEqual(["b"]);
  });

  it("blocks inactive unapproved noncompliant and service-ineligible partners",()=>{
    const base={partnerName:"Partner",baseCost:100,normalLeadHours:24,dailyCapacity:50,performanceScore:90};
    expect(isRoutingCandidateEligible({...base,partnerId:"inactive",isActive:false})).toBe(false);
    expect(isRoutingCandidateEligible({...base,partnerId:"unapproved",isApproved:false})).toBe(false);
    expect(isRoutingCandidateEligible({...base,partnerId:"expired",complianceValid:false})).toBe(false);
    expect(isRoutingCandidateEligible({...base,partnerId:"wrong-service",serviceEligible:false})).toBe(false);
    expect(isRoutingCandidateEligible({...base,partnerId:"full",availableCapacity:0})).toBe(false);
    expect(isRoutingCandidateEligible({...base,partnerId:"ok",isActive:true,isApproved:true,complianceValid:true,serviceEligible:true,availableCapacity:5})).toBe(true);
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

  it("uses available capacity rather than theoretical capacity",()=>{
    const ranked=rankProductionPartners([
      {partnerId:"busy",partnerName:"Busy",baseCost:100,normalLeadHours:24,dailyCapacity:100,availableCapacity:1,performanceScore:90},
      {partnerId:"free",partnerName:"Free",baseCost:100,normalLeadHours:24,dailyCapacity:20,availableCapacity:20,performanceScore:90}
    ]);
    expect(ranked[0].partnerId).toBe("free");
  });

  it("returns deterministic ordering when candidates have identical scores",()=>{
    const ranked=rankProductionPartners([
      {partnerId:"b",partnerName:"B",baseCost:100,normalLeadHours:24,dailyCapacity:10,performanceScore:80,activeJobs:0},
      {partnerId:"a",partnerName:"A",baseCost:100,normalLeadHours:24,dailyCapacity:10,performanceScore:80,activeJobs:0}
    ]);
    expect(ranked).toHaveLength(2);
    expect(ranked[0].score).toBe(ranked[1].score);
    expect(ranked.map(item=>item.partnerId)).toEqual(["a","b"]);
  });
});
