import { databaseConfigured, getSql } from "@/lib/db";
import { orderStatusLabels, type OrderStatus } from "@/lib/order-state-machine";

export type AdminOrderRow={
  id:string;
  orderNumber:number;
  customerName:string;
  companyName:string|null;
  phone:string|null;
  status:string;
  statusLabel:string;
  itemCount:number;
  total:number;
  currency:string;
  createdAt:string;
};

export async function getAdminOrders(limit=100):Promise<AdminOrderRow[]>{
  if(!databaseConfigured()) return [];
  try{
    const sql=getSql();
    const rows=await sql`
      select
        o.id,
        o.order_number,
        coalesce(c.display_name,'—') as customer_name,
        c.company_name,
        c.phone,
        o.status,
        o.total,
        o.currency,
        o.created_at,
        count(oi.id)::integer as item_count
      from orders o
      left join customers c on c.id=o.customer_id
      left join order_items oi on oi.order_id=o.id
      group by o.id,c.display_name,c.company_name,c.phone
      order by o.created_at desc
      limit ${limit}
    `;

    return rows.map(row=>{
      const status=String(row.status);
      return {
        id:String(row.id),
        orderNumber:Number(row.order_number),
        customerName:String(row.customer_name),
        companyName:row.company_name?String(row.company_name):null,
        phone:row.phone?String(row.phone):null,
        status,
        statusLabel:orderStatusLabels[status as OrderStatus]??status,
        itemCount:Number(row.item_count??0),
        total:Number(row.total??0),
        currency:String(row.currency??"YER"),
        createdAt:new Date(String(row.created_at)).toISOString()
      };
    });
  }catch{
    return [];
  }
}
