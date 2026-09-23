-- ORYX material reservation integrity and consumption accounting

alter table material_reservations
  add column if not exists consumed_quantity numeric(14,3) not null default 0;

alter table material_reservations
  drop constraint if exists material_reservations_quantity_positive;

alter table material_reservations
  add constraint material_reservations_quantity_positive
  check (quantity>0);

alter table material_reservations
  drop constraint if exists material_reservations_consumed_quantity_valid;

alter table material_reservations
  add constraint material_reservations_consumed_quantity_valid
  check (consumed_quantity>=0 and consumed_quantity<=quantity);

alter table material_consumptions
  drop constraint if exists material_consumptions_quantities_nonnegative;

alter table material_consumptions
  add constraint material_consumptions_quantities_nonnegative
  check (quantity_good>=0 and quantity_waste>=0 and quantity_good+quantity_waste>0);

create unique index if not exists idx_material_reservation_active_unique
  on material_reservations(work_order_id,inventory_item_id,warehouse_id)
  where status in ('reserved','partially_consumed');

create index if not exists idx_material_reservations_item_warehouse_active
  on material_reservations(inventory_item_id,warehouse_id,status);
