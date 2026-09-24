-- ORYX dynamic service rules and compatibility engine

create table if not exists service_field_rules (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  target_field_key text not null,
  rule_type text not null
    check (rule_type in ('show_if','hide_if','require_if','disable_if','validate')),
  conditions jsonb not null default '{}'::jsonb,
  message_ar text,
  priority integer not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists service_option_compatibility (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  field_key text not null,
  option_value text not null,
  depends_on_field_key text not null,
  allowed_values jsonb not null default '[]'::jsonb,
  excluded_values jsonb not null default '[]'::jsonb,
  note_ar text,
  is_active boolean not null default true,
  unique(service_id,field_key,option_value,depends_on_field_key)
);

create table if not exists service_validation_rules (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  rule_key text not null,
  rule_type text not null
    check (rule_type in ('min','max','multiple_of','range','regex','formula','cross_field')),
  field_key text,
  config jsonb not null default '{}'::jsonb,
  error_message_ar text not null,
  severity text not null default 'error'
    check (severity in ('info','warning','error')),
  is_active boolean not null default true,
  unique(service_id,rule_key)
);

create table if not exists service_preflight_requirements (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  requirement_key text not null,
  label_ar text not null,
  requirement_type text not null default 'check'
    check (requirement_type in ('check','file','measurement','approval','sample')),
  config jsonb not null default '{}'::jsonb,
  customer_visible boolean not null default true,
  required_before_quote boolean not null default false,
  required_before_production boolean not null default true,
  sort_order integer not null default 0,
  unique(service_id,requirement_key)
);

create index if not exists idx_service_field_rules_service on service_field_rules(service_id,target_field_key);
create index if not exists idx_service_option_compatibility_service on service_option_compatibility(service_id,field_key);
create index if not exists idx_service_validation_rules_service on service_validation_rules(service_id);
create index if not exists idx_service_preflight_service on service_preflight_requirements(service_id);
