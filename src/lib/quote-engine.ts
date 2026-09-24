import { getSql } from "@/lib/db";

export async function createDraftQuoteFromOrder(orderId:string,validDays=7){
  const sql=getSql();
  const rows=await sql`
    with source_order as (
      select id,customer_id,currency,status
      from orders
      where id=${orderId}
        and status not in ('completed','cancelled')
      limit 1
    ),
    existing_draft as (
      select q.id,q.quote_number
      from quotes q
      join source_order so on so.id=q.source_order_id
      where q.status='draft'
      order by q.created_at desc
      limit 1
    ),
    totals as (
      select
        coalesce(sum(coalesce(oi.total_price,0)),0)::numeric(14,2) as subtotal
      from order_items oi
      join source_order so on so.id=oi.order_id
    ),
    new_quote as (
      insert into quotes (
        customer_id,source_order_id,status,currency,subtotal,total,valid_until,notes
      )
      select
        source_order.customer_id,
        source_order.id,
        'draft',
        source_order.currency,
        totals.subtotal,
        totals.subtotal,
        current_date+${validDays},
        'Created from ORYX order'
      from source_order cross join totals
      where not exists(select 1 from existing_draft)
      returning id,quote_number
    ),
    chosen_quote as (
      select id,quote_number,false as created from existing_draft
      union all
      select id,quote_number,true as created from new_quote
      limit 1
    ),
    new_items as (
      insert into quote_items (
        quote_id,source_order_item_id,service_id,quantity,specifications,
        unit_price,total_price,cost_estimate,margin_estimate
      )
      select
        chosen_quote.id,
        oi.id,
        oi.service_id,
        oi.quantity,
        oi.specifications,
        oi.unit_price,
        oi.total_price,
        null,
        null
      from order_items oi
      cross join chosen_quote
      where oi.order_id=${orderId}
        and chosen_quote.created=true
      returning id
    ),
    quote_event as (
      insert into quote_events (quote_id,event_type,notes)
      select id,'created_from_order','Draft quote created from order'
      from chosen_quote
      where created=true
      returning id
    )
    select id,quote_number,created from chosen_quote
  `;

  const quote=rows[0];
  if(!quote) throw new Error("Order not found or cannot create a quote.");
  return {
    quoteId:String(quote.id),
    quoteNumber:Number(quote.quote_number),
    reused:!Boolean(quote.created)
  };
}

export async function recalculateQuote(quoteId:string){
  const sql=getSql();
  const rows=await sql`
    with totals as (
      select
        coalesce(sum(coalesce(total_price,0)),0)::numeric(14,2) as subtotal
      from quote_items
      where quote_id=${quoteId}
    )
    update quotes q
    set
      subtotal=totals.subtotal,
      total=greatest(0,totals.subtotal-q.discount),
      updated_at=now()
    from totals
    where q.id=${quoteId}
    returning q.subtotal,q.discount,q.total,q.currency
  `;

  if(!rows[0]) throw new Error("Quote not found.");
  return {
    subtotal:Number(rows[0].subtotal),
    discount:Number(rows[0].discount),
    total:Number(rows[0].total),
    currency:String(rows[0].currency)
  };
}
