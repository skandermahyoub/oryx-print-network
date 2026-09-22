import { getSql } from "@/lib/db";

export async function createDraftQuoteFromOrder(orderId:string,validDays=7){
  const sql=getSql();
  const rows=await sql`
    with source_order as (
      select id,customer_id,currency
      from orders
      where id=${orderId}
      limit 1
    ),
    totals as (
      select
        coalesce(sum(coalesce(oi.total_price,0)),0)::numeric(14,2) as subtotal
      from order_items oi
      where oi.order_id=${orderId}
    ),
    new_quote as (
      insert into quotes (customer_id,status,currency,subtotal,total,valid_until,notes)
      select
        source_order.customer_id,
        'draft',
        source_order.currency,
        totals.subtotal,
        totals.subtotal,
        current_date+${validDays},
        'Created from ORYX order'
      from source_order cross join totals
      returning id,quote_number
    ),
    new_items as (
      insert into quote_items (
        quote_id,service_id,quantity,specifications,unit_price,total_price,cost_estimate,margin_estimate
      )
      select
        new_quote.id,
        oi.service_id,
        oi.quantity,
        oi.specifications,
        oi.unit_price,
        oi.total_price,
        null,
        case
          when oi.total_price is null then null
          else oi.total_price
        end
      from order_items oi cross join new_quote
      where oi.order_id=${orderId}
      returning id
    ),
    quote_event as (
      insert into quote_events (quote_id,event_type,notes)
      select id,'created_from_order','Draft quote created from order'
      from new_quote
      returning id
    )
    select id,quote_number from new_quote
  `;

  const quote=rows[0];
  if(!quote) throw new Error("Order not found or contains no quote source.");
  return {quoteId:String(quote.id),quoteNumber:Number(quote.quote_number)};
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
