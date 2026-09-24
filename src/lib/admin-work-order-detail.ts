import { databaseConfigured, getSql } from "@/lib/db";

export type WorkOrderDetail={
  workOrder:{
    id:string;
    number:number;
    status:string;
    priority:string;
    promisedAt:string|null;
    startedAt:string|null;
    completedAt:string|null;
    costActual:number|null;
    currentStep:string|null;
    currentStepName:string|null;
    orderId:string;
    orderNumber:number;
    orderItemId:string;
    service:string;
    serviceSlug:string;
    quantity:number;
    partner:string|null;
  };
  stock:Array<{
    inventoryItemId:string;
    sku:string;
    name:string;
    unit:string;
    warehouseId:string;
    warehouse:string;
    onHand:number;
    reserved:number;
    available:number;
    averageCost:number|null;
    currency:string;
  }>;
  reservations:Array<{
    id:string;
    inventoryItemId:string;
    sku:string;
    name:string;
    unit:string;
    warehouse:string;
    quantity:number;
    consumed:number;
    remaining:number;
    status:string;
    reservedAt:string;
  }>;
  consumptions:Array<{
    id:string;
    name:string;
    warehouse:string;
    good:number;
    waste:number;
    unitCost:number|null;
    currency:string;
    recordedAt:string;
  }>;
  costs:Array<{
    id:string;
    type:string;
    description:string|null;
    quantity:number;
    unitCost:number;
    totalCost:number;
    currency:string;
    estimate:boolean;
    createdAt:string;
  }>;
  events:Array<{
    id:string;
    type:string;
    step:string|null;
    good:number|null;
    waste:number|null;
    notes:string|null;
    createdAt:string;
  }>;
};

export async function getWorkOrderDetail(id:string):Promise<WorkOrderDetail|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();

  const rows=await sql`
    select
      wo.id,wo.work_order_number,wo.status,wo.priority,wo.promised_at,wo.started_at,wo.completed_at,
      wo.cost_actual,wo.current_step_key,ws.name_ar as current_step_name,
      oi.id as order_item_id,oi.quantity,o.id as order_id,o.order_number,
      s.name_ar as service_name,s.slug as service_slug,
      coalesce(p.trade_name,p.legal_name) as partner_name
    from work_orders wo
    join order_items oi on oi.id=wo.order_item_id
    join orders o on o.id=oi.order_id
    join services s on s.id=oi.service_id
    left join partners p on p.id=wo.partner_id
    left join workflow_steps ws on ws.workflow_id=wo.workflow_id and ws.step_key=wo.current_step_key
    where wo.id=${id}
    limit 1
  `;
  const wo=rows[0];
  if(!wo) return null;

  const [stock,reservations,consumptions,costs,events]=await Promise.all([
    sql`
      with on_hand as (
        select
          ii.id as inventory_item_id,
          w.id as warehouse_id,
          coalesce(sum(case
            when sm.movement_type in ('opening','receipt','adjust_in','transfer_in','return') then sm.quantity
            when sm.movement_type in ('consume','waste','adjust_out','transfer_out') then -sm.quantity
            else 0 end),0)::numeric(14,3) as quantity
        from inventory_items ii
        cross join warehouses w
        left join stock_movements sm
          on sm.inventory_item_id=ii.id and sm.warehouse_id=w.id
        where ii.is_active=true and w.is_active=true
        group by ii.id,w.id
      ),
      reserved as (
        select
          mr.inventory_item_id,mr.warehouse_id,
          coalesce(sum(mr.quantity-mr.consumed_quantity),0)::numeric(14,3) as quantity
        from material_reservations mr
        where mr.status in ('reserved','partially_consumed')
        group by mr.inventory_item_id,mr.warehouse_id
      )
      select
        ii.id as inventory_item_id,ii.sku,ii.name_ar,ii.unit,ii.average_cost,ii.currency,
        w.id as warehouse_id,w.name_ar as warehouse_name,
        on_hand.quantity as on_hand,
        coalesce(reserved.quantity,0)::numeric(14,3) as reserved,
        greatest(0,on_hand.quantity-coalesce(reserved.quantity,0))::numeric(14,3) as available
      from on_hand
      join inventory_items ii on ii.id=on_hand.inventory_item_id
      join warehouses w on w.id=on_hand.warehouse_id
      left join reserved
        on reserved.inventory_item_id=on_hand.inventory_item_id
       and reserved.warehouse_id=on_hand.warehouse_id
      where on_hand.quantity>0 or coalesce(reserved.quantity,0)>0
      order by ii.name_ar,w.name_ar
    `,
    sql`
      select
        mr.id,mr.inventory_item_id,mr.quantity,mr.consumed_quantity,mr.status,mr.reserved_at,
        ii.sku,ii.name_ar,ii.unit,w.name_ar as warehouse_name
      from material_reservations mr
      join inventory_items ii on ii.id=mr.inventory_item_id
      join warehouses w on w.id=mr.warehouse_id
      where mr.work_order_id=${id}
      order by
        case mr.status when 'reserved' then 0 when 'partially_consumed' then 1 else 2 end,
        mr.reserved_at desc
    `,
    sql`
      select
        mc.id,mc.quantity_good,mc.quantity_waste,mc.unit_cost,mc.currency,mc.recorded_at,
        ii.name_ar,w.name_ar as warehouse_name
      from material_consumptions mc
      join inventory_items ii on ii.id=mc.inventory_item_id
      join warehouses w on w.id=mc.warehouse_id
      where mc.work_order_id=${id}
      order by mc.recorded_at desc
    `,
    sql`
      select id,cost_type,description,quantity,unit_cost,total_cost,currency,is_estimate,created_at
      from job_cost_lines
      where work_order_id=${id}
      order by is_estimate,created_at desc
    `,
    sql`
      select id,event_type,step_key,quantity_good,quantity_waste,notes,created_at
      from work_order_events
      where work_order_id=${id}
      order by created_at desc
      limit 100
    `
  ]);

  return {
    workOrder:{
      id:String(wo.id),number:Number(wo.work_order_number),status:String(wo.status),
      priority:String(wo.priority),promisedAt:wo.promised_at?new Date(String(wo.promised_at)).toISOString():null,
      startedAt:wo.started_at?new Date(String(wo.started_at)).toISOString():null,
      completedAt:wo.completed_at?new Date(String(wo.completed_at)).toISOString():null,
      costActual:wo.cost_actual===null?null:Number(wo.cost_actual),
      currentStep:wo.current_step_key?String(wo.current_step_key):null,
      currentStepName:wo.current_step_name?String(wo.current_step_name):null,
      orderId:String(wo.order_id),orderNumber:Number(wo.order_number),orderItemId:String(wo.order_item_id),
      service:String(wo.service_name),serviceSlug:String(wo.service_slug),quantity:Number(wo.quantity??0),
      partner:wo.partner_name?String(wo.partner_name):null
    },
    stock:stock.map(row=>({
      inventoryItemId:String(row.inventory_item_id),sku:String(row.sku),name:String(row.name_ar),
      unit:String(row.unit),warehouseId:String(row.warehouse_id),warehouse:String(row.warehouse_name),
      onHand:Number(row.on_hand??0),reserved:Number(row.reserved??0),available:Number(row.available??0),
      averageCost:row.average_cost===null?null:Number(row.average_cost),currency:String(row.currency??"YER")
    })),
    reservations:reservations.map(row=>{
      const quantity=Number(row.quantity??0);
      const consumed=Number(row.consumed_quantity??0);
      return {
        id:String(row.id),inventoryItemId:String(row.inventory_item_id),sku:String(row.sku),name:String(row.name_ar),
        unit:String(row.unit),warehouse:String(row.warehouse_name),quantity,consumed,
        remaining:Math.max(0,quantity-consumed),status:String(row.status),
        reservedAt:new Date(String(row.reserved_at)).toISOString()
      };
    }),
    consumptions:consumptions.map(row=>({
      id:String(row.id),name:String(row.name_ar),warehouse:String(row.warehouse_name),
      good:Number(row.quantity_good??0),waste:Number(row.quantity_waste??0),
      unitCost:row.unit_cost===null?null:Number(row.unit_cost),currency:String(row.currency??"YER"),
      recordedAt:new Date(String(row.recorded_at)).toISOString()
    })),
    costs:costs.map(row=>({
      id:String(row.id),type:String(row.cost_type),description:row.description?String(row.description):null,
      quantity:Number(row.quantity??0),unitCost:Number(row.unit_cost??0),totalCost:Number(row.total_cost??0),
      currency:String(row.currency??"YER"),estimate:Boolean(row.is_estimate),
      createdAt:new Date(String(row.created_at)).toISOString()
    })),
    events:events.map(row=>({
      id:String(row.id),type:String(row.event_type),step:row.step_key?String(row.step_key):null,
      good:row.quantity_good===null?null:Number(row.quantity_good),waste:row.quantity_waste===null?null:Number(row.quantity_waste),
      notes:row.notes?String(row.notes):null,createdAt:new Date(String(row.created_at)).toISOString()
    }))
  };
}
