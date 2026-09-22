import { databaseConfigured, getSql } from "@/lib/db";

export type AdminServiceDetail={
  service:{
    id:string;
    slug:string;
    name:string;
    summary:string|null;
    department:string;
    category:string;
    sellingMode:string;
    pricingMode:string;
    designApproval:boolean;
    active:boolean;
    public:boolean;
    updatedAt:string;
  };
  fields:Array<{
    id:string;
    key:string;
    label:string;
    type:string;
    required:boolean;
    affectsPrice:boolean;
    affectsMaterial:boolean;
    affectsProduction:boolean;
    config:Record<string,unknown>;
    sortOrder:number;
  }>;
  finishings:Array<{id:string;name:string;key:string}>;
  workflows:Array<{
    id:string;
    name:string;
    version:number;
    isDefault:boolean;
    active:boolean;
    usedByWorkOrders:number;
    steps:Array<{
      id:string;
      key:string;
      name:string;
      sortOrder:number;
      requiresQc:boolean;
      requiresPhoto:boolean;
      estimatedMinutes:number|null;
    }>;
  }>;
  preflight:Array<{key:string;label:string;type:string;beforeQuote:boolean;beforeProduction:boolean}>;
  pricingRules:Array<{id:string;name:string;type:string;priority:number;active:boolean}>;
  partnerCount:number;
};

export async function getAdminServiceDetail(serviceId:string):Promise<AdminServiceDetail|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();

  const serviceRows=await sql`
    select
      s.id,s.slug,s.name_ar,s.short_description_ar,s.selling_mode,s.pricing_mode,
      s.requires_design_approval,s.is_active,s.is_public,s.updated_at,
      c.name_ar as category_name,
      d.name_ar as department_name
    from services s
    join categories c on c.id=s.category_id
    join departments d on d.id=c.department_id
    where s.id=${serviceId}
    limit 1
  `;
  const s=serviceRows[0];
  if(!s) return null;

  const [fields,finishings,workflowRows,steps,preflight,pricingRules,partnerCountRows]=await Promise.all([
    sql`
      select id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order
      from service_fields
      where service_id=${serviceId}
      order by sort_order,field_key
    `,
    sql`
      select f.id,f.key,f.name_ar
      from service_finishings sf
      join finishings f on f.id=sf.finishing_id
      where sf.service_id=${serviceId}
      order by sf.sort_order,f.name_ar
    `,
    sql`
      select
        pw.id,pw.name_ar,pw.version,pw.is_default,pw.is_active,
        (select count(*)::integer from work_orders wo where wo.workflow_id=pw.id) as used_by_work_orders
      from production_workflows pw
      where pw.service_id=${serviceId}
      order by pw.version desc
    `,
    sql`
      select ws.id,ws.workflow_id,ws.step_key,ws.name_ar,ws.sort_order,ws.requires_qc,ws.requires_photo,ws.estimated_minutes
      from workflow_steps ws
      join production_workflows pw on pw.id=ws.workflow_id
      where pw.service_id=${serviceId}
      order by pw.version desc,ws.sort_order
    `,
    sql`
      select requirement_key,label_ar,requirement_type,required_before_quote,required_before_production
      from service_preflight_requirements
      where service_id=${serviceId}
      order by sort_order,label_ar
    `,
    sql`
      select id,name,rule_type,priority,is_active
      from pricing_rules
      where service_id=${serviceId}
      order by priority,created_at
    `,
    sql`
      select count(distinct partner_id)::integer as count
      from partner_capabilities
      where service_id=${serviceId} and is_active=true
    `
  ]);

  const stepsByWorkflow=new Map<string,AdminServiceDetail["workflows"][number]["steps"]>();
  for(const row of steps){
    const workflowId=String(row.workflow_id);
    const list=stepsByWorkflow.get(workflowId)??[];
    list.push({
      id:String(row.id),
      key:String(row.step_key),
      name:String(row.name_ar),
      sortOrder:Number(row.sort_order),
      requiresQc:Boolean(row.requires_qc),
      requiresPhoto:Boolean(row.requires_photo),
      estimatedMinutes:row.estimated_minutes===null?null:Number(row.estimated_minutes)
    });
    stepsByWorkflow.set(workflowId,list);
  }

  return {
    service:{
      id:String(s.id),
      slug:String(s.slug),
      name:String(s.name_ar),
      summary:s.short_description_ar?String(s.short_description_ar):null,
      department:String(s.department_name),
      category:String(s.category_name),
      sellingMode:String(s.selling_mode),
      pricingMode:String(s.pricing_mode),
      designApproval:Boolean(s.requires_design_approval),
      active:Boolean(s.is_active),
      public:Boolean(s.is_public),
      updatedAt:new Date(String(s.updated_at)).toISOString()
    },
    fields:fields.map(row=>({
      id:String(row.id),
      key:String(row.field_key),
      label:String(row.label_ar),
      type:String(row.field_type),
      required:Boolean(row.is_required),
      affectsPrice:Boolean(row.affects_price),
      affectsMaterial:Boolean(row.affects_material),
      affectsProduction:Boolean(row.affects_production),
      config:row.config&&typeof row.config==="object"&&!Array.isArray(row.config)?row.config as Record<string,unknown>:{},
      sortOrder:Number(row.sort_order)
    })),
    finishings:finishings.map(row=>({id:String(row.id),name:String(row.name_ar),key:String(row.key)})),
    workflows:workflowRows.map(row=>({
      id:String(row.id),
      name:String(row.name_ar),
      version:Number(row.version),
      isDefault:Boolean(row.is_default),
      active:Boolean(row.is_active),
      usedByWorkOrders:Number(row.used_by_work_orders??0),
      steps:stepsByWorkflow.get(String(row.id))??[]
    })),
    preflight:preflight.map(row=>({
      key:String(row.requirement_key),
      label:String(row.label_ar),
      type:String(row.requirement_type),
      beforeQuote:Boolean(row.required_before_quote),
      beforeProduction:Boolean(row.required_before_production)
    })),
    pricingRules:pricingRules.map(row=>({
      id:String(row.id),
      name:String(row.name),
      type:String(row.rule_type),
      priority:Number(row.priority),
      active:Boolean(row.is_active)
    })),
    partnerCount:Number(partnerCountRows[0]?.count??0)
  };
}
