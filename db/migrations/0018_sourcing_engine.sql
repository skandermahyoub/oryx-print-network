-- ORYX sourcing and partner assignment engine

create table if not exists sourcing_requests (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid not null references order_items(id) on delete cascade,
  status text not null default 'open'
    check (status in ('open','quoting','ready_to_assign','assigned','cancelled','closed')),
  requested_quantity numeric(14,3) not null default 1,
  required_by timestamptz,
  city text,
  urgent boolean not null default false,
  constraints jsonb not null default '{}'::jsonb,
  requested_by uuid references app_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists sourcing_candidates (
  id uuid primary key default gen_random_uuid(),
  sourcing_request_id uuid not null references sourcing_requests(id) on delete cascade,
  partner_id uuid not null references partners(id) on delete cascade,
  rank integer not null,
  routing_score numeric(7,2) not null,
  base_cost numeric(14,2),
  currency text not null default 'YER',
  lead_hours integer,
  active_jobs integer not null default 0,
  reasons jsonb not null default '[]'::jsonb,
  status text not null default 'candidate'
    check (status in ('candidate','invited','declined','quoted','selected','not_selected','ineligible')),
  invited_at timestamptz,
  responded_at timestamptz,
  created_at timestamptz not null default now(),
  unique(sourcing_request_id,partner_id)
);

create table if not exists sourcing_partner_quotes (
  id uuid primary key default gen_random_uuid(),
  sourcing_request_id uuid not null references sourcing_requests(id) on delete cascade,
  partner_id uuid not null references partners(id) on delete cascade,
  amount numeric(14,2) not null,
  currency text not null default 'YER',
  lead_hours integer,
  valid_until timestamptz,
  notes text,
  status text not null default 'submitted'
    check (status in ('submitted','approved','rejected','expired','withdrawn')),
  submitted_by uuid references app_users(id) on delete set null,
  reviewed_by uuid references app_users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists production_assignments (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid not null references order_items(id) on delete cascade,
  sourcing_request_id uuid references sourcing_requests(id) on delete set null,
  partner_id uuid not null references partners(id) on delete restrict,
  work_order_id uuid references work_orders(id) on delete set null,
  status text not null default 'assigned'
    check (status in ('assigned','accepted','in_production','completed','cancelled','reassigned')),
  buy_cost numeric(14,2),
  currency text not null default 'YER',
  routing_score numeric(7,2),
  routing_snapshot jsonb not null default '{}'::jsonb,
  override_reason text,
  selected_by uuid references app_users(id) on delete set null,
  selected_at timestamptz not null default now(),
  accepted_at timestamptz,
  completed_at timestamptz
);

create unique index if not exists uq_active_assignment_per_item
  on production_assignments(order_item_id)
  where status in ('assigned','accepted','in_production');

create index if not exists idx_sourcing_requests_status on sourcing_requests(status,created_at desc);
create index if not exists idx_sourcing_requests_item on sourcing_requests(order_item_id);
create index if not exists idx_sourcing_candidates_request on sourcing_candidates(sourcing_request_id,rank);
create index if not exists idx_sourcing_quotes_request on sourcing_partner_quotes(sourcing_request_id,status);
create index if not exists idx_production_assignments_partner on production_assignments(partner_id,status);
