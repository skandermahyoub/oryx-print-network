import { redirect } from "next/navigation";
import { auth, authConfigured } from "@/lib/auth/server";
import { databaseConfigured, getSql } from "@/lib/db";

export type PartnerAccess={
  appUserId:string;
  partnerId:string;
  authUserId:string;
  name:string|null;
  email:string|null;
  roles:string[];
};

export async function requirePartnerAccess():Promise<PartnerAccess>{
  if(!authConfigured) redirect("/auth/sign-in");
  const {data:session}=await auth.getSession();
  if(!session?.user) redirect("/auth/sign-in");
  if(!databaseConfigured()) redirect("/auth/sign-in");

  const authUser=session.user as {id:string;email?:string|null;name?:string|null};
  const sql=getSql();
  const rows=await sql`
    select
      au.id,
      au.partner_id,
      au.auth_user_id,
      au.email,
      au.display_name,
      au.status,
      au.user_type,
      coalesce(array_agg(distinct r.key) filter (where r.key is not null),'{}') as roles
    from app_users au
    left join user_roles ur on ur.user_id=au.id
    left join roles r on r.id=ur.role_id
    where au.auth_user_id=${authUser.id}
    group by au.id
    limit 1
  `;

  const row=rows[0];
  if(!row||row.status!=="active"||row.user_type!=="partner"||!row.partner_id){
    redirect("/");
  }

  return {
    appUserId:String(row.id),
    partnerId:String(row.partner_id),
    authUserId:String(row.auth_user_id),
    name:row.display_name?String(row.display_name):authUser.name??null,
    email:row.email?String(row.email):authUser.email??null,
    roles:Array.isArray(row.roles)?row.roles.map(String):[]
  };
}
