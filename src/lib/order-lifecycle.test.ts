import { describe,expect,it } from "vitest";
import { validateOrderTransition } from "./order-lifecycle";

describe("order lifecycle guards",()=>{
  it("rejects impossible graph transitions",()=>{
    expect(validateOrderTransition("draft","in_production",{})).toEqual({allowed:false,reason:"invalid_transition"});
  });
  it("requires accepted quote before payment stage",()=>{
    expect(validateOrderTransition("quote_sent","waiting_payment",{}).reason).toBe("quote_not_accepted");
    expect(validateOrderTransition("quote_sent","waiting_payment",{quoteAccepted:true}).allowed).toBe(true);
  });
  it("requires payment and design approval before production approval",()=>{
    expect(validateOrderTransition("waiting_design_approval","approved_for_production",{requiresDesignApproval:true,designApproved:true}).reason).toBe("payment_not_satisfied");
    expect(validateOrderTransition("waiting_design_approval","approved_for_production",{paymentSatisfied:true,requiresDesignApproval:true}).reason).toBe("design_not_approved");
    expect(validateOrderTransition("waiting_design_approval","approved_for_production",{paymentSatisfied:true,requiresDesignApproval:true,designApproved:true}).allowed).toBe(true);
  });
  it("requires sourcing and a ready work order before production starts",()=>{
    expect(validateOrderTransition("approved_for_production","in_production",{}).reason).toBe("partner_not_assigned");
    expect(validateOrderTransition("approved_for_production","in_production",{partnerAssigned:true}).reason).toBe("work_order_not_ready");
    expect(validateOrderTransition("approved_for_production","in_production",{partnerAssigned:true,workOrderReady:true}).allowed).toBe(true);
  });
  it("requires QC pass before an order becomes ready",()=>{
    expect(validateOrderTransition("quality_control","ready",{}).reason).toBe("qc_not_passed");
    expect(validateOrderTransition("quality_control","ready",{qcPassed:true}).allowed).toBe(true);
  });
  it("requires fulfillment, invoice and collection before completion",()=>{
    expect(validateOrderTransition("delivery_scheduled","completed",{}).reason).toBe("fulfillment_not_confirmed");
    expect(validateOrderTransition("delivery_scheduled","completed",{fulfillmentConfirmed:true}).reason).toBe("invoice_not_issued");
    expect(validateOrderTransition("delivery_scheduled","completed",{fulfillmentConfirmed:true,invoiceIssued:true}).reason).toBe("collection_not_satisfied");
    expect(validateOrderTransition("delivery_scheduled","completed",{fulfillmentConfirmed:true,invoiceIssued:true,collectionSatisfied:true}).allowed).toBe(true);
  });
  it("covers the guarded happy path from quote to settled delivery",()=>{
    expect(validateOrderTransition("quote_sent","waiting_payment",{quoteAccepted:true}).allowed).toBe(true);
    expect(validateOrderTransition("waiting_payment","design_required",{}).allowed).toBe(true);
    expect(validateOrderTransition("design_required","designing",{}).allowed).toBe(true);
    expect(validateOrderTransition("designing","waiting_design_approval",{}).allowed).toBe(true);
    expect(validateOrderTransition("waiting_design_approval","approved_for_production",{paymentSatisfied:true,requiresDesignApproval:true,designApproved:true}).allowed).toBe(true);
    expect(validateOrderTransition("approved_for_production","in_production",{partnerAssigned:true,workOrderReady:true}).allowed).toBe(true);
    expect(validateOrderTransition("in_production","quality_control",{}).allowed).toBe(true);
    expect(validateOrderTransition("quality_control","ready",{qcPassed:true}).allowed).toBe(true);
    expect(validateOrderTransition("ready","delivery_scheduled",{}).allowed).toBe(true);
    expect(validateOrderTransition("delivery_scheduled","completed",{fulfillmentConfirmed:true,invoiceIssued:true,collectionSatisfied:true}).allowed).toBe(true);
  });
});
