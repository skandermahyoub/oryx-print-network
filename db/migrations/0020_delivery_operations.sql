-- ORYX delivery and installation operations

alter table delivery_jobs
  add column if not exists assigned_to uuid references app_users(id) on delete set null,
  add column if not exists origin_partner_id uuid references partners(id) on delete set null,
  add column if not exists origin_address text,
  add column if not exists actual_fee numeric(14,2),
  add column if not exists currency text not null default 'YER',
  add column if not exists customer_signature_document_id uuid references documents(id) on delete set null,
  add column if not exists updated_at timestamptz not null default now();

alter table delivery_jobs
  drop constraint if exists delivery_jobs_status_check;

alter table delivery_jobs
  add constraint delivery_jobs_status_check
  check (status in ('pending','scheduled','picked_up','out_for_delivery','delivered','failed','rescheduled','cancelled'));

create table if not exists delivery_events (
  id uuid primary key default gen_random_uuid(),
  delivery_job_id uuid not null references delivery_jobs(id) on delete cascade,
  from_status text,
  to_status text not null,
  actor_id uuid references app_users(id) on delete set null,
  note text,
  proof_document_id uuid references documents(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists installation_events (
  id uuid primary key default gen_random_uuid(),
  installation_job_id uuid not null references installation_jobs(id) on delete cascade,
  from_status text,
  to_status text not null,
  actor_id uuid references app_users(id) on delete set null,
  note text,
  proof_document_id uuid references documents(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_delivery_jobs_status on delivery_jobs(status,scheduled_at);
create index if not exists idx_delivery_jobs_assigned_to on delivery_jobs(assigned_to,status);
create index if not exists idx_delivery_events_job on delivery_events(delivery_job_id,created_at);
create index if not exists idx_installation_events_job on installation_events(installation_job_id,created_at);
