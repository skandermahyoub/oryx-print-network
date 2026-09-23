"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function createExpenseAction(formData:FormData){
  const access=await requirePermission("finance.manage");
  const category=value(formData,"category");
  const vendor=value(formData,"vendor");
  const amount=Number(value(formData,"amount"));
  const date=value(formData,"date");
  const notes=value(formData,"notes");

  if(category.length<2||!Number.isFinite(amount)||amount<=0){
    throw new Error("Expense data is invalid.");
  }

  const sql=getSql();
  const rows=await sql`
    with created as (
      insert into expenses (category,vendor_name,amount,currency,expense_date,notes)
      values (
        ${category},${vendor||null},${amount},'YER',
        coalesce(${date||null}::date,current_date),${notes||null}
      )
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'expense',
        created.id,
        'created',
        jsonb_build_object('category',${category},'amount',${amount},'currency','YER')
      from created
      returning id
    )
    select id from created
  `;

  if(!rows[0]) throw new Error("Expense could not be recorded.");
  revalidatePath("/admin/finance");
  revalidatePath("/admin");
}

export async function createPartnerSettlementAction(formData:FormData){
  const access=await requirePermission("finance.manage");
  const partnerId=value(formData,"partnerId");
  const periodStart=value(formData,"periodStart");
  const periodEnd=value(formData,"periodEnd");
  const amount=Number(value(formData,"amount"));

  if(!partnerId||!periodStart||!periodEnd||periodStart>periodEnd||!Number.isFinite(amount)||amount<=0){
    throw new Error("Settlement data is invalid.");
  }

  const sql=getSql();
  const overlap=await sql`
    select exists(
      select 1
      from partner_settlements
      where partner_id=${partnerId}
        and status in ('pending','paid')
        and period_start is not null
        and period_end is not null
        and daterange(period_start,period_end,'[]') && daterange(${periodStart}::date,${periodEnd}::date,'[]')
    ) as exists
  `;
  if(Boolean(overlap[0]?.exists)){
    throw new Error("This partner already has a settlement covering part of that period.");
  }

  const rows=await sql`
    with created as (
      insert into partner_settlements (
        partner_id,period_start,period_end,amount,currency,status,reference
      )
      select
        p.id,${periodStart}::date,${periodEnd}::date,${amount},'YER','pending',${value(formData,"reference")||null}
      from partners p
      where p.id=${partnerId} and p.status='active'
      returning id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'partner_settlement',
        created.id,
        'created',
        jsonb_build_object('partner_id',${partnerId},'amount',${amount},'period_start',${periodStart},'period_end',${periodEnd})
      from created
      returning id
    )
    select id from created
  `;

  if(!rows[0]) throw new Error("Active partner not found.");
  revalidatePath("/admin/finance");
  revalidatePath("/partner-portal");
}

export async function markSettlementPaidAction(formData:FormData){
  const access=await requirePermission("finance.manage");
  const settlementId=value(formData,"settlementId");
  const reference=value(formData,"reference");
  const sql=getSql();

  const rows=await sql`
    with updated as (
      update partner_settlements
      set status='paid',paid_at=now(),reference=coalesce(nullif(${reference},''),reference)
      where id=${settlementId}
        and status='pending'
      returning id,partner_id,amount,currency
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'partner_settlement',
        updated.id,
        'paid',
        jsonb_build_object('partner_id',updated.partner_id,'amount',updated.amount,'currency',updated.currency,'reference',${reference||null})
      from updated
      returning id
    )
    select id from updated
  `;

  if(!rows[0]) throw new Error("Settlement is no longer pending.");
  revalidatePath("/admin/finance");
  revalidatePath("/partner-portal");
}
