-- ORYX Master Catalog expansion v1

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'brand-strategy','استراتيجية العلامة والهوية','Brand Strategy',10 from departments where slug='creative-branding'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'logo-identity','الشعارات والهوية البصرية','Logo & Visual Identity',20 from departments where slug='creative-branding'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'corporate-design','التصميم المؤسسي','Corporate Design',30 from departments where slug='creative-branding'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'social-digital','السوشال ميديا والتصميم الرقمي','Social & Digital',40 from departments where slug='creative-branding'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'campaign-creative','تصميم الحملات الإعلانية','Campaign Creative',50 from departments where slug='creative-branding'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'packaging-design','تصميم التغليف والمنتجات','Packaging Design',60 from departments where slug='creative-branding'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'environmental-design','التصميم الإعلاني والبيئي','Environmental Design',70 from departments where slug='creative-branding'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'office-print','المطبوعات المكتبية والتجارية','Office & Commercial Print',10 from departments where slug='paper-printing'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'financial-forms','النماذج المالية والإدارية','Financial Forms',20 from departments where slug='paper-printing'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'publishing','الكتب والنشر والمجلات','Publishing',30 from departments where slug='paper-printing'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'educational-print','المطبوعات التعليمية والتدريبية','Educational Print',40 from departments where slug='paper-printing'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'invitations-events-print','الدعوات والمناسبات الورقية','Invitations & Event Print',50 from departments where slug='paper-printing'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'calendars','التقاويم والأجندات','Calendars & Diaries',60 from departments where slug='paper-printing'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'labels','الملصقات والليبل','Labels',70 from departments where slug='paper-printing'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'security-variable','الترقيم والطباعة المتغيرة والمتخصصة','Security & Variable Data',80 from departments where slug='paper-printing'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'binding-finishing','التجليد والتشطيبات الورقية','Binding & Finishing',90 from departments where slug='paper-printing'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'digital-large-format','الطباعة الرقمية كبيرة الحجم','Large Format',10 from departments where slug='large-format'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'wall-floor','الجدران والأرضيات','Wall & Floor Graphics',20 from departments where slug='large-format'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'window-glass','الزجاج والنوافذ','Window & Glass Graphics',30 from departments where slug='large-format'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'fabric-textile-print','الطباعة على الأقمشة','Fabric Print',40 from departments where slug='large-format'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'photo-fine-art','الصور والفنون والديكور','Photo & Fine Art',50 from departments where slug='large-format'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'signage','اللوحات التجارية','Commercial Signage',10 from departments where slug='signage-outdoor'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'illuminated-signage','اللوحات والحروف المضيئة','Illuminated Signage',20 from departments where slug='signage-outdoor'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'wayfinding','اللوحات الإرشادية والتعريفية','Wayfinding',30 from departments where slug='signage-outdoor'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'outdoor-media','الإعلان الخارجي','Outdoor Media',40 from departments where slug='signage-outdoor'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'vehicles','المركبات والأساطيل','Vehicle Branding',50 from departments where slug='signage-outdoor'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'laser','الليزر والقص والحفر','Laser Cutting & Engraving',10 from departments where slug='laser-fabrication'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'awards','الدروع والتكريم','Awards',20 from departments where slug='laser-fabrication'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'displays','ستاندات وعناصر العرض','Displays',30 from departments where slug='laser-fabrication'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'models-decor','المجسمات والديكور','Models & Decor',40 from departments where slug='laser-fabrication'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'apparel','الملابس والمنسوجات','Apparel',10 from departments where slug='promo-products'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'drinkware','الأكواب وأدوات الشرب','Drinkware',20 from departments where slug='promo-products'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'bags-travel','الحقائب والسفر','Bags & Travel',30 from departments where slug='promo-products'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'writing-office','الأقلام والمكتب','Writing & Office',40 from departments where slug='promo-products'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'tech-promo','منتجات التقنية الدعائية','Tech Promo',50 from departments where slug='promo-products'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'promo-other','منتجات دعائية متنوعة','Other Promo',60 from departments where slug='promo-products'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'packaging-products','علب المنتجات','Product Boxes',10 from departments where slug='packaging'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'bags-packaging','الأكياس والتغليف المرن','Bags & Flexible Packaging',20 from departments where slug='packaging'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'food-packaging','تغليف الأغذية والمطاعم','Food Packaging',30 from departments where slug='packaging'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'premium-packaging','التغليف والهدايا الفاخرة','Premium Packaging',40 from departments where slug='packaging'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'events-exhibitions','المعارض والمؤتمرات','Events & Exhibitions',10 from departments where slug='events'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'retail-pos','نقاط البيع والعرض','Retail POS',20 from departments where slug='events'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into categories (department_id,slug,name_ar,name_en,sort_order)
select id,'seasonal-events','الحملات والمواسم والمناسبات','Seasonal Campaigns',30 from departments where slug='events'
on conflict (department_id,slug) do update set name_ar=excluded.name_ar,name_en=excluded.name_en,sort_order=excluded.sort_order;

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'brand-audit','تدقيق العلامة التجارية','خدمة تدقيق العلامة التجارية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='brand-strategy'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'brand-strategy','استراتيجية علامة تجارية','خدمة استراتيجية علامة تجارية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='brand-strategy'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'brand-positioning','تموضع العلامة','خدمة تموضع العلامة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='brand-strategy'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'brand-naming','تسمية علامة تجارية','خدمة تسمية علامة تجارية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='brand-strategy'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'brand-messaging','رسائل العلامة','خدمة رسائل العلامة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='brand-strategy'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'brand-voice','نبرة وهوية لفظية','خدمة نبرة وهوية لفظية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='brand-strategy'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'logo-design','تصميم شعار','خدمة تصميم شعار بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='logo-identity'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'logo-refresh','تطوير شعار قائم','خدمة تطوير شعار قائم بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='logo-identity'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'visual-identity','هوية بصرية متكاملة','خدمة هوية بصرية متكاملة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='logo-identity'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'brand-guidelines','دليل الهوية البصرية','خدمة دليل الهوية البصرية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='logo-identity'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'sub-brand-identity','هوية علامة فرعية','خدمة هوية علامة فرعية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='logo-identity'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'product-brand-identity','هوية منتج','خدمة هوية منتج بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='logo-identity'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'event-identity','هوية فعالية','خدمة هوية فعالية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='logo-identity'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'pattern-system','نظام زخارف وعناصر الهوية','خدمة نظام زخارف وعناصر الهوية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='logo-identity'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'company-profile','بروفايل شركة','خدمة بروفايل شركة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='corporate-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'corporate-presentation','عرض تقديمي مؤسسي','خدمة عرض تقديمي مؤسسي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='corporate-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'annual-report-design','تصميم تقرير سنوي','خدمة تصميم تقرير سنوي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='corporate-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'letterhead-design','تصميم ورق رسمي','خدمة تصميم ورق رسمي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='corporate-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'business-card-design','تصميم كرت شخصي','خدمة تصميم كرت شخصي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='corporate-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'folder-design','تصميم فولدر','خدمة تصميم فولدر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='corporate-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'employee-id-design','تصميم بطاقة موظف','خدمة تصميم بطاقة موظف بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='corporate-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'email-signature-design','تصميم توقيع بريد','خدمة تصميم توقيع بريد بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='corporate-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'proposal-template-design','قالب عرض فني ومالي','خدمة قالب عرض فني ومالي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='corporate-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'corporate-forms-design','تصميم النماذج المؤسسية','خدمة تصميم النماذج المؤسسية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='corporate-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'social-launch-kit','باقة انطلاق سوشال ميديا','خدمة باقة انطلاق سوشال ميديا بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='social-digital'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'social-post-design','تصميم منشور سوشال','خدمة تصميم منشور سوشال بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='social-digital'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'social-story-design','تصميم ستوري','خدمة تصميم ستوري بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='social-digital'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'social-template-kit','قوالب سوشال ميديا','خدمة قوالب سوشال ميديا بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='social-digital'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'digital-ad-design','تصميم إعلان رقمي','خدمة تصميم إعلان رقمي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='social-digital'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'cover-design','تصميم غلاف حساب','خدمة تصميم غلاف حساب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='social-digital'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'monthly-visual-content','محتوى بصري شهري','خدمة محتوى بصري شهري بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='social-digital'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'newsletter-design','تصميم نشرة بريدية','خدمة تصميم نشرة بريدية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='social-digital'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'campaign-concept','ابتكار فكرة حملة','خدمة ابتكار فكرة حملة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='campaign-creative'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'key-visual','تصميم Key Visual','خدمة تصميم Key Visual بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='campaign-creative'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'campaign-adaptations','تكييف تصاميم الحملة','خدمة تكييف تصاميم الحملة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='campaign-creative'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'outdoor-campaign-design','تصميم حملة شوارع','خدمة تصميم حملة شوارع بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='campaign-creative'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'launch-campaign-design','تصميم حملة إطلاق','خدمة تصميم حملة إطلاق بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='campaign-creative'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'seasonal-campaign-design','تصميم حملة موسمية','خدمة تصميم حملة موسمية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='campaign-creative'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'awareness-campaign-design','تصميم حملة توعوية','خدمة تصميم حملة توعوية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='campaign-creative'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'box-design','تصميم علبة منتج','خدمة تصميم علبة منتج بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'label-design','تصميم ليبل منتج','خدمة تصميم ليبل منتج بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'bag-design','تصميم كيس','خدمة تصميم كيس بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'sleeve-design','تصميم Sleeve','خدمة تصميم Sleeve بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'packaging-system','نظام تغليف متكامل','خدمة نظام تغليف متكامل بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'food-packaging-design','تصميم تغليف غذائي','خدمة تصميم تغليف غذائي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'gift-packaging-design','تصميم تغليف هدايا','خدمة تصميم تغليف هدايا بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'packaging-mockup','موكاب تغليف ثلاثي الأبعاد','خدمة موكاب تغليف ثلاثي الأبعاد بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'shop-facade-3d','تصميم واجهة محل ثلاثي الأبعاد','خدمة تصميم واجهة محل ثلاثي الأبعاد بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='environmental-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'signage-system-design','تصميم نظام لوحات','خدمة تصميم نظام لوحات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='environmental-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wayfinding-design','تصميم نظام إرشادي','خدمة تصميم نظام إرشادي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='environmental-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'booth-3d-design','تصميم جناح معرض ثلاثي الأبعاد','خدمة تصميم جناح معرض ثلاثي الأبعاد بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='environmental-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'retail-environment-design','تصميم بيئة نقطة بيع','خدمة تصميم بيئة نقطة بيع بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='environmental-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'vehicle-graphics-design','تصميم هوية مركبات','خدمة تصميم هوية مركبات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='environmental-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'office-branding-design','تصميم Branding للمكاتب','خدمة تصميم Branding للمكاتب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='environmental-design'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'business-cards','كروت شخصية','خدمة كروت شخصية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','instant_quote','tiered',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'letterheads','أوراق رسمية','خدمة أوراق رسمية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'envelopes','مظاريف','خدمة مظاريف بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'corporate-folders','فولدرات شركات','خدمة فولدرات شركات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'notepads','نوتات','خدمة نوتات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'memo-pads','مذكرات','خدمة مذكرات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'employee-id-cards','بطاقات موظفين','خدمة بطاقات موظفين بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'visitor-cards','بطاقات زوار','خدمة بطاقات زوار بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'certificates','شهادات','خدمة شهادات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'forms','استمارات','خدمة استمارات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'brochures','بروشورات','خدمة بروشورات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'flyers','فلايرات','خدمة فلايرات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'leaflets','مطويات','خدمة مطويات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'price-lists','قوائم أسعار','خدمة قوائم أسعار بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'menus','منيوهات','خدمة منيوهات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'coupons','كوبونات','خدمة كوبونات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'gift-vouchers','قسائم هدايا','خدمة قسائم هدايا بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'table-tents','Tent Cards','خدمة Tent Cards بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'door-hangers','Door Hangers','خدمة Door Hangers بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'postcards','بطاقات بريدية','خدمة بطاقات بريدية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='office-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'ncr-invoices','فواتير NCR','خدمة فواتير NCR بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='financial-forms'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'cash-receipts','سند قبض','خدمة سند قبض بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='financial-forms'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'payment-vouchers','سند صرف','خدمة سند صرف بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='financial-forms'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'purchase-orders','أوامر شراء','خدمة أوامر شراء بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='financial-forms'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'delivery-notes','سندات تسليم','خدمة سندات تسليم بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='financial-forms'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'work-orders-print','أوامر عمل مطبوعة','خدمة أوامر عمل مطبوعة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='financial-forms'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'warehouse-forms','نماذج مخازن','خدمة نماذج مخازن بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='financial-forms'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'accounting-books','دفاتر حسابات','خدمة دفاتر حسابات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='financial-forms'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'numbered-books','دفاتر مرقمة','خدمة دفاتر مرقمة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='financial-forms'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'multi-part-forms','نماذج متعددة النسخ','خدمة نماذج متعددة النسخ بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='financial-forms'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'books','طباعة الكتب','خدمة طباعة الكتب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='publishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'booklets','كتيبات','خدمة كتيبات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='publishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'magazines','مجلات','خدمة مجلات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='publishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'newspapers','صحف','خدمة صحف بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='publishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'annual-reports','تقارير سنوية','خدمة تقارير سنوية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='publishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'catalogue-printing','كتالوج منتجات','خدمة كتالوج منتجات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='publishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'directories','أدلة','خدمة أدلة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='publishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'manuals','أدلة تشغيل','خدمة أدلة تشغيل بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='publishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'research-theses','أبحاث ورسائل','خدمة أبحاث ورسائل بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='publishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'company-newsletters','نشرات مؤسسية','خدمة نشرات مؤسسية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='publishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'corporate-anniversary-magazine','مجلة ذكرى تأسيس مؤسسة','خدمة مجلة ذكرى تأسيس مؤسسة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='publishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'coffee-table-books','كتب فاخرة مصورة','خدمة كتب فاخرة مصورة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='publishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'course-handouts','ملازم تدريبية','خدمة ملازم تدريبية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='educational-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'school-workbooks','دفاتر أنشطة','خدمة دفاتر أنشطة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='educational-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'exam-papers','أوراق امتحانات','خدمة أوراق امتحانات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='educational-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'training-manuals','أدلة تدريب','خدمة أدلة تدريب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='educational-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'flash-cards','بطاقات تعليمية','خدمة بطاقات تعليمية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='educational-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'worksheets','أوراق عمل','خدمة أوراق عمل بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='educational-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'school-notebooks','دفاتر مدرسية','خدمة دفاتر مدرسية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='educational-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'student-certificates','شهادات طلاب','خدمة شهادات طلاب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='educational-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'educational-posters','بوسترات تعليمية','خدمة بوسترات تعليمية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='educational-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wedding-invitations','دعوات أعراس','خدمة دعوات أعراس بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='invitations-events-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'event-invitations','دعوات مناسبات','خدمة دعوات مناسبات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='invitations-events-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'graduation-invitations','دعوات تخرج','خدمة دعوات تخرج بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='invitations-events-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'thank-you-cards','بطاقات شكر','خدمة بطاقات شكر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='invitations-events-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'place-cards','بطاقات طاولات','خدمة بطاقات طاولات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='invitations-events-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'table-numbers','أرقام طاولات','خدمة أرقام طاولات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='invitations-events-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'event-programs','برامج فعاليات','خدمة برامج فعاليات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='invitations-events-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'tickets','تذاكر','خدمة تذاكر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='invitations-events-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wristband-tickets','تذاكر أساور ورقية','خدمة تذاكر أساور ورقية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='invitations-events-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'greeting-cards','بطاقات تهنئة','خدمة بطاقات تهنئة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='invitations-events-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'desk-calendar-2027','تقويم مكتبي 2027','خدمة تقويم مكتبي 2027 بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='calendars'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wall-calendar-2027','تقويم حائطي 2027','خدمة تقويم حائطي 2027 بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='calendars'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'pocket-calendar-2027','تقويم جيب 2027','خدمة تقويم جيب 2027 بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='calendars'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'planner-2027','مخطط سنوي 2027','خدمة مخطط سنوي 2027 بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='calendars'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'corporate-diary-2027','أجندة شركات 2027','خدمة أجندة شركات 2027 بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='calendars'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'desk-pad-calendar-2027','تقويم Desk Pad 2027','خدمة تقويم Desk Pad 2027 بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='calendars'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'custom-calendar','تقويم مخصص','خدمة تقويم مخصص بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='calendars'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'product-labels','ملصقات منتجات','خدمة ملصقات منتجات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='labels'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'bottle-labels','ملصقات عبوات','خدمة ملصقات عبوات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='labels'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'food-labels','ملصقات أغذية','خدمة ملصقات أغذية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='labels'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'cosmetic-labels','ملصقات مستحضرات','خدمة ملصقات مستحضرات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='labels'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'barcode-labels','ليبل باركود','خدمة ليبل باركود بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='labels'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'qr-labels','ليبل QR','خدمة ليبل QR بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='labels'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'transparent-labels','ليبل شفاف','خدمة ليبل شفاف بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='labels'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'metallic-labels','ليبل معدني','خدمة ليبل معدني بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='labels'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'thermal-labels','ليبل حراري','خدمة ليبل حراري بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='labels'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'roll-labels','ليبل رول','خدمة ليبل رول بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='labels'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'sheet-labels','ليبل شيت','خدمة ليبل شيت بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='labels'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'security-seals','ملصقات إغلاق وضمان','خدمة ملصقات إغلاق وضمان بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='labels'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'serial-number-printing','طباعة أرقام تسلسلية','خدمة طباعة أرقام تسلسلية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='security-variable'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'variable-data-printing','طباعة بيانات متغيرة','خدمة طباعة بيانات متغيرة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='security-variable'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'variable-qr-printing','طباعة QR متغير','خدمة طباعة QR متغير بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='security-variable'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'variable-barcode-printing','طباعة باركود متغير','خدمة طباعة باركود متغير بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='security-variable'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'numbered-certificates','شهادات مرقمة','خدمة شهادات مرقمة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='security-variable'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'numbered-tickets','تذاكر مرقمة','خدمة تذاكر مرقمة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='security-variable'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'tamper-evident-labels','ملصقات عبث وتحقق','خدمة ملصقات عبث وتحقق بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='security-variable'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'hologram-labels','ملصقات هولوجرام','خدمة ملصقات هولوجرام بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='security-variable'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'controlled-forms','نماذج مؤسسية محكومة','خدمة نماذج مؤسسية محكومة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='security-variable'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'perfect-binding','تجليد حراري','خدمة تجليد حراري بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'saddle-stitching','تدبيس مركزي','خدمة تدبيس مركزي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wire-o-binding','تجليد Wire-O','خدمة تجليد Wire-O بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'spiral-binding','تجليد حلزوني','خدمة تجليد حلزوني بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'hardcover-binding','تجليد غلاف مقوى','خدمة تجليد غلاف مقوى بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'lamination-matte','سلوفان مطفي','خدمة سلوفان مطفي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'lamination-gloss','سلوفان لامع','خدمة سلوفان لامع بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'spot-uv','Spot UV','خدمة Spot UV بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'foil-stamping','فويل','خدمة فويل بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'embossing','ضغط بارز Emboss','خدمة ضغط بارز Emboss بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'debossing','ضغط غائر Deboss','خدمة ضغط غائر Deboss بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'die-cutting','قص بالقالب','خدمة قص بالقالب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'perforation','تخريم','خدمة تخريم بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'folding','طي','خدمة طي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'corner-rounding','تدوير الزوايا','خدمة تدوير الزوايا بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',false,true,true
from categories where slug='binding-finishing'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'flex-banner','طباعة فليكس','خدمة طباعة فليكس بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','instant_quote','tiered',true,true,true
from categories where slug='digital-large-format'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'banner-printing','طباعة بنر','خدمة طباعة بنر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='digital-large-format'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'heavy-banner','بنر ثقيل','خدمة بنر ثقيل بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='digital-large-format'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'backlit-film','Backlit','خدمة Backlit بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='digital-large-format'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'vinyl-sticker','استيكر وفينيل','خدمة استيكر وفينيل بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='digital-large-format'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'one-way-vision','One Way Vision','خدمة One Way Vision بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='digital-large-format'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'reflective-vinyl','فينيل عاكس','خدمة فينيل عاكس بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='digital-large-format'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'phosphorescent-print','طباعة فسفورية','خدمة طباعة فسفورية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='digital-large-format'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'large-posters','بوسترات كبيرة','خدمة بوسترات كبيرة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='digital-large-format'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'mesh-banner','Mesh Banner','خدمة Mesh Banner بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='digital-large-format'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'canvas-banner','Canvas Banner','خدمة Canvas Banner بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='digital-large-format'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'custom-large-format','طباعة مقاس كبير مخصص','خدمة طباعة مقاس كبير مخصص بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='digital-large-format'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wallpaper-printing','طباعة ورق جدران','خدمة طباعة ورق جدران بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wall-floor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wall-murals','جداريات مطبوعة','خدمة جداريات مطبوعة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wall-floor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'floor-stickers','استيكر أرضيات','خدمة استيكر أرضيات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wall-floor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'floor-graphics','جرافيكس أرضيات','خدمة جرافيكس أرضيات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wall-floor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wall-decals','ملصقات جدران','خدمة ملصقات جدران بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wall-floor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'directional-floor-graphics','إرشادات أرضية','خدمة إرشادات أرضية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wall-floor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'window-stickers','استيكر زجاج','خدمة استيكر زجاج بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='window-glass'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'frosted-glass-film','استيكر زجاج Frosted','خدمة استيكر زجاج Frosted بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='window-glass'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'transparent-window-graphics','جرافيكس زجاج شفافة','خدمة جرافيكس زجاج شفافة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='window-glass'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'one-way-window-film','One Way للزجاج','خدمة One Way للزجاج بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='window-glass'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'window-lettering','كتابات زجاج','خدمة كتابات زجاج بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='window-glass'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'glass-branding','هوية واجهات زجاجية','خدمة هوية واجهات زجاجية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='window-glass'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'fabric-banner','بنر قماشي','خدمة بنر قماشي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='fabric-textile-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'flag-printing','طباعة أعلام','خدمة طباعة أعلام بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='fabric-textile-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'pennant-printing','طباعة رايات','خدمة طباعة رايات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='fabric-textile-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'backdrop-fabric','Backdrop قماشي','خدمة Backdrop قماشي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='fabric-textile-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'tablecloth-printing','طباعة مفارش طاولات','خدمة طباعة مفارش طاولات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='fabric-textile-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'custom-fabric-print','طباعة قماش مخصص','خدمة طباعة قماش مخصص بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='fabric-textile-print'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'photo-printing','طباعة صور','خدمة طباعة صور بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='photo-fine-art'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'photo-enlargement','تكبير صور','خدمة تكبير صور بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='photo-fine-art'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'canvas-print','طباعة كانفس','خدمة طباعة كانفس بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='photo-fine-art'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'fine-art-print','طباعة Fine Art','خدمة طباعة Fine Art بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='photo-fine-art'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'photo-book','كتاب صور','خدمة كتاب صور بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='photo-fine-art'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'framed-print','لوحة مطبوعة بإطار','خدمة لوحة مطبوعة بإطار بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='photo-fine-art'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wall-art-set','طقم لوحات جدارية','خدمة طقم لوحات جدارية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='photo-fine-art'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'shop-sign','لوحة محل','خدمة لوحة محل بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'company-sign','لوحة شركة','خدمة لوحة شركة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'office-sign','لوحة مكتب','خدمة لوحة مكتب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'reception-sign','لوحة استقبال','خدمة لوحة استقبال بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'building-sign','لوحة مبنى','خدمة لوحة مبنى بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'project-site-sign','لوحة مشروع','خدمة لوحة مشروع بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'construction-site-board','لوحة موقع إنشائي','خدمة لوحة موقع إنشائي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'safety-sign','لوحة سلامة','خدمة لوحة سلامة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'directional-sign','لوحة اتجاهية','خدمة لوحة اتجاهية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'parking-sign','لوحة مواقف','خدمة لوحة مواقف بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'lightbox-sign','Lightbox','خدمة Lightbox بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='illuminated-signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'front-lit-letters','حروف مضيئة أماميًا','خدمة حروف مضيئة أماميًا بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='illuminated-signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'backlit-letters','حروف مضيئة خلفيًا','خدمة حروف مضيئة خلفيًا بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='illuminated-signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'halo-lit-letters','حروف Halo Lit','خدمة حروف Halo Lit بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='illuminated-signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'acrylic-letters','حروف أكريليك','خدمة حروف أكريليك بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='illuminated-signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'stainless-letters','حروف ستانلس','خدمة حروف ستانلس بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='illuminated-signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'neon-flex-sign','Neon Flex Sign','خدمة Neon Flex Sign بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='illuminated-signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'led-sign','لوحة LED','خدمة لوحة LED بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='illuminated-signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'illuminated-totem','Totem مضيء','خدمة Totem مضيء بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='illuminated-signage'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'door-nameplates','لوحات أبواب','خدمة لوحات أبواب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wayfinding'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'room-signs','لوحات غرف','خدمة لوحات غرف بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wayfinding'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'directory-sign','دليل مبنى','خدمة دليل مبنى بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wayfinding'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'floor-directory','لوحة دليل طوابق','خدمة لوحة دليل طوابق بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wayfinding'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'safety-wayfinding','إرشادات سلامة','خدمة إرشادات سلامة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wayfinding'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'hospital-wayfinding','لوحات إرشاد مستشفى','خدمة لوحات إرشاد مستشفى بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wayfinding'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'school-wayfinding','لوحات إرشاد مدرسة','خدمة لوحات إرشاد مدرسة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wayfinding'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'braille-signs','لوحات برايل','خدمة لوحات برايل بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='wayfinding'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'lamppost-ad','إعلان لامبوست','خدمة إعلان لامبوست بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='outdoor-media'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'unipole-ad','إعلان يونيبول','خدمة إعلان يونيبول بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='outdoor-media'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'billboard-ad','لوحة Billboard','خدمة لوحة Billboard بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='outdoor-media'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'roadside-sign','لوحة طريق','خدمة لوحة طريق بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='outdoor-media'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'building-wrap','تغليف مبنى','خدمة تغليف مبنى بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='outdoor-media'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'rooftop-sign','لوحة سطح','خدمة لوحة سطح بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='outdoor-media'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'fence-branding','تغليف أسوار','خدمة تغليف أسوار بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='outdoor-media'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'street-campaign-kit','حزمة حملة شوارع','خدمة حزمة حملة شوارع بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='outdoor-media'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'vehicle-branding','هوية وتغليف مركبة','خدمة هوية وتغليف مركبة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='vehicles'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'full-car-wrap','تغليف سيارة كامل','خدمة تغليف سيارة كامل بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='vehicles'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'partial-car-wrap','تغليف سيارة جزئي','خدمة تغليف سيارة جزئي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='vehicles'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'bus-wrap','تغليف باص','خدمة تغليف باص بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='vehicles'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'fleet-branding','هوية أسطول','خدمة هوية أسطول بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='vehicles'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'vehicle-decals','استيكر مركبات','خدمة استيكر مركبات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='vehicles'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'vehicle-magnets','مغناطيس مركبات','خدمة مغناطيس مركبات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='vehicles'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'motorbike-box-branding','هوية صناديق دراجات توصيل','خدمة هوية صناديق دراجات توصيل بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='vehicles'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'laser-acrylic','قص وحفر أكريليك','خدمة قص وحفر أكريليك بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='laser'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'laser-wood','قص وحفر خشب','خدمة قص وحفر خشب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='laser'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'laser-mdf','قص وحفر MDF','خدمة قص وحفر MDF بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='laser'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'laser-glass','حفر زجاج','خدمة حفر زجاج بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='laser'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'laser-metal-marking','وسم معدني','خدمة وسم معدني بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='laser'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'laser-leather','حفر جلد','خدمة حفر جلد بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='laser'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'laser-cardboard','قص كرتون','خدمة قص كرتون بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='laser'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'laser-nameplate','لوحات أسماء بالليزر','خدمة لوحات أسماء بالليزر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='laser'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'laser-keychain','ميداليات ليزر','خدمة ميداليات ليزر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='laser'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'custom-laser-piece','قطعة ليزر مخصصة','خدمة قطعة ليزر مخصصة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='laser'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'award-shield','درع تكريم','خدمة درع تكريم بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='awards'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'acrylic-award','درع أكريليك','خدمة درع أكريليك بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='awards'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wood-award','درع خشبي','خدمة درع خشبي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='awards'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'medals','ميداليات','خدمة ميداليات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='awards'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'trophies','كؤوس تكريم','خدمة كؤوس تكريم بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='awards'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'plaques','لوحات تكريم','خدمة لوحات تكريم بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='awards'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'employee-award-kit','طقم تكريم موظف','خدمة طقم تكريم موظف بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='awards'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'vip-award-gift','هدية تكريم VIP','خدمة هدية تكريم VIP بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='awards'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'acrylic-stand','ستاند أكريليك','خدمة ستاند أكريليك بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='displays'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'product-display','ستاند عرض منتج','خدمة ستاند عرض منتج بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='displays'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'counter-display','ستاند كاونتر','خدمة ستاند كاونتر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='displays'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'brochure-holder','حامل بروشورات','خدمة حامل بروشورات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='displays'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'menu-holder','حامل منيو','خدمة حامل منيو بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='displays'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'qr-stand','ستاند QR','خدمة ستاند QR بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='displays'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'price-tag-stand','ستاند أسعار','خدمة ستاند أسعار بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='displays'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'custom-display-unit','وحدة عرض مخصصة','خدمة وحدة عرض مخصصة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='displays'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'architectural-model','مجسم معماري','خدمة مجسم معماري بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='models-decor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'logo-3d-model','مجسم شعار','خدمة مجسم شعار بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='models-decor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'decorative-letters','حروف ديكور','خدمة حروف ديكور بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='models-decor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wall-logo','شعار جداري','خدمة شعار جداري بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='models-decor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'custom-box-laser','صندوق مخصص بالليزر','خدمة صندوق مخصص بالليزر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='models-decor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'gift-box-wood','علبة هدية خشبية','خدمة علبة هدية خشبية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='models-decor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'event-decor-cutouts','قصاصات ديكور فعالية','خدمة قصاصات ديكور فعالية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='models-decor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'table-centerpiece','سنتر بيس مخصص','خدمة سنتر بيس مخصص بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='models-decor'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'staff-uniform','زي موظفين','خدمة زي موظفين بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'printed-tshirt','تيشيرت مطبوع','خدمة تيشيرت مطبوع بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','instant_quote','tiered',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'embroidered-polo','بولو مطرز','خدمة بولو مطرز بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'printed-shirt','قميص مطبوع','خدمة قميص مطبوع بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'safety-vest','سترة سلامة مطبوعة','خدمة سترة سلامة مطبوعة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'caps','قبعات','خدمة قبعات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'hoodies','هوديز','خدمة هوديز بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'aprons','مرايل','خدمة مرايل بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'sports-jersey','قمصان رياضية','خدمة قمصان رياضية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'event-vest','سترات فعاليات','خدمة سترات فعاليات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'dtf-apparel','طباعة DTF على الملابس','خدمة طباعة DTF على الملابس بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'silkscreen-apparel','سلك سكرين على الملابس','خدمة سلك سكرين على الملابس بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'sublimation-apparel','Sublimation على الملابس','خدمة Sublimation على الملابس بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'embroidery-service','خدمة تطريز','خدمة خدمة تطريز بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='apparel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'printed-mug','كوب مطبوع','خدمة كوب مطبوع بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','instant_quote','tiered',true,true,true
from categories where slug='drinkware'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'sublimation-mug','كوب Sublimation','خدمة كوب Sublimation بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='drinkware'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'travel-tumbler','Tumbler','خدمة Tumbler بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='drinkware'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'water-bottle','قارورة مياه','خدمة قارورة مياه بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='drinkware'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'thermos','ترمس','خدمة ترمس بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='drinkware'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'glass-cup-branding','طباعة كوب زجاج','خدمة طباعة كوب زجاج بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='drinkware'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'bottle-branding','تخصيص قارورة','خدمة تخصيص قارورة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='drinkware'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'drinkware-gift-set','طقم أدوات شرب','خدمة طقم أدوات شرب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='drinkware'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'paper-bags','أكياس ورقية','خدمة أكياس ورقية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-travel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'fabric-tote-bag','حقيبة قماش','خدمة حقيبة قماش بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-travel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'nonwoven-bag','حقيبة Nonwoven','خدمة حقيبة Nonwoven بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-travel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'backpack-branding','حقيبة ظهر دعائية','خدمة حقيبة ظهر دعائية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-travel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'laptop-bag-branding','حقيبة لابتوب','خدمة حقيبة لابتوب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-travel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'travel-bag-branding','حقيبة سفر','خدمة حقيبة سفر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-travel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'drawstring-bag','حقيبة Drawstring','خدمة حقيبة Drawstring بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-travel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'luggage-tag','بطاقة أمتعة','خدمة بطاقة أمتعة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-travel'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'printed-pens','أقلام مطبوعة','خدمة أقلام مطبوعة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='writing-office'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'premium-pens','أقلام فاخرة','خدمة أقلام فاخرة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='writing-office'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'pencils','أقلام رصاص','خدمة أقلام رصاص بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='writing-office'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'markers','ماركر','خدمة ماركر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='writing-office'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'custom-notebook','دفتر مخصص','خدمة دفتر مخصص بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='writing-office'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'sticky-notes','Sticky Notes','خدمة Sticky Notes بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='writing-office'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'mousepad','Mouse Pad','خدمة Mouse Pad بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='writing-office'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'desk-organizer','منظم مكتب','خدمة منظم مكتب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='writing-office'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'desk-nameplate','لوحة اسم مكتب','خدمة لوحة اسم مكتب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='writing-office'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'corporate-stationery-kit','طقم أدوات مكتبية','خدمة طقم أدوات مكتبية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='writing-office'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'usb-drive-branding','USB مخصص','خدمة USB مخصص بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='tech-promo'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'powerbank-branding','Power Bank مخصص','خدمة Power Bank مخصص بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='tech-promo'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'phone-stand','ستاند هاتف','خدمة ستاند هاتف بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='tech-promo'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'phone-grip','Phone Grip','خدمة Phone Grip بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='tech-promo'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'cable-organizer','منظم كابلات','خدمة منظم كابلات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='tech-promo'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wireless-charger','شاحن لاسلكي دعائي','خدمة شاحن لاسلكي دعائي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='tech-promo'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'tech-gift-kit','طقم هدايا تقنية','خدمة طقم هدايا تقنية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='tech-promo'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'corporate-gift-kit','صندوق هدايا شركات','خدمة صندوق هدايا شركات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='promo-other'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'keychains','ميداليات مفاتيح','خدمة ميداليات مفاتيح بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='promo-other'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'umbrellas','مظلات دعائية','خدمة مظلات دعائية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='promo-other'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'magnets','مغناطيس دعائي','خدمة مغناطيس دعائي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='promo-other'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'buttons-badges','Buttons & Badges','خدمة Buttons & Badges بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='promo-other'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'lanyards','Lanyards','خدمة Lanyards بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='promo-other'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wristbands','أساور فعاليات','خدمة أساور فعاليات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='promo-other'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'flags-promo','أعلام دعائية','خدمة أعلام دعائية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='promo-other'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'welcome-kit','Welcome Kit','خدمة Welcome Kit بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='promo-other'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'ramadan-gift-kit','هدية رمضان','خدمة هدية رمضان بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='promo-other'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'eid-gift-kit','هدية عيد','خدمة هدية عيد بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='promo-other'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'graduation-gift-kit','هدية تخرج','خدمة هدية تخرج بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='promo-other'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'product-boxes','علب منتجات مخصصة','خدمة علب منتجات مخصصة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-products'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'folding-carton','علب Folding Carton','خدمة علب Folding Carton بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-products'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'rigid-box','علب مقواة Rigid','خدمة علب مقواة Rigid بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-products'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'mailer-box','Mailer Box','خدمة Mailer Box بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-products'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'cosmetic-box','علب مستحضرات','خدمة علب مستحضرات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-products'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'perfume-box','علب عطور','خدمة علب عطور بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-products'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'electronics-box','علب إلكترونيات','خدمة علب إلكترونيات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-products'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'soap-box','علب صابون','خدمة علب صابون بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-products'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'pharma-box','علب دوائية','خدمة علب دوائية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-products'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'sleeve-packaging','Sleeve تغليف','خدمة Sleeve تغليف بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-products'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'window-box','علبة بنافذة','خدمة علبة بنافذة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-products'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'display-box','علبة عرض','خدمة علبة عرض بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='packaging-products'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'paper-shopping-bag','كيس تسوق ورقي','خدمة كيس تسوق ورقي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','instant_quote','tiered',true,true,true
from categories where slug='bags-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'kraft-bag','كيس كرافت','خدمة كيس كرافت بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'luxury-paper-bag','كيس ورقي فاخر','خدمة كيس ورقي فاخر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'fabric-packaging-bag','كيس قماشي للتغليف','خدمة كيس قماشي للتغليف بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'pouch-printing','Pouch مطبوع','خدمة Pouch مطبوع بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'sticker-seal','ملصق إغلاق','خدمة ملصق إغلاق بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'tissue-paper-branding','ورق Tissue مخصص','خدمة ورق Tissue مخصص بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'packaging-insert','بطاقة Insert داخل العبوة','خدمة بطاقة Insert داخل العبوة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'hang-tags','Hang Tags','خدمة Hang Tags بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='bags-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'burger-box','علبة برجر','خدمة علبة برجر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='food-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'pizza-box','علبة بيتزا','خدمة علبة بيتزا بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='food-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'food-box','علبة طعام','خدمة علبة طعام بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='food-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'takeaway-bag','كيس Takeaway','خدمة كيس Takeaway بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='food-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'cup-sleeve','Cup Sleeve','خدمة Cup Sleeve بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='food-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'food-paper-wrap','ورق تغليف طعام','خدمة ورق تغليف طعام بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='food-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'bakery-box','علبة مخبوزات','خدمة علبة مخبوزات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='food-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'cake-box','علبة كيك','خدمة علبة كيك بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='food-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'coffee-cup-branding','أكواب قهوة مطبوعة','خدمة أكواب قهوة مطبوعة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='food-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'food-label-kit','طقم ليبل غذائي','خدمة طقم ليبل غذائي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='food-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'gift-box-premium','علبة هدية فاخرة','خدمة علبة هدية فاخرة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='premium-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'magnetic-box','علبة مغناطيسية','خدمة علبة مغناطيسية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='premium-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wood-gift-box','صندوق هدية خشبي','خدمة صندوق هدية خشبي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='premium-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'corporate-gift-packaging','تغليف هدايا شركات','خدمة تغليف هدايا شركات بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='premium-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'perfume-luxury-packaging','تغليف عطور فاخر','خدمة تغليف عطور فاخر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='premium-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'presentation-box','Presentation Box','خدمة Presentation Box بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='premium-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'custom-insert-foam','Insert داخلي مخصص','خدمة Insert داخلي مخصص بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='premium-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'ribbon-branding','شريط تغليف مخصص','خدمة شريط تغليف مخصص بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='premium-packaging'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'rollup','رول أب','خدمة رول أب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','instant_quote','tiered',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'event-backdrop','Backdrop','خدمة Backdrop بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'photo-wall','Photo Wall','خدمة Photo Wall بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'stage-branding','Branding منصة','خدمة Branding منصة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'podium-branding','Branding منصة خطاب','خدمة Branding منصة خطاب بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'booth-graphics','جرافيكس جناح معرض','خدمة جرافيكس جناح معرض بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'exhibition-booth-kit','طقم جناح معرض','خدمة طقم جناح معرض بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'event-badges','بطاقات فعالية','خدمة بطاقات فعالية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'event-lanyards','Lanyards فعالية','خدمة Lanyards فعالية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'conference-folders','ملفات مؤتمر','خدمة ملفات مؤتمر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'conference-notebooks','دفاتر مؤتمر','خدمة دفاتر مؤتمر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'conference-gifts','هدايا مؤتمر','خدمة هدايا مؤتمر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'directional-event-signs','لوحات إرشاد فعالية','خدمة لوحات إرشاد فعالية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'registration-desk-branding','Branding مكتب تسجيل','خدمة Branding مكتب تسجيل بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='events-exhibitions'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'counter-display-print','ستاند كاونتر مطبوع','خدمة ستاند كاونتر مطبوع بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='retail-pos'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'shelf-talker','Shelf Talker','خدمة Shelf Talker بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='retail-pos'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'wobbler','Wobbler','خدمة Wobbler بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='retail-pos'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'price-tags','بطاقات أسعار','خدمة بطاقات أسعار بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='retail-pos'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'promo-stand','ستاند ترويجي','خدمة ستاند ترويجي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='retail-pos'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'window-poster','بوستر واجهة','خدمة بوستر واجهة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='retail-pos'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'hanging-sign','لوحة معلقة','خدمة لوحة معلقة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='retail-pos'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'floor-standee','ستاندي أرضي','خدمة ستاندي أرضي بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='retail-pos'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'checkout-branding','Branding كاشير','خدمة Branding كاشير بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='retail-pos'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'menu-board','Menu Board','خدمة Menu Board بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='retail-pos'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'ramadan-campaign-kit','حملة رمضان','خدمة حملة رمضان بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='seasonal-events'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'eid-campaign-kit','حملة العيد','خدمة حملة العيد بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='seasonal-events'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'hajj-campaign-kit','حملة الحج والعمرة','خدمة حملة الحج والعمرة بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='seasonal-events'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'back-to-school-kit','العودة للمدارس','خدمة العودة للمدارس بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='seasonal-events'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'national-day-kit','حملة مناسبة وطنية','خدمة حملة مناسبة وطنية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='seasonal-events'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'new-year-2027-kit','حملة العام 2027','خدمة حملة العام 2027 بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='seasonal-events'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'graduation-season-kit','موسم التخرج','خدمة موسم التخرج بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='seasonal-events'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'store-opening-kit','حزمة افتتاح متجر','خدمة حزمة افتتاح متجر بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='seasonal-events'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'branch-opening-kit','حزمة افتتاح فرع','خدمة حزمة افتتاح فرع بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='seasonal-events'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

insert into services (category_id,slug,name_ar,short_description_ar,selling_mode,pricing_mode,requires_design_approval,is_active,is_public)
select id,'awareness-campaign-kit','حزمة حملة توعية','خدمة حزمة حملة توعية بمواصفات إنتاج مستقلة وخيارات خامة وتشطيب وتسعير حسب الطلب.','request_quote','manual_quote',true,true,true
from categories where slug='seasonal-events'
on conflict (slug) do update set name_ar=excluded.name_ar,short_description_ar=excluded.short_description_ar,selling_mode=excluded.selling_mode,pricing_mode=excluded.pricing_mode,requires_design_approval=excluded.requires_design_approval,is_active=true,is_public=true,updated_at=now();

