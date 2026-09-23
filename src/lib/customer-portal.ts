import { getSql } from "@/lib/db";
import { getRecipientNotifications, type PortalNotification } from "@/lib/notifications";

export type CustomerPortalSnapshot={
  notifications:PortalNotification[];
  orders:Array<{
    id:string;
    number:number;
    status:string;
    total:number;
    currency:string;
    items:number;
    createdAt:string;
  }>;
  quotes:Array<{
    id:string;
    number:number;
    status:string;
    total:number;
    currency:string;
    validUntil:string|null;
    orderId:string|null;
  }>;
  designs:Array<{
    designJobId:string;
    designVersionId:string;
    versionNumber:number;
    status:string;
    service:string;
    orderNumber:number;
    notes:string|null;
    documentId:string|null;
    fileName:string|null;
    decision:string|null;
    decidedAt:string|null;
    createdAt:string;
  }>;
  invoices:Array<{
    id:string;
    number:number;
    status:string;
    total:number;
    paid:number;
    currency:string;
    dueDate:string|null;
  }>;
  loyalty:{
    points:number;
    lifetimePoints:number;
    tier:string;
    referralCode:string|null;
  };
  rewards:Array<{
    id:string;
    name:string;
    description:string|null;
    pointsCost:number;
    type:string;
    value:number|null;
    currency:string|null;
  }>;
  redemptions:Array<{
    id:string;
    reward:string;
    points:number;
    status:string;
    createdAt:string;
  }>;
};

export async function getCustomerPortalSnapshot(customerId:string):Promise<CustomerPortalSnapshot>{
  const sql=getSql();
  const [notifications,orders,quotes,designs,invoices,loyalty,rewards,redemptions,referral]=await Promise.all([
    getRecipientNotifications({recipientType:"customer",recipientId:customerId,limit:30}),
    sql`
      select
        o.id,o.order_number,o.status,o.total,o.currency,o.created_at,
        count(oi.id)::integer as item_count
      from orders o
      left join order_items oi on oi.order_id=o.id
      where o.customer_id=${customerId}
      group by o.id
      order by o.created_at desc
      limit 50
    `,
    sql`
      select id,quote_number,status,total,currency,valid_until,source_order_id
      from quotes
      where customer_id=${customerId}
        and status in ('sent','accepted','rejected','expired')
      order by created_at desc
      limit 50
    `,
    sql`
      select
        dj.id as design_job_id,
        dv.id as design_version_id,
        dv.version_number,
        dj.status,
        s.name_ar as service_name,
        o.order_number,
        dv.notes,
        dv.document_id,
        d.file_name,
        da.decision,
        da.decided_at,
        dv.created_at
      from design_jobs dj
      join order_items oi on oi.id=dj.order_item_id
      join orders o on o.id=oi.order_id
      join services s on s.id=oi.service_id
      join lateral (
        select dv.*
        from design_versions dv
        where dv.design_job_id=dj.id
        order by dv.version_number desc
        limit 1
      ) dv on true
      left join documents d on d.id=dv.document_id
      left join design_approvals da on da.design_version_id=dv.id
      where o.customer_id=${customerId}
        and dj.status in ('waiting_approval','approved','designing')
      order by dv.created_at desc
      limit 50
    `,
    sql`
      select id,invoice_number,status,total,amount_paid,currency,due_date
      from invoices
      where customer_id=${customerId}
      order by created_at desc
      limit 50
    `,
    sql`
      select points_balance,lifetime_points,tier_key
      from loyalty_accounts
      where customer_id=${customerId}
      limit 1
    `,
    sql`
      select id,name_ar,description_ar,points_cost,reward_type,reward_value,currency
      from reward_catalog
      where is_active=true
        and (valid_from is null or valid_from<=now())
        and (valid_until is null or valid_until>=now())
        and (
          inventory_limit is null
          or (
            select count(*)
            from reward_redemptions rr
            where rr.reward_id=reward_catalog.id
              and rr.status in ('requested','approved','used')
          )<inventory_limit
        )
      order by points_cost,name_ar
      limit 30
    `,
    sql`
      select
        rr.id,rr.points_spent,rr.status,rr.created_at,rc.name_ar
      from reward_redemptions rr
      join loyalty_accounts la on la.id=rr.loyalty_account_id
      join reward_catalog rc on rc.id=rr.reward_id
      where la.customer_id=${customerId}
      order by rr.created_at desc
      limit 30
    `,
    sql`
      select code
      from referral_codes
      where customer_id=${customerId} and is_active=true
      limit 1
    `
  ]);

  const points=loyalty[0];
  return {
    notifications,
    orders:orders.map(row=>({
      id:String(row.id),
      number:Number(row.order_number),
      status:String(row.status),
      total:Number(row.total??0),
      currency:String(row.currency??"YER"),
      items:Number(row.item_count??0),
      createdAt:new Date(String(row.created_at)).toISOString()
    })),
    quotes:quotes.map(row=>({
      id:String(row.id),
      number:Number(row.quote_number),
      status:String(row.status),
      total:Number(row.total??0),
      currency:String(row.currency??"YER"),
      validUntil:row.valid_until?String(row.valid_until):null,
      orderId:row.source_order_id?String(row.source_order_id):null
    })),
    designs:designs.map(row=>({
      designJobId:String(row.design_job_id),
      designVersionId:String(row.design_version_id),
      versionNumber:Number(row.version_number),
      status:String(row.status),
      service:String(row.service_name),
      orderNumber:Number(row.order_number),
      notes:row.notes?String(row.notes):null,
      documentId:row.document_id?String(row.document_id):null,
      fileName:row.file_name?String(row.file_name):null,
      decision:row.decision?String(row.decision):null,
      decidedAt:row.decided_at?new Date(String(row.decided_at)).toISOString():null,
      createdAt:new Date(String(row.created_at)).toISOString()
    })),
    invoices:invoices.map(row=>({
      id:String(row.id),
      number:Number(row.invoice_number),
      status:String(row.status),
      total:Number(row.total??0),
      paid:Number(row.amount_paid??0),
      currency:String(row.currency??"YER"),
      dueDate:row.due_date?String(row.due_date):null
    })),
    loyalty:{
      points:Number(points?.points_balance??0),
      lifetimePoints:Number(points?.lifetime_points??0),
      tier:String(points?.tier_key??"member"),
      referralCode:referral[0]?.code?String(referral[0].code):null
    },
    rewards:rewards.map(row=>({
      id:String(row.id),
      name:String(row.name_ar),
      description:row.description_ar?String(row.description_ar):null,
      pointsCost:Number(row.points_cost),
      type:String(row.reward_type),
      value:row.reward_value===null?null:Number(row.reward_value),
      currency:row.currency?String(row.currency):null
    })),
    redemptions:redemptions.map(row=>({
      id:String(row.id),
      reward:String(row.name_ar),
      points:Number(row.points_spent),
      status:String(row.status),
      createdAt:new Date(String(row.created_at)).toISOString()
    }))
  };
}
