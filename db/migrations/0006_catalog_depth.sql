-- ORYX deep catalog schema

create table if not exists service_variants (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  sku text,
  name_ar text not null,
  name_en text,
  price_modifier numeric(14,2),
  config jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  unique(service_id,name_ar)
);

create table if not exists finishings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name_ar text not null,
  name_en text,
  category text,
  pricing_mode text not null default 'manual_quote',
  config jsonb not null default '{}'::jsonb,
  is_active boolean not null default true
);

create table if not exists service_finishings (
  service_id uuid not null references services(id) on delete cascade,
  finishing_id uuid not null references finishings(id) on delete restrict,
  is_default boolean not null default false,
  is_required boolean not null default false,
  affects_price boolean not null default true,
  conditions jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  primary key(service_id,finishing_id)
);

create table if not exists service_seo (
  service_id uuid primary key references services(id) on delete cascade,
  seo_title_ar text,
  seo_description_ar text,
  keywords_ar text[] not null default '{}',
  faq jsonb not null default '[]'::jsonb,
  search_synonyms text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists service_assets (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  asset_type text not null default 'image',
  document_id uuid references documents(id) on delete set null,
  alt_text_ar text,
  caption_ar text,
  sort_order integer not null default 0,
  is_cover boolean not null default false,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists service_relations (
  service_id uuid not null references services(id) on delete cascade,
  related_service_id uuid not null references services(id) on delete cascade,
  relation_type text not null default 'related'
    check (relation_type in ('related','upsell','cross_sell','alternative','requires')),
  sort_order integer not null default 0,
  primary key(service_id,related_service_id,relation_type),
  check(service_id<>related_service_id)
);

create table if not exists service_industries (
  service_id uuid not null references services(id) on delete cascade,
  industry_key text not null,
  relevance integer not null default 100 check(relevance between 0 and 100),
  primary key(service_id,industry_key)
);

create table if not exists category_field_templates (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  field_key text not null,
  label_ar text not null,
  field_type text not null,
  is_required boolean not null default false,
  affects_price boolean not null default false,
  affects_material boolean not null default false,
  affects_production boolean not null default false,
  config jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  unique(category_id,field_key)
);

create index if not exists idx_service_variants_service on service_variants(service_id);
create index if not exists idx_service_finishings_service on service_finishings(service_id);
create index if not exists idx_service_assets_service on service_assets(service_id);
create index if not exists idx_service_industries_industry on service_industries(industry_key);
create index if not exists idx_category_field_templates_category on category_field_templates(category_id);
