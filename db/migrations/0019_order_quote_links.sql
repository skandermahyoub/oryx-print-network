-- Link quotes and quote items back to their source order context.

alter table quotes
  add column if not exists source_order_id uuid references orders(id) on delete set null;

alter table quote_items
  add column if not exists source_order_item_id uuid references order_items(id) on delete set null;

alter table orders
  add column if not exists accepted_quote_id uuid references quotes(id) on delete set null;

create index if not exists idx_quotes_source_order on quotes(source_order_id,created_at desc);
create index if not exists idx_quote_items_source_item on quote_items(source_order_item_id);
create index if not exists idx_orders_accepted_quote on orders(accepted_quote_id);
