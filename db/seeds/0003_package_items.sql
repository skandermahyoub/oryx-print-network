-- Expand package JSON items into operational package_items rows.

create unique index if not exists uq_package_item_name
  on package_items(package_id,item_name,item_role)
  where item_name is not null;

insert into package_items (package_id,item_name,item_role,default_selected,sort_order)
select
  p.id,
  item.value,
  'core',
  true,
  (item.ordinality*10)::integer
from packages p
cross join lateral jsonb_array_elements_text(p.config->'items')
  with ordinality as item(value,ordinality)
where jsonb_typeof(p.config->'items')='array'
on conflict (package_id,item_name,item_role) where item_name is not null
do update set sort_order=excluded.sort_order,default_selected=true;
