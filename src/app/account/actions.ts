"use server";

import { revalidatePath } from "next/cache";
import { requireCustomerAccess } from "@/lib/auth/customer-access";
import { acceptQuoteForCustomer } from "@/lib/commercial-workflow";

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
