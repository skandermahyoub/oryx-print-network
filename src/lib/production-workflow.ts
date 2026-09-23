import { getSql } from "@/lib/db";

export async function startPartnerProduction(input:{
  partnerJobId:string;
  partnerId:string;
  actorId?:string|null;
}){
  const sql=getSql();

  const rows=await sql`
    with target as (
      select
        pj.id as partner_job_id,
        pj.work_order_id,
        pj.status as partner_job_status,
        wo.order_item_id,
        wo.status as work_order_status,
        wo.workflow_id,
        oi.order_id
      from partner_jobs pj
      join work_orders wo on wo.id=pj.work_order_id
      join order_items oi on oi.id=wo.order_item_id
      where pj.id=${input.partnerJobId}
        and pj.partner_id=${input.partnerId}
        and pj.status in ('accepted','rework')
      limit 1
    ),
    first_step as (
      select ws.step_key
      from target
      join workflow_steps ws on ws.workflow_id=target.workflow_id
      order by ws.sort_order
      limit 1
    ),
    updated_work as (
      update work_orders wo
      set
        status='in_progress',
        started_at=coalesce(wo.started_at,now()),
        current_step_key=coalesce(wo.current_step_key,(select step_key from first_step))
      from target
      where wo.id=target.work_order_id
      returning wo.id,wo.order_item_id,wo.current_step_key
    ),
    updated_partner_job as (
      update partner_jobs pj
      set status='in_progress'
      from target
      where pj.id=target.partner_job_id
      returning pj.id
    ),
    updated_assignment as (
      update production_assignments pa
      set status='in_production'
      from target
      where pa.work_order_id=target.work_order_id
        and pa.partner_id=${input.partnerId}
        and pa.status in ('assigned','accepted')
      returning pa.id
    ),
    work_event as (
      insert into work_order_events (work_order_id,event_type,step_key,notes)
      select updated_work.id,'production_started',updated_work.current_step_key,'Started by production partner'
      from updated_work
      returning id
    ),
    old_order as (
      select o.id,o.status
      from orders o
      join target on target.order_id=o.id
    ),
    updated_order as (
      update orders o
      set status='in_production',updated_at=now()
      from old_order
      where o.id=old_order.id
        and o.status='approved_for_production'
      returning o.id
    ),
    order_event as (
      insert into order_status_events (order_id,from_status,to_status,actor_id,reason)
      select old_order.id,old_order.status,'in_production',${input.actorId??null},'Production partner started work'
      from old_order
      join updated_order on updated_order.id=old_order.id
      returning id
    )
    select updated_work.id,updated_work.current_step_key
    from updated_work
  `;

  const row=rows[0];
  if(!row) throw new Error("This production job cannot be started.");

  return {workOrderId:String(row.id),currentStep:row.current_step_key?String(row.current_step_key):null};
}

export async function completeCurrentProductionStep(input:{
  partnerJobId:string;
  partnerId:string;
  actorId?:string|null;
  goodQuantity?:number|null;
  wasteQuantity?:number|null;
  notes?:string|null;
  proofDocumentId?:string|null;
}){
  const sql=getSql();

  const targetRows=await sql`
    select
      pj.id as partner_job_id,
      pj.work_order_id,
      pj.status as partner_job_status,
      wo.workflow_id,
      wo.current_step_key,
      wo.order_item_id,
      oi.order_id,
      coalesce(ws.requires_photo,false) as requires_photo
    from partner_jobs pj
    join work_orders wo on wo.id=pj.work_order_id
    join order_items oi on oi.id=wo.order_item_id
    left join workflow_steps ws on ws.workflow_id=wo.workflow_id and ws.step_key=wo.current_step_key
    where pj.id=${input.partnerJobId}
      and pj.partner_id=${input.partnerId}
      and pj.status='in_progress'
      and wo.status='in_progress'
    limit 1
  `;

  const target=targetRows[0];
  if(!target) throw new Error("Production job is not active.");

  const currentKey=target.current_step_key?String(target.current_step_key):null;
  if(!currentKey) throw new Error("The work order has no active workflow step.");

  if(Boolean(target.requires_photo)&&!input.proofDocumentId){
    throw new Error("This production step requires a proof document.");
  }

  if(input.proofDocumentId){
    const proof=await sql`
      select id
      from documents
      where id=${input.proofDocumentId}
        and owner_type='work_order'
        and owner_id=${target.work_order_id}
        and purpose='production_proof'
        and bucket_name='customer-documents'
      limit 1
    `;
    if(!proof[0]) throw new Error("Production proof is invalid for this work order.");
  }

  const nextRows=await sql`
    with current_step as (
      select sort_order
      from workflow_steps
      where workflow_id=${target.workflow_id}
        and step_key=${currentKey}
      limit 1
    )
    select step_key,name_ar
    from workflow_steps
    where workflow_id=${target.workflow_id}
      and sort_order>(select sort_order from current_step)
    order by sort_order
    limit 1
  `;

  const next=nextRows[0];
  const good=Number.isFinite(input.goodQuantity??NaN)?input.goodQuantity:null;
  const waste=Number.isFinite(input.wasteQuantity??NaN)?input.wasteQuantity:null;

  if(next){
    const rows=await sql`
      with event as (
        insert into work_order_events (
          work_order_id,event_type,step_key,quantity_good,quantity_waste,notes,document_id
        ) values (
          ${target.work_order_id},'step_completed',${currentKey},
          ${good},${waste},${input.notes??null},${input.proofDocumentId??null}
        )
        returning id
      ),
      updated as (
        update work_orders
        set current_step_key=${String(next.step_key)}
        where id=${target.work_order_id}
          and current_step_key=${currentKey}
        returning id,current_step_key
      )
      select id,current_step_key from updated
    `;

    if(!rows[0]) throw new Error("Work order changed concurrently.");
    return {workOrderId:String(rows[0].id),completed:false,nextStep:String(rows[0].current_step_key)};
  }

  const rows=await sql`
    with event as (
      insert into work_order_events (
        work_order_id,event_type,step_key,quantity_good,quantity_waste,notes,document_id
      ) values (
        ${target.work_order_id},'step_completed',${currentKey},
        ${good},${waste},${input.notes??null},${input.proofDocumentId??null}
      )
      returning id
    ),
    updated_work as (
      update work_orders
      set status='awaiting_qc',current_step_key=null
      where id=${target.work_order_id}
        and current_step_key=${currentKey}
      returning id
    ),
    updated_partner as (
      update partner_jobs
      set status='produced',delivered_at=now()
      where id=${target.partner_job_id}
      returning id
    ),
    inspection as (
      insert into qc_inspections (work_order_id,inspection_type,status)
      select ${target.work_order_id},'final','pending'
      where not exists(
        select 1 from qc_inspections
        where work_order_id=${target.work_order_id}
          and status='pending'
      )
      returning id
    ),
    old_order as (
      select id,status
      from orders
      where id=${target.order_id}
    ),
    order_ready_for_qc as (
      select not exists(
        select 1
        from work_orders wo
        join order_items oi on oi.id=wo.order_item_id
        where oi.order_id=${target.order_id}
          and wo.status not in ('awaiting_qc','completed','cancelled')
      ) as ready
    ),
    updated_order as (
      update orders o
      set status='quality_control',updated_at=now()
      from old_order,order_ready_for_qc
      where o.id=old_order.id
        and old_order.status='in_production'
        and order_ready_for_qc.ready=true
      returning o.id
    ),
    order_event as (
      insert into order_status_events (order_id,from_status,to_status,actor_id,reason)
      select old_order.id,old_order.status,'quality_control',${input.actorId??null},'Production completed and sent to QC'
      from old_order
      join updated_order on updated_order.id=old_order.id
      returning id
    )
    select id from updated_work
  `;

  if(!rows[0]) throw new Error("Work order changed concurrently.");
  return {workOrderId:String(rows[0].id),completed:true,nextStep:null};
}

export async function reviewQualityInspection(input:{
  inspectionId:string;
  decision:"passed"|"failed"|"conditional";
  actorId?:string|null;
  acceptedQuantity?:number|null;
  rejectedQuantity?:number|null;
  notes?:string|null;
}){
  const sql=getSql();

  const targetRows=await sql`
    select
      qi.id,qi.work_order_id,qi.status,
      wo.order_item_id,wo.partner_id,wo.promised_at,
      oi.order_id,oi.quantity
    from qc_inspections qi
    join work_orders wo on wo.id=qi.work_order_id
    join order_items oi on oi.id=wo.order_item_id
    where qi.id=${input.inspectionId}
      and qi.status='pending'
    limit 1
  `;

  const target=targetRows[0];
  if(!target) throw new Error("QC inspection is no longer pending.");

  const accepted=input.acceptedQuantity??(input.decision==="passed"?Number(target.quantity):null);
  const rejected=input.rejectedQuantity??(input.decision==="failed"?Number(target.quantity):0);

  if(input.decision==="failed"){
    const rows=await sql`
      with inspected as (
        update qc_inspections
        set
          status='failed',
          inspected_by=${input.actorId??null},
          accepted_quantity=${accepted},
          rejected_quantity=${rejected},
          notes=${input.notes??null},
          inspected_at=now()
        where id=${input.inspectionId}
        returning id,work_order_id
      ),
      rework as (
        insert into rework_orders (
          source_work_order_id,reason,responsibility,status,quantity,currency,approved_by
        )
        select
          inspected.work_order_id,
          coalesce(${input.notes??null},'Failed final quality inspection'),
          case when ${target.partner_id} is null then 'oryx' else 'partner' end,
          'approved',
          coalesce(${rejected},${Number(target.quantity)}),
          'YER',
          ${input.actorId??null}
        from inspected
        returning id
      ),
      first_step as (
        select ws.step_key
        from work_orders wo
        join workflow_steps ws on ws.workflow_id=wo.workflow_id
        where wo.id=${target.work_order_id}
        order by ws.sort_order
        limit 1
      ),
      updated_work as (
        update work_orders
        set status='in_progress',current_step_key=(select step_key from first_step),completed_at=null
        where id=${target.work_order_id}
        returning id
      ),
      updated_partner as (
        update partner_jobs
        set status='rework',delivered_at=null
        where work_order_id=${target.work_order_id}
          and partner_id=${target.partner_id}
        returning id
      ),
      old_order as (
        select id,status from orders where id=${target.order_id}
      ),
      updated_order as (
        update orders o
        set status='in_production',updated_at=now()
        from old_order
        where o.id=old_order.id and old_order.status='quality_control'
        returning o.id
      ),
      order_event as (
        insert into order_status_events (order_id,from_status,to_status,actor_id,reason)
        select old_order.id,old_order.status,'in_production',${input.actorId??null},'QC failed; rework required'
        from old_order join updated_order on updated_order.id=old_order.id
        returning id
      )
      select id from inspected
    `;

    if(!rows[0]) throw new Error("QC failure could not be recorded.");
    return {inspectionId:input.inspectionId,status:"failed" as const};
  }

  const rows=await sql`
    with inspected as (
      update qc_inspections
      set
        status=${input.decision},
        inspected_by=${input.actorId??null},
        accepted_quantity=${accepted},
        rejected_quantity=${rejected},
        notes=${input.notes??null},
        inspected_at=now()
      where id=${input.inspectionId}
      returning id,work_order_id
    ),
    updated_work as (
      update work_orders
      set status='completed',completed_at=now()
      from inspected
      where work_orders.id=inspected.work_order_id
      returning work_orders.id
    ),
    updated_partner as (
      update partner_jobs
      set status='completed',delivered_at=coalesce(delivered_at,now())
      from inspected
      where partner_jobs.work_order_id=inspected.work_order_id
      returning partner_jobs.id
    ),
    updated_assignment as (
      update production_assignments
      set status='completed',completed_at=now()
      from inspected
      where production_assignments.work_order_id=inspected.work_order_id
        and production_assignments.status in ('accepted','in_production')
      returning production_assignments.id
    ),
    prior_actual_cost as (
      select coalesce(sum(total_cost),0)::numeric(14,2) as total
      from job_cost_lines
      where work_order_id=${target.work_order_id}
        and is_estimate=false
    ),
    partner_actual_cost as (
      update job_cost_lines jcl
      set
        unit_cost=coalesce(pj.quoted_cost,jcl.unit_cost),
        total_cost=round(coalesce(pj.quoted_cost,jcl.total_cost)::numeric,2),
        is_estimate=false
      from updated_assignment ua
      join partner_jobs pj
        on pj.work_order_id=${target.work_order_id}
       and pj.partner_id=${target.partner_id}
      where jcl.source_type='production_assignment'
        and jcl.source_id=ua.id
        and jcl.is_estimate=true
      returning jcl.total_cost
    ),
    work_cost as (
      update work_orders
      set cost_actual=
        (select total from prior_actual_cost)+
        coalesce((select sum(total_cost) from partner_actual_cost),0)
      where id=${target.work_order_id}
      returning id,cost_actual
    ),
    performance as (
      insert into partner_performance_events (
        partner_id,service_id,work_order_id,event_type,score,on_time,rework,complaint,notes
      )
      select
        wo.partner_id,
        oi.service_id,
        wo.id,
        'qc_passed',
        case when ${input.decision}='passed' then 100 else 85 end,
        case when wo.promised_at is null then null else now()<=wo.promised_at end,
        false,
        false,
        ${input.notes??null}
      from work_orders wo
      join order_items oi on oi.id=wo.order_item_id
      where wo.id=${target.work_order_id}
        and wo.partner_id is not null
      returning id
    ),
    order_complete as (
      select not exists(
        select 1
        from work_orders wo
        join order_items oi on oi.id=wo.order_item_id
        where oi.order_id=${target.order_id}
          and wo.status not in ('completed','cancelled')
      ) as ready
    ),
    old_order as (
      select id,status from orders where id=${target.order_id}
    ),
    updated_order as (
      update orders o
      set status='ready',updated_at=now()
      from old_order,order_complete
      where o.id=old_order.id
        and old_order.status='quality_control'
        and order_complete.ready=true
      returning o.id
    ),
    order_event as (
      insert into order_status_events (order_id,from_status,to_status,actor_id,reason)
      select old_order.id,old_order.status,'ready',${input.actorId??null},'All production items passed QC'
      from old_order join updated_order on updated_order.id=old_order.id
      returning id
    )
    select id from inspected
  `;

  if(!rows[0]) throw new Error("QC decision could not be recorded.");
  return {inspectionId:input.inspectionId,status:input.decision};
}
