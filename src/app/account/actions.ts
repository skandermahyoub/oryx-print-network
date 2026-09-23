"use server";

import { createHash } from "crypto";
import { revalidatePath } from "next/cache";
import { requireCustomerAccess } from "@/lib/auth/customer-access";
import { normalizePhone } from "@/lib/customer-identity";
import { getSql } from "@/lib/db";
import { consumePublicRateLimit } from "@/lib/public-rate-limit";
import { acceptQuoteForCustomer } from "@/lib/commercial-workflow";
import { decideDesignVersion } from "@/lib/design-workflow";
import { requestRewardRedemption } from "@/lib/loyalty-workflow";
import { markRecipientNotificationRead } from "@/lib/notifications";

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


export async function markCustomerNotificationReadAction(formData:FormData){
  const access=await requireCustomerAccess();
  const notificationId=String(formData.get("notificationId")??"").trim();
  if(!notificationId) throw new Error("Notification id is required.");

  await markRecipientNotificationRead({
    notificationId,
    recipientType:"customer",
    recipientId:access.customerId
  });

  revalidatePath("/account");
}


export async function claimExistingOrderAction(formData:FormData){
  const access=await requireCustomerAccess();
  const orderNumber=Number(String(formData.get("orderNumber")??"").trim());
  const phone=normalizePhone(String(formData.get("phone")??""));
  if(!Number.isInteger(orderNumber)||orderNumber<=0||phone.length<5){
    throw new Error("أدخل رقم الطلب ورقم التواصل المسجل.");
  }

  const keyHash=createHash("sha256").update(`account:${access.appUserId}`).digest("hex");
  const rate=await consumePublicRateLimit({
    endpoint:"account:claim-order",
    keyHash,
    limit:8,
    windowSeconds:900
  });
  if(!rate.allowed){
    throw new Error("محاولات كثيرة. حاول لاحقًا.");
  }

  const sql=getSql();
  const rows=await sql`
    with target as (
      select
        o.id,
        o.order_number,
        o.customer_id as old_customer_id
      from orders o
      join customers c on c.id=o.customer_id
      where o.order_number=${orderNumber}
        and regexp_replace(coalesce(c.phone,''),'[^0-9]','','g') like '%'||${phone}
        and o.customer_id<>${access.customerId}
        and not exists(
          select 1
          from app_users claimed
          where claimed.customer_id=o.customer_id
            and claimed.user_type='customer'
            and claimed.status='active'
        )
      limit 1
      for update of o
    ),
    moved_order as (
      update orders o
      set customer_id=${access.customerId},updated_at=now()
      from target
      where o.id=target.id
      returning o.id,o.order_number,target.old_customer_id
    ),
    moved_quotes as (
      update quotes q
      set customer_id=${access.customerId},updated_at=now()
      from moved_order
      where q.source_order_id=moved_order.id
      returning q.id
    ),
    moved_invoices as (
      update invoices i
      set customer_id=${access.customerId}
      from moved_order
      where i.order_id=moved_order.id
      returning i.id
    ),
    moved_payments as (
      update payments p
      set customer_id=${access.customerId}
      from moved_invoices mi
      where p.invoice_id=mi.id
      returning p.id
    ),
    moved_notifications as (
      update notifications n
      set recipient_id=${access.customerId}
      from moved_order
      where n.recipient_type='customer'
        and n.related_type='order'
        and n.related_id=moved_order.id
        and n.recipient_id=moved_order.old_customer_id
      returning n.id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select
        ${access.appUserId},
        'order',
        moved_order.id,
        'claimed_by_customer_account',
        jsonb_build_object('customer_id',moved_order.old_customer_id),
        jsonb_build_object('customer_id',${access.customerId},'order_number',moved_order.order_number)
      from moved_order
      returning id
    )
    select id,order_number from moved_order
  `;

  if(!rows[0]){
    const already=await sql`
      select exists(
        select 1 from orders
        where order_number=${orderNumber}
          and customer_id=${access.customerId}
      ) as already_claimed
    `;
    if(Boolean(already[0]?.already_claimed)){
      revalidatePath("/account");
      return;
    }
    throw new Error("لم نتمكن من ربط الطلب. تحقق من الرقم والهاتف أو أن الطلب مرتبط بحساب آخر.");
  }

  revalidatePath("/account");
}
