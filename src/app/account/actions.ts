"use server";

import { revalidatePath } from "next/cache";
import { requireCustomerAccess } from "@/lib/auth/customer-access";
import { acceptQuoteForCustomer } from "@/lib/commercial-workflow";
import { decideDesignVersion } from "@/lib/design-workflow";
import { requestRewardRedemption } from "@/lib/loyalty-workflow";

export async function acceptCustomerQuoteAction(formData:FormData){
  const access=await requireCustomerAccess();
  const quoteId=String(formData.get("quoteId")??"").trim();
  if(!quoteId) throw new Error("Quote id is required.");

  await acceptQuoteForCustomer({
    quoteId,
    customerId:access.customerId
  });

  revalidatePath("/account");
}


export async function decideCustomerDesignAction(formData:FormData){
  const access=await requireCustomerAccess();
  const designVersionId=String(formData.get("designVersionId")??"").trim();
  const decision=String(formData.get("decision")??"").trim();
  const notes=String(formData.get("notes")??"").trim();

  if(!["approved","revision_requested","rejected"].includes(decision)){
    throw new Error("Invalid design decision.");
  }

  await decideDesignVersion({
    designVersionId,
    customerId:access.customerId,
    decision:decision as "approved"|"revision_requested"|"rejected",
    notes:notes||null
  });

  revalidatePath("/account");
  revalidatePath("/admin/design");
  revalidatePath("/admin/orders");
}


export async function requestRewardRedemptionAction(formData:FormData){
  const access=await requireCustomerAccess();
  const rewardId=String(formData.get("rewardId")??"").trim();
  if(!rewardId) throw new Error("Reward id is required.");

  await requestRewardRedemption({
    customerId:access.customerId,
    rewardId
  });

  revalidatePath("/account");
  revalidatePath("/admin/loyalty");
}
