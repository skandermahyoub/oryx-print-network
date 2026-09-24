-- ORYX customer loyalty, rewards and referrals

create table if not exists loyalty_accounts (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null unique references customers(id) on delete cascade,
  points_balance bigint not null default 0,
  lifetime_points bigint not null default 0,
  tier_key text not null default 'member',
  joined_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists loyalty_transactions (
  id uuid primary key default gen_random_uuid(),
  loyalty_account_id uuid not null references loyalty_accounts(id) on delete cascade,
  transaction_type text not null
    check (transaction_type in ('earn','redeem','expire','adjust','bonus','reversal')),
  points bigint not null,
  source_type text,
  source_id uuid,
  description text,
  expires_at timestamptz,
  created_by uuid references app_users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists reward_catalog (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_ar text not null,
  description_ar text,
  points_cost bigint not null check (points_cost>0),
  reward_type text not null
    check (reward_type in ('discount','free_delivery','free_design','product','service','custom')),
  reward_value numeric(14,2),
  currency text,
  config jsonb not null default '{}'::jsonb,
  valid_from timestamptz,
  valid_until timestamptz,
  inventory_limit integer,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists reward_redemptions (
  id uuid primary key default gen_random_uuid(),
  loyalty_account_id uuid not null references loyalty_accounts(id) on delete cascade,
  reward_id uuid not null references reward_catalog(id) on delete restrict,
  points_spent bigint not null,
  status text not null default 'requested'
    check (status in ('requested','approved','used','expired','cancelled')),
  order_id uuid references orders(id) on delete set null,
  approved_by uuid references app_users(id) on delete set null,
  approved_at timestamptz,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists referral_codes (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null unique references customers(id) on delete cascade,
  code text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  referral_code_id uuid not null references referral_codes(id) on delete restrict,
  referred_customer_id uuid references customers(id) on delete set null,
  referred_lead_id uuid references leads(id) on delete set null,
  status text not null default 'registered'
    check (status in ('registered','qualified','converted','rewarded','rejected')),
  qualifying_order_id uuid references orders(id) on delete set null,
  referrer_points_awarded bigint not null default 0,
  referred_points_awarded bigint not null default 0,
  created_at timestamptz not null default now(),
  converted_at timestamptz
);

create table if not exists coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name_ar text,
  discount_type text not null
    check (discount_type in ('fixed','percent','free_delivery','custom')),
  discount_value numeric(14,2),
  currency text,
  min_order_value numeric(14,2),
  max_discount numeric(14,2),
  usage_limit integer,
  per_customer_limit integer,
  valid_from timestamptz,
  valid_until timestamptz,
  is_active boolean not null default true,
  conditions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists coupon_redemptions (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references coupons(id) on delete restrict,
  customer_id uuid references customers(id) on delete set null,
  order_id uuid references orders(id) on delete set null,
  discount_amount numeric(14,2) not null default 0,
  currency text not null default 'YER',
  redeemed_at timestamptz not null default now(),
  unique(coupon_id,order_id)
);

create index if not exists idx_loyalty_transactions_account on loyalty_transactions(loyalty_account_id,created_at desc);
create index if not exists idx_reward_redemptions_account on reward_redemptions(loyalty_account_id,status);
create index if not exists idx_referrals_code on referrals(referral_code_id,status);
create index if not exists idx_coupon_redemptions_customer on coupon_redemptions(customer_id,redeemed_at desc);
