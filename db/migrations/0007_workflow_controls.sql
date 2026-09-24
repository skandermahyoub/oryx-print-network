-- ORYX order and quote workflow controls

create table if not exists order_status_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  from_status text,
  to_status text not null,
  actor_id uuid references app_users(id) on delete set null,
  reason text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists quote_events (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references quotes(id) on delete cascade,
  event_type text not null,
  actor_id uuid references app_users(id) on delete set null,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists order_approvals (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  approval_type text not null default 'order_details'
    check (approval_type in ('order_details','price','production_release')),
  specs_snapshot jsonb not null default '{}'::jsonb,
  signature_document_id uuid references documents(id) on delete set null,
  approved_at timestamptz not null default now(),
  revoked_at timestamptz,
  notes text
);

create table if not exists production_release_checks (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid not null references order_items(id) on delete cascade,
  check_key text not null,
  passed boolean not null default false,
  checked_by uuid references app_users(id) on delete set null,
  checked_at timestamptz,
  notes text,
  unique(order_item_id,check_key)
);

create index if not exists idx_order_status_events_order on order_status_events(order_id,created_at);
create index if not exists idx_quote_events_quote on quote_events(quote_id,created_at);
create index if not exists idx_order_approvals_order on order_approvals(order_id);
create index if not exists idx_release_checks_item on production_release_checks(order_item_id);
