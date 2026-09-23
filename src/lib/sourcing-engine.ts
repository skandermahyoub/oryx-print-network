import { getSql } from "@/lib/db";
import { getRankedPartnersForService } from "@/lib/partner-routing-service";

export async function createSourcingRequestForOrderItem(input:{
  orderItemId:string;
  actorId?:string|null;
  requiredBy?:Date|null;
  urgent?:boolean;
}){
  const sql=getSql();
  const rows=await sql`
    select
      oi.id,
      oi.quantity,
      s.slug as service_slug,
      o.status as order_status,
      c.city as customer_city
    from order_items oi
    join orders o on o.id=oi.order_id
    join services s on s.id=oi.service_id
    left join customers c on c.id=o.customer_id
    where oi.id=${input.orderItemId}
    limit 1
  `;

  const item=rows[0];
  if(!item) throw new Error("Order item not found.");
  if(["completed","cancelled"].includes(String(item.order_status))){
    throw new Error("Sourcing is not allowed for a closed order.");
  }

  const existing=await sql`
    select id,status
    from sourcing_requests
    where order_item_id=${input.orderItemId}
      and status in ('open','quoting','ready_to_assign','assigned')
    order by created_at desc
    limit 1
  `;
  if(existing[0]){
    return {requestId:String(existing[0].id),status:String(existing[0].status),reused:true,candidates:0};
  }

  const ranked=await getRankedPartnersForService(String(item.service_slug));
  const candidateJson=JSON.stringify(ranked.map((candidate,index)=>({
    partner_id:candidate.partnerId,
    rank:index+1,
    routing_score:candidate.score,
    base_cost:candidate.baseCost,
    currency:"YER",
    lead_hours:candidate.normalLeadHours,
    active_jobs:candidate.activeJobs??0,
    reasons:candidate.reasons
  })));

  const result=await sql`
    with new_request as (
      insert into sourcing_requests (
        order_item_id,status,requested_quantity,required_by,city,urgent,requested_by
      ) values (
        ${input.orderItemId},
        ${ranked.length?"ready_to_assign":"open"},
        ${Number(item.quantity??1)},
        ${input.requiredBy?.toISOString()??null},
        ${item.customer_city?String(item.customer_city):null},
        ${Boolean(input.urgent)},
        ${input.actorId??null}
      )
      returning id,status
    ),
    input_candidates as (
      select *
      from jsonb_to_recordset(${candidateJson}::jsonb)
        as x(
          partner_id uuid,
          rank integer,
          routing_score numeric,
          base_cost numeric,
          currency text,
          lead_hours integer,
          active_jobs integer,
          reasons jsonb
        )
    ),
    inserted_candidates as (
      insert into sourcing_candidates (
        sourcing_request_id,partner_id,rank,routing_score,base_cost,currency,
        lead_hours,active_jobs,reasons,status
      )
      select
        new_request.id,
        input_candidates.partner_id,
        input_candidates.rank,
        input_candidates.routing_score,
        input_candidates.base_cost,
        input_candidates.currency,
        input_candidates.lead_hours,
        input_candidates.active_jobs,
        input_candidates.reasons,
        'candidate'
      from new_request
      cross join input_candidates
      returning id
    )
    select
      new_request.id,
      new_request.status,
      (select count(*)::integer from inserted_candidates) as candidate_count
    from new_request
  `;

  const created=result[0];
  return {
    requestId:String(created.id),
    status:String(created.status),
    reused:false,
    candidates:Number(created.candidate_count??0)
  };
}

export async function assignSourcingCandidate(input:{
  sourcingRequestId:string;
  partnerId:string;
  actorId?:string|null;
  overrideReason?:string|null;
}){
  const sql=getSql();

  const rows=await sql`
    select
      sr.id as sourcing_request_id,
      sr.order_item_id,
      sr.status as sourcing_status,
      sc.routing_score,
      sc.base_cost,
      sc.currency,
      sc.lead_hours,
      oi.order_id,
      oi.service_id,
      o.status as order_status,
      pw.id as workflow_id
    from sourcing_requests sr
    join sourcing_candidates sc
      on sc.sourcing_request_id=sr.id
     and sc.partner_id=${input.partnerId}
    join order_items oi on oi.id=sr.order_item_id
    join orders o on o.id=oi.order_id
    left join lateral (
      select id
      from production_workflows pw
      where pw.service_id=oi.service_id
        and pw.is_default=true
        and pw.is_active=true
      order by pw.version desc
      limit 1
    ) pw on true
    where sr.id=${input.sourcingRequestId}
    limit 1
  `;

  const source=rows[0];
  if(!source) throw new Error("Sourcing candidate not found.");
  if(["assigned","closed","cancelled"].includes(String(source.sourcing_status))){
    throw new Error("This sourcing request is already closed.");
  }
  if(["completed","cancelled"].includes(String(source.order_status))){
    throw new Error("Cannot assign production for a closed order.");
  }

  const snapshot=JSON.stringify({
    routingScore:Number(source.routing_score),
    baseCost:source.base_cost===null?null:Number(source.base_cost),
    leadHours:source.lead_hours===null?null:Number(source.lead_hours),
    selectedAt:new Date().toISOString()
  });

  const promisedAt=source.lead_hours===null
    ? null
    : new Date(Date.now()+Number(source.lead_hours)*60*60*1000).toISOString();

  const assigned=await sql`
    with existing_work as (
      select id
      from work_orders
      where order_item_id=${source.order_item_id}
        and status not in ('completed','cancelled')
      order by created_at desc
      limit 1
    ),
    new_work as (
      insert into work_orders (
        order_item_id,workflow_id,partner_id,status,priority,promised_at,metadata
      )
      select
        ${source.order_item_id},
        ${source.workflow_id??null},
        ${input.partnerId},
        'queued',
        'normal',
        ${promisedAt},
        jsonb_build_object('source','sourcing_engine')
      where not exists(select 1 from existing_work)
      returning id
    ),
    chosen_work as (
      select id from existing_work
      union all
      select id from new_work
      limit 1
    ),
    updated_work as (
      update work_orders
      set partner_id=${input.partnerId},
          workflow_id=coalesce(workflow_id,${source.workflow_id??null}),
          promised_at=coalesce(promised_at,${promisedAt})
      where id=(select id from chosen_work)
      returning id
    ),
    cancelled_assignments as (
      update production_assignments
      set status='reassigned'
      where order_item_id=${source.order_item_id}
        and status in ('assigned','accepted','in_production')
      returning id
    ),
    new_assignment as (
      insert into production_assignments (
        order_item_id,sourcing_request_id,partner_id,work_order_id,status,
        buy_cost,currency,routing_score,routing_snapshot,override_reason,selected_by
      )
      select
        ${source.order_item_id},
        ${input.sourcingRequestId},
        ${input.partnerId},
        updated_work.id,
        'assigned',
        ${source.base_cost},
        ${String(source.currency??"YER")},
        ${source.routing_score},
        ${snapshot}::jsonb,
        ${input.overrideReason??null},
        ${input.actorId??null}
      from updated_work
      returning id,work_order_id
    ),
    partner_offer as (
      insert into partner_jobs (
        work_order_id,partner_id,quoted_cost,currency,lead_hours,status,notes
      )
      select
        new_assignment.work_order_id,
        ${input.partnerId},
        ${source.base_cost},
        ${String(source.currency??"YER")},
        ${source.lead_hours},
        'offered',
        'Assigned by ORYX sourcing engine'
      from new_assignment
      returning id
    ),
    partner_cost_estimate as (
      insert into job_cost_lines (
        order_item_id,work_order_id,cost_type,description,quantity,unit_cost,total_cost,currency,
        source_type,source_id,is_estimate
      )
      select
        ${source.order_item_id},
        new_assignment.work_order_id,
        'partner',
        'Partner production assignment',
        1,
        coalesce(${source.base_cost},0),
        round(coalesce(${source.base_cost},0)::numeric,2),
        ${String(source.currency??"YER")},
        'production_assignment',
        new_assignment.id,
        true
      from new_assignment
      where ${source.base_cost} is not null
      returning id
    ),
    item_update as (
      update order_items
      set assigned_partner_id=${input.partnerId}
      where id=${source.order_item_id}
      returning id
    ),
    candidate_update as (
      update sourcing_candidates
      set status=case when partner_id=${input.partnerId} then 'selected' else 'not_selected' end
      where sourcing_request_id=${input.sourcingRequestId}
      returning id
    ),
    request_update as (
      update sourcing_requests
      set status='assigned',updated_at=now()
      where id=${input.sourcingRequestId}
      returning id
    )
    select
      new_assignment.id as assignment_id,
      new_assignment.work_order_id,
      (select id from partner_offer limit 1) as partner_job_id
    from new_assignment
  `;

  const result=assigned[0];
  if(!result) throw new Error("Assignment could not be created.");

  return {
    assignmentId:String(result.assignment_id),
    workOrderId:String(result.work_order_id),
    partnerJobId:String(result.partner_job_id)
  };
}
