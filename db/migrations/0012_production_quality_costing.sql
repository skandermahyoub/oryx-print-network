-- ORYX production quality, machine assignment and job costing

create table if not exists work_order_machine_assignments (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references work_orders(id) on delete cascade,
  partner_machine_id uuid references partner_machines(id) on delete set null,
  assigned_by uuid references app_users(id) on delete set null,
  scheduled_start timestamptz,
  scheduled_end timestamptz,
  actual_start timestamptz,
  actual_end timestamptz,
  machine_cost_per_hour numeric(14,4),
  currency text not null default 'YER',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists qc_inspections (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references work_orders(id) on delete cascade,
  inspection_type text not null default 'final'
    check (inspection_type in ('incoming','in_process','final','rework')),
  status text not null default 'pending'
    check (status in ('pending','passed','failed','conditional')),
  inspected_by uuid references app_users(id) on delete set null,
  sample_quantity numeric(14,3),
  accepted_quantity numeric(14,3),
  rejected_quantity numeric(14,3),
  notes text,
  inspected_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists qc_check_items (
  id uuid primary key default gen_random_uuid(),
  inspection_id uuid not null references qc_inspections(id) on delete cascade,
  check_key text not null,
  label_ar text not null,
  result text not null default 'pending'
    check (result in ('pending','pass','fail','not_applicable')),
  measurement text,
  tolerance text,
  notes text,
  unique(inspection_id,check_key)
);

create table if not exists rework_orders (
  id uuid primary key default gen_random_uuid(),
  source_work_order_id uuid not null references work_orders(id) on delete restrict,
  reason text not null,
  responsibility text
    check (responsibility in ('oryx','partner','customer','material','unknown')),
  status text not null default 'open'
    check (status in ('open','approved','in_progress','completed','cancelled')),
  quantity numeric(14,3),
  estimated_cost numeric(14,2),
  actual_cost numeric(14,2),
  currency text not null default 'YER',
  approved_by uuid references app_users(id) on delete set null,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists job_cost_lines (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid not null references order_items(id) on delete cascade,
  work_order_id uuid references work_orders(id) on delete set null,
  cost_type text not null
    check (cost_type in ('material','labor','machine','design','partner','outsource','waste','delivery','installation','other')),
  description text,
  quantity numeric(14,3) not null default 1,
  unit_cost numeric(14,4) not null default 0,
  total_cost numeric(14,2) not null default 0,
  currency text not null default 'YER',
  source_type text,
  source_id uuid,
  is_estimate boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists installation_jobs (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  work_order_id uuid references work_orders(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending','scheduled','on_site','completed','failed','rescheduled','cancelled')),
  address text,
  location jsonb,
  scheduled_at timestamptz,
  technician_name text,
  technician_phone text,
  partner_id uuid references partners(id) on delete set null,
  proof_document_id uuid references documents(id) on delete set null,
  customer_signature_document_id uuid references documents(id) on delete set null,
  notes text,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace view order_item_profitability as
select
  oi.id as order_item_id,
  oi.order_id,
  oi.total_price as revenue,
  coalesce(sum(jcl.total_cost),0)::numeric(14,2) as total_cost,
  case
    when oi.total_price is null then null
    else (oi.total_price-coalesce(sum(jcl.total_cost),0))::numeric(14,2)
  end as gross_profit,
  case
    when oi.total_price is null or oi.total_price=0 then null
    else (((oi.total_price-coalesce(sum(jcl.total_cost),0))/oi.total_price)*100)::numeric(7,2)
  end as gross_margin_percent
from order_items oi
left join job_cost_lines jcl on jcl.order_item_id=oi.id and jcl.is_estimate=false
group by oi.id,oi.order_id,oi.total_price;

create index if not exists idx_machine_assignments_work_order on work_order_machine_assignments(work_order_id);
create index if not exists idx_qc_inspections_work_order on qc_inspections(work_order_id,status);
create index if not exists idx_rework_source on rework_orders(source_work_order_id,status);
create index if not exists idx_job_cost_lines_item on job_cost_lines(order_item_id,cost_type);
create index if not exists idx_installation_jobs_order on installation_jobs(order_id,status);
