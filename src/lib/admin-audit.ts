import { databaseConfigured, getSql } from "@/lib/db";

export type AuditRow={
  id:string;
  actor:string|null;
  entityType:string;
  entityId:string|null;
  action:string;
  before:Record<string,unknown>|null;
  after:Record<string,unknown>|null;
  createdAt:string;
};

export async function getAuditEvents(limit=250):Promise<AuditRow[]>{
  if(!databaseConfigured()) return [];
  try{
    const sql=getSql();
    const rows=await sql`
      select
        ae.id,
        ae.entity_type,
        ae.entity_id,
        ae.action,
        ae.before_data,
        ae.after_data,
        ae.created_at,
        coalesce(au.display_name,au.email) as actor_name
      from audit_events ae
      left join app_users au on au.id=ae.actor_id
      order by ae.created_at desc
      limit ${limit}
    `;
    return rows.map(row=>({
      id:String(row.id),
      actor:row.actor_name?String(row.actor_name):null,
      entityType:String(row.entity_type),
      entityId:row.entity_id?String(row.entity_id):null,
      action:String(row.action),
      before:row.before_data&&typeof row.before_data==="object"&&!Array.isArray(row.before_data)?row.before_data as Record<string,unknown>:null,
      after:row.after_data&&typeof row.after_data==="object"&&!Array.isArray(row.after_data)?row.after_data as Record<string,unknown>:null,
      createdAt:new Date(String(row.created_at)).toISOString()
    }));
  }catch{
    return [];
  }
}
