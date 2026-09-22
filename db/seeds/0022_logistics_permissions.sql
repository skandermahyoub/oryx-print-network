-- ORYX logistics role and delivery permissions

insert into permissions (key,module,action,description_ar)
values
  ('delivery.manage','delivery','manage','إدارة التوصيل والاستلام والتركيب')
on conflict (key) do update set
  module=excluded.module,
  action=excluded.action,
  description_ar=excluded.description_ar;

insert into roles (key,name_ar,description_ar,scope,is_system)
values ('logistics_coordinator','اللوجستيات والتسليم','إدارة التوصيل والاستلام والتركيب الميداني','staff',true)
on conflict (key) do update set
  name_ar=excluded.name_ar,
  description_ar=excluded.description_ar,
  scope=excluded.scope;

insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r cross join permissions p
where r.key in ('owner','executive','logistics_coordinator')
  and p.key='delivery.manage'
on conflict do nothing;

insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key in ('orders.view','orders.manage','production.execute')
where r.key='logistics_coordinator'
on conflict do nothing;

insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key='delivery.manage'
where r.key in ('customer_service','production_manager')
on conflict do nothing;
