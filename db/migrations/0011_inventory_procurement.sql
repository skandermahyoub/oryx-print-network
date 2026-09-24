-- ORYX inventory and procurement operating core

create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  trade_name text,
  status text not null default 'active'
    check (status in ('active','inactive','blocked')),
  phone text,
  email text,
  city text,
  address text,
  payment_terms text,
  currency text not null default 'YER',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists warehouses (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name_ar text not null,
  city text,
  address text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists inventory_items (
  id uuid primary key default gen_random_uuid(),
  material_id uuid references materials(id) on delete set null,
  sku text not null unique,
  name_ar text not null,
  unit text not null,
  min_stock numeric(14,3) not null default 0,
  reorder_quantity numeric(14,3),
  average_cost numeric(14,4),
  currency text not null default 'YER',
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists stock_movements (
  id uuid primary key default gen_random_uuid(),
  inventory_item_id uuid not null references inventory_items(id) on delete restrict,
  warehouse_id uuid not null references warehouses(id) on delete restrict,
  movement_type text not null
    check (movement_type in ('opening','receipt','reserve','release','consume','waste','adjust_in','adjust_out','transfer_in','transfer_out','return')),
  quantity numeric(14,3) not null,
  unit_cost numeric(14,4),
  currency text not null default 'YER',
  reference_type text,
  reference_id uuid,
  notes text,
  created_by uuid references app_users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists material_reservations (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references work_orders(id) on delete cascade,
  inventory_item_id uuid not null references inventory_items(id) on delete restrict,
  warehouse_id uuid not null references warehouses(id) on delete restrict,
  quantity numeric(14,3) not null,
  status text not null default 'reserved'
    check (status in ('reserved','partially_consumed','consumed','released')),
  reserved_at timestamptz not null default now(),
  released_at timestamptz
);

create table if not exists material_consumptions (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references work_orders(id) on delete cascade,
  inventory_item_id uuid not null references inventory_items(id) on delete restrict,
  warehouse_id uuid not null references warehouses(id) on delete restrict,
  quantity_good numeric(14,3) not null default 0,
  quantity_waste numeric(14,3) not null default 0,
  unit_cost numeric(14,4),
  currency text not null default 'YER',
  notes text,
  recorded_by uuid references app_users(id) on delete set null,
  recorded_at timestamptz not null default now()
);

create table if not exists purchase_requests (
  id uuid primary key default gen_random_uuid(),
  request_number bigint generated always as identity unique,
  status text not null default 'draft'
    check (status in ('draft','submitted','approved','rejected','ordered','closed','cancelled')),
  requested_by uuid references app_users(id) on delete set null,
  approved_by uuid references app_users(id) on delete set null,
  needed_by date,
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists purchase_request_items (
  id uuid primary key default gen_random_uuid(),
  purchase_request_id uuid not null references purchase_requests(id) on delete cascade,
  inventory_item_id uuid references inventory_items(id) on delete restrict,
  description text,
  quantity numeric(14,3) not null,
  estimated_unit_cost numeric(14,4),
  currency text not null default 'YER',
  notes text
);

create table if not exists purchase_orders (
  id uuid primary key default gen_random_uuid(),
  po_number bigint generated always as identity unique,
  supplier_id uuid not null references suppliers(id) on delete restrict,
  purchase_request_id uuid references purchase_requests(id) on delete set null,
  status text not null default 'draft'
    check (status in ('draft','approved','sent','partially_received','received','closed','cancelled')),
  currency text not null default 'YER',
  subtotal numeric(14,2) not null default 0,
  discount numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  expected_at date,
  approved_by uuid references app_users(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists purchase_order_items (
  id uuid primary key default gen_random_uuid(),
  purchase_order_id uuid not null references purchase_orders(id) on delete cascade,
  inventory_item_id uuid references inventory_items(id) on delete restrict,
  description text not null,
  quantity numeric(14,3) not null,
  unit_cost numeric(14,4) not null default 0,
  total_cost numeric(14,2) not null default 0,
  received_quantity numeric(14,3) not null default 0
);

create table if not exists goods_receipts (
  id uuid primary key default gen_random_uuid(),
  receipt_number bigint generated always as identity unique,
  purchase_order_id uuid references purchase_orders(id) on delete set null,
  supplier_id uuid references suppliers(id) on delete set null,
  warehouse_id uuid not null references warehouses(id) on delete restrict,
  status text not null default 'draft'
    check (status in ('draft','posted','cancelled')),
  received_by uuid references app_users(id) on delete set null,
  received_at timestamptz not null default now(),
  notes text
);

create table if not exists goods_receipt_items (
  id uuid primary key default gen_random_uuid(),
  goods_receipt_id uuid not null references goods_receipts(id) on delete cascade,
  purchase_order_item_id uuid references purchase_order_items(id) on delete set null,
  inventory_item_id uuid not null references inventory_items(id) on delete restrict,
  quantity numeric(14,3) not null,
  unit_cost numeric(14,4),
  accepted_quantity numeric(14,3) not null default 0,
  rejected_quantity numeric(14,3) not null default 0,
  notes text
);

create index if not exists idx_stock_movements_item_warehouse on stock_movements(inventory_item_id,warehouse_id,created_at);
create index if not exists idx_material_reservations_work_order on material_reservations(work_order_id);
create index if not exists idx_material_consumptions_work_order on material_consumptions(work_order_id);
create index if not exists idx_purchase_requests_status on purchase_requests(status);
create index if not exists idx_purchase_orders_supplier on purchase_orders(supplier_id,status);
create index if not exists idx_goods_receipts_po on goods_receipts(purchase_order_id);
