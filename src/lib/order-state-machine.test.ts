import { describe, expect, it } from "vitest";
import {
  canTransitionOrder,
  nextOrderStatuses,
  requiresDesignApprovalBeforeProduction
} from "./order-state-machine";

describe("order state machine",()=>{
  it("allows the normal commercial path",()=>{
    expect(canTransitionOrder("submitted","under_review")).toBe(true);
    expect(canTransitionOrder("under_review","waiting_quote")).toBe(true);
    expect(canTransitionOrder("waiting_quote","quote_sent")).toBe(true);
    expect(canTransitionOrder("quote_sent","waiting_payment")).toBe(true);
    expect(canTransitionOrder("waiting_payment","approved_for_production")).toBe(true);
    expect(canTransitionOrder("approved_for_production","in_production")).toBe(true);
    expect(canTransitionOrder("in_production","quality_control")).toBe(true);
    expect(canTransitionOrder("quality_control","ready")).toBe(true);
    expect(canTransitionOrder("ready","delivery_scheduled")).toBe(true);
    expect(canTransitionOrder("delivery_scheduled","completed")).toBe(true);
  });

  it("rejects unsafe jumps",()=>{
    expect(canTransitionOrder("submitted","completed")).toBe(false);
    expect(canTransitionOrder("waiting_quote","in_production")).toBe(false);
    expect(canTransitionOrder("in_production","completed")).toBe(false);
    expect(canTransitionOrder("completed","submitted")).toBe(false);
  });

  it("keeps completed and cancelled terminal",()=>{
    expect(nextOrderStatuses("completed")).toEqual([]);
    expect(nextOrderStatuses("cancelled")).toEqual([]);
  });

  it("blocks production when a required design is not approved",()=>{
    expect(requiresDesignApprovalBeforeProduction({
      requiresDesignApproval:true,
      hasApprovedDesign:false
    })).toBe(true);
    expect(requiresDesignApprovalBeforeProduction({
      requiresDesignApproval:true,
      hasApprovedDesign:true
    })).toBe(false);
    expect(requiresDesignApprovalBeforeProduction({
      requiresDesignApproval:false,
      hasApprovedDesign:false
    })).toBe(false);
  });
});
