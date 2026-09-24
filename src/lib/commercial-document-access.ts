import { redirect } from "next/navigation";
import { auth, authConfigured } from "@/lib/auth/server";
import { databaseConfigured, getSql } from "@/lib/db";

type CommercialEntity="quote"|"invoice";

export async function requireCommercialDocumentAccess(
  entity:CommercialEntity,
  entityId:string
){
  if(!databaseConfigured()) redirect("/auth/sign-in");

  if(!authConfigured&&process.env.ENABLE_ADMIN_PREVIEW==="true"){
    return {mode:"preview" as const,customerId:null};
  }

  if(!authConfigured) redirect("/auth/sign-in");
  const {data:session}=await auth.getSession();
  if(!session?.user) redirect("/auth/sign-in");

  const sql=getSql();
  const users=await sql`
    select id,user_type,status,customer_id
    from app_users
    where auth_user_id=${String(session.user.id)}
    limit 1
  `;
  const user=users[0];
  if(!user||user.status!=="active") redirect("/auth/sign-in");

  if(user.user_type==="staff"){
    return {mode:"staff" as const,customerId:null};
  }

  if(user.user_type!=="customer"||!user.customer_id){
    redirect("/");
  }

  const access=entity==="quote"
    ? await sql`
        select exists(
          select 1 from quotes
          where id=${entityId} and customer_id=${user.customer_id}
        ) as allowed
      `
    : await sql`
        select exists(
          select 1 from invoices
          where id=${entityId} and customer_id=${user.customer_id}
        ) as allowed
      `;

  if(!Boolean(access[0]?.allowed)) redirect("/account");
  return {mode:"customer" as const,customerId:String(user.customer_id)};
}
