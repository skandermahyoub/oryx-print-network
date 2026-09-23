import { databaseConfigured, getSql } from "@/lib/db";

export type PackageRequestDetail={
  request:{
    id:string;
    number:number;
    status:string;
    packageName:string;
    packageSlug:string;
    customerId:string|null;
    customerName:string;
    companyName:string|null;
    phone:string|null;
    email:string|null;
    city:string|null;
    notes:string|null;
    convertedOrderId:string|null;
    createdAt:string;
  };
  items:Array<{
    id:string;
    packageItemId:string|null;
    itemName:string;
    quantity:number;
    serviceId:string|null;
    serviceName:string|null;
    serviceSlug:string|null;
  }>;
  services:Array<{id:string;name:string;slug:string;category:string}>;
};

export async function getPackageRequestDetail(requestId:string):Promise<PackageRequestDetail|null>{
  if(!databaseConfigured()) return null;
  const sql=getSql();

  const requests=await sql`
    select
      pr.id,pr.request_number,pr.status,pr.customer_id,pr.notes,pr.converted_order_id,pr.created_at,
      p.name_ar as package_name,p.slug as package_slug,
      coalesce(c.display_name,'—') as customer_name,c.company_name,c.phone,c.email,c.city
    from package_requests pr
    join packages p on p.id=pr.package_id
    left join customers c on c.id=pr.customer_id
    where pr.id=${requestId}
    limit 1
  `;
  const request=requests[0];
  if(!request) return null;

  const [items,services]=await Promise.all([
    sql`
      select
        pri.id,pri.package_item_id,pri.item_name,pri.quantity,
        pi.service_id,
        s.name_ar as service_name,
        s.slug as service_slug
      from package_request_items pri
      left join package_items pi on pi.id=pri.package_item_id
      left join services s on s.id=pi.service_id
      where pri.package_request_id=${requestId}
      order by pri.created_at,pri.id
    `,
    sql`
      select s.id,s.name_ar,s.slug,c.name_ar as category_name
      from services s
      join categories c on c.id=s.category_id
      where s.is_active=true
      order by c.name_ar,s.name_ar
      limit 800
    `
  ]);

  return {
    request:{
      id:String(request.id),
      number:Number(request.request_number),
      status:String(request.status),
      packageName:String(request.package_name),
      packageSlug:String(request.package_slug),
      customerId:request.customer_id?String(request.customer_id):null,
      customerName:String(request.customer_name),
      companyName:request.company_name?String(request.company_name):null,
      phone:request.phone?String(request.phone):null,
      email:request.email?String(request.email):null,
      city:request.city?String(request.city):null,
      notes:request.notes?String(request.notes):null,
      convertedOrderId:request.converted_order_id?String(request.converted_order_id):null,
      createdAt:new Date(String(request.created_at)).toISOString()
    },
    items:items.map(row=>({
      id:String(row.id),
      packageItemId:row.package_item_id?String(row.package_item_id):null,
      itemName:String(row.item_name),
      quantity:Number(row.quantity??1),
      serviceId:row.service_id?String(row.service_id):null,
      serviceName:row.service_name?String(row.service_name):null,
      serviceSlug:row.service_slug?String(row.service_slug):null
    })),
    services:services.map(row=>({
      id:String(row.id),
      name:String(row.name_ar),
      slug:String(row.slug),
      category:String(row.category_name)
    }))
  };
}
