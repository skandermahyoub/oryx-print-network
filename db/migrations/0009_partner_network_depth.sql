-- ORYX Production Network depth

create table if not exists partner_contacts (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id) on delete cascade,
  full_name text not null,
  title text,
  phone text,
  email text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists partner_locations (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id) on delete cascade,
  label text,
  city text not null,
  address text,
  location jsonb,
  service_radius_km numeric(8,2),
  supports_pickup boolean not null default true,
  supports_delivery boolean not null default false,
  supports_installation boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists partner_machines (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id) on delete cascade,
  name text not null,
  machine_type text not null,
  brand text,
  model text,
  technology text,
  max_width_mm numeric(10,2),
  max_height_mm numeric(10,2),
  color_configuration text,
  status text not null default 'active'
    check (status in ('active','maintenance','offline','retired')),
  capabilities jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists partner_price_submissions (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id) on delete cascade,
  service_id uuid not null references services(id) on delete cascade,
  pricing_model text not null default 'base_cost',
  currency text not null default 'YER',
  base_cost numeric(14,2),
  minimum_charge numeric(14,2),
  minimum_quantity numeric(14,3),
  tiers jsonb not null default '[]'::jsonb,
  conditions jsonb not null default '{}'::jsonb,
  normal_lead_hours integer,
  urgent_lead_hours integer,
  valid_from date not null default current_date,
  valid_until date,
  status text not null default 'submitted'
    check (status in ('draft','submitted','approved','rejected','expired','superseded')),
  submitted_by uuid references app_users(id) on delete set null,
  reviewed_by uuid references app_users(id) on delete set null,
  reviewed_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists partner_compliance_documents (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id) on delete cascade,
  document_type text not null,
  document_id uuid references documents(id) on delete set null,
  reference_number text,
  issued_at date,
  expires_at date,
  verification_status text not null default 'pending'
    check (verification_status in ('pending','verified','rejected','expired')),
  verified_by uuid references app_users(id) on delete set null,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists partner_capacity_windows (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id) on delete cascade,
  service_id uuid references services(id) on delete cascade,
  window_date date not null,
  available_capacity numeric(14,3),
  unit text,
  urgent_slots integer,
  notes text,
  unique(partner_id,service_id,window_date)
);

create table if not exists partner_score_snapshots (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id) on delete cascade,
  overall_score numeric(5,2) not null,
  quality_score numeric(5,2),
  on_time_score numeric(5,2),
  cost_score numeric(5,2),
  response_score numeric(5,2),
  rework_rate numeric(7,4),
  complaint_rate numeric(7,4),
  jobs_count integer not null default 0,
  calculated_at timestamptz not null default now()
);

create index if not exists idx_partner_contacts_partner on partner_contacts(partner_id);
create index if not exists idx_partner_locations_partner on partner_locations(partner_id);
create index if not exists idx_partner_machines_partner on partner_machines(partner_id);
create index if not exists idx_partner_price_submissions_service on partner_price_submissions(service_id,status);
create index if not exists idx_partner_price_submissions_partner on partner_price_submissions(partner_id,status);
create index if not exists idx_partner_compliance_partner on partner_compliance_documents(partner_id);
create index if not exists idx_partner_capacity_date on partner_capacity_windows(window_date);
create index if not exists idx_partner_score_snapshots_partner on partner_score_snapshots(partner_id,calculated_at desc);
