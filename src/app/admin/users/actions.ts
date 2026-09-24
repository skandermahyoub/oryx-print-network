"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/access";
import { getSql } from "@/lib/db";

function value(formData:FormData,key:string){
  return String(formData.get(key)??"").trim();
}

export async function assignRoleAction(formData:FormData){
  const access=await requirePermission("users.manage");
  const userId=value(formData,"userId");
  const roleKey=value(formData,"roleKey");
  const sql=getSql();

  if(roleKey==="owner"){
    if(!access.preview&&userId===access.user.id){
      throw new Error("لا يمكنك إزالة دور المالك من حسابك أثناء الجلسة.");
    }

    const owners=await sql`
      select count(distinct ur.user_id)::integer as count
      from user_roles ur
      join roles r on r.id=ur.role_id
      where r.key='owner'
    `;
    if(Number(owners[0]?.count??0)<=1){
      throw new Error("يجب أن يبقى مالك واحد على الأقل للنظام.");
    }
  }

  const rows=await sql`
    with target_role as (
      select id,key from roles where key=${roleKey} limit 1
    ),
    inserted as (
      insert into user_roles (user_id,role_id,assigned_by)
      select ${userId},target_role.id,${access.preview?null:access.user.id}
      from target_role
      on conflict do nothing
      returning user_id,role_id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'app_user',
        inserted.user_id,
        'role_assigned',
        jsonb_build_object('role',target_role.key)
      from inserted cross join target_role
      returning id
    )
    select user_id from inserted
  `;

  if(!rows[0]) throw new Error("Role could not be assigned.");
  revalidatePath("/admin/users");
}

export async function removeRoleAction(formData:FormData){
  const access=await requirePermission("users.manage");
  const userId=value(formData,"userId");
  const roleKey=value(formData,"roleKey");
  const sql=getSql();

  const rows=await sql`
    with target_role as (
      select id,key from roles where key=${roleKey} limit 1
    ),
    removed as (
      delete from user_roles ur
      using target_role
      where ur.user_id=${userId} and ur.role_id=target_role.id
      returning ur.user_id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${access.preview?null:access.user.id},
        'app_user',
        removed.user_id,
        'role_removed',
        jsonb_build_object('role',target_role.key)
      from removed cross join target_role
      returning id
    )
    select user_id from removed
  `;

  if(!rows[0]) throw new Error("Role assignment not found.");
  revalidatePath("/admin/users");
}

export async function updateUserStatusAction(formData:FormData){
  const access=await requirePermission("users.manage");
  const userId=value(formData,"userId");
  const status=value(formData,"status");

  if(!["invited","active","suspended","disabled"].includes(status)){
    throw new Error("Invalid user status.");
  }
  if(!access.preview&&userId===access.user.id&&status!=="active"){
    throw new Error("You cannot disable your own active session.");
  }

  const sql=getSql();
  const rows=await sql`
    with current as (
      select id,status from app_users where id=${userId} limit 1
    ),
    updated as (
      update app_users au
      set status=${status},updated_at=now()
      from current
      where au.id=current.id
      returning au.id,current.status as old_status,au.status as new_status
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select
        ${access.preview?null:access.user.id},
        'app_user',
        updated.id,
        'status_change',
        jsonb_build_object('status',updated.old_status),
        jsonb_build_object('status',updated.new_status)
      from updated
      returning id
    )
    select id from updated
  `;

  if(!rows[0]) throw new Error("User not found.");
  revalidatePath("/admin/users");
}
