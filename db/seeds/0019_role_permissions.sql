-- ORYX role to permission matrix

-- Owner and executive have full operating access.
insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r cross join permissions p
where r.key in ('owner','executive')
on conflict do nothing;

-- Sales management.
insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key in (
  'catalog.view','pricing.view','orders.view','orders.manage','quotes.manage',
  'crm.manage','reports.view'
)
where r.key='sales_manager'
on conflict do nothing;

-- Sales representative.
insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key in (
  'catalog.view','pricing.view','orders.view','quotes.manage','crm.manage'
)
where r.key='sales_rep'
on conflict do nothing;

-- Customer service.
insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key in (
  'catalog.view','pricing.view','orders.view','orders.manage','quotes.manage'
)
where r.key='customer_service'
on conflict do nothing;

-- Design studio.
insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key in (
  'catalog.view','orders.view','design.manage'
)
where r.key='designer'
on conflict do nothing;

-- Production management.
insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key in (
  'catalog.view','orders.view','cost.view','production.manage','production.execute',
  'partner_prices.view','reports.view'
)
where r.key='production_manager'
on conflict do nothing;

-- Production worker.
insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key in (
  'catalog.view','orders.view','production.execute'
)
where r.key='production_worker'
on conflict do nothing;

-- Procurement / production network.
insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key in (
  'catalog.view','orders.view','cost.view','partners.manage','partner_prices.view',
  'reports.view'
)
where r.key='procurement'
on conflict do nothing;

-- Accounting.
insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key in (
  'orders.view','cost.view','profit.view','finance.manage','reports.view'
)
where r.key='accountant'
on conflict do nothing;

-- Content and service catalog.
insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key in (
  'catalog.view','catalog.manage','content.manage'
)
where r.key='content_manager'
on conflict do nothing;

-- Auditor is intentionally read-oriented.
insert into role_permissions (role_id,permission_id)
select r.id,p.id
from roles r join permissions p on p.key in (
  'catalog.view','orders.view','cost.view','profit.view','audit.view','reports.view'
)
where r.key='auditor'
on conflict do nothing;
