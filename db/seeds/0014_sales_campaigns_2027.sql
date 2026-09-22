-- Immediate B2B sales campaigns for the 2027 print season.
-- No hard-coded discount percentages: offers remain configurable by management.

insert into sales_campaigns (
  slug,name_ar,objective,status,package_id,starts_at,ends_at,target_revenue,currency,pitch,config
)
select
  'calendar-2027-b2b',
  'موسم تقاويم الشركات 2027',
  'استهداف الشركات والمؤسسات بعروض تقاويم مكتبية وحائطية وأجندات وهدايا سنوية قبل ازدحام الموسم.',
  'active',
  p.id,
  date '2026-09-23',
  date '2026-12-20',
  null,
  'YER',
  'اجعل علامتك أمام عملائك وموظفيك طوال 2027 من خلال تقاويم وهدايا سنوية مصممة ومطبوعة كحزمة واحدة.',
  '{"priority":"highest","sales_motion":"direct_outbound","season":"2027"}'::jsonb
from packages p where p.slug='calendar-2027'
on conflict (slug) do update set
  name_ar=excluded.name_ar,objective=excluded.objective,status=excluded.status,package_id=excluded.package_id,
  starts_at=excluded.starts_at,ends_at=excluded.ends_at,pitch=excluded.pitch,config=excluded.config,updated_at=now();

insert into sales_campaigns (
  slug,name_ar,objective,status,package_id,starts_at,ends_at,currency,pitch,config
)
select
  'corporate-anniversary-b2b',
  'ذكرى تأسيس المؤسسات',
  'اكتشاف المؤسسات التي تقترب مناسبات تأسيسها وبيع مشروع مجلة أو كتاب تاريخ وهدايا وفعالية متكاملة.',
  'active',
  p.id,
  date '2026-09-23',
  date '2027-12-31',
  'YER',
  'لا تجعل ذكرى تأسيس المؤسسة تمر كمنشور عابر. نحول التاريخ والإنجازات إلى إصدار ومناسبة ومحتوى يعيش بعد يوم الاحتفال.',
  '{"priority":"high","sales_motion":"account_based","evergreen":true}'::jsonb
from packages p where p.slug='corporate-anniversary'
on conflict (slug) do update set
  name_ar=excluded.name_ar,objective=excluded.objective,status=excluded.status,package_id=excluded.package_id,
  starts_at=excluded.starts_at,ends_at=excluded.ends_at,pitch=excluded.pitch,config=excluded.config,updated_at=now();

insert into sales_campaigns (
  slug,name_ar,objective,status,package_id,starts_at,ends_at,currency,pitch,config
)
select
  'year-end-gifts-2027',
  'هدايا نهاية العام واستقبال 2027',
  'بيع حلول هدايا العملاء والموظفين مع التغليف والتخصيص والتسليم المؤسسي.',
  'active',
  p.id,
  date '2026-09-23',
  date '2026-12-31',
  'YER',
  'هدية نهاية العام ليست قطعة دعائية فقط. نصمم التجربة كاملة من اختيار المنتج إلى العلبة والبطاقة والتسليم.',
  '{"priority":"high","sales_motion":"direct_outbound","season":"year_end_2026"}'::jsonb
from packages p where p.slug='vip-gifts'
on conflict (slug) do update set
  name_ar=excluded.name_ar,objective=excluded.objective,status=excluded.status,package_id=excluded.package_id,
  starts_at=excluded.starts_at,ends_at=excluded.ends_at,pitch=excluded.pitch,config=excluded.config,updated_at=now();

insert into sales_campaigns (
  slug,name_ar,objective,status,package_id,starts_at,ends_at,currency,pitch,config
)
select
  'annual-print-contracts-2027',
  'عقود المطبوعات السنوية 2027',
  'تحويل العملاء المؤسسيين ذوي الطلب المتكرر إلى عقود سنوية مُدارة بدل الطلبات المتفرقة.',
  'planned',
  p.id,
  date '2026-10-01',
  date '2027-03-31',
  'YER',
  'قائمة أسعار خاصة، ملفات محفوظة، طلبات دورية، تقارير استهلاك وأولوية تنفيذ طوال العام.',
  '{"priority":"medium","sales_motion":"key_accounts","season":"2027"}'::jsonb
from packages p where p.slug='annual-print-plan'
on conflict (slug) do update set
  name_ar=excluded.name_ar,objective=excluded.objective,status=excluded.status,package_id=excluded.package_id,
  starts_at=excluded.starts_at,ends_at=excluded.ends_at,pitch=excluded.pitch,config=excluded.config,updated_at=now();

insert into campaign_segments (campaign_id,segment_key,label_ar,criteria,priority)
select c.id,'banks','البنوك والمؤسسات المالية','{"industries":["banking","finance"],"city":["Sanaa"],"company_size":"medium_plus"}'::jsonb,10
from sales_campaigns c where c.slug='calendar-2027-b2b'
on conflict (campaign_id,segment_key) do update set label_ar=excluded.label_ar,criteria=excluded.criteria,priority=excluded.priority;

insert into campaign_segments (campaign_id,segment_key,label_ar,criteria,priority)
select c.id,'large-companies','الشركات والمؤسسات الكبرى','{"company_size":"large","city":["Sanaa"],"needs":["calendar","gifts","annual_print"]}'::jsonb,20
from sales_campaigns c where c.slug='calendar-2027-b2b'
on conflict (campaign_id,segment_key) do update set label_ar=excluded.label_ar,criteria=excluded.criteria,priority=excluded.priority;

insert into campaign_segments (campaign_id,segment_key,label_ar,criteria,priority)
select c.id,'manufacturers','المصانع والعلامات المحلية','{"industries":["manufacturing","fmcg"],"city":["Sanaa"],"needs":["calendar","gifts"]}'::jsonb,30
from sales_campaigns c where c.slug='calendar-2027-b2b'
on conflict (campaign_id,segment_key) do update set label_ar=excluded.label_ar,criteria=excluded.criteria,priority=excluded.priority;

insert into campaign_segments (campaign_id,segment_key,label_ar,criteria,priority)
select c.id,'anniversary-prospects','مؤسسات ذات ذكرى تأسيس قريبة','{"signal":"anniversary_within_120_days","company_size":"medium_plus"}'::jsonb,10
from sales_campaigns c where c.slug='corporate-anniversary-b2b'
on conflict (campaign_id,segment_key) do update set label_ar=excluded.label_ar,criteria=excluded.criteria,priority=excluded.priority;

insert into campaign_segments (campaign_id,segment_key,label_ar,criteria,priority)
select c.id,'hr-marketing','إدارات الموارد البشرية والتسويق','{"roles":["HR","Marketing","PR","Administration"],"needs":["employee_gifts","client_gifts"]}'::jsonb,10
from sales_campaigns c where c.slug='year-end-gifts-2027'
on conflict (campaign_id,segment_key) do update set label_ar=excluded.label_ar,criteria=excluded.criteria,priority=excluded.priority;
