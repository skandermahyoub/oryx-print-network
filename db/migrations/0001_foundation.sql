-- ORYX Print Network foundation schema (PostgreSQL / Neon)
create extension if not exists pgcrypto;

create table if not exists departments (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_ar text not null,
  name_en text,
  description_ar text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  department_id uuid not null references departments(id) on delete cascade,
  parent_id uuid references categories(id) on delete cascade,
  slug text not null,
  name_ar text not null,
  name_en text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (department_id, slug)
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete restrict,
  slug text not null unique,
  name_ar text not null,
  name_en text,
  short_description_ar text,
  long_description_ar text,
  selling_mode text not null default 'request_quote'
    check (selling_mode in ('buy_now','instant_quote','request_quote','consultation')),
  pricing_mode text not null default 'manual_quote'
    check (pricing_mode in ('fixed','per_unit','tiered','matrix','formula','manual_quote')),
  requires_design_approval boolean not null default false,
  allows_urgent boolean not null default false,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  is_public boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists service_fields (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  field_key text not null,
  label_ar text not null,
  field_type text not null,
  is_required boolean not null default false,
  affects_price boolean not null default false,
  affects_material boolean not null default false,
  affects_production boolean not null default false,
  customer_visible boolean not null default true,
  staff_visible boolean not null default true,
  config jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  unique(service_id, field_key)
);

create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  trade_name text,
  partner_type text not null default 'production_partner'
    check (partner_type in ('production_partner','verified_partner','strategic_partner')),
  status text not null default 'applicant'
    check (status in ('applicant','under_review','active','suspended','rejected')),
  city text,
  address text,
  phone text,
  email text,
  pricing_terms text,
  settlement_terms text,
  performance_score numeric(5,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists partner_capabilities (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id) on delete cascade,
  service_id uuid not null references services(id) on delete cascade,
  base_cost numeric(14,2),
  currency text not null default 'YER',
  min_quantity numeric(14,3),
  normal_lead_hours integer,
  urgent_lead_hours integer,
  daily_capacity numeric(14,3),
  is_active boolean not null default true,
  valid_until date,
  metadata jsonb not null default '{}'::jsonb,
  unique(partner_id, service_id)
);

create table if not exists packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_ar text not null,
  description_ar text,
  target_segment text,
  offer_price numeric(14,2),
  currency text not null default 'YER',
  valid_from timestamptz,
  valid_until timestamptz,
  is_active boolean not null default true,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_ar text not null,
  project_type text not null default 'oryx_initiative',
  status text not null default 'idea',
  brief text,
  budget numeric(14,2),
  currency text not null default 'YER',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  customer_type text not null default 'individual'
    check (customer_type in ('individual','business','organization')),
  display_name text not null,
  company_name text,
  phone text,
  email text,
  city text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity unique,
  customer_id uuid references customers(id) on delete set null,
  status text not null default 'draft',
  currency text not null default 'YER',
  subtotal numeric(14,2) not null default 0,
  discount numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  service_id uuid not null references services(id) on delete restrict,
  quantity numeric(14,3) not null default 1,
  specifications jsonb not null default '{}'::jsonb,
  unit_price numeric(14,2),
  total_price numeric(14,2),
  assigned_partner_id uuid references partners(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_categories_department on categories(department_id);
create index if not exists idx_services_category on services(category_id);
create index if not exists idx_service_fields_service on service_fields(service_id);
create index if not exists idx_partner_capabilities_service on partner_capabilities(service_id);
create index if not exists idx_orders_customer on orders(customer_id);
create index if not exists idx_order_items_order on order_items(order_id);
