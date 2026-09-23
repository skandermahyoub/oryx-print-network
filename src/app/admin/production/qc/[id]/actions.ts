"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";
import { reviewQualityInspection } from "@/lib/production-workflow";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function updateQcCheckAction(formData:FormData){
  const access=await requirePermission("production.manage");
  const inspectionId=value(formData,"inspectionId");
  const checkId=value(formData,"checkId");
  const result=value(formData,"result");
  const allowed=["pending","pass","fail","not_applicable"];
  if(!allowed.includes(result)) throw new Error("Invalid QC result.");

  const sql=getSql();
  const rows=await sql`
    with target as (
      select qci.id,qci.result,qi.status
      from qc_check_items qci
      join qc_inspections qi on qi.id=qci.inspection_id
      where qci.id=${checkId}
        and qci.inspection_id=${inspectionId}
        and qi.status='pending'
      limit 1
    ),
    updated as (
      update qc_check_items qci
      set
        result=${result},
        measurement=nullif(${value(formData,"measurement")},''),
        tolerance=nullif(${value(formData,"tolerance")},''),
        notes=nullif(${value(formData,"notes")},'')
      from target
      where qci.id=target.id
      returning qci.id,target.result as old_result,qci.result as new_result
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select
        ${access.preview?null:access.user.id},
        'qc_inspection',
        ${inspectionId},
        'check_updated',
        jsonb_build_object('check_id',updated.id,'result',updated.old_result),
        jsonb_build_object('check_id',updated.id,'result',updated.new_result)
      from updated
      returning id
    )
    select id from updated
  `;

  if(!rows[0]) throw new Error("QC check is unavailable or inspection is closed.");
  revalidatePath(`/admin/production/qc/${inspectionId}`);
  revalidatePath("/admin/production");
}

export async function closeQcInspectionAction(formData:FormData){
  const access=await requirePermission("production.manage");
  const inspectionId=value(formData,"inspectionId");
  const decision=value(formData,"decision");
  if(!["passed","conditional","failed"].includes(decision)){
    throw new Error("Invalid QC decision.");
  }

  const acceptedRaw=value(formData,"acceptedQuantity");
  const rejectedRaw=value(formData,"rejectedQuantity");

  await reviewQualityInspection({
    inspectionId,
    decision:decision as "passed"|"conditional"|"failed",
    actorId:access.preview?null:access.user.id,
    acceptedQuantity:acceptedRaw?Number(acceptedRaw):null,
    rejectedQuantity:rejectedRaw?Number(rejectedRaw):null,
    notes:value(formData,"notes")||null
  });

  revalidatePath(`/admin/production/qc/${inspectionId}`);
  revalidatePath("/admin/production");
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
