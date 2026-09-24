-- ORYX logistics integrity guards
-- Keep fulfilment evidence trustworthy at the database boundary.

alter table delivery_jobs
  drop constraint if exists delivery_jobs_type_check,
  drop constraint if exists delivery_jobs_fee_nonnegative_check,
  drop constraint if exists delivery_jobs_actual_fee_nonnegative_check,
  drop constraint if exists delivery_jobs_delivered_at_check;

alter table delivery_jobs
  add constraint delivery_jobs_type_check
    check (delivery_type in ('delivery','pickup')),
  add constraint delivery_jobs_fee_nonnegative_check
    check (fee >= 0),
  add constraint delivery_jobs_actual_fee_nonnegative_check
    check (actual_fee is null or actual_fee >= 0),
  add constraint delivery_jobs_delivered_at_check
    check (status <> 'delivered' or delivered_at is not null);

alter table installation_jobs
  drop constraint if exists installation_jobs_completed_at_check;

alter table installation_jobs
  add constraint installation_jobs_completed_at_check
    check (status <> 'completed' or completed_at is not null);

-- A completed fulfilment record is historical evidence. New attempts are allowed
-- only after prior jobs are completed/cancelled, while duplicate active jobs are blocked.
create unique index if not exists uq_delivery_jobs_active_order
  on delivery_jobs(order_id)
  where status not in ('delivered','cancelled');

create unique index if not exists uq_installation_jobs_active_order
  on installation_jobs(order_id)
  where status not in ('completed','cancelled');

create index if not exists idx_delivery_jobs_order_status
  on delivery_jobs(order_id,status);

create index if not exists idx_installation_jobs_order_status
  on installation_jobs(order_id,status);
