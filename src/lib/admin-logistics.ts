import { databaseConfigured, getSql } from "@/lib/db";

export type LogisticsSnapshot={
  deliveries:Array<{
    id:string;
    orderId:string;
    orderNumber:number;
    customer:string;
    type:string;
    status:string;
    recipient:string|null;
    phone:string|null;
    address:string|null;
    scheduledAt:string|null;
    deliveredAt:string|null;
    fee:number;
    actualFee:number|null;
    currency:string;
    assignedTo:string|null;
  }>;
  installations:Array<{
    id:string;
    orderId:string;
    orderNumber:number;
    customer:string;
    status:string;
    address:string|null;
    scheduledAt:string|null;
    technicianName:string|null;
    technicianPhone:string|null;
    partner:string|null;
    completedAt:string|null;
  }>;
  totals:{
    pendingDeliveries:number;
    activeDeliveries:number;
    delivered:number;
    pendingInstallations:number;
    activeInstallations:number;
    completedInstallations:number;
  };
};

const empty:LogisticsSnapshot={
  deliveries:[],installations:[],
  totals:{pendingDeliveries:0,activeDeliveries:0,delivered:0,pendingInstallations:0,activeInstallations:0,completedInstallations:0}
};

export async function getLogisticsSnapshot():Promise<LogisticsSnapshot>{
  if(!databaseConfigured()) return empty;
  try{
    const sql=getSql();
    const [deliveries,installations,totals]=await Promise.all([
      sql`
        select
          dj.id,dj.order_id,o.order_number,dj.delivery_type,dj.status,dj.recipient_name,dj.phone,dj.address,
          dj.scheduled_at,dj.delivered_at,dj.fee,dj.actual_fee,dj.currency,
          coalesce(c.company_name,c.display_name,'—') as customer_name,
          au.display_name as assigned_name
        from delivery_jobs dj
        join orders o on o.id=dj.order_id
        left join customers c on c.id=o.customer_id
        left join app_users au on au.id=dj.assigned_to
        order by
          case dj.status when 'pending' then 0 when 'scheduled' then 1 when 'picked_up' then 2 when 'out_for_delivery' then 3 else 4 end,
          dj.scheduled_at nulls last,dj.created_at desc
        limit 150
      `,
      sql`
        select
          ij.id,ij.order_id,o.order_number,ij.status,ij.address,ij.scheduled_at,
          ij.technician_name,ij.technician_phone,ij.completed_at,
          coalesce(c.company_name,c.display_name,'—') as customer_name,
          coalesce(p.trade_name,p.legal_name) as partner_name
        from installation_jobs ij
        join orders o on o.id=ij.order_id
        left join customers c on c.id=o.customer_id
        left join partners p on p.id=ij.partner_id
        order by
          case ij.status when 'pending' then 0 when 'scheduled' then 1 when 'on_site' then 2 else 3 end,
          ij.scheduled_at nulls last,ij.created_at desc
        limit 150
      `,
      sql`
        select
          (select count(*)::integer from delivery_jobs where status='pending') as pending_deliveries,
          (select count(*)::integer from delivery_jobs where status in ('scheduled','picked_up','out_for_delivery','rescheduled')) as active_deliveries,
          (select count(*)::integer from delivery_jobs where status='delivered') as delivered,
          (select count(*)::integer from installation_jobs where status='pending') as pending_installations,
          (select count(*)::integer from installation_jobs where status in ('scheduled','on_site','rescheduled')) as active_installations,
          (select count(*)::integer from installation_jobs where status='completed') as completed_installations
      `
    ]);

    const t=totals[0];
    return {
      deliveries:deliveries.map(row=>({
        id:String(row.id),
        orderId:String(row.order_id),
        orderNumber:Number(row.order_number),
        customer:String(row.customer_name),
        type:String(row.delivery_type),
        status:String(row.status),
        recipient:row.recipient_name?String(row.recipient_name):null,
        phone:row.phone?String(row.phone):null,
        address:row.address?String(row.address):null,
        scheduledAt:row.scheduled_at?new Date(String(row.scheduled_at)).toISOString():null,
        deliveredAt:row.delivered_at?new Date(String(row.delivered_at)).toISOString():null,
        fee:Number(row.fee??0),
        actualFee:row.actual_fee===null?null:Number(row.actual_fee),
        currency:String(row.currency??"YER"),
        assignedTo:row.assigned_name?String(row.assigned_name):null
      })),
      installations:installations.map(row=>({
        id:String(row.id),
        orderId:String(row.order_id),
        orderNumber:Number(row.order_number),
        customer:String(row.customer_name),
        status:String(row.status),
        address:row.address?String(row.address):null,
        scheduledAt:row.scheduled_at?new Date(String(row.scheduled_at)).toISOString():null,
        technicianName:row.technician_name?String(row.technician_name):null,
        technicianPhone:row.technician_phone?String(row.technician_phone):null,
        partner:row.partner_name?String(row.partner_name):null,
        completedAt:row.completed_at?new Date(String(row.completed_at)).toISOString():null
      })),
      totals:{
        pendingDeliveries:Number(t?.pending_deliveries??0),
        activeDeliveries:Number(t?.active_deliveries??0),
        delivered:Number(t?.delivered??0),
        pendingInstallations:Number(t?.pending_installations??0),
        activeInstallations:Number(t?.active_installations??0),
        completedInstallations:Number(t?.completed_installations??0)
      }
    };
  }catch{
    return empty;
  }
}
