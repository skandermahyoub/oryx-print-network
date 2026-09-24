import { getSql } from "@/lib/db";
import { queueInAppNotification } from "@/lib/notifications";

export async function setOrderItemManualPrice(input:{
  orderItemId:string;
  unitPrice:number;
  actorId?:string|null;
}){
  if(!Number.isFinite(input.unitPrice)||input.unitPrice<0){
    throw new Error("Invalid unit price.");
  }

  const sql=getSql();
  const rows=await sql`
    with item as (
      select id,order_id,quantity,unit_price,total_price
      from order_items
      where id=${input.orderItemId}
      limit 1
    ),
    updated_item as (
      update order_items oi
      set unit_price=${input.unitPrice},total_price=round((item.quantity*${input.unitPrice})::numeric,2)
      from item where oi.id=item.id
      returning oi.id,oi.order_id,oi.unit_price,oi.total_price,item.unit_price as old_unit_price,item.total_price as old_total_price
    ),
    totals as (
      select updated_item.order_id,coalesce(sum(coalesce(oi.total_price,0)),0)::numeric(14,2) as subtotal
      from updated_item join order_items oi on oi.order_id=updated_item.order_id group by updated_item.order_id
    ),
    updated_order as (
      update orders o set subtotal=totals.subtotal,total=greatest(0,totals.subtotal-o.discount),updated_at=now()
      from totals where o.id=totals.order_id returning o.id,o.subtotal,o.total,o.currency
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select ${input.actorId??null},'order_item',updated_item.id,'manual_price_set',
        jsonb_build_object('unit_price',updated_item.old_unit_price,'total_price',updated_item.old_total_price),
        jsonb_build_object('unit_price',updated_item.unit_price,'total_price',updated_item.total_price)
      from updated_item returning id
    )
    select updated_item.id as order_item_id,updated_order.id as order_id,updated_item.unit_price,updated_item.total_price,
      updated_order.subtotal,updated_order.total,updated_order.currency
    from updated_item join updated_order on updated_order.id=updated_item.order_id
  `;
  const row=rows[0];
  if(!row) throw new Error("Order item not found.");
  return {orderItemId:String(row.order_item_id),orderId:String(row.order_id),unitPrice:Number(row.unit_price),totalPrice:Number(row.total_price),orderSubtotal:Number(row.subtotal),orderTotal:Number(row.total),currency:String(row.currency)};
}

export async function sendQuote(input:{quoteId:string;actorId?:string|null}){
  const sql=getSql();
  const rows=await sql`
    with target as (
      select q.id,q.source_order_id,q.status,q.total,q.valid_until,
        exists(select 1 from quote_items qi where qi.quote_id=q.id and (qi.unit_price is null or qi.total_price is null)) as has_unpriced_items
      from quotes q where q.id=${input.quoteId} limit 1
    ), eligible as (
      select * from target where status='draft' and total>0 and has_unpriced_items=false and (valid_until is null or valid_until>=current_date)
    ), updated_quote as (
      update quotes q set status='sent',updated_at=now() from eligible where q.id=eligible.id returning q.id,q.source_order_id,q.total
    ), quote_event as (
      insert into quote_events (quote_id,event_type,actor_id,notes) select id,'sent',${input.actorId??null},'Quote sent to customer' from updated_quote returning id
    ), old_order as (
      select o.id,o.status from orders o join updated_quote uq on uq.source_order_id=o.id
    ), updated_order as (
      update orders o set status='quote_sent',updated_at=now() from updated_quote
      where o.id=updated_quote.source_order_id and o.status in ('submitted','under_review','waiting_quote') returning o.id
    ), order_event as (
      insert into order_status_events (order_id,from_status,to_status,actor_id,reason)
      select updated_order.id,old_order.status,'quote_sent',${input.actorId??null},'Quote sent to customer'
      from updated_order join old_order on old_order.id=updated_order.id returning id
    ) select id,source_order_id,total from updated_quote
  `;
  const row=rows[0];
  if(!row) throw new Error("Quote cannot be sent until every item has a valid price and the quote is active.");

  const customerRows=await sql`
    select q.customer_id,q.quote_number,o.order_number
    from quotes q
    left join orders o on o.id=q.source_order_id
    where q.id=${row.id}
    limit 1
  `;
  const customer=customerRows[0];
  if(customer?.customer_id){
    await queueInAppNotification({
      recipientType:"customer",
      recipientId:String(customer.customer_id),
      templateKey:"quote_sent",
      subject:`عرض السعر #${Number(customer.quote_number)} جاهز`,
      body:`تم تجهيز عرض السعر لطلب ORYX #${Number(customer.order_number??0)} ويمكنك مراجعته واعتماده من مكتبك الرقمي.`,
      relatedType:"quote",
      relatedId:String(row.id)
    });
  }

  return {quoteId:String(row.id),orderId:row.source_order_id?String(row.source_order_id):null,total:Number(row.total)};
}

export async function acceptQuoteForCustomer(input:{quoteId:string;customerId:string}){
  const sql=getSql();
  const rows=await sql`
    with target as (
      select q.* from quotes q where q.id=${input.quoteId} and q.customer_id=${input.customerId} and q.status='sent'
        and q.source_order_id is not null and (q.valid_until is null or q.valid_until>=current_date) limit 1
    ), accepted_quote as (
      update quotes q set status='accepted',updated_at=now() from target where q.id=target.id returning q.*
    ), quote_event as (
      insert into quote_events (quote_id,event_type,notes) select id,'accepted','Accepted by authenticated customer' from accepted_quote returning id
    ), synced_items as (
      update order_items oi set unit_price=qi.unit_price,total_price=qi.total_price,specifications=qi.specifications
      from quote_items qi,accepted_quote aq where qi.quote_id=aq.id and qi.source_order_item_id=oi.id returning oi.id
    ), old_order as (
      select o.id,o.status from orders o join accepted_quote aq on aq.source_order_id=o.id
    ), updated_order as (
      update orders o set accepted_quote_id=aq.id,subtotal=aq.subtotal,discount=aq.discount,total=aq.total,currency=aq.currency,status='waiting_payment',updated_at=now()
      from accepted_quote aq where o.id=aq.source_order_id and o.status in ('quote_sent','waiting_quote','under_review','submitted') returning o.id,o.status
    ), order_event as (
      insert into order_status_events (order_id,from_status,to_status,reason)
      select updated_order.id,old_order.status,'waiting_payment','Customer accepted quote' from updated_order join old_order on old_order.id=updated_order.id returning id
    )
    select accepted_quote.id as quote_id,accepted_quote.source_order_id as order_id,accepted_quote.total,accepted_quote.currency,
      (select count(*)::integer from synced_items) as synced_items from accepted_quote
  `;
  const row=rows[0];
  if(!row) throw new Error("Quote is unavailable, expired, or already handled.");
  return {quoteId:String(row.quote_id),orderId:String(row.order_id),total:Number(row.total),currency:String(row.currency),syncedItems:Number(row.synced_items??0)};
}

export async function issueInvoiceFromOrder(input:{orderId:string;dueDays?:number;actorId?:string|null}){
  const dueDays=Math.min(90,Math.max(0,input.dueDays??7));
  const sql=getSql();
  const rows=await sql`
    with target as (
      select o.id,o.customer_id,o.currency,o.subtotal,o.discount,o.total,o.status,o.accepted_quote_id
      from orders o
      join quotes q on q.id=o.accepted_quote_id and q.status='accepted'
      where o.id=${input.orderId} and o.total>0
        and o.status in ('waiting_payment','design_required','designing','waiting_design_approval','approved_for_production','in_production','quality_control','ready','pickup_scheduled','delivery_scheduled','completed')
      limit 1
    ), existing as (
      select id,invoice_number,total,currency,status from invoices where order_id=${input.orderId} and status<>'cancelled' order by created_at desc limit 1
    ), created as (
      insert into invoices (customer_id,order_id,status,currency,subtotal,discount,total,due_date,issued_at)
      select target.customer_id,target.id,'issued',target.currency,target.subtotal,target.discount,target.total,current_date+${dueDays},now()
      from target where not exists(select 1 from existing) returning id,invoice_number,total,currency,status
    ), result as (
      select * from existing union all select * from created limit 1
    ), audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select ${input.actorId??null},'invoice',result.id,
        case when exists(select 1 from created where created.id=result.id) then 'issued' else 'reused' end,
        jsonb_build_object('order_id',${input.orderId},'total',result.total,'currency',result.currency)
      from result returning id
    ) select * from result
  `;
  const row=rows[0];
  if(!row) throw new Error("Invoice requires an accepted quote, a positive total, and an eligible order state.");
  return {invoiceId:String(row.id),invoiceNumber:Number(row.invoice_number),total:Number(row.total),currency:String(row.currency),status:String(row.status)};
}

export async function recordInvoicePayment(input:{invoiceId:string;amount:number;method?:string|null;reference?:string|null;actorId?:string|null}){
  if(!Number.isFinite(input.amount)||input.amount<=0) throw new Error("Payment amount must be greater than zero.");
  const sql=getSql();
  const rows=await sql`
    with target as materialized (
      select id,customer_id,total,amount_paid,currency,status
      from invoices
      where id=${input.invoiceId} and status not in ('paid','cancelled')
      for update
    ), valid as (
      select * from target where ${input.amount}<=greatest(total-amount_paid,0)
    ), payment as (
      insert into payments (invoice_id,customer_id,amount,currency,method,reference,status,metadata)
      select id,customer_id,${input.amount},currency,${input.method??null},${input.reference??null},'received',jsonb_build_object('source','oryx_finance')
      from valid returning id,invoice_id,amount
    ), updated as (
      update invoices i set amount_paid=i.amount_paid+payment.amount,
        status=case when i.amount_paid+payment.amount>=i.total then 'paid' else 'partial' end
      from payment where i.id=payment.invoice_id returning i.id,i.amount_paid,i.total,i.currency,i.status,i.order_id
    ), audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select ${input.actorId??null},'invoice',updated.id,'payment_received',jsonb_build_object('amount',payment.amount,'amount_paid',updated.amount_paid,'status',updated.status)
      from updated join payment on payment.invoice_id=updated.id returning id
    )
    select payment.id as payment_id,updated.id as invoice_id,updated.amount_paid,updated.total,updated.currency,updated.status,updated.order_id
    from updated join payment on payment.invoice_id=updated.id
  `;
  const row=rows[0];
  if(!row) throw new Error("Payment exceeds the outstanding balance or the invoice is closed.");

  const customerRows=await sql`
    select customer_id,invoice_number
    from invoices
    where id=${row.invoice_id}
    limit 1
  `;
  const customer=customerRows[0];
  if(customer?.customer_id){
    await queueInAppNotification({
      recipientType:"customer",
      recipientId:String(customer.customer_id),
      templateKey:"payment_received",
      subject:`تم استلام دفعتك للفاتورة #${Number(customer.invoice_number)}`,
      body:`تم تسجيل الدفعة. المحصل الآن ${Number(row.amount_paid).toLocaleString("en-US")} من ${Number(row.total).toLocaleString("en-US")} ${String(row.currency)}.`,
      relatedType:"invoice",
      relatedId:String(row.invoice_id)
    });
  }

  return {paymentId:String(row.payment_id),invoiceId:String(row.invoice_id),amountPaid:Number(row.amount_paid),total:Number(row.total),currency:String(row.currency),status:String(row.status),orderId:row.order_id?String(row.order_id):null};
}
