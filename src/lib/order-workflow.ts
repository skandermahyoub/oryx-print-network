import { getSql } from "@/lib/db";
import { canTransitionOrder, orderStatuses, type OrderStatus } from "@/lib/order-state-machine";

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
    select id,status
    from orders
    where id=${input.orderId}
    limit 1
  `;

  const order=rows[0];
  if(!order) throw new Error("Order not found.");
  const current=String(order.status);
  if(!isOrderStatus(current)) throw new Error("Order has an unknown workflow status.");
  if(!canTransitionOrder(current,input.to)){
    throw new Error(`Transition from ${current} to ${input.to} is not allowed.`);
  }

  if(input.to==="approved_for_production"||input.to==="in_production"){
    const missing=await sql`
      select count(*)::integer as missing_count
      from order_items oi
      join services s on s.id=oi.service_id
      where oi.order_id=${input.orderId}
        and s.requires_design_approval=true
        and not exists (
          select 1
          from design_jobs dj
          join design_versions dv on dv.design_job_id=dj.id
          join design_approvals da on da.design_version_id=dv.id
          where dj.order_item_id=oi.id
            and da.decision='approved'
        )
    `;
    if(Number(missing[0]?.missing_count??0)>0){
      throw new Error("Production is blocked until every required design is approved.");
    }
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
