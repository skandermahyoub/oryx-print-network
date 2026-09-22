-- Expand ORYX Projects Lab concepts.

insert into projects (slug,name_ar,project_type,status,brief)
values ('yemen-2027-business-calendar','تقويم الأعمال اليمني 2027','seasonal_product','idea','تقويم سنوي فاخر يجمع محتوى أعمال ورعاة ومساحات إعلانية ويوزع على صناع القرار.')
on conflict (slug) do update set name_ar=excluded.name_ar,project_type=excluded.project_type,brief=excluded.brief,updated_at=now();

insert into projects (slug,name_ar,project_type,status,brief)
values ('local-brands-book','كتاب العلامات اليمنية','commercial_publication','idea','كتاب بصري يوثق قصص وهوية العلامات المحلية ويمنحها منصة عرض راقية.')
on conflict (slug) do update set name_ar=excluded.name_ar,project_type=excluded.project_type,brief=excluded.brief,updated_at=now();

insert into projects (slug,name_ar,project_type,status,brief)
values ('clean-city-awareness','مدينة أنظف','awareness_campaign','idea','حملة توعية بصرية قابلة للرعاية تجمع الشارع والمدارس والمتاجر حول النظافة والسلوك العام.')
on conflict (slug) do update set name_ar=excluded.name_ar,project_type=excluded.project_type,brief=excluded.brief,updated_at=now();

insert into projects (slug,name_ar,project_type,status,brief)
values ('graduates-2027','دفعة 2027','seasonal_program','idea','برنامج موحد للجامعات والمدارس يجمع التوثيق والهدايا والكتب والفعاليات في حل واحد.')
on conflict (slug) do update set name_ar=excluded.name_ar,project_type=excluded.project_type,brief=excluded.brief,updated_at=now();

