export const orderStatuses=[
  "draft",
  "submitted",
  "under_review",
  "waiting_quote",
  "quote_sent",
  "waiting_payment",
  "design_required",
  "designing",
  "waiting_design_approval",
  "approved_for_production",
  "in_production",
  "quality_control",
  "ready",
  "pickup_scheduled",
  "delivery_scheduled",
  "completed",
  "cancelled"
] as const;

export type OrderStatus=(typeof orderStatuses)[number];

const transitions:Record<OrderStatus,OrderStatus[]>={
  draft:["submitted","cancelled"],
  submitted:["under_review","waiting_quote","design_required","cancelled"],
  under_review:["waiting_quote","quote_sent","design_required","waiting_payment","cancelled"],
  waiting_quote:["quote_sent","cancelled"],
  quote_sent:["waiting_payment","under_review","cancelled"],
  waiting_payment:["design_required","approved_for_production","cancelled"],
  design_required:["designing","cancelled"],
  designing:["waiting_design_approval","cancelled"],
  waiting_design_approval:["designing","approved_for_production","cancelled"],
  approved_for_production:["in_production","cancelled"],
  in_production:["quality_control","cancelled"],
  quality_control:["in_production","ready","cancelled"],
  ready:["pickup_scheduled","delivery_scheduled","completed"],
  pickup_scheduled:["completed","ready"],
  delivery_scheduled:["completed","ready"],
  completed:[],
  cancelled:[]
};

export function canTransitionOrder(from:OrderStatus,to:OrderStatus){
  return transitions[from]?.includes(to)??false;
}

export function nextOrderStatuses(status:OrderStatus){
  return transitions[status]??[];
}

export function requiresDesignApprovalBeforeProduction(input:{
  requiresDesignApproval:boolean;
  hasApprovedDesign:boolean;
}){
  return input.requiresDesignApproval&&!input.hasApprovedDesign;
}

export const orderStatusLabels:Record<OrderStatus,string>={
  draft:"مسودة",
  submitted:"تم الإرسال",
  under_review:"قيد المراجعة",
  waiting_quote:"بانتظار عرض السعر",
  quote_sent:"تم إرسال عرض السعر",
  waiting_payment:"بانتظار الدفع",
  design_required:"يحتاج تصميم",
  designing:"قيد التصميم",
  waiting_design_approval:"بانتظار اعتماد التصميم",
  approved_for_production:"معتمد للإنتاج",
  in_production:"قيد الإنتاج",
  quality_control:"فحص الجودة",
  ready:"جاهز",
  pickup_scheduled:"موعد استلام",
  delivery_scheduled:"موعد توصيل",
  completed:"مكتمل",
  cancelled:"ملغي"
};
