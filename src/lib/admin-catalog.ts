import { databaseConfigured, getSql } from "@/lib/db";

export type AdminCatalogService={
  id:string;
  slug:string;
  name:string;
  category:string;
  department:string;
  sellingMode:string;
  pricingMode:string;
  active:boolean;
  public:boolean;
  fields:number;
  finishings:number;
  workflowSteps:number;
  pricingRules:number;
  updatedAt:string;
};

export async function getAdminCatalogServices(limit=500):Promise<AdminCatalogService[]>{
  if(!databaseConfigured()) return [];
  try{
    const sql=getSql();
    const rows=await sql`
      select
        s.id,s.slug,s.name_ar,s.selling_mode,s.pricing_mode,s.is_active,s.is_public,s.updated_at,
        c.name_ar as category_name,
        d.name_ar as department_name,
        (select count(*)::integer from service_fields sf where sf.service_id=s.id) as field_count,
        (select count(*)::integer from service_finishings sf where sf.service_id=s.id) as finishing_count,
        (
          select count(*)::integer
          from production_workflows pw
          join workflow_steps ws on ws.workflow_id=pw.id
          where pw.service_id=s.id and pw.is_default=true and pw.is_active=true
        ) as workflow_steps,
        (select count(*)::integer from pricing_rules pr where pr.service_id=s.id and pr.is_active=true) as pricing_rules
      from services s
      join categories c on c.id=s.category_id
      join departments d on d.id=c.department_id
      order by
        case when s.is_public then 1 else 0 end,
        s.updated_at desc,
        d.sort_order,c.sort_order,s.name_ar
      limit ${limit}
    `;

    return rows.map(row=>({
      id:String(row.id),
      slug:String(row.slug),
      name:String(row.name_ar),
      category:String(row.category_name),
      department:String(row.department_name),
      sellingMode:String(row.selling_mode),
      pricingMode:String(row.pricing_mode),
      active:Boolean(row.is_active),
      public:Boolean(row.is_public),
      fields:Number(row.field_count??0),
      finishings:Number(row.finishing_count??0),
      workflowSteps:Number(row.workflow_steps??0),
      pricingRules:Number(row.pricing_rules??0),
      updatedAt:new Date(String(row.updated_at)).toISOString()
    }));
  }catch{
    return [];
  }
}
