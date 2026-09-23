"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

function value(formData:FormData,key:string){return String(formData.get(key)??"").trim();}
function refresh(id:string){revalidatePath(`/admin/campaigns/${id}`);revalidatePath("/admin/campaigns");revalidatePath("/admin");}

export async function updateCampaignStatusAction(formData:FormData){
  await requirePermission("campaigns.manage");
  const campaignId=value(formData,"campaignId");
  const status=value(formData,"status");
  if(!["draft","planned","active","paused","completed","cancelled"].includes(status)) throw new Error("Invalid campaign status.");
  const sql=getSql();
  const rows=await sql`update sales_campaigns set status=${status},updated_at=now() where id=${campaignId} returning id`;
  if(!rows[0]) throw new Error("Campaign not found.");
  refresh(campaignId);
}

export async function addCampaignTargetAction(formData:FormData){
  await requirePermission("campaigns.manage");
  const campaignId=value(formData,"campaignId");
  const company=value(formData,"company");
  const contact=value(formData,"contact");
  const score=Number(value(formData,"score")||"0");
  if(!company&&!contact) throw new Error("Target needs a company or contact.");
  if(!Number.isFinite(score)||score<0||score>100) throw new Error("Score must be between 0 and 100.");
  const sql=getSql();
  const rows=await sql`
    insert into campaign_targets (
      campaign_id,company_name,contact_name,phone,email,city,source,status,score,next_action_at,notes
    )
    select id,${company||null},${contact||null},${value(formData,"phone")||null},${value(formData,"email")||null},
      ${value(formData,"city")||null},'manual','new',${score},${value(formData,"nextActionAt")||null},${value(formData,"notes")||null}
    from sales_campaigns where id=${campaignId}
    returning id
  `;
  if(!rows[0]) throw new Error("Campaign not found.");
  refresh(campaignId);
}

export async function updateCampaignTargetAction(formData:FormData){
  const access=await requirePermission("campaigns.manage");
  const campaignId=value(formData,"campaignId");
  const targetId=value(formData,"targetId");
  const status=value(formData,"status");
  const nextActionAt=value(formData,"nextActionAt");
  const allowed=["new","researched","contacted","interested","meeting","quoted","won","lost","do_not_contact"];
  if(!allowed.includes(status)) throw new Error("Invalid target status.");
  const sql=getSql();
  const rows=await sql`
    with updated as (
      update campaign_targets
      set status=${status},next_action_at=${nextActionAt||null},updated_at=now()
      where id=${targetId} and campaign_id=${campaignId}
      returning id
    ),
    touchpoint as (
      insert into campaign_touchpoints (campaign_target_id,channel,direction,outcome,performed_by)
      select updated.id,'crm','outbound',${status},${access.preview?null:access.user.id}
      from updated
      returning id
    )
    select id from updated
  `;
  if(!rows[0]) throw new Error("Target not found.");
  refresh(campaignId);
}

export async function addCampaignOfferAction(formData:FormData){
  await requirePermission("campaigns.manage");
  const campaignId=value(formData,"campaignId");
  const name=value(formData,"name");
  const discountType=value(formData,"discountType")||"none";
  const discountRaw=value(formData,"discountValue");
  const discountValue=discountRaw?Number(discountRaw):null;
  if(name.length<2||!["none","fixed","percent","custom"].includes(discountType)) throw new Error("Offer data is invalid.");
  const sql=getSql();
  const rows=await sql`
    insert into campaign_offers (
      campaign_id,name_ar,headline_ar,description_ar,discount_type,discount_value,valid_until,is_active
    )
    select id,${name},${value(formData,"headline")||null},${value(formData,"description")||null},
      ${discountType},${discountValue},${value(formData,"validUntil")||null},true
    from sales_campaigns where id=${campaignId}
    returning id
  `;
  if(!rows[0]) throw new Error("Campaign not found.");
  refresh(campaignId);
}
