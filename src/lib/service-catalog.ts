export type ServiceField = {
  key: string;
  label: string;
  type: "select" | "number" | "text" | "boolean" | "file" | "textarea" | "date" | "location" | "color" | "dimension";
  required?: boolean;
  options?: string[];
  unit?: string;
};

export type ServiceFieldRule = {
  targetFieldKey: string;
  ruleType: "show_if" | "hide_if" | "require_if" | "disable_if" | "validate";
  conditions: Record<string, unknown>;
  message?: string;
};

export type PreflightRequirement = {
  key: string;
  label: string;
  type: "check" | "file" | "measurement" | "approval" | "sample";
  requiredBeforeQuote: boolean;
  requiredBeforeProduction: boolean;
};

export type CatalogService = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  pricingMode: "instant" | "quote";
  fields: ServiceField[];
  finishings?: string[];
  fieldRules?: ServiceFieldRule[];
  preflight?: PreflightRequirement[];
  tags: string[];
};

export const serviceCatalog: CatalogService[] = [
  {
    slug:"business-cards",category:"الطباعة الورقية",title:"كروت شخصية",
    summary:"كروت أعمال بمواصفات مستقلة للورق والطباعة والتشطيب والكمية.",
    pricingMode:"instant",
    fields:[
      {key:"size",label:"المقاس",type:"select",required:true,options:["9×5 سم","8.5×5.5 سم","مقاس مخصص"]},
      {key:"paper",label:"نوع الورق",type:"select",required:true,options:["كوشيه","بريستول","ورق فاخر","ورق خاص"]},
      {key:"weight",label:"وزن الورق",type:"select",required:true,options:["250 جم","300 جم","350 جم"]},
      {key:"sides",label:"الطباعة",type:"select",required:true,options:["وجه واحد","وجهين"]},
      {key:"quantity",label:"الكمية",type:"number",required:true,unit:"نسخة"},
      {key:"artwork",label:"ملف التصميم",type:"file"}
    ],
    finishings:["سلوفان مطفي","سلوفان لامع","Spot UV","فويل","Emboss","قص مخصص","زوايا دائرية"],
    tags:["شركات","موظفون","هوية"]
  },
  {
    slug:"ncr-invoices",category:"النماذج المالية والإدارية",title:"فواتير NCR",
    summary:"دفاتر فواتير متعددة النسخ مع ترقيم وتسلسل ومقاسات وتجليد خاص.",
    pricingMode:"quote",
    fields:[
      {key:"size",label:"المقاس",type:"select",required:true,options:["A4","A5","A6","مخصص"]},
      {key:"copies",label:"عدد النسخ",type:"select",required:true,options:["نسختان","3 نسخ","4 نسخ"]},
      {key:"sets",label:"عدد المجموعات",type:"number",required:true,unit:"مجموعة"},
      {key:"numbering",label:"ترقيم تسلسلي",type:"boolean"},
      {key:"start_number",label:"بداية الترقيم",type:"number"}
    ],
    finishings:["تخريم","تدبيس","تجميع دفاتر","غلاف","باركود/QR"],
    tags:["مالية","شركات","NCR"]
  },
  {
    slug:"desk-calendar-2027",category:"التقاويم",title:"تقويم مكتبي 2027",
    summary:"تقويم مكتبي للشركات والعلامات التجارية مع قاعدة وتجليد وتصميم مخصص.",
    pricingMode:"quote",
    fields:[
      {key:"size",label:"المقاس",type:"select",required:true,options:["A5 أفقي","A5 عمودي","مخصص"]},
      {key:"pages",label:"عدد الأوراق",type:"select",required:true,options:["7 أوراق","13 ورقة","14 ورقة"]},
      {key:"paper",label:"نوع الورق",type:"select",required:true,options:["كوشيه","ورق فاخر"]},
      {key:"base",label:"قاعدة التقويم",type:"select",required:true,options:["كرتون مقوى","قاعدة فاخرة","قاعدة مخصصة"]},
      {key:"quantity",label:"الكمية",type:"number",required:true,unit:"تقويم"},
      {key:"design",label:"نحتاج تصميم من أوريكس",type:"boolean"}
    ],
    finishings:["سلك Wire-O","سلوفان","فويل","UV","تغليف فردي"],
    tags:["2027","موسمي","هدايا شركات"]
  },
  {
    slug:"wall-calendar-2027",category:"التقاويم",title:"تقويم حائطي 2027",
    summary:"تقويم حائطي إعلاني بمقاسات وأوراق وتعليق وتشطيبات متعددة.",
    pricingMode:"quote",
    fields:[
      {key:"size",label:"المقاس",type:"select",required:true,options:["A3","A2","مخصص"]},
      {key:"pages",label:"عدد الأوراق",type:"select",required:true,options:["ورقة واحدة","7 أوراق","13 ورقة"]},
      {key:"quantity",label:"الكمية",type:"number",required:true,unit:"تقويم"},
      {key:"hanger",label:"طريقة التعليق",type:"select",options:["سلك","عين معدنية","مجرى"]},
      {key:"design",label:"نحتاج تصميم من أوريكس",type:"boolean"}
    ],
    finishings:["سلوفان","فويل","Spot UV","تجميع"],
    tags:["2027","موسمي","إعلان"]
  },
  {
    slug:"corporate-anniversary-magazine",category:"النشر",title:"مجلة ذكرى تأسيس مؤسسة",
    summary:"مشروع تحريري وتصميمي وطباعي متكامل يوثق رحلة المؤسسة ويحول المناسبة إلى أصل تسويقي.",
    pricingMode:"quote",
    fields:[
      {key:"pages",label:"عدد الصفحات المتوقع",type:"number",required:true,unit:"صفحة"},
      {key:"size",label:"المقاس",type:"select",required:true,options:["A4","A5","مخصص"]},
      {key:"copies",label:"عدد النسخ",type:"number",required:true,unit:"نسخة"},
      {key:"editorial",label:"إعداد المحتوى والتحرير",type:"boolean"},
      {key:"photography",label:"التصوير",type:"boolean"},
      {key:"language",label:"اللغة",type:"select",options:["عربي","عربي/إنجليزي","إنجليزي"]}
    ],
    finishings:["تجليد حراري","تدبيس","غلاف مقوى","سلوفان","UV","فويل"],
    tags:["مؤسسات","مجلات","ذكرى سنوية","B2B"]
  },
  {
    slug:"company-profile",category:"التصميم المؤسسي",title:"بروفايل شركة",
    summary:"تصميم ملف تعريفي احترافي للشركات والمؤسسات مع نسخة رقمية وجاهزة للطباعة.",
    pricingMode:"quote",
    fields:[
      {key:"pages",label:"عدد الصفحات",type:"number",required:true,unit:"صفحة"},
      {key:"content",label:"هل المحتوى جاهز؟",type:"select",required:true,options:["جاهز","يحتاج تحرير","يحتاج إعداد كامل"]},
      {key:"language",label:"اللغة",type:"select",required:true,options:["عربي","عربي/إنجليزي","إنجليزي"]},
      {key:"print",label:"أريد الطباعة أيضًا",type:"boolean"}
    ],
    tags:["تصميم","شركات","مبيعات"]
  },
  {
    slug:"catalogue-printing",category:"النشر",title:"كتالوج منتجات",
    summary:"تصميم وطباعة كتالوجات المنتجات والخدمات بتجليد وتشطيبات متعددة.",
    pricingMode:"quote",
    fields:[
      {key:"pages",label:"عدد الصفحات",type:"number",required:true,unit:"صفحة"},
      {key:"size",label:"المقاس",type:"select",required:true,options:["A4","A5","مربع","مخصص"]},
      {key:"copies",label:"الكمية",type:"number",required:true,unit:"نسخة"},
      {key:"design",label:"نحتاج تصميم",type:"boolean"}
    ],
    finishings:["تدبيس","تجليد حراري","سلك","سلوفان","Spot UV"],
    tags:["منتجات","تسويق","مبيعات"]
  },
  {
    slug:"books",category:"النشر",title:"طباعة الكتب",
    summary:"طباعة كتب وإصدارات بأحجام وأوراق وتجليد متعدد مع حساب مستقل للغلاف والمحتوى.",
    pricingMode:"quote",
    fields:[
      {key:"pages",label:"عدد الصفحات",type:"number",required:true,unit:"صفحة"},
      {key:"size",label:"المقاس",type:"select",required:true,options:["A4","A5","17×24 سم","مخصص"]},
      {key:"inside_color",label:"طباعة الداخل",type:"select",required:true,options:["أسود","ملون","مختلط"]},
      {key:"copies",label:"الكمية",type:"number",required:true,unit:"نسخة"},
      {key:"binding",label:"التجليد",type:"select",required:true,options:["حراري","خياطة","غلاف مقوى","سلك"]}
    ],
    tags:["نشر","كتب","مؤلفون"]
  },
  {
    slug:"product-labels",category:"الملصقات",title:"ملصقات المنتجات",
    summary:"Labels للمنتجات والعبوات بخامات وقص وأشكال وتشطيبات متعددة.",
    pricingMode:"quote",
    fields:[
      {key:"shape",label:"الشكل",type:"select",required:true,options:["دائري","مستطيل","مربع","قص مخصص"]},
      {key:"material",label:"الخامة",type:"select",required:true,options:["ورقي","فينيل أبيض","شفاف","معدني"]},
      {key:"size",label:"المقاس",type:"text",required:true},
      {key:"quantity",label:"الكمية",type:"number",required:true,unit:"ملصق"},
      {key:"roll_or_sheet",label:"التوريد",type:"select",options:["شيت","رول","قطع منفردة"]}
    ],
    finishings:["سلوفان","UV","فويل","قص مخصص"],
    tags:["تغليف","منتجات","Labels"]
  },
  {
    slug:"paper-bags",category:"التعبئة والتغليف",title:"أكياس ورقية",
    summary:"أكياس تسوق ورقية للمتاجر والعلامات التجارية بمقاسات وطباعة ومقابض مختلفة.",
    pricingMode:"quote",
    fields:[
      {key:"size",label:"المقاس",type:"text",required:true},
      {key:"paper",label:"الخامة",type:"select",required:true,options:["كرافت","كوشيه","ورق فاخر"]},
      {key:"quantity",label:"الكمية",type:"number",required:true,unit:"كيس"},
      {key:"handle",label:"المقبض",type:"select",options:["حبل","شريط","مقبض ورقي","بدون"]}
    ],
    finishings:["سلوفان","فويل","UV","تدعيم القاعدة"],
    tags:["متاجر","تغليف","تجزئة"]
  },
  {
    slug:"product-boxes",category:"التعبئة والتغليف",title:"علب منتجات مخصصة",
    summary:"تصميم وتصنيع علب منتجات بأبعاد وخامات وتشطيبات حسب المنتج.",
    pricingMode:"quote",
    fields:[
      {key:"dimensions",label:"الأبعاد",type:"text",required:true},
      {key:"material",label:"الخامة",type:"select",required:true,options:["كرتون مطوي","كرتون مقوى","كرافت","مادة مخصصة"]},
      {key:"quantity",label:"الكمية",type:"number",required:true,unit:"علبة"},
      {key:"diecut",label:"قالب قص جديد مطلوب",type:"boolean"},
      {key:"sample",label:"عينة أولية",type:"boolean"}
    ],
    finishings:["فويل","Emboss","UV","سلوفان","نافذة شفافة","إدراج داخلي"],
    tags:["Packaging","منتجات","تصنيع"]
  },
  {
    slug:"flex-banner",category:"الطباعة الرقمية",title:"طباعة فليكس إعلاني",
    summary:"فليكس للإعلانات واللوحات بمقاس وخامة وتشطيب وتركيب حسب الاستخدام.",
    pricingMode:"instant",
    fields:[
      {key:"width",label:"العرض",type:"number",required:true,unit:"متر"},
      {key:"height",label:"الارتفاع",type:"number",required:true,unit:"متر"},
      {key:"material",label:"الخامة",type:"select",required:true,options:["فليكس عادي","فليكس إضاءة خلفية","فليكس ثقيل"]},
      {key:"quantity",label:"العدد",type:"number",required:true,unit:"قطعة"},
      {key:"installation",label:"أحتاج تركيب",type:"boolean"}
    ],
    finishings:["حلقات","لحام","قص","تركيب"],
    tags:["إعلان خارجي","لوحات","كبير الحجم"]
  },
  {
    slug:"vinyl-sticker",category:"الطباعة الرقمية",title:"استيكر وفينيل",
    summary:"طباعة وقص استيكر للاستخدام على الزجاج والجدران والمنتجات والمركبات.",
    pricingMode:"quote",
    fields:[
      {key:"width",label:"العرض",type:"number",required:true,unit:"متر"},
      {key:"height",label:"الارتفاع",type:"number",required:true,unit:"متر"},
      {key:"material",label:"الخامة",type:"select",required:true,options:["أبيض","شفاف","One Way Vision","Frosted","Reflective"]},
      {key:"cut",label:"نوع القص",type:"select",options:["مستقيم","Plotter Contour","مخصص"]},
      {key:"installation",label:"أحتاج تركيب",type:"boolean"}
    ],
    finishings:["Lamination","قص كونتور","تركيب"],
    tags:["استيكر","زجاج","سيارات"]
  },
  {
    slug:"shop-sign",category:"اللوحات والواجهات",title:"لوحة محل",
    summary:"تصميم وتصنيع وتركيب لوحة واجهة حسب الموقع والخامة والإضاءة.",
    pricingMode:"quote",
    fields:[
      {key:"width",label:"العرض التقريبي",type:"number",required:true,unit:"متر"},
      {key:"height",label:"الارتفاع التقريبي",type:"number",required:true,unit:"متر"},
      {key:"type",label:"نوع اللوحة",type:"select",required:true,options:["حروف بارزة","Lightbox","لوحة فليكس","ألمنيوم/كلادينج","حل مخصص"]},
      {key:"lighting",label:"الإضاءة",type:"select",options:["بدون","داخلية","خلفية","أمامية"]},
      {key:"site_photo",label:"صورة الموقع",type:"file"}
    ],
    tags:["محلات","واجهات","تركيب"]
  },
  {
    slug:"vehicle-branding",category:"المركبات",title:"هوية وتغليف المركبات",
    summary:"تصميم وطباعة وتركيب هوية إعلانية للسيارات والباصات والأساطيل.",
    pricingMode:"quote",
    fields:[
      {key:"vehicle",label:"نوع المركبة",type:"text",required:true},
      {key:"coverage",label:"نطاق التغليف",type:"select",required:true,options:["جزئي","كامل","ملصقات وشعارات فقط"]},
      {key:"quantity",label:"عدد المركبات",type:"number",required:true,unit:"مركبة"},
      {key:"design",label:"نحتاج التصميم",type:"boolean"},
      {key:"vehicle_photo",label:"صور المركبة",type:"file"}
    ],
    tags:["أساطيل","سيارات","Branding"]
  },
  {
    slug:"rollup",category:"المعارض والفعاليات",title:"رول أب",
    summary:"ستاند رول أب مع الطباعة للفعاليات والمعارض ونقاط البيع.",
    pricingMode:"instant",
    fields:[
      {key:"size",label:"المقاس",type:"select",required:true,options:["85×200 سم","100×200 سم","مخصص"]},
      {key:"quantity",label:"الكمية",type:"number",required:true,unit:"ستاند"},
      {key:"design",label:"نحتاج التصميم",type:"boolean"}
    ],
    tags:["فعاليات","معارض","POS"]
  },
  {
    slug:"event-backdrop",category:"المعارض والفعاليات",title:"خلفية فعالية Backdrop",
    summary:"تصميم وطباعة وتصنيع خلفيات للفعاليات والمؤتمرات والتصوير.",
    pricingMode:"quote",
    fields:[
      {key:"width",label:"العرض",type:"number",required:true,unit:"متر"},
      {key:"height",label:"الارتفاع",type:"number",required:true,unit:"متر"},
      {key:"structure",label:"الهيكل",type:"select",options:["ستاند جاهز","هيكل معدني","جدار مخصص"]},
      {key:"installation",label:"تركيب وفك",type:"boolean"}
    ],
    tags:["فعاليات","مؤتمرات","تصوير"]
  },
  {
    slug:"laser-acrylic",category:"الليزر والتصنيع",title:"قص وحفر أكريليك بالليزر",
    summary:"قص وحفر أكريليك لأسماء ولوحات وستاندات ومنتجات مخصصة.",
    pricingMode:"quote",
    fields:[
      {key:"thickness",label:"السماكة",type:"select",required:true,options:["2 مم","3 مم","5 مم","8 مم","10 مم","أخرى"]},
      {key:"color",label:"اللون",type:"text"},
      {key:"dimensions",label:"الأبعاد",type:"text",required:true},
      {key:"quantity",label:"الكمية",type:"number",required:true,unit:"قطعة"},
      {key:"vector",label:"ملف Vector",type:"file"}
    ],
    finishings:["تلميع","قاعدة","طباعة UV","تجميع"],
    tags:["أكريليك","ليزر","تصنيع"]
  },
  {
    slug:"corporate-gift-kit",category:"الهدايا الدعائية",title:"صندوق هدايا شركات",
    summary:"تجميع هدايا موظفين أو عملاء في Kit موحد يحمل هوية المؤسسة.",
    pricingMode:"quote",
    fields:[
      {key:"quantity",label:"عدد الصناديق",type:"number",required:true,unit:"صندوق"},
      {key:"budget",label:"ميزانية الصندوق التقريبية",type:"number",unit:"ريال"},
      {key:"audience",label:"الجمهور",type:"select",options:["عملاء","موظفون","شركاء","VIP"]},
      {key:"items",label:"عناصر مرغوبة",type:"text"}
    ],
    tags:["هدايا","شركات","Welcome Kit"]
  },
  {
    slug:"staff-uniform",category:"الملابس والمنسوجات",title:"زي موظفين مطبوع أو مطرز",
    summary:"قمصان وتيشيرتات وسترات وقبعات بهوية المؤسسة عبر الطباعة أو التطريز.",
    pricingMode:"quote",
    fields:[
      {key:"garment",label:"نوع الزي",type:"select",required:true,options:["تيشيرت","قميص","سترة","قبعة","مخصص"]},
      {key:"method",label:"طريقة التخصيص",type:"select",required:true,options:["تطريز","DTF","Silk Screen","Sublimation"]},
      {key:"quantity",label:"الكمية",type:"number",required:true,unit:"قطعة"},
      {key:"sizes",label:"توزيع المقاسات",type:"text"}
    ],
    tags:["ملابس","موظفون","تطريز"]
  },
  {
    slug:"award-shield",category:"الدروع والتكريم",title:"درع تكريم مخصص",
    summary:"تصميم وتصنيع دروع تكريم وهدايا رسمية من الأكريليك والخشب وخامات مركبة.",
    pricingMode:"quote",
    fields:[
      {key:"material",label:"الخامة",type:"select",required:true,options:["أكريليك","خشب","خامات مركبة","حل فاخر"]},
      {key:"quantity",label:"الكمية",type:"number",required:true,unit:"درع"},
      {key:"names",label:"هل الأسماء متغيرة؟",type:"boolean"},
      {key:"occasion",label:"المناسبة",type:"text"}
    ],
    tags:["تكريم","فعاليات","هدايا"]
  }
];

export function findService(slug:string){
  return serviceCatalog.find(service=>service.slug===slug);
}
