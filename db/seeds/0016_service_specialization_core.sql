-- High-value service-specific specification overrides.\n\ndelete from service_fields sf using services s where sf.service_id=s.id and s.slug='business-cards' and sf.field_key in ('paper','weight');\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'paper_type','نوع الورق','select',true,true,true,true,true,true,'{"options":["كوشيه فاخر","بريستول","كرافت","ملمس Linen","لؤلؤي","ورق خاص"]}'::jsonb,200
from services where slug='business-cards'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'paper_weight','وزن الورق','select',true,true,true,true,true,true,'{"options":["250 جم","300 جم","350 جم","400 جم","مخصص"]}'::jsonb,210
from services where slug='business-cards'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'orientation','الاتجاه','select',true,true,false,true,true,true,'{"options":["أفقي","عمودي","مربع"]}'::jsonb,220
from services where slug='business-cards'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'corners','الزوايا','select',false,true,false,true,true,true,'{"options":["عادية","دائرية 4 زوايا","دائرية جزئيًا"]}'::jsonb,230
from services where slug='business-cards'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'variable_names','أسماء/بيانات متغيرة بين الكروت','boolean',false,true,false,true,true,true,'{}'::jsonb,240
from services where slug='business-cards'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'cards_per_person','الكمية لكل اسم','number',false,true,false,true,true,true,'{"unit":"كرت"}'::jsonb,250
from services where slug='business-cards'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'flat_size','المقاس قبل الطي','select',false,true,false,true,true,true,'{"options":["A4","A3","مخصص"]}'::jsonb,200
from services where slug='brochures'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'fold_type','نوع الطي','select',true,true,false,true,true,true,'{"options":["بدون طي","نصف","ثلاثي C-Fold","ثلاثي Z-Fold","Gate Fold","Accordion","طي مخصص"]}'::jsonb,210
from services where slug='brochures'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'panels','عدد الأوجه/الألواح','number',false,true,false,true,true,true,'{"unit":"لوحة"}'::jsonb,220
from services where slug='brochures'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'grain_direction','اتجاه ألياف الورق مهم للطي','boolean',false,true,false,true,true,true,'{}'::jsonb,230
from services where slug='brochures'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'finished_size','المقاس النهائي','select',true,true,false,true,true,true,'{"options":["A4","A5","مخصص"]}'::jsonb,200
from services where slug='corporate-folders'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'pocket_type','الجيب الداخلي','select',true,true,false,true,true,true,'{"options":["جيب واحد","جيبان","جيب مع شق كرت","تصميم مخصص"]}'::jsonb,210
from services where slug='corporate-folders'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'spine_width','عرض الكعب','number',false,true,false,true,true,true,'{"unit":"مم"}'::jsonb,220
from services where slug='corporate-folders'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'card_slot','شق للكرت الشخصي','boolean',false,true,false,true,true,true,'{}'::jsonb,230
from services where slug='corporate-folders'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'diecut_template','قالب القص','select',false,true,false,true,true,true,'{"options":["قالب قياسي","قالب خاص جديد","لدي قالب جاهز"]}'::jsonb,240
from services where slug='corporate-folders'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'sheet_colors','ألوان النسخ','text',false,true,false,true,true,true,'{}'::jsonb,200
from services where slug='ncr-invoices'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'sets_per_book','عدد المجموعات في الدفتر','select',true,true,false,true,true,true,'{"options":["25","50","100","مخصص"]}'::jsonb,210
from services where slug='ncr-invoices'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'stub','كعب ثابت','boolean',false,true,false,true,true,true,'{}'::jsonb,220
from services where slug='ncr-invoices'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'perforation','تخريم للفصل','boolean',true,true,false,true,true,true,'{}'::jsonb,230
from services where slug='ncr-invoices'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'numbering_prefix','بادئة الترقيم','text',false,true,false,true,true,true,'{}'::jsonb,240
from services where slug='ncr-invoices'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'end_number','نهاية الترقيم','number',false,true,false,true,true,true,'{}'::jsonb,250
from services where slug='ncr-invoices'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'inside_weight','وزن ورق الداخل','select',true,true,true,true,true,true,'{"options":["60 جم","70 جم","80 جم","90 جم","100 جم","115 جم","130 جم","150 جم","مخصص"]}'::jsonb,200
from services where slug='books'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'cover_weight','وزن الغلاف','select',false,true,true,true,true,true,'{"options":["250 جم","300 جم","350 جم","غلاف مقوى","مخصص"]}'::jsonb,210
from services where slug='books'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'cover_print','طباعة الغلاف','select',true,true,false,true,true,true,'{"options":["وجه خارجي فقط","خارج وداخل الغلاف","مخصص"]}'::jsonb,220
from services where slug='books'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'reading_direction','اتجاه الكتاب','select',true,true,false,true,true,true,'{"options":["عربي من اليمين","إنجليزي من اليسار"]}'::jsonb,230
from services where slug='books'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'isbn_barcode','يوجد ISBN/باركود للغلاف','boolean',false,true,false,true,true,true,'{}'::jsonb,240
from services where slug='books'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'proof_copy','نسخة بروفة قبل كامل الكمية','boolean',false,true,false,true,true,true,'{}'::jsonb,250
from services where slug='books'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'files_ready','جاهزية الملفات','select',true,true,false,true,true,true,'{"options":["PDF جاهز للطباعة","يحتاج مراجعة Preflight","يحتاج إخراج داخلي","يحتاج تصميم كامل"]}'::jsonb,260
from services where slug='books'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'inside_weight','وزن ورق الداخل','select',true,true,true,true,true,true,'{"options":["90 جم","115 جم","130 جم","150 جم","170 جم","مخصص"]}'::jsonb,200
from services where slug='magazines'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'cover_weight','وزن الغلاف','select',true,true,true,true,true,true,'{"options":["200 جم","250 جم","300 جم","350 جم","مخصص"]}'::jsonb,210
from services where slug='magazines'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'pagination_check','عدد الصفحات متوافق مع التجليد','boolean',false,true,false,true,true,true,'{}'::jsonb,220
from services where slug='magazines'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'inserts','إضافات داخل المجلة','select',false,true,false,true,true,true,'{"options":["بدون","ورقة Insert","كوبون","غلاف إضافي","مخصص"]}'::jsonb,230
from services where slug='magazines'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'proof_copy','نسخة بروفة','boolean',false,true,false,true,true,true,'{}'::jsonb,240
from services where slug='magazines'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'anniversary_years','عدد سنوات التأسيس','number',true,true,false,true,true,true,'{"unit":"سنة"}'::jsonb,200
from services where slug='corporate-anniversary-magazine'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'editorial_scope','نطاق إعداد المحتوى','select',true,true,false,true,true,true,'{"options":["المحتوى جاهز","تحرير وإعادة صياغة","مقابلات وبحث وإعداد كامل"]}'::jsonb,210
from services where slug='corporate-anniversary-magazine'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'archive_material','مواد الأرشيف متاحة','select',false,false,false,true,true,true,'{"options":["متاحة بالكامل","متاحة جزئيًا","تحتاج جمع"]}'::jsonb,220
from services where slug='corporate-anniversary-magazine'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'executive_interviews','مقابلات قيادات','number',false,true,false,true,true,true,'{"unit":"مقابلة"}'::jsonb,230
from services where slug='corporate-anniversary-magazine'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'sponsor_pages','صفحات رعاية/إعلان','number',false,true,false,true,true,true,'{"unit":"صفحة"}'::jsonb,240
from services where slug='corporate-anniversary-magazine'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'distribution_plan','التوزيع','select',false,true,false,true,true,true,'{"options":["داخلي","عملاء وشركاء","فعالية","توزيع واسع"]}'::jsonb,250
from services where slug='corporate-anniversary-magazine'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'digital_version','نسخة رقمية تفاعلية','boolean',false,true,false,true,true,true,'{}'::jsonb,260
from services where slug='corporate-anniversary-magazine'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ndelete from service_fields sf using services s where sf.service_id=s.id and s.slug='desk-calendar-2027' and sf.field_key in ('design');\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'base_material','خامة القاعدة','select',true,true,true,true,true,true,'{"options":["كرتون مقوى","كرتون مغلف","قاعدة فاخرة","أكريليك","مخصص"]}'::jsonb,200
from services where slug='desk-calendar-2027'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'binding_type','التجليد','select',true,true,false,true,true,true,'{"options":["Wire-O أسود","Wire-O أبيض","Wire-O معدني","مخصص"]}'::jsonb,210
from services where slug='desk-calendar-2027'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'print_layout','نظام الأشهر','select',true,true,false,true,true,true,'{"options":["12 شهر + غلاف","6 أوراق وجهين + غلاف","تصميم مخصص"]}'::jsonb,220
from services where slug='desk-calendar-2027'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'company_pages','صفحات تعريف/إعلانات إضافية','number',false,true,false,true,true,true,'{"unit":"صفحة"}'::jsonb,230
from services where slug='desk-calendar-2027'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'individual_pack','تغليف فردي','boolean',false,true,false,true,true,true,'{}'::jsonb,240
from services where slug='desk-calendar-2027'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'delivery_deadline','موعد التسليم المطلوب','date',false,true,false,true,true,true,'{}'::jsonb,250
from services where slug='desk-calendar-2027'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'hanger_type','طريقة التعليق','select',true,true,false,true,true,true,'{"options":["Wire-O مع علاقة","عين معدنية","مجرى معدني","لوح خلفي","مخصص"]}'::jsonb,200
from services where slug='wall-calendar-2027'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'month_layout','نظام الأشهر','select',true,true,false,true,true,true,'{"options":["12 ورقة + غلاف","6 أوراق وجهين","ورقة سنوية واحدة","مخصص"]}'::jsonb,210
from services where slug='wall-calendar-2027'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'back_board','لوح خلفي إعلاني','boolean',false,true,false,true,true,true,'{}'::jsonb,220
from services where slug='wall-calendar-2027'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'individual_pack','تغليف فردي','boolean',false,true,false,true,true,true,'{}'::jsonb,230
from services where slug='wall-calendar-2027'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'delivery_deadline','موعد التسليم المطلوب','date',false,true,false,true,true,true,'{}'::jsonb,240
from services where slug='wall-calendar-2027'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'material','نوع الورق','select',true,true,true,true,true,true,'{"options":["كرافت بني","كرافت أبيض","كوشيه","Bristol","ورق فاخر"]}'::jsonb,200
from services where slug='paper-shopping-bag'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'paper_weight','وزن الورق','select',true,true,true,true,true,true,'{"options":["120 جم","150 جم","170 جم","200 جم","250 جم","مخصص"]}'::jsonb,210
from services where slug='paper-shopping-bag'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'handle','نوع المقبض','select',true,true,false,true,true,true,'{"options":["حبل قطني","حبل بوليستر","شريط ساتان","مقبض ورقي ملتوي","مقبض ورقي مسطح","بدون"]}'::jsonb,220
from services where slug='paper-shopping-bag'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'handle_color','لون المقبض','text',false,true,false,true,true,true,'{}'::jsonb,230
from services where slug='paper-shopping-bag'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'gusset','عمق الجنب والقاعدة ضمن الأبعاد','boolean',true,true,false,true,true,true,'{}'::jsonb,240
from services where slug='paper-shopping-bag'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'bottom_reinforcement','تدعيم القاعدة','boolean',false,true,false,true,true,true,'{}'::jsonb,250
from services where slug='paper-shopping-bag'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'top_reinforcement','تدعيم فتحة الكيس','boolean',false,true,false,true,true,true,'{}'::jsonb,260
from services where slug='paper-shopping-bag'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'box_style','نمط العلبة','select',true,true,false,true,true,true,'{"options":["Tuck End","Auto Lock","Sleeve","Mailer","Drawer","Rigid","Magnetic","تصميم خاص"]}'::jsonb,200
from services where slug='product-boxes'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'board_weight','سماكة/وزن الكرتون','text',false,true,true,true,true,true,'{}'::jsonb,210
from services where slug='product-boxes'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'insert_type','الحامل الداخلي Insert','select',false,true,false,true,true,true,'{"options":["بدون","كرتون","فوم","EVA","مقسمات","مخصص"]}'::jsonb,220
from services where slug='product-boxes'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'window','نافذة شفافة','select',false,true,false,true,true,true,'{"options":["بدون","نافذة PET","نافذة بدون فيلم"]}'::jsonb,230
from services where slug='product-boxes'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'prototype','Prototype قبل الإنتاج','boolean',false,true,false,true,true,true,'{}'::jsonb,240
from services where slug='product-boxes'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'product_weight','وزن المنتج داخل العلبة','number',false,true,false,true,true,true,'{"unit":"جم"}'::jsonb,250
from services where slug='product-boxes'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'garment_type','نوع القطعة','select',true,true,false,true,true,true,'{"options":["تيشيرت Round Neck","Polo","قميص","Hoodie","قطعة مخصصة"]}'::jsonb,200
from services where slug='printed-tshirt'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'fabric','نوع القماش','select',true,true,true,true,true,true,'{"options":["قطن","Polyester","Cotton Blend","Dry Fit","مخصص"]}'::jsonb,210
from services where slug='printed-tshirt'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'fabric_weight','وزن القماش','text',false,true,false,true,true,true,'{}'::jsonb,220
from services where slug='printed-tshirt'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'garment_color','لون القطعة','text',true,true,false,true,true,true,'{}'::jsonb,230
from services where slug='printed-tshirt'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'size_breakdown','توزيع المقاسات','textarea',true,true,false,true,true,true,'{}'::jsonb,240
from services where slug='printed-tshirt'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'print_positions','مواضع الطباعة','select',true,true,false,true,true,true,'{"options":["صدر","ظهر","صدر + ظهر","كم","متعدد"]}'::jsonb,250
from services where slug='printed-tshirt'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'artwork_colors','عدد ألوان التصميم إن كان Silk Screen','number',false,true,false,true,true,true,'{"unit":"لون"}'::jsonb,260
from services where slug='printed-tshirt'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'dimensions','المقاس','select',true,true,false,true,true,true,'{"options":["85×200 سم","100×200 سم","120×200 سم","150×200 سم","مخصص"]}'::jsonb,200
from services where slug='rollup'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'mechanism','نوع القاعدة','select',true,true,false,true,true,true,'{"options":["اقتصادي","قياسي","فاخر Heavy Duty","تبديل طباعة فقط"]}'::jsonb,210
from services where slug='rollup'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'print_media','خامة الطباعة','select',true,true,true,true,true,true,'{"options":["PP Film","Banner","PET Gray Back","مخصص"]}'::jsonb,220
from services where slug='rollup'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'carry_bag','حقيبة حمل','boolean',false,true,false,true,true,true,'{}'::jsonb,230
from services where slug='rollup'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'facade_material','خامة الواجهة الحالية','select',false,true,false,true,true,true,'{"options":["كلادينج","زجاج","حجر","خرسانة","معدن","غير معروف"]}'::jsonb,200
from services where slug='shop-sign'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'letter_depth','عمق الحروف','number',false,true,false,true,true,true,'{"unit":"سم"}'::jsonb,210
from services where slug='shop-sign'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'power_available','مصدر كهرباء قريب','boolean',false,true,false,true,true,true,'{}'::jsonb,220
from services where slug='shop-sign'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'installation_height','ارتفاع التركيب عن الأرض','number',false,true,false,true,true,true,'{"unit":"متر"}'::jsonb,230
from services where slug='shop-sign'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'site_measurement','أحتاج زيارة قياس موقع','boolean',false,true,false,true,true,true,'{}'::jsonb,240
from services where slug='shop-sign'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'permit_status','وضع التصريح إن كان مطلوبًا','select',false,true,false,true,true,true,'{"options":["غير مطلوب","متوفر","يحتاج متابعة","غير معروف"]}'::jsonb,250
from services where slug='shop-sign'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'material','نوع الأكريليك','select',true,true,true,true,true,true,'{"options":["شفاف","أبيض","أسود","ملون","Mirror","Frosted","مخصص"]}'::jsonb,200
from services where slug='laser-acrylic'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'thickness','السماكة','select',true,true,true,true,true,true,'{"options":["2 مم","3 مم","4 مم","5 مم","6 مم","8 مم","10 مم","مخصص"]}'::jsonb,210
from services where slug='laser-acrylic'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'edge_finish','تشطيب الحواف','select',false,true,false,true,true,true,'{"options":["كما خرجت من الليزر","تلميع","تلميع فاخر"]}'::jsonb,220
from services where slug='laser-acrylic'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'protective_film','الإبقاء على طبقة الحماية','boolean',false,true,false,true,true,true,'{}'::jsonb,230
from services where slug='laser-acrylic'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'stand_or_mount','قاعدة/تثبيت','select',false,true,false,true,true,true,'{"options":["بدون","قاعدة أكريليك","مسامير تثبيت","لاصق","مخصص"]}'::jsonb,240
from services where slug='laser-acrylic'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'material','نوع الفليكس','select',true,true,true,true,true,true,'{"options":["Frontlit","Backlit","ثقيل","مخصص"]}'::jsonb,200
from services where slug='flex-banner'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'gsm','الوزن/السماكة','text',false,true,false,true,true,true,'{}'::jsonb,210
from services where slug='flex-banner'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'hem','حاشية وتقوية','boolean',false,true,false,true,true,true,'{}'::jsonb,220
from services where slug='flex-banner'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'eyelet_spacing','تباعد الحلقات','number',false,true,false,true,true,true,'{"unit":"سم"}'::jsonb,230
from services where slug='flex-banner'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'wind_exposure','تعرض للرياح','select',false,true,false,true,true,true,'{"options":["داخلي","خارجي منخفض","خارجي مرتفع"]}'::jsonb,240
from services where slug='flex-banner'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'material','نوع الفينيل','select',true,true,true,true,true,true,'{"options":["أبيض Gloss","أبيض Matte","شفاف","Frosted","Reflective","One Way Vision","Cast Vehicle Vinyl","مخصص"]}'::jsonb,200
from services where slug='vinyl-sticker'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'lamination','طبقة حماية','select',false,true,false,true,true,true,'{"options":["بدون","Gloss","Matte","UV Protection","Vehicle Grade"]}'::jsonb,210
from services where slug='vinyl-sticker'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'cut_type','نوع القص','select',true,true,false,true,true,true,'{"options":["مستقيم","Kiss Cut","Contour Cut","Die Cut"]}'::jsonb,220
from services where slug='vinyl-sticker'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'surface_type','سطح التطبيق','select',false,true,false,true,true,true,'{"options":["زجاج","جدار","معدن","بلاستيك","مركبة","أرضية","مخصص"]}'::jsonb,230
from services where slug='vinyl-sticker'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'application_service','خدمة التركيب','boolean',false,true,false,true,true,true,'{}'::jsonb,240
from services where slug='vinyl-sticker'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'vehicle_make_model','ماركة وموديل المركبة','text',true,true,false,true,true,true,'{}'::jsonb,200
from services where slug='vehicle-branding'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'vehicle_year','سنة الموديل','number',false,true,false,true,true,true,'{}'::jsonb,210
from services where slug='vehicle-branding'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'coverage','نطاق التغليف','select',true,true,false,true,true,true,'{"options":["Full Wrap","Half Wrap","Partial Wrap","Decals فقط","شعارات وبيانات"]}'::jsonb,220
from services where slug='vehicle-branding'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'vinyl_grade','فئة الفينيل','select',false,true,true,true,true,true,'{"options":["اقتصادي","متوسط","Cast احترافي","Reflective","مخصص"]}'::jsonb,230
from services where slug='vehicle-branding'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'removal_required','إزالة استيكر سابق','boolean',false,true,false,true,true,true,'{}'::jsonb,240
from services where slug='vehicle-branding'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'site_or_workshop','مكان التنفيذ','select',false,true,false,true,true,true,'{"options":["ورشة ORYX/الشريك","موقع العميل","يحدد لاحقًا"]}'::jsonb,250
from services where slug='vehicle-branding'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\ninsert into service_fields (service_id,field_key,label_ar,field_type,is_required,affects_price,affects_material,affects_production,customer_visible,staff_visible,config,sort_order)
select id,'fleet_numbering','ترقيم المركبات ضمن الأسطول','boolean',false,true,false,true,true,true,'{}'::jsonb,260
from services where slug='vehicle-branding'
on conflict (service_id,field_key) do update set
label_ar=excluded.label_ar,field_type=excluded.field_type,is_required=excluded.is_required,
affects_price=excluded.affects_price,affects_material=excluded.affects_material,affects_production=excluded.affects_production,
config=excluded.config,sort_order=excluded.sort_order;\n\n