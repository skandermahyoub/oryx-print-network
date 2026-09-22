"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

const fieldSchema=z.object({
  label:z.string().min(1).max(180),
  key:z.string().regex(/^[a-z][a-z0-9_]{1,80}$/),
  type:z.enum(["select","number","text","boolean","file","textarea","date","location","color","dimension"]),
  required:z.boolean(),
  affectsPrice:z.boolean(),
  affectsMaterial:z.boolean().default(false),
  affectsProduction:z.boolean().default(true),
  options:z.array(z.string().min(1).max(120)).max(100).default([])
});

const serviceSchema=z.object({
  categoryId:z.string().uuid(),
  name:z.string().min(3).max(180),
  slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120),
  summary:z.string().max(1000).default(""),
  sellingMode:z.enum(["buy_now","instant_quote","request_quote","consultation"]),
  pricingMode:z.enum(["fixed","per_unit","per_area","per_linear","tiered","matrix","formula","manual_quote"]),
  requiresDesignApproval:z.boolean(),
  fields:z.array(fieldSchema).min(1).max(100),
  finishingIds:z.array(z.string().uuid()).max(100).default([])
});

export type ServiceBuilderState={
  ok:boolean;
  message:string;
  slug?:string;
}|null;

export async function createServiceDraftAction(
  _previous:ServiceBuilderState,
  formData:FormData
):Promise<ServiceBuilderState>{
  const access=await requirePermission("catalog.manage");

  let rawFields:unknown=[];
  let rawFinishings:unknown=[];
  try{
    rawFields=JSON.parse(String(formData.get("fields")??"[]"));
    rawFinishings=JSON.parse(String(formData.get("finishings")??"[]"));
  }catch{
    return {ok:false,message:"تعذر قراءة حقول الخدمة."};
  }

  const parsed=serviceSchema.safeParse({
    categoryId:String(formData.get("categoryId")??""),
    name:String(formData.get("name")??"").trim(),
    slug:String(formData.get("slug")??"").trim().toLowerCase(),
    summary:String(formData.get("summary")??"").trim(),
    sellingMode:String(formData.get("sellingMode")??""),
    pricingMode:String(formData.get("pricingMode")??""),
    requiresDesignApproval:String(formData.get("requiresDesignApproval")??"")==="true",
    fields:rawFields,
    finishingIds:rawFinishings
  });

  if(!parsed.success){
    return {ok:false,message:"تحقق من اسم الخدمة والـSlug والحقول والمواصفات."};
  }

  const data=parsed.data;
  const uniqueKeys=new Set(data.fields.map(field=>field.key));
  if(uniqueKeys.size!==data.fields.length){
    return {ok:false,message:"لا يمكن تكرار مفتاح حقل المواصفات داخل الخدمة."};
  }

  const sql=getSql();
  const category=await sql`select id from categories where id=${data.categoryId} and is_active=true limit 1`;
  if(!category[0]) return {ok:false,message:"التصنيف غير متاح."};

  const fieldsJson=JSON.stringify(data.fields.map((field,index)=>({
    field_key:field.key,
    label_ar:field.label,
    field_type:field.type,
    is_required:field.required,
    affects_price:field.affectsPrice,
    affects_material:field.affectsMaterial,
    affects_production:field.affectsProduction,
    config:field.options.length?{options:field.options}:{},
    sort_order:(index+1)*10
  })));
  const finishingJson=JSON.stringify(data.finishingIds.map((id,index)=>({
    finishing_id:id,
    sort_order:(index+1)*10
  })));

  try{
    const rows=await sql`
      with new_service as (
        insert into services (
          category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,
          requires_design_approval,is_active,is_public
        ) values (
          ${data.categoryId},
          ${data.slug},
          ${data.name},
          ${data.summary||null},
          ${data.sellingMode},
          ${data.pricingMode},
          ${data.requiresDesignApproval},
          false,
          false
        )
        returning id,slug
      ),
      input_fields as (
        select *
        from jsonb_to_recordset(${fieldsJson}::jsonb)
          as x(
            field_key text,label_ar text,field_type text,is_required boolean,
            affects_price boolean,affects_material boolean,affects_production boolean,
            config jsonb,sort_order integer
          )
      ),
      inserted_fields as (
        insert into service_fields (
          service_id,field_key,label_ar,field_type,is_required,affects_price,
          affects_material,affects_production,customer_visible,staff_visible,config,sort_order
        )
        select
          new_service.id,input_fields.field_key,input_fields.label_ar,input_fields.field_type,
          input_fields.is_required,input_fields.affects_price,input_fields.affects_material,
          input_fields.affects_production,true,true,input_fields.config,input_fields.sort_order
        from new_service cross join input_fields
        returning id
      ),
      input_finishings as (
        select *
        from jsonb_to_recordset(${finishingJson}::jsonb)
          as x(finishing_id uuid,sort_order integer)
      ),
      inserted_finishings as (
        insert into service_finishings (service_id,finishing_id,sort_order)
        select new_service.id,f.id,input_finishings.sort_order
        from new_service
        join input_finishings on true
        join finishings f on f.id=input_finishings.finishing_id and f.is_active=true
        on conflict do nothing
        returning service_id
      ),
      audit as (
        insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
        select
          ${access.preview?null:access.user.id},
          'service',
          new_service.id,
          'draft_created',
          jsonb_build_object(
            'slug',new_service.slug,
            'field_count',(select count(*) from inserted_fields),
            'finishing_count',(select count(*) from inserted_finishings)
          )
        from new_service
        returning id
      )
      select id,slug from new_service
    `;

    const created=rows[0];
    if(!created) return {ok:false,message:"تعذر إنشاء الخدمة."};

    revalidatePath("/admin/catalog");
    revalidatePath("/services");
    return {ok:true,message:"تم حفظ الخدمة كمسودة تشغيلية في Neon.",slug:String(created.slug)};
  }catch(error){
    const message=error instanceof Error?error.message:"";
    if(/unique|duplicate/i.test(message)){
      return {ok:false,message:"الـSlug أو أحد مفاتيح الخدمة مستخدم مسبقًا."};
    }
    return {ok:false,message:"حدث خطأ أثناء حفظ الخدمة. لم يتم نشر أي شيء للعامة."};
  }
}


export async function setServicePublicationAction(formData:FormData){
  const access=await requirePermission("catalog.manage");
  const serviceId=String(formData.get("serviceId")??"").trim();
  const publish=String(formData.get("publish")??"")==="true";
  const sql=getSql();

  const rows=await sql`
    select
      s.id,s.slug,s.selling_mode,s.pricing_mode,s.is_public,
      (select count(*)::integer from service_fields sf where sf.service_id=s.id) as field_count,
      (select count(*)::integer from pricing_rules pr where pr.service_id=s.id and pr.is_active=true) as pricing_rules
    from services s
    where s.id=${serviceId}
    limit 1
  `;

  const service=rows[0];
  if(!service) throw new Error("الخدمة غير موجودة.");

  if(publish){
    if(Number(service.field_count??0)<1){
      throw new Error("لا يمكن نشر خدمة بلا حقول مواصفات.");
    }

    const requiresAutomaticPrice=["buy_now","instant_quote"].includes(String(service.selling_mode));
    if(requiresAutomaticPrice&&Number(service.pricing_rules??0)<1){
      throw new Error("هذه الخدمة تحتاج قاعدة تسعير معتمدة قبل النشر.");
    }
  }

  const updated=await sql`
    with changed as (
      update services
      set
        is_active=${publish},
        is_public=${publish},
        updated_at=now()
      where id=${serviceId}
      returning id,slug
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select
        ${access.preview?null:access.user.id},
        'service',
        changed.id,
        ${publish?"published":"unpublished"},
        jsonb_build_object('is_public',${Boolean(service.is_public)}),
        jsonb_build_object('is_public',${publish})
      from changed
      returning id
    )
    select id,slug from changed
  `;

  if(!updated[0]) throw new Error("تعذر تحديث حالة الخدمة.");

  revalidatePath("/admin/catalog/services");
  revalidatePath("/services");
  revalidatePath(`/services/${String(service.slug)}`);
}
