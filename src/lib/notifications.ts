import { databaseConfigured, getSql } from "@/lib/db";

export type NotificationRecipientType="customer"|"partner"|"staff";

export async function queueInAppNotification(input:{
  recipientType:NotificationRecipientType;
  recipientId:string;
  templateKey:string;
  subject:string;
  body:string;
  relatedType?:string|null;
  relatedId?:string|null;
}){
  if(!databaseConfigured()) return null;
  try{
    const sql=getSql();
    const rows=await sql`
      insert into notifications (
        recipient_type,recipient_id,channel,template_key,subject,body,status,related_type,related_id,sent_at
      ) values (
        ${input.recipientType},${input.recipientId},'in_app',${input.templateKey},
        ${input.subject},${input.body},'sent',${input.relatedType??null},${input.relatedId??null},now()
      )
      returning id
    `;
    return rows[0]?.id?String(rows[0].id):null;
  }catch{
    return null;
  }
}

export type PortalNotification={
  id:string;
  subject:string;
  body:string;
  templateKey:string|null;
  relatedType:string|null;
  relatedId:string|null;
  status:string;
  createdAt:string;
};

export async function getRecipientNotifications(input:{
  recipientType:NotificationRecipientType;
  recipientId:string;
  limit?:number;
}):Promise<PortalNotification[]>{
  if(!databaseConfigured()) return [];
  try{
    const sql=getSql();
    const limit=Math.max(1,Math.min(100,input.limit??30));
    const rows=await sql`
      select id,subject,body,template_key,related_type,related_id,status,created_at
      from notifications
      where recipient_type=${input.recipientType}
        and recipient_id=${input.recipientId}
        and channel='in_app'
      order by created_at desc
      limit ${limit}
    `;
    return rows.map(row=>({
      id:String(row.id),
      subject:String(row.subject??"إشعار"),
      body:String(row.body??""),
      templateKey:row.template_key?String(row.template_key):null,
      relatedType:row.related_type?String(row.related_type):null,
      relatedId:row.related_id?String(row.related_id):null,
      status:String(row.status),
      createdAt:new Date(String(row.created_at)).toISOString()
    }));
  }catch{
    return [];
  }
}

export async function markRecipientNotificationRead(input:{
  notificationId:string;
  recipientType:NotificationRecipientType;
  recipientId:string;
}){
  if(!databaseConfigured()) return false;
  const sql=getSql();
  const rows=await sql`
    update notifications
    set status='read'
    where id=${input.notificationId}
      and recipient_type=${input.recipientType}
      and recipient_id=${input.recipientId}
      and channel='in_app'
    returning id
  `;
  return Boolean(rows[0]?.id);
}
