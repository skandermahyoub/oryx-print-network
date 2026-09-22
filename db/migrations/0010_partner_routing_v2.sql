-- Upgrade partner routing to prefer approved partner price submissions and score snapshots.

create or replace view partner_routing_candidates as
select
  p.id as partner_id,
  coalesce(p.trade_name,p.legal_name) as partner_name,
  p.city,
  coalesce(score.overall_score,p.performance_score) as performance_score,
  pc.service_id,
  coalesce(price.base_cost,pc.base_cost) as base_cost,
  coalesce(price.currency,pc.currency) as currency,
  coalesce(price.minimum_quantity,pc.min_quantity) as min_quantity,
  coalesce(price.normal_lead_hours,pc.normal_lead_hours) as normal_lead_hours,
  coalesce(price.urgent_lead_hours,pc.urgent_lead_hours) as urgent_lead_hours,
  pc.daily_capacity,
  coalesce(price.valid_until,pc.valid_until) as valid_until,
  (
    select count(*)::integer
    from work_orders wo
    where wo.partner_id=p.id
      and wo.status not in ('completed','cancelled')
  ) as active_jobs
from partners p
join partner_capabilities pc on pc.partner_id=p.id
left join lateral (
  select
    pps.base_cost,
    pps.currency,
    pps.minimum_quantity,
    pps.normal_lead_hours,
    pps.urgent_lead_hours,
    pps.valid_until
  from partner_price_submissions pps
  where pps.partner_id=p.id
    and pps.service_id=pc.service_id
    and pps.status='approved'
    and pps.valid_from<=current_date
    and (pps.valid_until is null or pps.valid_until>=current_date)
  order by pps.reviewed_at desc nulls last,pps.created_at desc
  limit 1
) price on true
left join lateral (
  select pss.overall_score
  from partner_score_snapshots pss
  where pss.partner_id=p.id
  order by pss.calculated_at desc
  limit 1
) score on true
where p.status='active'
  and pc.is_active=true
  and (
    (price.valid_until is null and pc.valid_until is null)
    or coalesce(price.valid_until,pc.valid_until)>=current_date
  );
