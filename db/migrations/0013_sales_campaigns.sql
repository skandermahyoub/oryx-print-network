-- ORYX proactive sales campaigns

create table if not exists sales_campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_ar text not null,
  objective text not null,
  status text not null default 'draft'
    check (status in ('draft','planned','active','paused','completed','cancelled')),
  package_id uuid references packages(id) on delete set null,
  project_id uuid references projects(id) on delete set null,
  starts_at date,
  ends_at date,
  target_revenue numeric(14,2),
  currency text not null default 'YER',
  owner_id uuid references app_users(id) on delete set null,
  pitch text,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists campaign_segments (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references sales_campaigns(id) on delete cascade,
  segment_key text not null,
  label_ar text not null,
  criteria jsonb not null default '{}'::jsonb,
  priority integer not null default 100,
  unique(campaign_id,segment_key)
);

create table if not exists campaign_targets (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references sales_campaigns(id) on delete cascade,
  segment_id uuid references campaign_segments(id) on delete set null,
  lead_id uuid references leads(id) on delete set null,
  customer_id uuid references customers(id) on delete set null,
  company_name text,
  contact_name text,
  phone text,
  email text,
  city text,
  source text,
  status text not null default 'new'
    check (status in ('new','researched','contacted','interested','meeting','quoted','won','lost','do_not_contact')),
  score integer not null default 0,
  next_action_at timestamptz,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists campaign_touchpoints (
  id uuid primary key default gen_random_uuid(),
  campaign_target_id uuid not null references campaign_targets(id) on delete cascade,
  channel text not null,
  direction text not null default 'outbound'
    check (direction in ('outbound','inbound')),
  outcome text,
  subject text,
  notes text,
  performed_by uuid references app_users(id) on delete set null,
  performed_at timestamptz not null default now()
);

create table if not exists campaign_offers (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references sales_campaigns(id) on delete cascade,
  name_ar text not null,
  headline_ar text,
  description_ar text,
  discount_type text
    check (discount_type in ('none','fixed','percent','custom')),
  discount_value numeric(14,2),
  valid_from date,
  valid_until date,
  conditions jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists campaign_results (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references sales_campaigns(id) on delete cascade,
  target_id uuid references campaign_targets(id) on delete set null,
  opportunity_id uuid references opportunities(id) on delete set null,
  quote_id uuid references quotes(id) on delete set null,
  order_id uuid references orders(id) on delete set null,
  revenue numeric(14,2),
  gross_profit numeric(14,2),
  currency text not null default 'YER',
  result_type text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_sales_campaigns_status on sales_campaigns(status,starts_at);
create index if not exists idx_campaign_targets_campaign on campaign_targets(campaign_id,status,score desc);
create index if not exists idx_campaign_touchpoints_target on campaign_touchpoints(campaign_target_id,performed_at desc);
create index if not exists idx_campaign_results_campaign on campaign_results(campaign_id,created_at desc);
