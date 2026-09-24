-- ORYX category field templates and finishing library

insert into finishings (key,name_ar,name_en,category) values ('matte-lamination','سلوفان مطفي','Matte Lamination','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('gloss-lamination','سلوفان لامع','Gloss Lamination','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('soft-touch','Soft Touch','Soft Touch','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('spot-uv','Spot UV','Spot UV','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('raised-uv','Raised UV','Raised UV','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('gold-foil','فويل ذهبي','Gold Foil','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('silver-foil','فويل فضي','Silver Foil','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('color-foil','فويل ملون','Color Foil','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('emboss','ضغط بارز','Emboss','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('deboss','ضغط غائر','Deboss','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('die-cut','قص بالقالب','Die Cut','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('rounded-corners','زوايا دائرية','Rounded Corners','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('perforation','تخريم','Perforation','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('folding','طي','Folding','paper')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('wire-o','Wire-O','Wire-O','binding')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('saddle-stitch','تدبيس مركزي','Saddle Stitch','binding')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('perfect-bind','تجليد حراري','Perfect Bind','binding')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('hardcover','غلاف مقوى','Hardcover','binding')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('eyelets','حلقات','Eyelets','large-format')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('hemming','حاشية','Hemming','large-format')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('welding','لحام','Welding','large-format')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('protective-lamination','Lamination حماية','Protective Lamination','large-format')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('contour-cut','قص كونتور','Contour Cut','large-format')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('laser-polish','تلميع ليزر','Laser Polish','fabrication')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('edge-polish','تلميع حواف','Edge Polish','fabrication')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('individual-pack','تغليف فردي','Individual Packaging','packaging')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into finishings (key,name_ar,name_en,category) values ('gift-box','علبة هدية','Gift Box','packaging')
on conflict (key) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,category=excluded.category,is_active=true;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'brief','ملخص المطلوب','textarea',true,false,false,false,'{}'::jsonb,10
from categories where slug='brand-strategy'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'language','اللغة','select',false,false,false,false,'{"options":["عربي","إنجليزي","عربي/إنجليزي"]}'::jsonb,20
from categories where slug='brand-strategy'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'existing_brand','هل توجد هوية حالية؟','boolean',false,false,false,false,'{}'::jsonb,30
from categories where slug='brand-strategy'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'reference_files','ملفات ومراجع','file',false,false,false,false,'{}'::jsonb,40
from categories where slug='brand-strategy'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deliverables','المخرجات المطلوبة','textarea',true,true,false,true,'{}'::jsonb,50
from categories where slug='brand-strategy'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deadline','الموعد المطلوب','date',false,true,false,true,'{}'::jsonb,60
from categories where slug='brand-strategy'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'brief','ملخص المطلوب','textarea',true,false,false,false,'{}'::jsonb,10
from categories where slug='logo-identity'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'language','اللغة','select',false,false,false,false,'{"options":["عربي","إنجليزي","عربي/إنجليزي"]}'::jsonb,20
from categories where slug='logo-identity'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'existing_brand','هل توجد هوية حالية؟','boolean',false,false,false,false,'{}'::jsonb,30
from categories where slug='logo-identity'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'reference_files','ملفات ومراجع','file',false,false,false,false,'{}'::jsonb,40
from categories where slug='logo-identity'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deliverables','المخرجات المطلوبة','textarea',true,true,false,true,'{}'::jsonb,50
from categories where slug='logo-identity'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deadline','الموعد المطلوب','date',false,true,false,true,'{}'::jsonb,60
from categories where slug='logo-identity'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'brief','ملخص المطلوب','textarea',true,false,false,false,'{}'::jsonb,10
from categories where slug='corporate-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'language','اللغة','select',false,false,false,false,'{"options":["عربي","إنجليزي","عربي/إنجليزي"]}'::jsonb,20
from categories where slug='corporate-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'existing_brand','هل توجد هوية حالية؟','boolean',false,false,false,false,'{}'::jsonb,30
from categories where slug='corporate-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'reference_files','ملفات ومراجع','file',false,false,false,false,'{}'::jsonb,40
from categories where slug='corporate-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deliverables','المخرجات المطلوبة','textarea',true,true,false,true,'{}'::jsonb,50
from categories where slug='corporate-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deadline','الموعد المطلوب','date',false,true,false,true,'{}'::jsonb,60
from categories where slug='corporate-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'brief','ملخص المطلوب','textarea',true,false,false,false,'{}'::jsonb,10
from categories where slug='social-digital'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'language','اللغة','select',false,false,false,false,'{"options":["عربي","إنجليزي","عربي/إنجليزي"]}'::jsonb,20
from categories where slug='social-digital'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'existing_brand','هل توجد هوية حالية؟','boolean',false,false,false,false,'{}'::jsonb,30
from categories where slug='social-digital'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'reference_files','ملفات ومراجع','file',false,false,false,false,'{}'::jsonb,40
from categories where slug='social-digital'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deliverables','المخرجات المطلوبة','textarea',true,true,false,true,'{}'::jsonb,50
from categories where slug='social-digital'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deadline','الموعد المطلوب','date',false,true,false,true,'{}'::jsonb,60
from categories where slug='social-digital'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'brief','ملخص المطلوب','textarea',true,false,false,false,'{}'::jsonb,10
from categories where slug='campaign-creative'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'language','اللغة','select',false,false,false,false,'{"options":["عربي","إنجليزي","عربي/إنجليزي"]}'::jsonb,20
from categories where slug='campaign-creative'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'existing_brand','هل توجد هوية حالية؟','boolean',false,false,false,false,'{}'::jsonb,30
from categories where slug='campaign-creative'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'reference_files','ملفات ومراجع','file',false,false,false,false,'{}'::jsonb,40
from categories where slug='campaign-creative'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deliverables','المخرجات المطلوبة','textarea',true,true,false,true,'{}'::jsonb,50
from categories where slug='campaign-creative'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deadline','الموعد المطلوب','date',false,true,false,true,'{}'::jsonb,60
from categories where slug='campaign-creative'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'brief','ملخص المطلوب','textarea',true,false,false,false,'{}'::jsonb,10
from categories where slug='packaging-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'language','اللغة','select',false,false,false,false,'{"options":["عربي","إنجليزي","عربي/إنجليزي"]}'::jsonb,20
from categories where slug='packaging-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'existing_brand','هل توجد هوية حالية؟','boolean',false,false,false,false,'{}'::jsonb,30
from categories where slug='packaging-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'reference_files','ملفات ومراجع','file',false,false,false,false,'{}'::jsonb,40
from categories where slug='packaging-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deliverables','المخرجات المطلوبة','textarea',true,true,false,true,'{}'::jsonb,50
from categories where slug='packaging-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deadline','الموعد المطلوب','date',false,true,false,true,'{}'::jsonb,60
from categories where slug='packaging-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'brief','ملخص المطلوب','textarea',true,false,false,false,'{}'::jsonb,10
from categories where slug='environmental-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'language','اللغة','select',false,false,false,false,'{"options":["عربي","إنجليزي","عربي/إنجليزي"]}'::jsonb,20
from categories where slug='environmental-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'existing_brand','هل توجد هوية حالية؟','boolean',false,false,false,false,'{}'::jsonb,30
from categories where slug='environmental-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'reference_files','ملفات ومراجع','file',false,false,false,false,'{}'::jsonb,40
from categories where slug='environmental-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deliverables','المخرجات المطلوبة','textarea',true,true,false,true,'{}'::jsonb,50
from categories where slug='environmental-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deadline','الموعد المطلوب','date',false,true,false,true,'{}'::jsonb,60
from categories where slug='environmental-design'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'size','المقاس','select',true,true,true,true,'{"options":["A6","A5","A4","A3","مقاس مخصص"]}'::jsonb,10
from categories where slug='office-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'paper_type','نوع الورق','select',true,true,true,true,'{"options":["كوشيه","بريستول","أوفست","كرافت","ورق فاخر","ورق خاص"]}'::jsonb,20
from categories where slug='office-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'paper_weight','وزن الورق','select',false,true,true,true,'{"options":["80 جم","100 جم","120 جم","150 جم","170 جم","250 جم","300 جم","350 جم"]}'::jsonb,30
from categories where slug='office-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'color_mode','الألوان','select',true,true,false,true,'{"options":["أسود","لون واحد","CMYK كامل"]}'::jsonb,40
from categories where slug='office-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'sides','الطباعة','select',true,true,false,true,'{"options":["وجه واحد","وجهين"]}'::jsonb,50
from categories where slug='office-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"نسخة"}'::jsonb,60
from categories where slug='office-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','خدمة التصميم','select',false,true,false,true,'{"options":["لدي تصميم جاهز","أحتاج تصميم من أوريكس","لدي فكرة فقط"]}'::jsonb,70
from categories where slug='office-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'size','المقاس','select',true,true,true,true,'{"options":["A6","A5","A4","A3","مقاس مخصص"]}'::jsonb,10
from categories where slug='educational-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'paper_type','نوع الورق','select',true,true,true,true,'{"options":["كوشيه","بريستول","أوفست","كرافت","ورق فاخر","ورق خاص"]}'::jsonb,20
from categories where slug='educational-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'paper_weight','وزن الورق','select',false,true,true,true,'{"options":["80 جم","100 جم","120 جم","150 جم","170 جم","250 جم","300 جم","350 جم"]}'::jsonb,30
from categories where slug='educational-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'color_mode','الألوان','select',true,true,false,true,'{"options":["أسود","لون واحد","CMYK كامل"]}'::jsonb,40
from categories where slug='educational-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'sides','الطباعة','select',true,true,false,true,'{"options":["وجه واحد","وجهين"]}'::jsonb,50
from categories where slug='educational-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"نسخة"}'::jsonb,60
from categories where slug='educational-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','خدمة التصميم','select',false,true,false,true,'{"options":["لدي تصميم جاهز","أحتاج تصميم من أوريكس","لدي فكرة فقط"]}'::jsonb,70
from categories where slug='educational-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'size','المقاس','select',true,true,true,true,'{"options":["A6","A5","A4","A3","مقاس مخصص"]}'::jsonb,10
from categories where slug='invitations-events-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'paper_type','نوع الورق','select',true,true,true,true,'{"options":["كوشيه","بريستول","أوفست","كرافت","ورق فاخر","ورق خاص"]}'::jsonb,20
from categories where slug='invitations-events-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'paper_weight','وزن الورق','select',false,true,true,true,'{"options":["80 جم","100 جم","120 جم","150 جم","170 جم","250 جم","300 جم","350 جم"]}'::jsonb,30
from categories where slug='invitations-events-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'color_mode','الألوان','select',true,true,false,true,'{"options":["أسود","لون واحد","CMYK كامل"]}'::jsonb,40
from categories where slug='invitations-events-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'sides','الطباعة','select',true,true,false,true,'{"options":["وجه واحد","وجهين"]}'::jsonb,50
from categories where slug='invitations-events-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"نسخة"}'::jsonb,60
from categories where slug='invitations-events-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','خدمة التصميم','select',false,true,false,true,'{"options":["لدي تصميم جاهز","أحتاج تصميم من أوريكس","لدي فكرة فقط"]}'::jsonb,70
from categories where slug='invitations-events-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'size','المقاس','select',true,true,true,true,'{"options":["A6","A5","A4","A3","مقاس مخصص"]}'::jsonb,10
from categories where slug='calendars'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'paper_type','نوع الورق','select',true,true,true,true,'{"options":["كوشيه","بريستول","أوفست","كرافت","ورق فاخر","ورق خاص"]}'::jsonb,20
from categories where slug='calendars'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'paper_weight','وزن الورق','select',false,true,true,true,'{"options":["80 جم","100 جم","120 جم","150 جم","170 جم","250 جم","300 جم","350 جم"]}'::jsonb,30
from categories where slug='calendars'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'color_mode','الألوان','select',true,true,false,true,'{"options":["أسود","لون واحد","CMYK كامل"]}'::jsonb,40
from categories where slug='calendars'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'sides','الطباعة','select',true,true,false,true,'{"options":["وجه واحد","وجهين"]}'::jsonb,50
from categories where slug='calendars'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"نسخة"}'::jsonb,60
from categories where slug='calendars'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','خدمة التصميم','select',false,true,false,true,'{"options":["لدي تصميم جاهز","أحتاج تصميم من أوريكس","لدي فكرة فقط"]}'::jsonb,70
from categories where slug='calendars'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'size','المقاس','select',true,true,true,true,'{"options":["A4","A5","A6","مخصص"]}'::jsonb,10
from categories where slug='financial-forms'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'copies','عدد النسخ في المجموعة','select',true,true,true,true,'{"options":["نسختان","3 نسخ","4 نسخ","5 نسخ"]}'::jsonb,20
from categories where slug='financial-forms'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'sets','عدد المجموعات','number',true,true,false,true,'{"unit":"مجموعة"}'::jsonb,30
from categories where slug='financial-forms'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'numbering','ترقيم تسلسلي','boolean',false,true,false,true,'{}'::jsonb,40
from categories where slug='financial-forms'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'start_number','بداية الترقيم','number',false,true,false,true,'{}'::jsonb,50
from categories where slug='financial-forms'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'binding','طريقة التجميع','select',false,true,false,true,'{"options":["دفاتر","تخريم","تدبيس","Loose Sets"]}'::jsonb,60
from categories where slug='financial-forms'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','خدمة التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='financial-forms'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'size','المقاس','select',true,true,true,true,'{"options":["A4","A5","A6","مخصص"]}'::jsonb,10
from categories where slug='security-variable'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'copies','عدد النسخ في المجموعة','select',true,true,true,true,'{"options":["نسختان","3 نسخ","4 نسخ","5 نسخ"]}'::jsonb,20
from categories where slug='security-variable'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'sets','عدد المجموعات','number',true,true,false,true,'{"unit":"مجموعة"}'::jsonb,30
from categories where slug='security-variable'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'numbering','ترقيم تسلسلي','boolean',false,true,false,true,'{}'::jsonb,40
from categories where slug='security-variable'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'start_number','بداية الترقيم','number',false,true,false,true,'{}'::jsonb,50
from categories where slug='security-variable'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'binding','طريقة التجميع','select',false,true,false,true,'{"options":["دفاتر","تخريم","تدبيس","Loose Sets"]}'::jsonb,60
from categories where slug='security-variable'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','خدمة التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='security-variable'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'size','المقاس النهائي','select',true,true,true,true,'{"options":["A5","A4","17×24 سم","مربع","مخصص"]}'::jsonb,10
from categories where slug='publishing'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'pages','عدد الصفحات','number',true,true,true,true,'{"unit":"صفحة"}'::jsonb,20
from categories where slug='publishing'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'inside_paper','ورق الداخل','select',true,true,true,true,'{"options":["أوفست","كوشيه","ورق فاخر"]}'::jsonb,30
from categories where slug='publishing'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'inside_weight','وزن ورق الداخل','number',false,true,true,true,'{"unit":"جم"}'::jsonb,40
from categories where slug='publishing'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'cover_paper','ورق الغلاف','select',false,true,true,true,'{"options":["كوشيه","بريستول","كرتون مقوى","ورق خاص"]}'::jsonb,50
from categories where slug='publishing'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'color_mode','طباعة الداخل','select',true,true,false,true,'{"options":["أسود","ملون","مختلط"]}'::jsonb,60
from categories where slug='publishing'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'binding','التجليد','select',true,true,false,true,'{"options":["تدبيس","حراري","خياطة","سلك","غلاف مقوى"]}'::jsonb,70
from categories where slug='publishing'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"نسخة"}'::jsonb,80
from categories where slug='publishing'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','التصميم والإخراج','select',false,true,false,true,'{"options":["جاهز","إخراج فقط","تصميم كامل"]}'::jsonb,90
from categories where slug='publishing'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'shape','الشكل','select',true,true,false,true,'{"options":["دائري","مربع","مستطيل","بيضاوي","قص مخصص"]}'::jsonb,10
from categories where slug='labels'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'dimensions','المقاس','text',true,true,true,true,'{}'::jsonb,20
from categories where slug='labels'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["ورقي","فينيل أبيض","شفاف","معدني","حراري","مخصص"]}'::jsonb,30
from categories where slug='labels'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"ملصق"}'::jsonb,40
from categories where slug='labels'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'supply_format','طريقة التوريد','select',false,true,false,true,'{"options":["شيت","رول","قطع منفردة"]}'::jsonb,50
from categories where slug='labels'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'variable_data','بيانات متغيرة','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='labels'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','خدمة التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='labels'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'width','العرض','number',true,true,true,true,'{"unit":"متر"}'::jsonb,10
from categories where slug='digital-large-format'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'height','الارتفاع','number',true,true,true,true,'{"unit":"متر"}'::jsonb,20
from categories where slug='digital-large-format'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["بنر","فليكس","فينيل","قماش","خامة مخصصة"]}'::jsonb,30
from categories where slug='digital-large-format'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','العدد','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,40
from categories where slug='digital-large-format'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'finishing','التشطيب','select',false,true,false,true,'{"options":["قص","حلقات","لحام","Lamination","بدون"]}'::jsonb,50
from categories where slug='digital-large-format'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'installation','أحتاج تركيب','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='digital-large-format'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','خدمة التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='digital-large-format'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'width','العرض','number',true,true,true,true,'{"unit":"متر"}'::jsonb,10
from categories where slug='fabric-textile-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'height','الارتفاع','number',true,true,true,true,'{"unit":"متر"}'::jsonb,20
from categories where slug='fabric-textile-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["بنر","فليكس","فينيل","قماش","خامة مخصصة"]}'::jsonb,30
from categories where slug='fabric-textile-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','العدد','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,40
from categories where slug='fabric-textile-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'finishing','التشطيب','select',false,true,false,true,'{"options":["قص","حلقات","لحام","Lamination","بدون"]}'::jsonb,50
from categories where slug='fabric-textile-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'installation','أحتاج تركيب','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='fabric-textile-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','خدمة التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='fabric-textile-print'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'width','العرض','number',true,true,true,true,'{"unit":"متر"}'::jsonb,10
from categories where slug='photo-fine-art'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'height','الارتفاع','number',true,true,true,true,'{"unit":"متر"}'::jsonb,20
from categories where slug='photo-fine-art'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["بنر","فليكس","فينيل","قماش","خامة مخصصة"]}'::jsonb,30
from categories where slug='photo-fine-art'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','العدد','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,40
from categories where slug='photo-fine-art'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'finishing','التشطيب','select',false,true,false,true,'{"options":["قص","حلقات","لحام","Lamination","بدون"]}'::jsonb,50
from categories where slug='photo-fine-art'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'installation','أحتاج تركيب','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='photo-fine-art'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','خدمة التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='photo-fine-art'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'width','العرض','number',true,true,true,true,'{"unit":"متر"}'::jsonb,10
from categories where slug='wall-floor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'height','الارتفاع','number',true,true,true,true,'{"unit":"متر"}'::jsonb,20
from categories where slug='wall-floor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'surface','سطح التركيب','select',true,false,false,true,'{"options":["جدار","زجاج","أرضية","واجهة","سطح آخر"]}'::jsonb,30
from categories where slug='wall-floor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["فينيل","One Way Vision","Frosted","Floor Vinyl","Wallpaper","مخصص"]}'::jsonb,40
from categories where slug='wall-floor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','العدد','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,50
from categories where slug='wall-floor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'installation','تركيب','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='wall-floor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'site_photo','صورة الموقع','file',false,false,false,true,'{}'::jsonb,70
from categories where slug='wall-floor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'width','العرض','number',true,true,true,true,'{"unit":"متر"}'::jsonb,10
from categories where slug='window-glass'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'height','الارتفاع','number',true,true,true,true,'{"unit":"متر"}'::jsonb,20
from categories where slug='window-glass'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'surface','سطح التركيب','select',true,false,false,true,'{"options":["جدار","زجاج","أرضية","واجهة","سطح آخر"]}'::jsonb,30
from categories where slug='window-glass'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["فينيل","One Way Vision","Frosted","Floor Vinyl","Wallpaper","مخصص"]}'::jsonb,40
from categories where slug='window-glass'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','العدد','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,50
from categories where slug='window-glass'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'installation','تركيب','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='window-glass'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'site_photo','صورة الموقع','file',false,false,false,true,'{}'::jsonb,70
from categories where slug='window-glass'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'width','العرض التقريبي','number',true,true,true,true,'{"unit":"متر"}'::jsonb,10
from categories where slug='signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'height','الارتفاع التقريبي','number',true,true,true,true,'{"unit":"متر"}'::jsonb,20
from categories where slug='signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة الرئيسية','select',false,true,true,true,'{"options":["أكريليك","ستانلس","ألمنيوم","كلادينج","فليكس","مركب"]}'::jsonb,30
from categories where slug='signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'lighting','الإضاءة','select',false,true,true,true,'{"options":["بدون","أمامية","خلفية","داخلية","Halo"]}'::jsonb,40
from categories where slug='signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','العدد','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,50
from categories where slug='signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'installation','التركيب','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'site_photo','صورة الموقع','file',false,false,false,true,'{}'::jsonb,70
from categories where slug='signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'location','الموقع','location',false,false,false,true,'{}'::jsonb,80
from categories where slug='signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'width','العرض التقريبي','number',true,true,true,true,'{"unit":"متر"}'::jsonb,10
from categories where slug='illuminated-signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'height','الارتفاع التقريبي','number',true,true,true,true,'{"unit":"متر"}'::jsonb,20
from categories where slug='illuminated-signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة الرئيسية','select',false,true,true,true,'{"options":["أكريليك","ستانلس","ألمنيوم","كلادينج","فليكس","مركب"]}'::jsonb,30
from categories where slug='illuminated-signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'lighting','الإضاءة','select',false,true,true,true,'{"options":["بدون","أمامية","خلفية","داخلية","Halo"]}'::jsonb,40
from categories where slug='illuminated-signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','العدد','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,50
from categories where slug='illuminated-signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'installation','التركيب','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='illuminated-signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'site_photo','صورة الموقع','file',false,false,false,true,'{}'::jsonb,70
from categories where slug='illuminated-signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'location','الموقع','location',false,false,false,true,'{}'::jsonb,80
from categories where slug='illuminated-signage'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'width','العرض التقريبي','number',true,true,true,true,'{"unit":"متر"}'::jsonb,10
from categories where slug='wayfinding'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'height','الارتفاع التقريبي','number',true,true,true,true,'{"unit":"متر"}'::jsonb,20
from categories where slug='wayfinding'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة الرئيسية','select',false,true,true,true,'{"options":["أكريليك","ستانلس","ألمنيوم","كلادينج","فليكس","مركب"]}'::jsonb,30
from categories where slug='wayfinding'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'lighting','الإضاءة','select',false,true,true,true,'{"options":["بدون","أمامية","خلفية","داخلية","Halo"]}'::jsonb,40
from categories where slug='wayfinding'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','العدد','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,50
from categories where slug='wayfinding'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'installation','التركيب','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='wayfinding'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'site_photo','صورة الموقع','file',false,false,false,true,'{}'::jsonb,70
from categories where slug='wayfinding'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'location','الموقع','location',false,false,false,true,'{}'::jsonb,80
from categories where slug='wayfinding'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'width','العرض','number',true,true,true,true,'{"unit":"متر"}'::jsonb,10
from categories where slug='outdoor-media'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'height','الارتفاع','number',true,true,true,true,'{"unit":"متر"}'::jsonb,20
from categories where slug='outdoor-media'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'location','الموقع','location',true,false,false,true,'{}'::jsonb,30
from categories where slug='outdoor-media'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'duration','مدة الحملة','number',false,true,false,true,'{"unit":"يوم"}'::jsonb,40
from categories where slug='outdoor-media'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'faces','عدد الأوجه','select',false,true,false,true,'{"options":["وجه واحد","وجهين","متعدد"]}'::jsonb,50
from categories where slug='outdoor-media'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'installation','التركيب','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='outdoor-media'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','تصميم الإعلان','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='outdoor-media'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'vehicle_type','نوع المركبة','text',true,true,false,true,'{}'::jsonb,10
from categories where slug='vehicles'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'coverage','نطاق التغليف','select',true,true,true,true,'{"options":["كامل","جزئي","شعارات فقط","عناصر مخصصة"]}'::jsonb,20
from categories where slug='vehicles'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','عدد المركبات','number',true,true,false,true,'{"unit":"مركبة"}'::jsonb,30
from categories where slug='vehicles'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'vehicle_color','لون المركبة','text',false,false,false,true,'{}'::jsonb,40
from categories where slug='vehicles'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'vehicle_photos','صور المركبة','file',true,false,false,true,'{}'::jsonb,50
from categories where slug='vehicles'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,60
from categories where slug='vehicles'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'installation','التركيب','boolean',true,true,false,true,'{}'::jsonb,70
from categories where slug='vehicles'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["أكريليك","خشب","MDF","زجاج","جلد","كرتون","معدن مناسب","مخصص"]}'::jsonb,10
from categories where slug='laser'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'thickness','السماكة','text',false,true,true,true,'{}'::jsonb,20
from categories where slug='laser'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'dimensions','الأبعاد','text',true,true,true,true,'{}'::jsonb,30
from categories where slug='laser'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,40
from categories where slug='laser'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'operation','العملية','select',true,true,false,true,'{"options":["قص","حفر","قص وحفر","وسم"]}'::jsonb,50
from categories where slug='laser'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'vector_file','ملف Vector','file',false,false,false,true,'{}'::jsonb,60
from categories where slug='laser'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'assembly','تجميع أو تركيب','boolean',false,true,false,true,'{}'::jsonb,70
from categories where slug='laser'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["أكريليك","خشب","MDF","زجاج","جلد","كرتون","معدن مناسب","مخصص"]}'::jsonb,10
from categories where slug='awards'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'thickness','السماكة','text',false,true,true,true,'{}'::jsonb,20
from categories where slug='awards'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'dimensions','الأبعاد','text',true,true,true,true,'{}'::jsonb,30
from categories where slug='awards'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,40
from categories where slug='awards'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'operation','العملية','select',true,true,false,true,'{"options":["قص","حفر","قص وحفر","وسم"]}'::jsonb,50
from categories where slug='awards'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'vector_file','ملف Vector','file',false,false,false,true,'{}'::jsonb,60
from categories where slug='awards'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'assembly','تجميع أو تركيب','boolean',false,true,false,true,'{}'::jsonb,70
from categories where slug='awards'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["أكريليك","خشب","MDF","زجاج","جلد","كرتون","معدن مناسب","مخصص"]}'::jsonb,10
from categories where slug='displays'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'thickness','السماكة','text',false,true,true,true,'{}'::jsonb,20
from categories where slug='displays'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'dimensions','الأبعاد','text',true,true,true,true,'{}'::jsonb,30
from categories where slug='displays'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,40
from categories where slug='displays'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'operation','العملية','select',true,true,false,true,'{"options":["قص","حفر","قص وحفر","وسم"]}'::jsonb,50
from categories where slug='displays'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'vector_file','ملف Vector','file',false,false,false,true,'{}'::jsonb,60
from categories where slug='displays'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'assembly','تجميع أو تركيب','boolean',false,true,false,true,'{}'::jsonb,70
from categories where slug='displays'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["أكريليك","خشب","MDF","زجاج","جلد","كرتون","معدن مناسب","مخصص"]}'::jsonb,10
from categories where slug='models-decor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'thickness','السماكة','text',false,true,true,true,'{}'::jsonb,20
from categories where slug='models-decor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'dimensions','الأبعاد','text',true,true,true,true,'{}'::jsonb,30
from categories where slug='models-decor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,40
from categories where slug='models-decor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'operation','العملية','select',true,true,false,true,'{"options":["قص","حفر","قص وحفر","وسم"]}'::jsonb,50
from categories where slug='models-decor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'vector_file','ملف Vector','file',false,false,false,true,'{}'::jsonb,60
from categories where slug='models-decor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'assembly','تجميع أو تركيب','boolean',false,true,false,true,'{}'::jsonb,70
from categories where slug='models-decor'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'item_type','نوع المنتج','text',true,true,true,true,'{}'::jsonb,10
from categories where slug='apparel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة/الموديل','text',false,true,true,true,'{}'::jsonb,20
from categories where slug='apparel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,30
from categories where slug='apparel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'branding_method','طريقة التخصيص','select',false,true,false,true,'{"options":["طباعة","تطريز","حفر","سوبلميشن","DTF","Silk Screen","حسب المنتج"]}'::jsonb,40
from categories where slug='apparel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'branding_positions','مواضع الشعار','text',false,true,false,true,'{}'::jsonb,50
from categories where slug='apparel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'packaging','تغليف فردي','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='apparel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='apparel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'item_type','نوع المنتج','text',true,true,true,true,'{}'::jsonb,10
from categories where slug='drinkware'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة/الموديل','text',false,true,true,true,'{}'::jsonb,20
from categories where slug='drinkware'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,30
from categories where slug='drinkware'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'branding_method','طريقة التخصيص','select',false,true,false,true,'{"options":["طباعة","تطريز","حفر","سوبلميشن","DTF","Silk Screen","حسب المنتج"]}'::jsonb,40
from categories where slug='drinkware'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'branding_positions','مواضع الشعار','text',false,true,false,true,'{}'::jsonb,50
from categories where slug='drinkware'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'packaging','تغليف فردي','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='drinkware'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='drinkware'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'item_type','نوع المنتج','text',true,true,true,true,'{}'::jsonb,10
from categories where slug='bags-travel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة/الموديل','text',false,true,true,true,'{}'::jsonb,20
from categories where slug='bags-travel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,30
from categories where slug='bags-travel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'branding_method','طريقة التخصيص','select',false,true,false,true,'{"options":["طباعة","تطريز","حفر","سوبلميشن","DTF","Silk Screen","حسب المنتج"]}'::jsonb,40
from categories where slug='bags-travel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'branding_positions','مواضع الشعار','text',false,true,false,true,'{}'::jsonb,50
from categories where slug='bags-travel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'packaging','تغليف فردي','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='bags-travel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='bags-travel'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'item_type','نوع المنتج','text',true,true,true,true,'{}'::jsonb,10
from categories where slug='writing-office'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة/الموديل','text',false,true,true,true,'{}'::jsonb,20
from categories where slug='writing-office'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,30
from categories where slug='writing-office'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'branding_method','طريقة التخصيص','select',false,true,false,true,'{"options":["طباعة","تطريز","حفر","سوبلميشن","DTF","Silk Screen","حسب المنتج"]}'::jsonb,40
from categories where slug='writing-office'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'branding_positions','مواضع الشعار','text',false,true,false,true,'{}'::jsonb,50
from categories where slug='writing-office'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'packaging','تغليف فردي','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='writing-office'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='writing-office'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'item_type','نوع المنتج','text',true,true,true,true,'{}'::jsonb,10
from categories where slug='tech-promo'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة/الموديل','text',false,true,true,true,'{}'::jsonb,20
from categories where slug='tech-promo'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,30
from categories where slug='tech-promo'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'branding_method','طريقة التخصيص','select',false,true,false,true,'{"options":["طباعة","تطريز","حفر","سوبلميشن","DTF","Silk Screen","حسب المنتج"]}'::jsonb,40
from categories where slug='tech-promo'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'branding_positions','مواضع الشعار','text',false,true,false,true,'{}'::jsonb,50
from categories where slug='tech-promo'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'packaging','تغليف فردي','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='tech-promo'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='tech-promo'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'item_type','نوع المنتج','text',true,true,true,true,'{}'::jsonb,10
from categories where slug='promo-other'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة/الموديل','text',false,true,true,true,'{}'::jsonb,20
from categories where slug='promo-other'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,30
from categories where slug='promo-other'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'branding_method','طريقة التخصيص','select',false,true,false,true,'{"options":["طباعة","تطريز","حفر","سوبلميشن","DTF","Silk Screen","حسب المنتج"]}'::jsonb,40
from categories where slug='promo-other'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'branding_positions','مواضع الشعار','text',false,true,false,true,'{}'::jsonb,50
from categories where slug='promo-other'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'packaging','تغليف فردي','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='promo-other'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='promo-other'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'dimensions','الأبعاد','text',true,true,true,true,'{}'::jsonb,10
from categories where slug='packaging-products'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["كرتون مطوي","كرتون مقوى","كرافت","ورق فاخر","خامة مخصصة"]}'::jsonb,20
from categories where slug='packaging-products'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,30
from categories where slug='packaging-products'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'print_colors','الألوان','select',false,true,false,true,'{"options":["لون واحد","لونان","CMYK كامل","خاص"]}'::jsonb,40
from categories where slug='packaging-products'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'diecut','قالب قص','select',false,true,false,true,'{"options":["متوفر","قالب جديد","غير مطلوب"]}'::jsonb,50
from categories where slug='packaging-products'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'sample','عينة أولية','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='packaging-products'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','تصميم التغليف','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='packaging-products'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'dimensions','الأبعاد','text',true,true,true,true,'{}'::jsonb,10
from categories where slug='bags-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["كرتون مطوي","كرتون مقوى","كرافت","ورق فاخر","خامة مخصصة"]}'::jsonb,20
from categories where slug='bags-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,30
from categories where slug='bags-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'print_colors','الألوان','select',false,true,false,true,'{"options":["لون واحد","لونان","CMYK كامل","خاص"]}'::jsonb,40
from categories where slug='bags-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'diecut','قالب قص','select',false,true,false,true,'{"options":["متوفر","قالب جديد","غير مطلوب"]}'::jsonb,50
from categories where slug='bags-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'sample','عينة أولية','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='bags-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','تصميم التغليف','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='bags-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'dimensions','الأبعاد','text',true,true,true,true,'{}'::jsonb,10
from categories where slug='food-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["كرتون مطوي","كرتون مقوى","كرافت","ورق فاخر","خامة مخصصة"]}'::jsonb,20
from categories where slug='food-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,30
from categories where slug='food-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'print_colors','الألوان','select',false,true,false,true,'{"options":["لون واحد","لونان","CMYK كامل","خاص"]}'::jsonb,40
from categories where slug='food-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'diecut','قالب قص','select',false,true,false,true,'{"options":["متوفر","قالب جديد","غير مطلوب"]}'::jsonb,50
from categories where slug='food-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'sample','عينة أولية','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='food-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','تصميم التغليف','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='food-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'dimensions','الأبعاد','text',true,true,true,true,'{}'::jsonb,10
from categories where slug='premium-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','select',true,true,true,true,'{"options":["كرتون مطوي","كرتون مقوى","كرافت","ورق فاخر","خامة مخصصة"]}'::jsonb,20
from categories where slug='premium-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,30
from categories where slug='premium-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'print_colors','الألوان','select',false,true,false,true,'{"options":["لون واحد","لونان","CMYK كامل","خاص"]}'::jsonb,40
from categories where slug='premium-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'diecut','قالب قص','select',false,true,false,true,'{"options":["متوفر","قالب جديد","غير مطلوب"]}'::jsonb,50
from categories where slug='premium-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'sample','عينة أولية','boolean',false,true,false,true,'{}'::jsonb,60
from categories where slug='premium-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','تصميم التغليف','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='premium-packaging'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'event_type','نوع الفعالية','text',false,false,false,true,'{}'::jsonb,10
from categories where slug='events-exhibitions'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'dimensions','المقاس/الأبعاد','text',false,true,true,true,'{}'::jsonb,20
from categories where slug='events-exhibitions'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,30
from categories where slug='events-exhibitions'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','text',false,true,true,true,'{}'::jsonb,40
from categories where slug='events-exhibitions'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'installation','تركيب/تجهيز','boolean',false,true,false,true,'{}'::jsonb,50
from categories where slug='events-exhibitions'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deadline','موعد الفعالية','date',true,true,false,true,'{}'::jsonb,60
from categories where slug='events-exhibitions'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='events-exhibitions'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'event_type','نوع الفعالية','text',false,false,false,true,'{}'::jsonb,10
from categories where slug='retail-pos'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'dimensions','المقاس/الأبعاد','text',false,true,true,true,'{}'::jsonb,20
from categories where slug='retail-pos'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,30
from categories where slug='retail-pos'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','text',false,true,true,true,'{}'::jsonb,40
from categories where slug='retail-pos'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'installation','تركيب/تجهيز','boolean',false,true,false,true,'{}'::jsonb,50
from categories where slug='retail-pos'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deadline','موعد الفعالية','date',true,true,false,true,'{}'::jsonb,60
from categories where slug='retail-pos'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='retail-pos'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'event_type','نوع الفعالية','text',false,false,false,true,'{}'::jsonb,10
from categories where slug='seasonal-events'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'dimensions','المقاس/الأبعاد','text',false,true,true,true,'{}'::jsonb,20
from categories where slug='seasonal-events'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'quantity','الكمية','number',true,true,false,true,'{"unit":"قطعة"}'::jsonb,30
from categories where slug='seasonal-events'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'material','الخامة','text',false,true,true,true,'{}'::jsonb,40
from categories where slug='seasonal-events'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'installation','تركيب/تجهيز','boolean',false,true,false,true,'{}'::jsonb,50
from categories where slug='seasonal-events'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'deadline','موعد الفعالية','date',true,true,false,true,'{}'::jsonb,60
from categories where slug='seasonal-events'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

insert into category_field_templates (category_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,config,sort_order)
select id,'design_service','التصميم','select',false,true,false,true,'{"options":["جاهز","تصميم من أوريكس"]}'::jsonb,70
from categories where slug='seasonal-events'
on conflict (category_id,field_key) do update set label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,config=excluded.config,sort_order=excluded.sort_order;

-- Materialize category templates into per-service fields while preserving service-specific overrides.
insert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select s.id,t.field_key,t.label_ar,t.field_type,t.is_required,t.affects_price,t.affects_material,t.affects_production,true,true,t.config,t.sort_order
from services s
join category_field_templates t on t.category_id=s.category_id
on conflict (service_id,field_key) do nothing;

insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='matte-lamination' where c.slug='office-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gloss-lamination' where c.slug='office-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='spot-uv' where c.slug='office-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gold-foil' where c.slug='office-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='silver-foil' where c.slug='office-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='emboss' where c.slug='office-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='deboss' where c.slug='office-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='die-cut' where c.slug='office-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='matte-lamination' where c.slug='financial-forms'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gloss-lamination' where c.slug='financial-forms'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='spot-uv' where c.slug='financial-forms'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gold-foil' where c.slug='financial-forms'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='silver-foil' where c.slug='financial-forms'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='emboss' where c.slug='financial-forms'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='deboss' where c.slug='financial-forms'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='die-cut' where c.slug='financial-forms'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='matte-lamination' where c.slug='publishing'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gloss-lamination' where c.slug='publishing'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='spot-uv' where c.slug='publishing'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gold-foil' where c.slug='publishing'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='silver-foil' where c.slug='publishing'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='emboss' where c.slug='publishing'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='deboss' where c.slug='publishing'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='die-cut' where c.slug='publishing'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='matte-lamination' where c.slug='educational-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gloss-lamination' where c.slug='educational-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='spot-uv' where c.slug='educational-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gold-foil' where c.slug='educational-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='silver-foil' where c.slug='educational-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='emboss' where c.slug='educational-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='deboss' where c.slug='educational-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='die-cut' where c.slug='educational-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='matte-lamination' where c.slug='invitations-events-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gloss-lamination' where c.slug='invitations-events-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='spot-uv' where c.slug='invitations-events-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gold-foil' where c.slug='invitations-events-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='silver-foil' where c.slug='invitations-events-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='emboss' where c.slug='invitations-events-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='deboss' where c.slug='invitations-events-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='die-cut' where c.slug='invitations-events-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='matte-lamination' where c.slug='calendars'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gloss-lamination' where c.slug='calendars'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='spot-uv' where c.slug='calendars'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gold-foil' where c.slug='calendars'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='silver-foil' where c.slug='calendars'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='emboss' where c.slug='calendars'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='deboss' where c.slug='calendars'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='die-cut' where c.slug='calendars'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='matte-lamination' where c.slug='labels'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gloss-lamination' where c.slug='labels'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='spot-uv' where c.slug='labels'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gold-foil' where c.slug='labels'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='silver-foil' where c.slug='labels'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='emboss' where c.slug='labels'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='deboss' where c.slug='labels'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='die-cut' where c.slug='labels'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='matte-lamination' where c.slug='security-variable'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gloss-lamination' where c.slug='security-variable'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='spot-uv' where c.slug='security-variable'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gold-foil' where c.slug='security-variable'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='silver-foil' where c.slug='security-variable'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='emboss' where c.slug='security-variable'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='deboss' where c.slug='security-variable'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='die-cut' where c.slug='security-variable'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='eyelets' where c.slug='digital-large-format'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='hemming' where c.slug='digital-large-format'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='welding' where c.slug='digital-large-format'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='protective-lamination' where c.slug='digital-large-format'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='contour-cut' where c.slug='digital-large-format'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='eyelets' where c.slug='wall-floor'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='hemming' where c.slug='wall-floor'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='welding' where c.slug='wall-floor'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='protective-lamination' where c.slug='wall-floor'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='contour-cut' where c.slug='wall-floor'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='eyelets' where c.slug='window-glass'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='hemming' where c.slug='window-glass'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='welding' where c.slug='window-glass'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='protective-lamination' where c.slug='window-glass'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='contour-cut' where c.slug='window-glass'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='eyelets' where c.slug='fabric-textile-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='hemming' where c.slug='fabric-textile-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='welding' where c.slug='fabric-textile-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='protective-lamination' where c.slug='fabric-textile-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='contour-cut' where c.slug='fabric-textile-print'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='laser-polish' where c.slug='laser'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='edge-polish' where c.slug='laser'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='laser'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='laser'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='laser-polish' where c.slug='awards'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='edge-polish' where c.slug='awards'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='awards'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='awards'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='laser-polish' where c.slug='displays'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='edge-polish' where c.slug='displays'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='displays'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='displays'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='laser-polish' where c.slug='models-decor'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='edge-polish' where c.slug='models-decor'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='models-decor'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='models-decor'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='apparel'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='apparel'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='drinkware'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='drinkware'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='bags-travel'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='bags-travel'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='writing-office'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='writing-office'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='tech-promo'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='tech-promo'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='promo-other'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='promo-other'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='packaging-products'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='packaging-products'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='bags-packaging'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='bags-packaging'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='food-packaging'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='food-packaging'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='individual-pack' where c.slug='premium-packaging'
on conflict (service_id,finishing_id) do nothing;
insert into service_finishings (service_id,finishing_id,sort_order)
select s.id,f.id,10 from services s join categories c on c.id=s.category_id join finishings f on f.key='gift-box' where c.slug='premium-packaging'
on conflict (service_id,finishing_id) do nothing;
