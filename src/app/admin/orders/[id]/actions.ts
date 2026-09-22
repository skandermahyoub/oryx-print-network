"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { createDraftQuoteFromOrder } from "@/lib/quote-engine";
import { createSourcingRequestForOrderItem, assignSourcingCandidate } from "@/lib/sourcing-engine";
import { transitionOrder } from "@/lib/order-workflow";
import { orderStatuses, type OrderStatus } from "@/lib/order-state-machine";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function transitionOrderAction(formData:FormData){
  const access=await requirePermission("orders.manage");
  const orderId=value(formData,"orderId");
  const to=value(formData,"to");

  if(!(orderStatuses as readonly string[]).includes(to)){
    throw new Error("Invalid order status.");
  }

  await transitionOrder({
    orderId,
    to:to as OrderStatus,
    actorId:access.preview?null:access.user.id,
    reason:value(formData,"reason")||undefined
  });

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function createQuoteAction(formData:FormData){
  await requirePermission("quotes.manage");
  const orderId=value(formData,"orderId");
  await createDraftQuoteFromOrder(orderId,7);
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}

export async function createSourcingAction(formData:FormData){
  const access=await requirePermission("partners.manage");
  const orderId=value(formData,"orderId");
  const orderItemId=value(formData,"orderItemId");

  await createSourcingRequestForOrderItem({
    orderItemId,
    actorId:access.preview?null:access.user.id,
    urgent:value(formData,"urgent")==="true"
  });

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/sourcing");
}

export async function assignPartnerAction(formData:FormData){
  const access=await requirePermission("partners.manage");
  const orderId=value(formData,"orderId");
  const sourcingRequestId=value(formData,"sourcingRequestId");
  const partnerId=value(formData,"partnerId");

  await assignSourcingCandidate({
    sourcingRequestId,
    partnerId,
    actorId:access.preview?null:access.user.id,
    overrideReason:value(formData,"overrideReason")||null
  });

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/sourcing");
  revalidatePath("/admin/production");
}
