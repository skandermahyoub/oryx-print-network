import { NextResponse } from "next/server";
import { z } from "zod";
import { databaseConfigured, getSql } from "@/lib/db";
import { orderStatusLabels, type OrderStatus } from "@/lib/order-state-machine";

const schema=z.object({
  orderNumber:z.coerce.number().int().positive(),
  phone:z.string().min(5).max(40)
});

export async function POST(request:Request){
  if(!databaseConfigured()){
    return NextResponse.json({error:"Order tracking is not configured in this environment."},{status:503});
  }

  const parsed=schema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success){
    return NextResponse.json({error:"أدخل رقم الطلب ورقم التواصل."},{status:400});
  }

  const sql=getSql();
  const rows=await sql`
    select
      o.id,
      o.order_number,
      o.status,
      o.created_at,
      c.display_name,
      count(oi.id)::integer as item_count
    from orders o
    join customers c on c.id=o.customer_id
    left join order_items oi on oi.order_id=o.id
    where o.order_number=${parsed.data.orderNumber}
      and regexp_replace(coalesce(c.phone,''),'[^0-9]','','g')=
          regexp_replace(${parsed.data.phone},'[^0-9]','','g')
    group by o.id,c.display_name
    limit 1
  `;

  const row=rows[0];
  if(!row){
    return NextResponse.json({error:"لم نجد طلبًا مطابقًا لهذه البيانات."},{status:404});
  }

  const status=String(row.status);
  const events=await sql`
    select from_status,to_status,created_at
    from order_status_events
    where order_id=${row.id}
    order by created_at asc
  `;

  return NextResponse.json({
    order:{
      orderNumber:Number(row.order_number),
      customerName:String(row.display_name),
      status,
      statusLabel:orderStatusLabels[status as OrderStatus]??status,
      itemCount:Number(row.item_count??0),
      createdAt:new Date(String(row.created_at)).toISOString()
    },
    timeline:events.map(event=>({
      from:event.from_status?String(event.from_status):null,
      to:String(event.to_status),
      label:orderStatusLabels[String(event.to_status) as OrderStatus]??String(event.to_status),
      createdAt:new Date(String(event.created_at)).toISOString()
    }))
  });
}
