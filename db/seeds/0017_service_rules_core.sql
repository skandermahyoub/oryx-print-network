-- Core conditional service rules and preflight requirements

insert into service_field_rules (service_id,target_field_key,rule_type,conditions,message_ar,priority)
select id,'start_number','show_if','{"field":"numbering","equals":"yes"}'::jsonb,'يظهر عند اختيار الترقيم التسلسلي.',10
from services where slug='ncr-invoices';

insert into service_field_rules (service_id,target_field_key,rule_type,conditions,message_ar,priority)
select id,'start_number','require_if','{"field":"numbering","equals":"yes"}'::jsonb,'حدد بداية الترقيم عند تفعيل الترقيم.',20
from services where slug='ncr-invoices';

insert into service_field_rules (service_id,target_field_key,rule_type,conditions,message_ar,priority)
select id,'end_number','show_if','{"field":"numbering","equals":"yes"}'::jsonb,'يظهر عند اختيار الترقيم التسلسلي.',10
from services where slug='ncr-invoices';

insert into service_field_rules (service_id,target_field_key,rule_type,conditions,message_ar,priority)
select id,'artwork_colors','show_if','{"field":"branding_method","equals":"Silk Screen"}'::jsonb,'عدد ألوان التصميم مطلوب لتقدير السلك سكرين.',10
from services where slug='printed-tshirt';

insert into service_field_rules (service_id,target_field_key,rule_type,conditions,message_ar,priority)
select id,'artwork_colors','require_if','{"field":"branding_method","equals":"Silk Screen"}'::jsonb,'حدد عدد ألوان التصميم للسلك سكرين.',20
from services where slug='printed-tshirt';

insert into service_field_rules (service_id,target_field_key,rule_type,conditions,message_ar,priority)
select id,'site_photo','require_if','{"field":"installation","equals":"yes"}'::jsonb,'صورة الموقع مطلوبة عند طلب التركيب.',20
from services where slug='shop-sign';

insert into service_field_rules (service_id,target_field_key,rule_type,conditions,message_ar,priority)
select id,'location','require_if','{"field":"installation","equals":"yes"}'::jsonb,'حدد الموقع عند طلب التركيب.',20
from services where slug='shop-sign';

insert into service_field_rules (service_id,target_field_key,rule_type,conditions,message_ar,priority)
select id,'prototype','show_if','{"field":"diecut","equals":"قالب جديد"}'::jsonb,'يفضل عمل Prototype عند إنشاء قالب قص جديد.',10
from services where slug='product-boxes';

insert into service_field_rules (service_id,target_field_key,rule_type,conditions,message_ar,priority)
select id,'individual_pack','show_if','{"field":"quantity","greater_than":0}'::jsonb,'خيار التغليف الفردي للطلبات المؤسسية.',100
from services where slug='desk-calendar-2027';

insert into service_validation_rules (service_id,rule_key,rule_type,field_key,config,error_message_ar,severity)
select id,'book-pages-even','multiple_of','pages','{"multiple":2}'::jsonb,'عدد صفحات الكتاب يجب أن يكون متوافقًا مع طريقة التجليد والطباعة.','warning'
from services where slug='books'
on conflict (service_id,rule_key) do update set config=excluded.config,error_message_ar=excluded.error_message_ar,severity=excluded.severity;

insert into service_validation_rules (service_id,rule_key,rule_type,field_key,config,error_message_ar,severity)
select id,'magazine-pages-four','multiple_of','pages','{"multiple":4}'::jsonb,'غالبًا يجب أن يكون عدد صفحات المجلة من مضاعفات 4، ويؤكد فريق الإنتاج ذلك حسب التجليد.','warning'
from services where slug='magazines'
on conflict (service_id,rule_key) do update set config=excluded.config,error_message_ar=excluded.error_message_ar,severity=excluded.severity;

insert into service_validation_rules (service_id,rule_key,rule_type,field_key,config,error_message_ar,severity)
select id,'positive-area','cross_field',null,'{"fields":["width","height"],"operator":"positive"}'::jsonb,'العرض والارتفاع يجب أن يكونا أكبر من صفر.','error'
from services where slug in ('flex-banner','vinyl-sticker','shop-sign')
on conflict (service_id,rule_key) do update set config=excluded.config,error_message_ar=excluded.error_message_ar,severity=excluded.severity;

insert into service_preflight_requirements (service_id,requirement_key,label_ar,requirement_type,config,required_before_quote,required_before_production,sort_order)
select id,'print-ready-pdf','ملف PDF عالي الجودة وجاهز للطباعة','file','{"preferred":["PDF/X","PDF"]}'::jsonb,false,true,10
from services where slug in ('business-cards','brochures','corporate-folders','books','magazines','desk-calendar-2027','wall-calendar-2027')
on conflict (service_id,requirement_key) do nothing;

insert into service_preflight_requirements (service_id,requirement_key,label_ar,requirement_type,config,required_before_quote,required_before_production,sort_order)
select id,'bleed','وجود Bleed مناسب خارج خط القص','check','{"minimum_mm":3}'::jsonb,false,true,20
from services where slug in ('business-cards','brochures','corporate-folders','books','magazines','product-boxes')
on conflict (service_id,requirement_key) do nothing;

insert into service_preflight_requirements (service_id,requirement_key,label_ar,requirement_type,config,required_before_quote,required_before_production,sort_order)
select id,'cmyk','الألوان مجهزة للطباعة CMYK أو محددة حسب التقنية','check','{}'::jsonb,false,true,30
from services where slug in ('business-cards','brochures','corporate-folders','books','magazines','flex-banner','vinyl-sticker','product-boxes')
on conflict (service_id,requirement_key) do nothing;

insert into service_preflight_requirements (service_id,requirement_key,label_ar,requirement_type,config,required_before_quote,required_before_production,sort_order)
select id,'vector-file','ملف Vector صالح للقص والحفر','file','{"extensions":["ai","eps","svg","pdf","dxf"]}'::jsonb,true,true,10
from services where slug='laser-acrylic'
on conflict (service_id,requirement_key) do nothing;

insert into service_preflight_requirements (service_id,requirement_key,label_ar,requirement_type,config,required_before_quote,required_before_production,sort_order)
select id,'dieline','Dieline أو أبعاد دقيقة للعلبة','file','{"accepts":["vector","dimensions"]}'::jsonb,true,true,10
from services where slug='product-boxes'
on conflict (service_id,requirement_key) do nothing;

insert into service_preflight_requirements (service_id,requirement_key,label_ar,requirement_type,config,required_before_quote,required_before_production,sort_order)
select id,'vehicle-photos','صور واضحة للمركبة من الجوانب المطلوبة','file','{"minimum_views":4}'::jsonb,true,true,10
from services where slug='vehicle-branding'
on conflict (service_id,requirement_key) do nothing;

insert into service_preflight_requirements (service_id,requirement_key,label_ar,requirement_type,config,required_before_quote,required_before_production,sort_order)
select id,'site-measurement','تأكيد مقاسات الموقع قبل التصنيع','measurement','{}'::jsonb,false,true,10
from services where slug='shop-sign'
on conflict (service_id,requirement_key) do nothing;
