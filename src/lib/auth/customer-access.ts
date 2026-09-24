import { redirect } from "next/navigation";
import { auth, authConfigured } from "@/lib/auth/server";
import { databaseConfigured, getSql } from "@/lib/db";

export type CustomerAccess={
  appUserId:string;
  customerId:string;
  authUserId:string;
  name:string;
  email:string|null;
};

type AuthUser={id:string;email?:string|null;name?:string|null};

async function findCustomerAccess(authUser:AuthUser):Promise<CustomerAccess|null>{
  const sql=getSql();
  const rows=await sql`
    select
      au.id as app_user_id,
      au.customer_id,
      au.auth_user_id,
      coalesce(c.display_name,au.display_name,${authUser.name??"عميل ORYX"}) as display_name,
      coalesce(c.email,au.email,${authUser.email??null}) as email
    from app_users au
    left join customers c on c.id=au.customer_id
    where au.auth_user_id=${authUser.id}
      and au.status='active'
      and au.user_type='customer'
    limit 1
  `;
  const row=rows[0];
  if(!row?.customer_id) return null;

  return {
    appUserId:String(row.app_user_id),
    customerId:String(row.customer_id),
    authUserId:String(row.auth_user_id),
    name:String(row.display_name),
    email:row.email?String(row.email):null
  };
}

async function createCustomerAccess(authUser:AuthUser){
  const sql=getSql();
  const email=authUser.email?.trim().toLowerCase()??null;
  const name=authUser.name?.trim()||"عميل ORYX";

  await sql`
    with lock_row as (
      select pg_advisory_xact_lock(hashtext(${authUser.id}))
    ),
    existing as (
      select id,customer_id,user_type
      from app_users
      where auth_user_id=${authUser.id}
    ),
    new_customer as (
      insert into customers (customer_type,display_name,email,metadata)
      select 'individual',${name},${email},'{"source":"authenticated-account"}'::jsonb
      from lock_row
      where not exists(select 1 from existing)
      returning id
    ),
    new_app_user as (
      insert into app_users (
        auth_user_id,email,display_name,user_type,status,customer_id
      )
      select
        ${authUser.id},
        ${email},
        ${name},
        'customer',
        'active',
        new_customer.id
      from new_customer
      on conflict (auth_user_id) do nothing
      returning id
    )
    select count(*) from new_app_user
  `;
}

export async function requireCustomerAccess():Promise<CustomerAccess>{
  if(!authConfigured) redirect("/auth/sign-in");
  const {data:session}=await auth.getSession();
  if(!session?.user) redirect("/auth/sign-in");
  if(!databaseConfigured()) redirect("/auth/sign-in");

  const authUser=session.user as AuthUser;
  let access=await findCustomerAccess(authUser);

  if(!access){
    const sql=getSql();
    const existing=await sql`
      select user_type
      from app_users
      where auth_user_id=${authUser.id}
      limit 1
    `;

    if(existing[0]&&existing[0].user_type!=="customer"){
      redirect(existing[0].user_type==="partner"?"/partner-portal":"/admin");
    }

    await createCustomerAccess(authUser);
    access=await findCustomerAccess(authUser);
  }

  if(!access) redirect("/auth/sign-in");

  const sql=getSql();
  await sql`
    with loyalty as (
      insert into loyalty_accounts (customer_id)
      values (${access.customerId})
      on conflict (customer_id) do nothing
      returning id
    ),
    referral as (
      insert into referral_codes (customer_id,code,is_active)
      values (
        ${access.customerId},
        upper(substr(replace(gen_random_uuid()::text,'-',''),1,10)),
        true
      )
      on conflict (customer_id) do nothing
      returning id
    )
    select 1
  `;

  return access;
}
