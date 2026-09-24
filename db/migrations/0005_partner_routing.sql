-- Production partner performance and routing support

create table if not exists partner_performance_events (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id) on delete cascade,
  service_id uuid references services(id) on delete set null,
  work_order_id uuid references work_orders(id) on delete set null,
  event_type text not null,
  score numeric(5,2),
  on_time boolean,
  rework boolean not null default false,
  complaint boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_partner_performance_partner on partner_performance_events(partner_id);
create index if not exists idx_partner_performance_service on partner_performance_events(service_id);

create or replace view partner_routing_candidates as
select
  p.id as partner_id,
  coalesce(p.trade_name,p.legal_name) as partner_name,
  p.city,
  p.performance_score,
  pc.service_id,
  pc.base_cost,
  pc.currency,
  pc.min_quantity,
  pc.normal_lead_hours,
  pc.urgent_lead_hours,
  pc.daily_capacity,
  pc.valid_until,
  (
    select count(*)::integer
    from work_orders wo
    where wo.partner_id=p.id
      and wo.status not in ('completed','cancelled')
  ) as active_jobs
from partners p
join partner_capabilities pc on pc.partner_id=p.id
where p.status='active'
  and pc.is_active=true
  and (pc.valid_until is null or pc.valid_until>=current_date);
