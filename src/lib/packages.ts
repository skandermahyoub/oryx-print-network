export type OfferPackage={
  slug:string;
  title:string;
  audience:string;
  summary:string;
  items:string[];
  primaryService?:string;
  salesAngle:string;
  seasonal?:boolean;
};

export const offerPackages:OfferPackage[]=[
{slug:"company-launch",title:"تأسيس شركة من الصفر",audience:"الشركات الجديدة",summary:"هوية ومطبوعات وواجهة وحضور رقمي في حزمة إطلاق واحدة.",items:["هوية بصرية","كروت وأوراق رسمية","بروفايل","لوحة وواجهة","قوالب سوشال ميديا"],primaryService:"company-profile",salesAngle:"ابدأ بصورة احترافية منذ اليوم الأول بدل جمع الموردين والخدمات واحدة واحدة."},
{slug:"store-opening",title:"افتتاح متجر",audience:"التجزئة",summary:"كل ما يحتاجه المتجر من الهوية حتى مواد الافتتاح ونقطة البيع.",items:["تصميم الواجهة","اللوحة","أكياس","استيكرات","بطاقات أسعار","حملة افتتاح"],primaryService:"shop-sign",salesAngle:"حوّل الافتتاح إلى لحظة بيع حقيقية بهوية موحدة من الشارع حتى الكيس."},
{slug:"restaurant-launch",title:"افتتاح مطعم أو مقهى",audience:"الأغذية والمشروبات",summary:"حل متكامل للهوية والتغليف والمنيو والواجهة والترويج.",items:["منيو","علب وأكياس","استيكرات","يونيفورم","لوحة","مواد افتتاح"],primaryService:"product-boxes",salesAngle:"اجعل تجربة العلامة تبدأ من الواجهة وتستمر حتى آخر علبة تخرج مع العميل."},
{slug:"product-launch",title:"إطلاق منتج جديد",audience:"المصانع والعلامات",summary:"من تصميم العبوة إلى مواد نقطة البيع وحملة الإطلاق.",items:["Packaging","Labels","Mockups","كتالوج/بروشور","POS","حملة إطلاق"],primaryService:"product-boxes",salesAngle:"منتج واحد، نظام بصري واحد، وتنفيذ واحد بدل ملفات متناثرة بين عدة جهات."},
{slug:"corporate-anniversary",title:"ذكرى تأسيس المؤسسة",audience:"المؤسسات الكبرى",summary:"نحوّل الذكرى السنوية إلى مشروع محتوى وسمعة وهدايا وفعالية.",items:["مجلة الذكرى","كتاب تاريخ المؤسسة","Timeline","هدايا","فعالية","حملة رقمية"],primaryService:"corporate-anniversary-magazine",salesAngle:"لا تمر الذكرى السنوية كمنشور عابر. حوّل تاريخ المؤسسة إلى إصدار ومناسبة وأصل تسويقي."},
{slug:"calendar-2027",title:"موسم تقاويم 2027",audience:"الشركات والمؤسسات",summary:"حزمة تقاويم مكتبية وحائطية وأجندات وهدايا سنوية قابلة للتخصيص.",items:["تقويم مكتبي","تقويم حائطي","أجندة","بطاقات تهنئة","تغليف هدايا"],primaryService:"desk-calendar-2027",salesAngle:"اجعل علامتك على مكتب العميل طوال 365 يومًا.",seasonal:true},
{slug:"fleet-branding",title:"هوية أسطول المركبات",audience:"الشركات اللوجستية والخدمية",summary:"تصميم وتوحيد وتطبيق الهوية على مركبات المؤسسة.",items:["نظام تصميم","ملفات لكل مركبة","طباعة","تركيب","دليل صيانة"],primaryService:"vehicle-branding",salesAngle:"كل مركبة تصبح مساحة إعلان متحركة ضمن نظام واحد قابل للتكرار."},
{slug:"conference",title:"تجهيز مؤتمر أو فعالية",audience:"المنظمات والشركات",summary:"حل إنتاجي كامل من التسجيل والهوية حتى القاعة والهدايا.",items:["Backdrop","Roll-ups","Badges","Folders","Certificates","Gifts"],primaryService:"event-backdrop",salesAngle:"مورد واحد يدير الصورة الكاملة للفعالية بدل التنسيق مع سلسلة موردين."},
{slug:"pharmacy",title:"باقة الصيدلية",audience:"الصيدليات",summary:"مواد الهوية والبيع والتغليف والعروض داخل وخارج نقطة البيع.",items:["لوحة","أكياس","استيكر","بطاقات","عروض موسمية","يونيفورم"],primaryService:"shop-sign",salesAngle:"وحّد حضور الصيدلية من الواجهة إلى أكياس العميل والعروض الموسمية."},
{slug:"school",title:"باقة المدرسة",audience:"المدارس والمراكز",summary:"مطبوعات تعليمية وإدارية وإعلانية وهوية البيئة المدرسية.",items:["دفاتر ونماذج","بطاقات","شهادات","لوحات إرشادية","بروشور","فعاليات"],primaryService:"books",salesAngle:"نظام واحد لإدارة المطبوعات اليومية والموسمية والبيئة البصرية للمدرسة."},
{slug:"annual-print-plan",title:"عقد مطبوعات سنوي",audience:"الشركات ذات الطلب المتكرر",summary:"إدارة احتياج المؤسسة من الطباعة طوال العام بأسعار وشروط متفق عليها.",items:["قائمة أسعار خاصة","طلبات دورية","مخزون تصاميم","تقارير استهلاك","أولوية إنتاج"],salesAngle:"حوّل الطباعة من مشتريات متفرقة إلى خدمة مُدارة بتكلفة ووقت واضحين."},
{slug:"vip-gifts",title:"هدايا كبار العملاء",audience:"الشركات والبنوك",summary:"هدايا مخصصة راقية من الفكرة والتصميم حتى التغليف والتسليم.",items:["اختيار المنتجات","تخصيص","صندوق فاخر","بطاقة","تغليف وتسليم"],primaryService:"corporate-gift-kit",salesAngle:"هدية واحدة تحمل قيمة العلاقة وهوية المؤسسة، من المنتج حتى لحظة التسليم."}
];

export function findPackage(slug:string){
  return offerPackages.find(pack=>pack.slug===slug);
}
