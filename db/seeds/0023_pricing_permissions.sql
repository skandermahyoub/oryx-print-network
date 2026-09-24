-- ORYX pricing administration permission

insert into permissions (key,module,action,description_ar)
values ('pricing.manage','pricing','manage','إدارة قواعد تسعير ORYX')
on conflict (key) do update set
  module=excluded.module,
  action=excluded.action,
  description_ar=excluded.description_ar;

insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r cross join permissions p
where r.key in ('owner','executive','sales_manager')
  and p.key='pricing.manage'
on conflict do nothing;
