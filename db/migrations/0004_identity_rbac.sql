-- ORYX application identity and RBAC layer
-- Neon Auth is provisioned independently on the preview branch.
-- auth_user_id stores the external Neon Auth user identifier.

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id text unique,
  email text,
  display_name text,
  user_type text not null default 'staff'
    check (user_type in ('staff','customer','partner')),
  status text not null default 'active'
    check (status in ('invited','active','suspended','disabled')),
  customer_id uuid references customers(id) on delete set null,
  partner_id uuid references partners(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name_ar text not null,
  description_ar text,
  scope text not null default 'staff'
    check (scope in ('staff','customer','partner','system')),
  is_system boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists permissions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  module text not null,
  action text not null,
  description_ar text,
  created_at timestamptz not null default now()
);

create table if not exists role_permissions (
  role_id uuid not null references roles(id) on delete cascade,
  permission_id uuid not null references permissions(id) on delete cascade,
  primary key(role_id,permission_id)
);

create table if not exists user_roles (
  user_id uuid not null references app_users(id) on delete cascade,
  role_id uuid not null references roles(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  assigned_by uuid references app_users(id) on delete set null,
  primary key(user_id,role_id)
);

create table if not exists user_sessions_audit (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_users(id) on delete set null,
  event text not null,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_app_users_auth on app_users(auth_user_id);
create index if not exists idx_app_users_customer on app_users(customer_id);
create index if not exists idx_app_users_partner on app_users(partner_id);

insert into roles (key,name_ar,description_ar,scope) values
('owner','المالك','صلاحيات عليا وإدارة المؤسسة بالكامل.','staff'),
('executive','الإدارة التنفيذية','إدارة التشغيل والموافقات ومؤشرات الأداء.','staff'),
('sales_manager','مدير المبيعات','إدارة CRM والصفقات وعروض الأسعار.','staff'),
('sales_rep','مندوب مبيعات','العملاء المحتملون والمتابعات والفرص.','staff'),
('customer_service','خدمة العملاء','الطلبات والتواصل والمتابعة.','staff'),
('designer','مصمم','Briefs والإصدارات والتعديلات.','staff'),
('production_manager','مدير الإنتاج','التوزيع وأوامر العمل والجودة.','staff'),
('production_worker','فني إنتاج','تنفيذ مراحل أوامر العمل المسندة.','staff'),
('procurement','المشتريات والشركاء','شبكة الإنتاج والتكاليف والتوريد.','staff'),
('accountant','المحاسب','الفواتير والمدفوعات والمصروفات والتسويات.','staff'),
('content_manager','إدارة المحتوى','الخدمات والباقات والمجلة وSEO.','staff'),
('auditor','مدقق','وصول قراءة إلى السجلات الحساسة والتدقيق.','staff'),
('customer','عميل','الوصول إلى بيانات العميل وطلباته فقط.','customer'),
('partner_admin','مدير شريك إنتاج','إدارة حساب منشأة الإنتاج والأعمال المسندة.','partner'),
('partner_worker','موظف شريك إنتاج','تنفيذ الأعمال المسندة للشريك.','partner')
on conflict (key) do update set
name_ar=excluded.name_ar,description_ar=excluded.description_ar,scope=excluded.scope;

insert into permissions (key,module,action,description_ar) values
('catalog.view','catalog','view','عرض الكتالوج'),
('catalog.manage','catalog','manage','إدارة الخدمات والمواصفات'),
('pricing.view','pricing','view','عرض أسعار البيع'),
('pricing.manage','pricing','manage','إدارة قواعد الأسعار'),
('cost.view','costing','view','عرض تكاليف التنفيذ'),
('profit.view','finance','view_profit','عرض الربحية والهامش'),
('orders.view','orders','view','عرض الطلبات'),
('orders.manage','orders','manage','إدارة الطلبات'),
('quotes.manage','quotes','manage','إنشاء واعتماد عروض الأسعار'),
('design.manage','design','manage','إدارة أعمال التصميم'),
('production.manage','production','manage','إدارة الإنتاج'),
('production.execute','production','execute','تنفيذ مراحل الإنتاج'),
('partners.manage','partners','manage','إدارة شبكة الشركاء'),
('partner_prices.view','partners','view_cost','عرض أسعار الشركاء'),
('crm.manage','crm','manage','إدارة العملاء المحتملين والفرص'),
('finance.manage','finance','manage','إدارة الفواتير والمدفوعات'),
('content.manage','content','manage','إدارة المحتوى والمجلة'),
('users.manage','security','manage_users','إدارة المستخدمين والأدوار'),
('audit.view','security','view_audit','عرض سجل التدقيق'),
('reports.view','analytics','view','عرض التقارير')
on conflict (key) do update set
module=excluded.module,action=excluded.action,description_ar=excluded.description_ar;
