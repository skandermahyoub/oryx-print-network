-- ORYX financial integrity guards
-- Prevent duplicate active invoices, negative monetary state, over-collection,
-- and invalid partner-settlement lifecycle values at the database boundary.

create unique index if not exists uq_invoices_one_active_per_order
  on invoices(order_id)
  where order_id is not null and status <> 'cancelled';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname='invoices_nonnegative_amounts'
  ) then
    alter table invoices add constraint invoices_nonnegative_amounts
      check (
        subtotal >= 0 and tax >= 0 and discount >= 0 and total >= 0
        and amount_paid >= 0 and amount_paid <= total
      );
  end if;

  if not exists (
    select 1 from pg_constraint where conname='payments_positive_amount'
  ) then
    alter table payments add constraint payments_positive_amount
      check (amount > 0);
  end if;

  if not exists (
    select 1 from pg_constraint where conname='partner_settlements_positive_amount'
  ) then
    alter table partner_settlements add constraint partner_settlements_positive_amount
      check (amount > 0);
  end if;

  if not exists (
    select 1 from pg_constraint where conname='partner_settlements_valid_status'
  ) then
    alter table partner_settlements add constraint partner_settlements_valid_status
      check (status in ('pending','approved','paid','disputed','cancelled'));
  end if;

  if not exists (
    select 1 from pg_constraint where conname='job_cost_lines_nonnegative_costs'
  ) then
    alter table job_cost_lines add constraint job_cost_lines_nonnegative_costs
      check (quantity >= 0 and unit_cost >= 0 and total_cost >= 0);
  end if;
end $$;

create index if not exists idx_partner_settlements_status
  on partner_settlements(status,created_at desc);

create index if not exists idx_job_cost_lines_actual
  on job_cost_lines(order_item_id)
  where is_estimate=false;
