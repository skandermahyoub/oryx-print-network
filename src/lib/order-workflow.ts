import { getSql } from "@/lib/db";
import { orderStatuses, type OrderStatus } from "@/lib/order-state-machine";
import { validateOrderTransition, type LifecycleContext } from "@/lib/order-lifecycle";

function isOrderStatus(value:string):value is OrderStatus{
  return (orderStatuses as readonly string[]).includes(value);
}

export async function transitionOrder(input:{
  orderId:string;
  to:OrderStatus;
  actorId?:string|null;
  reason?:string;
}){
  const sql=getSql();
  const rows=await sql`
    select id,status,total,accepted_quote_id
    from orders
    where id=${input.orderId}
    limit 1
  `;

  const order=rows[0];
  if(!order) throw new Error("Order not found.");
  const current=String(order.status);
  if(!isOrderStatus(current)) throw new Error("Order has an unknown workflow status.");

  const context:LifecycleContext={};

  if(input.to==="waiting_payment"){
    const accepted=await sql`
      select exists(
        select 1 from quotes
        where source_order_id=${input.orderId} and status='accepted'
      ) as accepted
    `;
    context.quoteAccepted=Boolean(accepted[0]?.accepted);
  }

  if(input.to==="approved_for_production"){
    const evidence=await sql`
      select
        not exists(
          select 1
          from order_items oi
          join services s on s.id=oi.service_id
          where oi.order_id=${input.orderId}
            and s.requires_design_approval=true
            and not exists (
              select 1
              from design_jobs dj
              join design_versions dv on dv.design_job_id=dj.id
              join design_approvals da on da.design_version_id=dv.id
              where dj.order_item_id=oi.id and da.decision='approved'
            )
        ) as designs_approved,
        exists(
          select 1 from order_items oi
          join services s on s.id=oi.service_id
          where oi.order_id=${input.orderId} and s.requires_design_approval=true
        ) as requires_design,
        exists(
          select 1 from invoices i
          where i.order_id=${input.orderId}
            and i.status='paid'
            and i.amount_paid>=i.total
            and i.total>0
        ) as payment_satisfied
    `;
    context.requiresDesignApproval=Boolean(evidence[0]?.requires_design);
    context.designApproved=Boolean(evidence[0]?.designs_approved);
    context.paymentSatisfied=Boolean(evidence[0]?.payment_satisfied);
  }

  if(input.to==="in_production"&&current==="approved_for_production"){
    const evidence=await sql`
      select
        not exists(
          select 1 from order_items oi
          where oi.order_id=${input.orderId} and oi.assigned_partner_id is null
        ) as partners_assigned,
        not exists(
          select 1 from order_items oi
          where oi.order_id=${input.orderId}
            and not exists(
              select 1 from work_orders wo
              where wo.order_item_id=oi.id and wo.status not in ('cancelled')
            )
        ) as work_orders_ready
    `;
    context.partnerAssigned=Boolean(evidence[0]?.partners_assigned);
    context.workOrderReady=Boolean(evidence[0]?.work_orders_ready);
  }

  if(input.to==="ready"){
    const evidence=await sql`
      select
        exists(
          select 1 from work_orders wo
          join order_items oi on oi.id=wo.order_item_id
          where oi.order_id=${input.orderId} and wo.status not in ('cancelled')
        )
        and not exists(
          select 1 from work_orders wo
          join order_items oi on oi.id=wo.order_item_id
          where oi.order_id=${input.orderId}
            and wo.status not in ('cancelled')
            and not exists(
              select 1 from qc_inspections qi
              where qi.work_order_id=wo.id and qi.status='passed'
            )
        )
        and not exists(
          select 1 from rework_orders rw
          join work_orders wo on wo.id=rw.source_work_order_id
          join order_items oi on oi.id=wo.order_item_id
          where oi.order_id=${input.orderId}
            and rw.status in ('open','approved','in_progress')
        ) as qc_passed
    `;
    context.qcPassed=Boolean(evidence[0]?.qc_passed);
  }

  if(input.to==="completed"){
    const evidence=await sql`
      select
        (
          exists(select 1 from delivery_jobs where order_id=${input.orderId} and status='delivered')
          or exists(select 1 from installation_jobs where order_id=${input.orderId} and status='completed')
        ) as fulfilled,
        exists(
          select 1 from invoices
          where order_id=${input.orderId} and status in ('issued','partial','paid')
        ) as invoice_issued,
        exists(
          select 1 from invoices
          where order_id=${input.orderId} and status='paid' and amount_paid>=total and total>0
        ) as collection_satisfied
    `;
    context.fulfillmentConfirmed=Boolean(evidence[0]?.fulfilled);
    context.invoiceIssued=Boolean(evidence[0]?.invoice_issued);
    context.collectionSatisfied=Boolean(evidence[0]?.collection_satisfied);
  }

  const decision=validateOrderTransition(current,input.to,context);
  if(!decision.allowed){
    throw new Error(`Order transition blocked: ${decision.reason??"business_rule"}.`);
  }

  const changed=await sql`
    with updated as (
      update orders
      set status=${input.to},updated_at=now()
      where id=${input.orderId} and status=${current}
      returning id
    ),
    event as (
      insert into order_status_events (order_id,from_status,to_status,actor_id,reason)
      select id,${current},${input.to},${input.actorId??null},${input.reason??null}
      from updated
      returning id
    )
    select id from updated
  `;

  if(!changed.length){
    throw new Error("Order changed concurrently. Reload before retrying.");
  }

  return {orderId:input.orderId,from:current,to:input.to};
}
