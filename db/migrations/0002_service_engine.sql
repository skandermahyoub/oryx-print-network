-- ORYX Print Network service engine and production core
create table if not exists materials (
  id uuid primary key default gen_random_uuid(),
  sku text unique,
  name_ar text not null,
  name_en text,
  unit text not null default 'unit',
  category text,
  attributes jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists service_materials (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  material_id uuid not null references materials(id) on delete restrict,
  role text not null default 'primary',
  quantity_formula text,
  waste_percent numeric(7,3) not null default 0,
  is_required boolean not null default false,
  config jsonb not null default '{}'::jsonb,
  unique(service_id, material_id, role)
);

create table if not exists pricing_rules (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  name text not null,
  rule_type text not null check (rule_type in ('fixed','per_unit','per_area','per_linear','tiered','matrix','formula','surcharge','discount')),
  priority integer not null default 100,
  conditions jsonb not null default '{}'::jsonb,
  calculation jsonb not null default '{}'::jsonb,
  valid_from timestamptz,
  valid_until timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists price_tiers (
  id uuid primary key default gen_random_uuid(),
  pricing_rule_id uuid not null references pricing_rules(id) on delete cascade,
  min_quantity numeric(14,3) not null,
  max_quantity numeric(14,3),
  unit_price numeric(14,2) not null,
  currency text not null default 'YER',
  unique(pricing_rule_id, min_quantity)
);

create table if not exists production_workflows (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  name_ar text not null,
  version integer not null default 1,
  is_default boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists workflow_steps (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references production_workflows(id) on delete cascade,
  step_key text not null,
  name_ar text not null,
  sort_order integer not null,
  requires_qc boolean not null default false,
  requires_photo boolean not null default false,
  estimated_minutes integer,
  config jsonb not null default '{}'::jsonb,
  unique(workflow_id, step_key)
);

create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  quote_number bigint generated always as identity unique,
  customer_id uuid references customers(id) on delete set null,
  status text not null default 'draft',
  currency text not null default 'YER',
  subtotal numeric(14,2) not null default 0,
  discount numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  valid_until date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references quotes(id) on delete cascade,
  service_id uuid not null references services(id) on delete restrict,
  quantity numeric(14,3) not null default 1,
  specifications jsonb not null default '{}'::jsonb,
  unit_price numeric(14,2),
  total_price numeric(14,2),
  cost_estimate numeric(14,2),
  margin_estimate numeric(14,2)
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  owner_type text not null,
  owner_id uuid,
  file_name text not null,
  storage_key text not null unique,
  mime_type text,
  size_bytes bigint,
  checksum text,
  visibility text not null default 'private',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists design_jobs (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid not null references order_items(id) on delete cascade,
  status text not null default 'brief',
  assigned_to uuid,
  brief text,
  due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists design_versions (
  id uuid primary key default gen_random_uuid(),
  design_job_id uuid not null references design_jobs(id) on delete cascade,
  version_number integer not null,
  document_id uuid references documents(id) on delete set null,
  notes text,
  status text not null default 'review',
  created_at timestamptz not null default now(),
  unique(design_job_id, version_number)
);

create table if not exists design_approvals (
  id uuid primary key default gen_random_uuid(),
  design_version_id uuid not null references design_versions(id) on delete restrict,
  customer_id uuid references customers(id) on delete set null,
  decision text not null check (decision in ('approved','revision_requested','rejected')),
  signature_document_id uuid references documents(id) on delete set null,
  approved_spec_snapshot jsonb not null default '{}'::jsonb,
  notes text,
  decided_at timestamptz not null default now()
);

create table if not exists work_orders (
  id uuid primary key default gen_random_uuid(),
  work_order_number bigint generated always as identity unique,
  order_item_id uuid not null references order_items(id) on delete restrict,
  workflow_id uuid references production_workflows(id) on delete set null,
  partner_id uuid references partners(id) on delete set null,
  status text not null default 'queued',
  current_step_key text,
  priority text not null default 'normal',
  promised_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  cost_actual numeric(14,2),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists work_order_events (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references work_orders(id) on delete cascade,
  event_type text not null,
  step_key text,
  quantity_good numeric(14,3),
  quantity_waste numeric(14,3),
  notes text,
  document_id uuid references documents(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists partner_jobs (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references work_orders(id) on delete cascade,
  partner_id uuid not null references partners(id) on delete restrict,
  quoted_cost numeric(14,2),
  currency text not null default 'YER',
  lead_hours integer,
  status text not null default 'offered',
  accepted_at timestamptz,
  delivered_at timestamptz,
  quality_score numeric(5,2),
  on_time boolean,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_ar text not null,
  excerpt_ar text,
  content_ar text,
  category text,
  status text not null default 'draft',
  seo_title text,
  seo_description text,
  related_service_slugs text[] not null default '{}',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_pricing_rules_service on pricing_rules(service_id);
create index if not exists idx_workflows_service on production_workflows(service_id);
create index if not exists idx_quote_items_quote on quote_items(quote_id);
create index if not exists idx_design_jobs_order_item on design_jobs(order_item_id);
create index if not exists idx_work_orders_order_item on work_orders(order_item_id);
create index if not exists idx_partner_jobs_partner on partner_jobs(partner_id);
create index if not exists idx_blog_posts_status on blog_posts(status);
