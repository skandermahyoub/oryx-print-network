import { canTransitionOrder, type OrderStatus } from "./order-state-machine";

export type LifecycleContext={
  quoteAccepted?:boolean;
  paymentSatisfied?:boolean;
  requiresDesignApproval?:boolean;
  designApproved?:boolean;
  partnerAssigned?:boolean;
  workOrderReady?:boolean;
  qcPassed?:boolean;
  fulfillmentConfirmed?:boolean;
  invoiceIssued?:boolean;
  collectionSatisfied?:boolean;
};

export type LifecycleDecision={allowed:boolean;reason?:string};

/**
 * Cross-module business guards for the commercial-to-fulfilment lifecycle.
 * The state machine defines graph topology; this function enforces evidence
 * required before irreversible operational transitions.
 */
export function validateOrderTransition(
  from:OrderStatus,
  to:OrderStatus,
  ctx:LifecycleContext
):LifecycleDecision{
  if(!canTransitionOrder(from,to)) return {allowed:false,reason:"invalid_transition"};
  if(to==="waiting_payment"&&!ctx.quoteAccepted) return {allowed:false,reason:"quote_not_accepted"};
  if(to==="approved_for_production"){
    if(!ctx.paymentSatisfied) return {allowed:false,reason:"payment_not_satisfied"};
    if(ctx.requiresDesignApproval&&!ctx.designApproved) return {allowed:false,reason:"design_not_approved"};
  }
  if(to==="in_production"&&from==="approved_for_production"){
    if(!ctx.partnerAssigned) return {allowed:false,reason:"partner_not_assigned"};
    if(!ctx.workOrderReady) return {allowed:false,reason:"work_order_not_ready"};
  }
  if(to==="ready"&&!ctx.qcPassed) return {allowed:false,reason:"qc_not_passed"};
  if(to==="completed"){
    if(!ctx.fulfillmentConfirmed) return {allowed:false,reason:"fulfillment_not_confirmed"};
    if(!ctx.invoiceIssued) return {allowed:false,reason:"invoice_not_issued"};
    if(!ctx.collectionSatisfied) return {allowed:false,reason:"collection_not_satisfied"};
  }
  return {allowed:true};
}
