-- ORYX Print Network commercial operating core

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  company_name text,
  phone text,
  email text,
  source text,
  status text not null default 'new',
  owner_id uuid,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists opportunities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete set null,
  customer_id uuid references customers(id) on delete set null,
  name text not null,
  stage text not null default 'new',
  estimated_value numeric(14,2),
  currency text not null default 'YER',
  probability numeric(5,2),
  expected_close_date date,
  owner_id uuid,
  lost_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  activity_type text not null,
  subject text,
  due_at timestamptz,
  completed_at timestamptz,
  owner_id uuid,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists package_items (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  service_id uuid references services(id) on delete restrict,
  item_name text,
  quantity numeric(14,3) not null default 1,
  item_role text not null default 'core' check (item_role in ('core','optional','addon')),
  default_selected boolean not null default true,
  sort_order integer not null default 0,
  config jsonb not null default '{}'::jsonb
);

create table if not exists project_sponsors (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  sponsor_name text not null,
  package_name text,
  amount numeric(14,2),
  currency text not null default 'YER',
  status text not null default 'prospect',
  contact_name text,
  phone text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number bigint generated always as identity unique,
  customer_id uuid references customers(id) on delete set null,
  order_id uuid references orders(id) on delete set null,
  status text not null default 'draft',
  currency text not null default 'YER',
  subtotal numeric(14,2) not null default 0,
  tax numeric(14,2) not null default 0,
  discount numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  amount_paid numeric(14,2) not null default 0,
  due_date date,
  issued_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references invoices(id) on delete set null,
  customer_id uuid references customers(id) on delete set null,
  amount numeric(14,2) not null,
  currency text not null default 'YER',
  method text,
  reference text,
  status text not null default 'received',
  paid_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  vendor_name text,
  work_order_id uuid references work_orders(id) on delete set null,
  amount numeric(14,2) not null,
  currency text not null default 'YER',
  expense_date date not null default current_date,
  notes text,
  document_id uuid references documents(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists partner_settlements (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id) on delete restrict,
  period_start date,
  period_end date,
  amount numeric(14,2) not null,
  currency text not null default 'YER',
  status text not null default 'pending',
  paid_at timestamptz,
  reference text,
  created_at timestamptz not null default now()
);

create table if not exists delivery_jobs (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  delivery_type text not null default 'delivery',
  status text not null default 'pending',
  recipient_name text,
  phone text,
  address text,
  location jsonb,
  scheduled_at timestamptz,
  delivered_at timestamptz,
  fee numeric(14,2) not null default 0,
  proof_document_id uuid references documents(id) on delete set null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete set null,
  order_id uuid references orders(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  title text,
  body text,
  moderation_status text not null default 'pending',
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_type text not null,
  recipient_id uuid,
  channel text not null,
  template_key text,
  subject text,
  body text,
  status text not null default 'queued',
  related_type text,
  related_id uuid,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_leads_status on leads(status);
create index if not exists idx_opportunities_stage on opportunities(stage);
create index if not exists idx_package_items_package on package_items(package_id);
create index if not exists idx_invoices_customer on invoices(customer_id);
create index if not exists idx_payments_invoice on payments(invoice_id);
create index if not exists idx_partner_settlements_partner on partner_settlements(partner_id);
create index if not exists idx_delivery_jobs_order on delivery_jobs(order_id);
create index if not exists idx_notifications_status on notifications(status);
