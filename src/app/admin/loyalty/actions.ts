"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";
import { adjustCustomerPoints, reviewRewardRedemption } from "@/lib/loyalty-workflow";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function createRewardAction(formData:FormData){
  const access=await requirePermission("crm.manage");
  const slug=value(formData,"slug").toLowerCase();
  const name=value(formData,"name");
  const pointsCost=Number(value(formData,"pointsCost"));
  const type=value(formData,"type");
  const rewardValueRaw=value(formData,"rewardValue");
  const rewardValue=rewardValueRaw?Number(rewardValueRaw):null;
  const inventoryRaw=value(formData,"inventoryLimit");
  const inventoryLimit=inventoryRaw?Number(inventoryRaw):null;
  const validUntil=value(formData,"validUntil");

  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)||name.length<2||!Number.isInteger(pointsCost)||pointsCost<=0){
    throw new Error("Reward data is invalid.");
  }
  if(!["discount","free_delivery","free_design","product","service","custom"].includes(type)){
    throw new Error("Reward type is invalid.");
  }

  const sql=getSql();
  const rows=await sql`
    with created as (
      insert into reward_catalog (
        slug,name_ar,description_ar,points_cost,reward_type,reward_value,currency,valid_until,inventory_limit,is_active
      ) values (
        ${slug},${name},${value(formData,"description")||null},${pointsCost},${type},${rewardValue},'YER',
        ${validUntil||null},${inventoryLimit},true
      )
      on conflict (slug) do nothing
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'reward',
        created.id,
        'created',
        jsonb_build_object('slug',${slug},'points_cost',${pointsCost},'type',${type})
      from created
      returning id
    )
    select id from created
  `;

  if(!rows[0]) throw new Error("Reward slug is already in use.");
  revalidatePath("/admin/loyalty");
  revalidatePath("/account");
}

export async function reviewRedemptionAction(formData:FormData){
  const access=await requirePermission("crm.manage");
  const redemptionId=value(formData,"redemptionId");
  const decision=value(formData,"decision");

  if(!["approved","cancelled","used"].includes(decision)){
    throw new Error("Invalid redemption decision.");
  }

  await reviewRewardRedemption({
    redemptionId,
    decision:decision as "approved"|"cancelled"|"used",
    actorId:access.preview?null:access.user.id
  });

  revalidatePath("/admin/loyalty");
  revalidatePath("/account");
}

export async function adjustPointsAction(formData:FormData){
  const access=await requirePermission("crm.manage");
  const customerId=value(formData,"customerId");
  const points=Number(value(formData,"points"));
  const description=value(formData,"description");

  await adjustCustomerPoints({
    customerId,
    points,
    description:description||"Manual ORYX loyalty adjustment",
    actorId:access.preview?null:access.user.id
  });

  revalidatePath("/admin/loyalty");
  revalidatePath("/account");
}
