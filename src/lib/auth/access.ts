import { redirect } from "next/navigation";
import { auth, authConfigured } from "@/lib/auth/server";
import { databaseConfigured, getSql } from "@/lib/db";
import { hasPermission } from "@/lib/auth/rbac";

export type StaffAccess={
  preview:boolean;
  user:{
    id:string;
    authUserId:string;
    email:string|null;
    name:string|null;
  };
  roles:string[];
  permissions:string[];
};

type AuthUser={id:string;email?:string|null;name?:string|null};

async function loadStaffRecord(authUser:AuthUser){
  const sql=getSql();
  const rows=await sql`
    select
      au.id,
      au.auth_user_id,
      au.email,
      au.display_name,
      au.status,
      au.user_type,
      coalesce(array_agg(distinct r.key) filter (where r.key is not null),'{}') as roles,
      coalesce(array_agg(distinct p.key) filter (where p.key is not null),'{}') as permissions
    from app_users au
    left join user_roles ur on ur.user_id=au.id
    left join roles r on r.id=ur.role_id
    left join role_permissions rp on rp.role_id=r.id
    left join permissions p on p.id=rp.permission_id
    where au.auth_user_id=${authUser.id}
    group by au.id
    limit 1
  `;
  return rows[0];
}

async function bootstrapOwnerIfAllowed(authUser:AuthUser){
  const configuredOwner=process.env.ORYX_BOOTSTRAP_OWNER_EMAIL?.trim().toLowerCase();
  const email=authUser.email?.trim().toLowerCase();

  if(!configuredOwner||!email||configuredOwner!==email){
    return false;
  }

  const sql=getSql();
  await sql`
    with inserted_user as (
      insert into app_users (
        auth_user_id,email,display_name,user_type,status
      ) values (
        ${authUser.id},
        ${email},
        ${authUser.name??email},
        'staff',
        'active'
      )
      on conflict (auth_user_id) do update set
        email=excluded.email,
        display_name=coalesce(app_users.display_name,excluded.display_name),
        user_type='staff',
        status='active',
        updated_at=now()
      returning id
    )
    insert into user_roles (user_id,role_id)
    select inserted_user.id,r.id
    from inserted_user
    join roles r on r.key='owner'
    on conflict do nothing
  `;

  return true;
}

export async function requireStaffAccess():Promise<StaffAccess>{
  if(!authConfigured){
    if(process.env.ENABLE_ADMIN_PREVIEW==="true"){
      return {
        preview:true,
        user:{id:"preview",authUserId:"preview",email:null,name:"Preview Admin"},
        roles:["preview"],
        permissions:["*"]
      };
    }
    redirect("/auth/sign-in");
  }

  const {data:session}=await auth.getSession();
  if(!session?.user) redirect("/auth/sign-in");
  if(!databaseConfigured()) redirect("/auth/sign-in");

  const authUser=session.user as AuthUser;
  let record=await loadStaffRecord(authUser);

  if(!record){
    const bootstrapped=await bootstrapOwnerIfAllowed(authUser);
    if(bootstrapped){
      record=await loadStaffRecord(authUser);
    }
  }

  if(!record||record.status!=="active"||record.user_type!=="staff"){
    redirect("/");
  }

  return {
    preview:false,
    user:{
      id:String(record.id),
      authUserId:String(record.auth_user_id),
      email:record.email?String(record.email):authUser.email??null,
      name:record.display_name?String(record.display_name):authUser.name??null
    },
    roles:Array.isArray(record.roles)?record.roles.map(String):[],
    permissions:Array.isArray(record.permissions)?record.permissions.map(String):[]
  };
}

export async function requirePermission(permission:string){
  const access=await requireStaffAccess();
  if(hasPermission(access.permissions,permission)){
    return access;
  }
  redirect("/admin");
}
