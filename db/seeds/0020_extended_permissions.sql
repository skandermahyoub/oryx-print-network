-- Expand ORYX RBAC for inventory, projects, campaigns and package requests.

insert into permissions (key,module,action,description_ar)
values
  ('inventory.manage','inventory','manage','إدارة المخزون والمشتريات'),
  ('projects.manage','projects','manage','إدارة مشاريع ORYX والرعايات'),
  ('campaigns.manage','sales','manage_campaigns','إدارة الحملات البيعية والاستهداف'),
  ('package_requests.manage','packages','manage_requests','إدارة طلبات الباقات')
on conflict (key) do update set
  module=excluded.module,
  action=excluded.action,
  description_ar=excluded.description_ar;

insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r cross join permissions p
where r.key in ('owner','executive')
  and p.key in ('inventory.manage','projects.manage','campaigns.manage','package_requests.manage')
on conflict do nothing;

insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key in ('campaigns.manage','package_requests.manage')
where r.key='sales_manager'
on conflict do nothing;

insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key='package_requests.manage'
where r.key='sales_rep'
on conflict do nothing;

insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key='inventory.manage'
where r.key in ('procurement','production_manager','accountant')
on conflict do nothing;

insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key='projects.manage'
where r.key in ('sales_manager','content_manager')
on conflict do nothing;
