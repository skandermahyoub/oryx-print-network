"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { assignDesignJob, createDesignVersion } from "@/lib/design-workflow";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function assignDesignJobAction(formData:FormData){
  const access=await requirePermission("design.manage");
  const designJobId=value(formData,"designJobId");
  const assignee=value(formData,"assigneeId");
  const dueAt=value(formData,"dueAt");
  const brief=value(formData,"brief");

  await assignDesignJob({
    designJobId,
    assigneeId:assignee||null,
    dueAt:dueAt||null,
    brief:brief||null,
    actorId:access.preview?null:access.user.id
  });

  revalidatePath(`/admin/design/${designJobId}`);
  revalidatePath("/admin/design");
}

export async function createDesignVersionAction(formData:FormData){
  const access=await requirePermission("design.manage");
  const designJobId=value(formData,"designJobId");
  const documentId=value(formData,"documentId");
  const notes=value(formData,"notes");
  if(!documentId) throw new Error("ارفع ملف التصميم أولًا.");

  await createDesignVersion({
    designJobId,
    documentId,
    notes:notes||null,
    actorId:access.preview?null:access.user.id
  });

  revalidatePath(`/admin/design/${designJobId}`);
  revalidatePath("/admin/design");
  revalidatePath("/account");
}
