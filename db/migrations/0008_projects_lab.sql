-- ORYX Projects Lab operational model

create table if not exists project_sponsorship_packages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name_ar text not null,
  description_ar text,
  price numeric(14,2),
  currency text not null default 'YER',
  inventory_limit integer,
  benefits jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists project_deliverables (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  deliverable_type text,
  quantity numeric(14,3),
  status text not null default 'planned',
  due_at timestamptz,
  owner_id uuid references app_users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists project_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  status text not null default 'todo',
  priority text not null default 'normal',
  assigned_to uuid references app_users(id) on delete set null,
  due_at timestamptz,
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists project_budget_lines (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  line_type text not null check (line_type in ('cost','revenue','sponsorship','advertising','in_kind')),
  category text,
  description text not null,
  planned_amount numeric(14,2) not null default 0,
  actual_amount numeric(14,2) not null default 0,
  currency text not null default 'YER',
  partner_id uuid references partners(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists project_kpis (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  key text not null,
  label_ar text not null,
  target_value numeric(18,3),
  actual_value numeric(18,3),
  unit text,
  updated_at timestamptz not null default now(),
  unique(project_id,key)
);

create table if not exists project_documents (
  project_id uuid not null references projects(id) on delete cascade,
  document_id uuid not null references documents(id) on delete cascade,
  purpose text,
  sort_order integer not null default 0,
  primary key(project_id,document_id)
);

create index if not exists idx_project_sponsorship_packages_project on project_sponsorship_packages(project_id);
create index if not exists idx_project_deliverables_project on project_deliverables(project_id);
create index if not exists idx_project_tasks_project on project_tasks(project_id,status);
create index if not exists idx_project_budget_lines_project on project_budget_lines(project_id,line_type);
