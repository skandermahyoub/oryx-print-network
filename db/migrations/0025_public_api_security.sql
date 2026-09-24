-- Public API abuse protection

create table if not exists api_rate_limits (
  endpoint text not null,
  key_hash text not null,
  window_start timestamptz not null,
  hits integer not null default 1,
  updated_at timestamptz not null default now(),
  primary key (endpoint,key_hash,window_start)
);

create index if not exists idx_api_rate_limits_updated_at
  on api_rate_limits(updated_at);

create index if not exists idx_customers_phone
  on customers(phone)
  where phone is not null;

create index if not exists idx_customers_email_lower
  on customers(lower(email))
  where email is not null;
