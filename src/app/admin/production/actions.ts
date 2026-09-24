"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { reviewQualityInspection } from "@/lib/production-workflow";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function reviewQcAction(formData:FormData){
  const access=await requirePermission("production.manage");
  const inspectionId=value(formData,"inspectionId");
  const decision=value(formData,"decision");
  const acceptedRaw=value(formData,"acceptedQuantity");
  const rejectedRaw=value(formData,"rejectedQuantity");

  if(!["passed","failed","conditional"].includes(decision)){
    throw new Error("Invalid QC decision.");
  }

  await reviewQualityInspection({
    inspectionId,
    decision:decision as "passed"|"failed"|"conditional",
    actorId:access.preview?null:access.user.id,
    acceptedQuantity:acceptedRaw?Number(acceptedRaw):null,
    rejectedQuantity:rejectedRaw?Number(rejectedRaw):null,
    notes:value(formData,"notes")||null
  });

  revalidatePath("/admin/production");
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
