import { databaseConfigured, getSql } from "@/lib/db";

export type AdminUserRow={
  id:string;
  authUserId:string|null;
  email:string|null;
  name:string|null;
  type:string;
  status:string;
  roles:string[];
  createdAt:string;
};

export type AdminRoleRow={
  id:string;
  key:string;
  name:string;
  scope:string;
  users:number;
  permissions:number;
};

export async function getAdminUsersAndRoles(){
  if(!databaseConfigured()) return {users:[] as AdminUserRow[],roles:[] as AdminRoleRow[]};

  try{
    const sql=getSql();
    const [users,roles]=await Promise.all([
      sql`
        select
          au.id,
          au.auth_user_id,
          au.email,
          au.display_name,
          au.user_type,
          au.status,
          au.created_at,
          coalesce(array_agg(distinct r.key) filter (where r.key is not null),'{}') as roles
        from app_users au
        left join user_roles ur on ur.user_id=au.id
        left join roles r on r.id=ur.role_id
        group by au.id
        order by au.created_at desc
      `,
      sql`
        select
          r.id,r.key,r.name_ar,r.scope,
          count(distinct ur.user_id)::integer as users,
          count(distinct rp.permission_id)::integer as permissions
        from roles r
        left join user_roles ur on ur.role_id=r.id
        left join role_permissions rp on rp.role_id=r.id
        group by r.id
        order by r.scope,r.name_ar
      `
    ]);

    return {
      users:users.map(row=>({
        id:String(row.id),
        authUserId:row.auth_user_id?String(row.auth_user_id):null,
        email:row.email?String(row.email):null,
        name:row.display_name?String(row.display_name):null,
        type:String(row.user_type),
        status:String(row.status),
        roles:Array.isArray(row.roles)?row.roles.map(String):[],
        createdAt:new Date(String(row.created_at)).toISOString()
      })),
      roles:roles.map(row=>({
        id:String(row.id),
        key:String(row.key),
        name:String(row.name_ar),
        scope:String(row.scope),
        users:Number(row.users??0),
        permissions:Number(row.permissions??0)
      }))
    };
  }catch{
    return {users:[] as AdminUserRow[],roles:[] as AdminRoleRow[]};
  }
}
