import { authConfigured } from "@/lib/auth/server";
import { databaseConfigured, getSql } from "@/lib/db";
import { storageConfigured } from "@/lib/storage";

export type ReadinessCheck={
  key:string;
  label:string;
  status:"pass"|"warning"|"block";
  detail:string;
};

export type ReleaseReadiness={
  checks:ReadinessCheck[];
  blockers:number;
  warnings:number;
  passed:number;
};

export async function getReleaseReadiness():Promise<ReleaseReadiness>{
  const checks:ReadinessCheck[]=[];

  checks.push({
    key:"database",
    label:"Neon Database",
    status:databaseConfigured()?"pass":"block",
    detail:databaseConfigured()?"DATABASE_URL configured":"DATABASE_URL missing"
  });
  checks.push({
    key:"auth",
    label:"Neon Auth",
    status:authConfigured?"pass":"block",
    detail:authConfigured?"Auth runtime configured":"Neon Auth runtime secrets missing"
  });
  checks.push({
    key:"storage",
    label:"Object Storage",
    status:storageConfigured()?"pass":"warning",
    detail:storageConfigured()?"S3-compatible storage configured":"Storage secrets will be required before design proof uploads"
  });

  if(databaseConfigured()){
    try{
      const sql=getSql();
      const rows=await sql`
        select
          to_regclass('public.api_rate_limits') is not null as rate_limit_table,
          to_regclass('public.storage_upload_sessions') is not null as upload_sessions,
          to_regclass('public.production_assignments') is not null as production_assignments,
          to_regclass('public.delivery_events') is not null as delivery_events,
          to_regclass('public.loyalty_accounts') is not null as loyalty_accounts,
          to_regclass('public.goods_receipts') is not null as goods_receipts,
          to_regclass('public.qc_check_items') is not null as qc_check_items,
          to_regclass('public.invoices') is not null as invoices,
          to_regclass('public.payments') is not null as payments,
          (select count(*)::integer from services where is_active=true and is_public=true) as public_services,
          (select count(*)::integer from pricing_rules where is_active=true) as pricing_rules,
          (select count(*)::integer from production_workflows where is_active=true and is_default=true) as workflows,
          (select count(*)::integer from roles) as roles,
          (select count(*)::integer from permissions) as permissions,
          (select count(*)::integer from warehouses where is_active=true) as warehouses,
          (select count(*)::integer from finishings where is_active=true) as finishings
      `;
      const r=rows[0];

      checks.push({
        key:"public-api-security",
        label:"Public API abuse protection",
        status:Boolean(r?.rate_limit_table)?"pass":"block",
        detail:Boolean(r?.rate_limit_table)?"Rate-limit table installed":"Migration 0025 must be applied"
      });
      checks.push({
        key:"storage-sessions",
        label:"Upload verification",
        status:Boolean(r?.upload_sessions)?"pass":"block",
        detail:Boolean(r?.upload_sessions)?"Verified upload sessions available":"Document storage migration missing"
      });
      checks.push({
        key:"production-assignment",
        label:"Production assignment ledger",
        status:Boolean(r?.production_assignments)?"pass":"block",
        detail:Boolean(r?.production_assignments)?"Production assignments available":"Sourcing migration missing"
      });
      checks.push({
        key:"delivery-audit",
        label:"Delivery audit trail",
        status:Boolean(r?.delivery_events)?"pass":"block",
        detail:Boolean(r?.delivery_events)?"Delivery events available":"Delivery migration missing"
      });
      checks.push({
        key:"procurement",
        label:"Procurement lifecycle",
        status:Boolean(r?.goods_receipts)?"pass":"block",
        detail:Boolean(r?.goods_receipts)?"Purchase requests, POs and goods receipts available":"Procurement schema missing"
      });
      checks.push({
        key:"qc-checklists",
        label:"QC checklist enforcement",
        status:Boolean(r?.qc_check_items)?"pass":"block",
        detail:Boolean(r?.qc_check_items)?"QC checklist records available":"QC checklist schema missing"
      });
      checks.push({
        key:"finance-core",
        label:"Finance integrity",
        status:Boolean(r?.invoices)&&Boolean(r?.payments)?"pass":"block",
        detail:Boolean(r?.invoices)&&Boolean(r?.payments)?"Invoices and payments available":"Finance tables missing"
      });
      checks.push({
        key:"catalog",
        label:"Public service catalog",
        status:Number(r?.public_services??0)>=300?"pass":"warning",
        detail:`${Number(r?.public_services??0)} public services`
      });
      checks.push({
        key:"pricing",
        label:"Pricing coverage",
        status:Number(r?.pricing_rules??0)>0?"pass":"warning",
        detail:`${Number(r?.pricing_rules??0)} active pricing rules; manual quote remains valid for uncovered services`
      });
      checks.push({
        key:"workflows",
        label:"Production workflows",
        status:Number(r?.workflows??0)>0?"pass":"warning",
        detail:`${Number(r?.workflows??0)} default active workflows`
      });
      checks.push({
        key:"rbac",
        label:"RBAC",
        status:Number(r?.roles??0)>=15&&Number(r?.permissions??0)>=20?"pass":"block",
        detail:`${Number(r?.roles??0)} roles · ${Number(r?.permissions??0)} permissions`
      });
      checks.push({
        key:"warehouse",
        label:"Inventory warehouse",
        status:Number(r?.warehouses??0)>0?"pass":"warning",
        detail:Number(r?.warehouses??0)>0?`${Number(r?.warehouses??0)} active warehouses`:"Create an active warehouse before stock receipts"
      });
      checks.push({
        key:"finishings",
        label:"Finishing library",
        status:Number(r?.finishings??0)>=20?"pass":"warning",
        detail:`${Number(r?.finishings??0)} active finishings`
      });
    }catch(error){
      checks.push({
        key:"db-readiness-query",
        label:"Database readiness query",
        status:"block",
        detail:error instanceof Error?error.message:"Database readiness query failed"
      });
    }
  }

  const blockers=checks.filter(item=>item.status==="block").length;
  const warnings=checks.filter(item=>item.status==="warning").length;
  const passed=checks.filter(item=>item.status==="pass").length;

  return {checks,blockers,warnings,passed};
}
