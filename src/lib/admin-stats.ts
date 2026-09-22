import { databaseConfigured, getSql } from "@/lib/db";

export type AdminStats={
  services:number;
  categories:number;
  packages:number;
  projects:number;
  partnerApplicants:number;
  openOrders:number;
  openQuotes:number;
  activePartners:number;
  packageRequests:number;
  activeSalesCampaigns:number;
};

export async function getAdminStats():Promise<AdminStats>{
  const empty={services:0,categories:0,packages:0,projects:0,partnerApplicants:0,openOrders:0,openQuotes:0,activePartners:0,packageRequests:0,activeSalesCampaigns:0};
  if(!databaseConfigured()) return empty;

  try{
    const sql=getSql();
    const rows=await sql`
      select
        (select count(*)::integer from services where is_active=true) as services,
        (select count(*)::integer from categories where is_active=true) as categories,
        (select count(*)::integer from packages where is_active=true) as packages,
        (select count(*)::integer from projects where status<>'cancelled') as projects,
        (select count(*)::integer from partners where status in ('applicant','under_review')) as partner_applicants,
        (select count(*)::integer from orders where status not in ('completed','cancelled')) as open_orders,
        (select count(*)::integer from quotes where status not in ('accepted','rejected','expired','cancelled')) as open_quotes,
        (select count(*)::integer from partners where status='active') as active_partners,
        (select count(*)::integer from package_requests where status in ('submitted','under_review')) as package_requests,
        (select count(*)::integer from sales_campaigns where status='active') as active_sales_campaigns
    `;
    const row=rows[0];
    return {
      services:Number(row?.services??0),
      categories:Number(row?.categories??0),
      packages:Number(row?.packages??0),
      projects:Number(row?.projects??0),
      partnerApplicants:Number(row?.partner_applicants??0),
      openOrders:Number(row?.open_orders??0),
      openQuotes:Number(row?.open_quotes??0),
      activePartners:Number(row?.active_partners??0),
      packageRequests:Number(row?.package_requests??0),
      activeSalesCampaigns:Number(row?.active_sales_campaigns??0)
    };
  }catch{
    return empty;
  }
}
