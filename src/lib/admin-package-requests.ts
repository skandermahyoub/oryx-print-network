import { databaseConfigured, getSql } from "@/lib/db";

export type PackageRequestRow={
  id:string;
  requestNumber:number;
  packageName:string;
  customerName:string;
  companyName:string|null;
  phone:string|null;
  city:string|null;
  status:string;
  itemCount:number;
  notes:string|null;
  createdAt:string;
};

export async function getPackageRequests(limit=100):Promise<PackageRequestRow[]>{
  if(!databaseConfigured()) return [];
  try{
    const sql=getSql();
    const rows=await sql`
      select
        pr.id,
        pr.request_number,
        p.name_ar as package_name,
        coalesce(c.display_name,'—') as customer_name,
        c.company_name,
        c.phone,
        c.city,
        pr.status,
        pr.notes,
        pr.created_at,
        count(pri.id)::integer as item_count
      from package_requests pr
      join packages p on p.id=pr.package_id
      left join customers c on c.id=pr.customer_id
      left join package_request_items pri on pri.package_request_id=pr.id
      group by pr.id,p.name_ar,c.display_name,c.company_name,c.phone,c.city
      order by pr.created_at desc
      limit ${limit}
    `;

    return rows.map(row=>({
      id:String(row.id),
      requestNumber:Number(row.request_number),
      packageName:String(row.package_name),
      customerName:String(row.customer_name),
      companyName:row.company_name?String(row.company_name):null,
      phone:row.phone?String(row.phone):null,
      city:row.city?String(row.city):null,
      status:String(row.status),
      itemCount:Number(row.item_count??0),
      notes:row.notes?String(row.notes):null,
      createdAt:new Date(String(row.created_at)).toISOString()
    }));
  }catch{
    return [];
  }
}
