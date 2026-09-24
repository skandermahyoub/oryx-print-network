-- Expand targeted commercial packages to 26 total.

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('clinic-launch','تجهيز عيادة أو مركز طبي','هوية المكان واللوحات والنماذج والمواد التوعوية في نظام واحد.','العيادات والمراكز الطبية','YER','{"items":["لوحة خارجية","لوحات غرف","نماذج واستبيانات","بطاقات مواعيد","بروشورات","يونيفورم"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('hotel-hospitality','هوية وتجهيز فندق أو منشأة ضيافة','لوحات الغرف والإرشاد والمطبوعات والمواد الترحيبية والمنتجات المخصصة.','الفنادق والشقق المفروشة','YER','{"items":["لوحات غرف","دليل مرافق","بطاقات أبواب","منيوهات","Welcome Kit","لوحات إرشاد"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('real-estate-office','باقة المكتب العقاري','حضور بصري ومواد بيع للمشاريع والعقارات من الملف التعريفي إلى لوحات الموقع.','العقار والتطوير','YER','{"items":["بروفايل","بروشورات مشاريع","لوحات مواقع","فولدرات","نماذج حجز","Social Templates"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('contractor-site','تجهيز شركة مقاولات وموقع مشروع','لوحات المشروع والسلامة والمطبوعات والتقارير وهوية الموقع الميدانية.','المقاولات والهندسة','YER','{"items":["لوحة مشروع","لوحات سلامة","نماذج موقع","بطاقات موظفين","تقارير","ملصقات معدات"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('factory-branding','هوية مصنع ومنتجاته','هوية المصنع والمنتج والتغليف والليبل والكتالوج ومواد البيع.','المصانع','YER','{"items":["هوية منتج","Packaging","Labels","كتالوج","لوحات المصنع","عينات مبيعات"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('beauty-salon','باقة صالون ومركز تجميل','واجهة وهوية وخدمات مطبوعة وتغليف ومنيو أسعار ومحتوى بصري.','الجمال والعناية','YER','{"items":["لوحة وواجهة","قائمة خدمات","بطاقات","أكياس","Labels","Social Kit"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('retail-chain','تجهيز سلسلة فروع','نظام قابل للتكرار للواجهات ونقاط البيع والمطبوعات والافتتاحات.','العلامات متعددة الفروع','YER','{"items":["دليل تنفيذ الفروع","واجهات","لوحات إرشاد","POS","Opening Kit","قائمة مواد موحدة"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('supermarket','باقة السوبرماركت والتجزئة اليومية','أكياس وأسعار ولافتات عروض وأقسام ومواد نقاط البيع والتغليف.','السوبرماركت والمتاجر الكبيرة','YER','{"items":["أكياس","Price Tags","Shelf Talkers","لوحات أقسام","ملصقات عروض","Checkout Branding"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('graduation-season','موسم التخرج','حلول احتفال وطباعة وهدايا وتصوير وهوية حفلات التخرج.','الجامعات والمدارس والطلاب','YER','{"items":["دعوات","شهادات","Backdrop","دروع","هدايا","أوشحة وملابس"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('ramadan-corporate','رمضان للشركات','هدايا وحملات وبطاقات وتغليف موسمي للعملاء والموظفين.','الشركات والمؤسسات','YER','{"items":["Gift Kit","بطاقات","تغليف","تقويم رمضاني","حملة بصرية","مواد داخلية"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('hajj-umrah','حملة حج وعمرة متكاملة','مواد تعريف وإرشاد ونقل وملابس وحقائب ولافتات للحملة.','وكالات الحج والعمرة والحملات','YER','{"items":["أعلام ورايات","استيكر باصات","حقائب","بطاقات","لوحات إرشاد","ملابس فريق"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('publisher-author','إطلاق كتاب أو إصدار','من تصميم الغلاف والإخراج إلى الطباعة والإطلاق والمواد الترويجية.','المؤلفون والناشرون','YER','{"items":["تصميم غلاف","إخراج داخلي","طباعة","Bookmarks","Poster","Launch Kit"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('bank-corporate','باقة البنك والمؤسسة المالية','مطبوعات مؤسسية ونماذج محكومة وهوية فروع وهدايا عملاء.','البنوك وشركات التمويل','YER','{"items":["Stationery","نماذج مرقمة","لوحات فروع","بطاقات","تقارير","VIP Gifts"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into packages (slug,name_ar,description_ar,target_segment,currency,config)
values ('employee-onboarding','تجهيز الموظف الجديد','Welcome Kit متكامل للموظفين الجدد يجمع الهوية والمطبوعات والهدايا.','الموارد البشرية والشركات','YER','{"items":["بطاقة موظف","دفتر وقلم","كوب أو قارورة","تيشيرت أو بولو","Welcome Card","Gift Box"]}'::jsonb)
on conflict (slug) do update set name_ar=excluded.name_ar,description_ar=excluded.description_ar,target_segment=excluded.target_segment,config=excluded.config,is_active=true;

insert into package_items (package_id,item_name,item_role,default_selected,sort_order)
select p.id,item.value,'core',true,(item.ordinality*10)::integer
from packages p
cross join lateral jsonb_array_elements_text(p.config->'items') with ordinality as item(value,ordinality)
where p.slug in ('clinic-launch','hotel-hospitality','real-estate-office','contractor-site','factory-branding','beauty-salon','retail-chain','supermarket','graduation-season','ramadan-corporate','hajj-umrah','publisher-author','bank-corporate','employee-onboarding')
on conflict (package_id,item_name,item_role) where item_name is not null
do update set sort_order=excluded.sort_order,default_selected=true;
