import { databaseConfigured, getSql } from "@/lib/db";

export type AdminQcDetail={
  inspection:{
    id:string;
    type:string;
    status:string;
    workOrderId:string;
    workOrderNumber:number;
    orderId:string;
    orderNumber:number;
    service:string;
    partner:string|null;
    quantity:number;
    sampleQuantity:number|null;
    acceptedQuantity:number|null;
    rejectedQuantity:number|null;
    notes:string|null;
    inspectedAt:string|null;
    createdAt:string;
  };
  checks:Array<{
    id:string;
    key:string;
    label:string;
    result:string;
    measurement:string|null;
    tolerance:string|null;
    notes:string|null;
  }>;
  proofDocuments:Array<{
    id:string;
    fileName:string;
    purpose:string|null;
    eventType:string;
    stepKey:string|null;
    createdAt:string;
  }>;
};

export async function getAdminQcDetail(inspectionId:string):Promise<AdminQcDetail|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();

  const rows=await sql`
    select
      qi.id,qi.inspection_type,qi.status,qi.sample_quantity,qi.accepted_quantity,qi.rejected_quantity,
      qi.notes,qi.inspected_at,qi.created_at,
      wo.id as work_order_id,wo.work_order_number,
      oi.quantity,
      o.id as order_id,o.order_number,
      s.name_ar as service_name,
      coalesce(p.trade_name,p.legal_name) as partner_name
    from qc_inspections qi
    join work_orders wo on wo.id=qi.work_order_id
    join order_items oi on oi.id=wo.order_item_id
    join orders o on o.id=oi.order_id
    join services s on s.id=oi.service_id
    left join partners p on p.id=wo.partner_id
    where qi.id=${inspectionId}
    limit 1
  `;
  const row=rows[0];
  if(!row) return null;

  const [checks,proofs]=await Promise.all([
    sql`
      select id,check_key,label_ar,result,measurement,tolerance,notes
      from qc_check_items
      where inspection_id=${inspectionId}
      order by id
    `,
    sql`
      select
        d.id,d.file_name,d.purpose,
        woe.event_type,woe.step_key,woe.created_at
      from work_order_events woe
      join documents d on d.id=woe.document_id
      where woe.work_order_id=${row.work_order_id}
      order by woe.created_at desc
    `
  ]);

  return {
    inspection:{
      id:String(row.id),
      type:String(row.inspection_type),
      status:String(row.status),
      workOrderId:String(row.work_order_id),
      workOrderNumber:Number(row.work_order_number),
      orderId:String(row.order_id),
      orderNumber:Number(row.order_number),
      service:String(row.service_name),
      partner:row.partner_name?String(row.partner_name):null,
      quantity:Number(row.quantity??0),
      sampleQuantity:row.sample_quantity===null?null:Number(row.sample_quantity),
      acceptedQuantity:row.accepted_quantity===null?null:Number(row.accepted_quantity),
      rejectedQuantity:row.rejected_quantity===null?null:Number(row.rejected_quantity),
      notes:row.notes?String(row.notes):null,
      inspectedAt:row.inspected_at?new Date(String(row.inspected_at)).toISOString():null,
      createdAt:new Date(String(row.created_at)).toISOString()
    },
    checks:checks.map(check=>({
      id:String(check.id),
      key:String(check.check_key),
      label:String(check.label_ar),
      result:String(check.result),
      measurement:check.measurement?String(check.measurement):null,
      tolerance:check.tolerance?String(check.tolerance):null,
      notes:check.notes?String(check.notes):null
    })),
    proofDocuments:proofs.map(doc=>({
      id:String(doc.id),
      fileName:String(doc.file_name),
      purpose:doc.purpose?String(doc.purpose):null,
      eventType:String(doc.event_type),
      stepKey:doc.step_key?String(doc.step_key):null,
      createdAt:new Date(String(doc.created_at)).toISOString()
    }))
  };
}
