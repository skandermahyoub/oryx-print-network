-- ORYX package configurator requests

create table if not exists package_requests (
  id uuid primary key default gen_random_uuid(),
  request_number bigint generated always as identity unique,
  package_id uuid not null references packages(id) on delete restrict,
  customer_id uuid references customers(id) on delete set null,
  status text not null default 'submitted'
    check (status in ('draft','submitted','under_review','quoted','converted','cancelled')),
  notes text,
  preferred_contact text,
  converted_quote_id uuid references quotes(id) on delete set null,
  converted_order_id uuid references orders(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists package_request_items (
  id uuid primary key default gen_random_uuid(),
  package_request_id uuid not null references package_requests(id) on delete cascade,
  package_item_id uuid references package_items(id) on delete set null,
  item_name text not null,
  quantity numeric(14,3) not null default 1,
  notes text,
  config jsonb not null default '{}'::jsonb
);

create index if not exists idx_package_requests_status on package_requests(status,created_at desc);
create index if not exists idx_package_requests_customer on package_requests(customer_id,created_at desc);
create index if not exists idx_package_request_items_request on package_request_items(package_request_id);
