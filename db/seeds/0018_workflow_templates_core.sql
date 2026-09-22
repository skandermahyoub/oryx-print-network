-- Service-specific production workflows for core ORYX products.

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج business-cards',1,true,true from services where slug='business-cards'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','فحص الملف',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='business-cards' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','تجهيز الطباعة',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='business-cards' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','الطباعة',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='business-cards' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','السلوفان/المعالجة',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='business-cards' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','التشطيب الخاص',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='business-cards' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','القص',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='business-cards' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','العد والتعبئة',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='business-cards' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','فحص الجودة',80,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='business-cards' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج brochures',1,true,true from services where slug='brochures'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','فحص الملف',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='brochures' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','التجهيز والإخراج',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='brochures' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','الطباعة',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='brochures' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','السلوفان إن وجد',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='brochures' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','القص',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='brochures' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','الطي',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='brochures' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','العد والتعبئة',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='brochures' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','فحص الجودة',80,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='brochures' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج corporate-folders',1,true,true from services where slug='corporate-folders'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','فحص الملف والقالب',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-folders' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','الطباعة',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-folders' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','السلوفان',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-folders' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','التشطيبات الخاصة',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-folders' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','القص بالقالب',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-folders' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','التكسير والطي',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-folders' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','تركيب الجيب',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-folders' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','فحص الجودة',80,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-folders' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_09','التعبئة',90,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-folders' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج ncr-invoices',1,true,true from services where slug='ncr-invoices'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','فحص الملف والترقيم',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='ncr-invoices' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','تجهيز الطباعة',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='ncr-invoices' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','طباعة النسخ',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='ncr-invoices' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','التجميع Collation',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='ncr-invoices' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','الترقيم',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='ncr-invoices' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','التخريم',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='ncr-invoices' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','التجليد كدفاتر',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='ncr-invoices' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','فحص الجودة',80,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='ncr-invoices' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_09','التعبئة',90,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='ncr-invoices' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج books',1,true,true from services where slug='books'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','Preflight',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='books' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','Imposition',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='books' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','طباعة الداخل',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='books' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','طباعة الغلاف',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='books' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','طي الملازم',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='books' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','التجميع',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='books' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','التجليد',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='books' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','قص نهائي',80,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='books' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_09','فحص الجودة',90,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='books' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_10','التعبئة',100,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='books' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج magazines',1,true,true from services where slug='magazines'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','Preflight',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='magazines' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','Imposition',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='magazines' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','طباعة الداخل',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='magazines' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','طباعة الغلاف',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='magazines' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','الطي والتجميع',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='magazines' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','التدبيس/التجليد',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='magazines' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','القص النهائي',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='magazines' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','التشطيب',80,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='magazines' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_09','فحص الجودة',90,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='magazines' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_10','التعبئة',100,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='magazines' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج corporate-anniversary-magazine',1,true,true from services where slug='corporate-anniversary-magazine'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','اعتماد المحتوى',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-anniversary-magazine' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','التصميم والإخراج',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-anniversary-magazine' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','اعتماد النسخة النهائية',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-anniversary-magazine' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','Preflight',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-anniversary-magazine' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','الطباعة',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-anniversary-magazine' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','التجليد والتشطيب',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-anniversary-magazine' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','فحص الجودة',70,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-anniversary-magazine' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','التعبئة',80,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-anniversary-magazine' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_09','التسليم للمناسبة',90,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='corporate-anniversary-magazine' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج desk-calendar-2027',1,true,true from services where slug='desk-calendar-2027'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','اعتماد التصميم',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='desk-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','Preflight',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='desk-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','طباعة الأوراق',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='desk-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','طباعة/تصنيع القاعدة',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='desk-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','السلوفان والتشطيب',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='desk-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','القص',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='desk-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','التخريم',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='desk-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','Wire-O',80,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='desk-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_09','فحص الجودة',90,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='desk-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_10','تغليف فردي',100,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='desk-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج wall-calendar-2027',1,true,true from services where slug='wall-calendar-2027'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','اعتماد التصميم',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='wall-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','Preflight',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='wall-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','طباعة الأوراق',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='wall-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','التشطيب',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='wall-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','القص',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='wall-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','التخريم/العلاقة',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='wall-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','التجميع',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='wall-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','فحص الجودة',80,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='wall-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_09','التغليف',90,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='wall-calendar-2027' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج product-boxes',1,true,true from services where slug='product-boxes'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','اعتماد الأبعاد/Dieline',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='product-boxes' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','Prototype',20,false,true
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='product-boxes' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','اعتماد العينة',30,false,true
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='product-boxes' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','Preflight',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='product-boxes' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','الطباعة',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='product-boxes' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','السلوفان/الفويل/UV',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='product-boxes' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','القص بالقالب',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='product-boxes' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','التكسير',80,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='product-boxes' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_09','اللصق/التجميع',90,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='product-boxes' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_10','فحص الجودة',100,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='product-boxes' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_11','التعبئة',110,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='product-boxes' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج paper-shopping-bag',1,true,true from services where slug='paper-shopping-bag'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','اعتماد Dieline',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='paper-shopping-bag' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','Preflight',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='paper-shopping-bag' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','الطباعة',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='paper-shopping-bag' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','السلوفان/التشطيب',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='paper-shopping-bag' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','القص والتكسير',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='paper-shopping-bag' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','اللصق',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='paper-shopping-bag' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','تركيب التدعيم',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='paper-shopping-bag' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','تركيب المقبض',80,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='paper-shopping-bag' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_09','فحص الجودة',90,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='paper-shopping-bag' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_10','التعبئة',100,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='paper-shopping-bag' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج printed-tshirt',1,true,true from services where slug='printed-tshirt'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','اعتماد Artwork',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='printed-tshirt' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','استلام وفرز الملابس',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='printed-tshirt' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','تجهيز تقنية الطباعة',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='printed-tshirt' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','الطباعة/التطريز',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='printed-tshirt' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','المعالجة والتثبيت',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='printed-tshirt' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','العد والمقاسات',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='printed-tshirt' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','فحص الجودة',70,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='printed-tshirt' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','التغليف',80,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='printed-tshirt' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج flex-banner',1,true,true from services where slug='flex-banner'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','Preflight',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='flex-banner' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','RIP',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='flex-banner' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','الطباعة',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='flex-banner' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','التجفيف/التثبيت',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='flex-banner' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','القص',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='flex-banner' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','لحام الحواف',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='flex-banner' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','تركيب الحلقات',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='flex-banner' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','فحص الجودة',80,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='flex-banner' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_09','التركيب/التسليم',90,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='flex-banner' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج vinyl-sticker',1,true,true from services where slug='vinyl-sticker'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','Preflight',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vinyl-sticker' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','RIP',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vinyl-sticker' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','الطباعة',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vinyl-sticker' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','Lamination إن وجد',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vinyl-sticker' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','Contour Cut إن وجد',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vinyl-sticker' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','Weeding/تجهيز',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vinyl-sticker' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','فحص الجودة',70,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vinyl-sticker' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','التركيب/التسليم',80,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vinyl-sticker' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج rollup',1,true,true from services where slug='rollup'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','Preflight',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='rollup' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','الطباعة',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='rollup' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','القص',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='rollup' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','تركيب الطباعة على الآلية',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='rollup' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','اختبار الفتح والإغلاق',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='rollup' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','فحص الجودة',60,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='rollup' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','الحقيبة والتسليم',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='rollup' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج shop-sign',1,true,true from services where slug='shop-sign'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','معاينة وقياس الموقع',10,false,true
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='shop-sign' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','اعتماد التصميم التنفيذي',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='shop-sign' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','تحضير المواد',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='shop-sign' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','تصنيع الهيكل',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='shop-sign' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','تصنيع الحروف/الوجه',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='shop-sign' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','تركيب الإضاءة',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='shop-sign' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','التجميع والاختبار',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='shop-sign' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','التركيب بالموقع',80,false,true
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='shop-sign' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_09','فحص الجودة النهائي',90,true,true
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='shop-sign' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج laser-acrylic',1,true,true from services where slug='laser-acrylic'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','فحص ملف Vector',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='laser-acrylic' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','تحضير الأكريليك',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='laser-acrylic' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','إعداد ماكينة الليزر',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='laser-acrylic' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','القص/الحفر',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='laser-acrylic' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','تنظيف القطع',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='laser-acrylic' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','تلميع الحواف',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='laser-acrylic' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','التجميع/القاعدة',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='laser-acrylic' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','فحص الجودة',80,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='laser-acrylic' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_09','التغليف',90,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='laser-acrylic' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

insert into production_workflows (service_id,name_ar,version,is_default,is_active)
select id,'مسار إنتاج vehicle-branding',1,true,true from services where slug='vehicle-branding'
and not exists(select 1 from production_workflows pw where pw.service_id=services.id and pw.version=1 and pw.is_default=true);

insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_01','فحص وقياس المركبة',10,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vehicle-branding' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_02','اعتماد التصميم على القالب',20,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vehicle-branding' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_03','Preflight',30,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vehicle-branding' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_04','الطباعة',40,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vehicle-branding' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_05','Lamination',50,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vehicle-branding' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_06','Contour Cut',60,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vehicle-branding' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_07','تنظيف وتجهيز المركبة',70,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vehicle-branding' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_08','التركيب',80,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vehicle-branding' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_09','التشطيب الحراري',90,false,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vehicle-branding' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;
insert into workflow_steps (workflow_id,step_key,name_ar,sort_order,requires_qc,requires_photo)
select pw.id,'step_10','فحص الجودة',100,true,false
from production_workflows pw
join services s on s.id=pw.service_id
where s.slug='vehicle-branding' and pw.version=1 and pw.is_default=true
on conflict (workflow_id,step_key) do update set name_ar=excluded.name_ar,sort_order=excluded.sort_order,requires_qc=excluded.requires_qc,requires_photo=excluded.requires_photo;

