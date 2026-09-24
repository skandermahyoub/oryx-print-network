import { getSql } from "@/lib/db";
import { queueInAppNotification } from "@/lib/notifications";

export async function ensureDesignJob(input:{
  orderItemId:string;
  actorId?:string|null;
  dueAt?:string|null;
}){
  const sql=getSql();

  const rows=await sql`
    with item as (
      select oi.id,oi.order_id,s.requires_design_approval
      from order_items oi
      join services s on s.id=oi.service_id
      where oi.id=${input.orderItemId}
      limit 1
    ),
    existing as (
      select dj.id,dj.status
      from design_jobs dj
      join item on item.id=dj.order_item_id
      order by dj.created_at desc
      limit 1
    ),
    created as (
      insert into design_jobs (order_item_id,status,due_at)
      select item.id,'brief',${input.dueAt??null}
      from item
      where item.requires_design_approval=true
        and not exists(select 1 from existing)
      returning id,status
    ),
    result as (
      select id,status,false as created from existing
      union all
      select id,status,true as created from created
      limit 1
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${input.actorId??null},
        'design_job',
        result.id,
        case when result.created then 'created' else 'reused' end,
        jsonb_build_object('order_item_id',${input.orderItemId},'status',result.status)
      from result
      returning id
    )
    select id,status,created from result
  `;

  const row=rows[0];
  if(!row) throw new Error("This order item does not require design approval.");

  return {
    designJobId:String(row.id),
    status:String(row.status),
    created:Boolean(row.created)
  };
}

export async function assignDesignJob(input:{
  designJobId:string;
  assigneeId:string|null;
  dueAt?:string|null;
  brief?:string|null;
  actorId?:string|null;
}){
  const sql=getSql();
  const rows=await sql`
    with old as (
      select id,status,assigned_to,due_at,brief
      from design_jobs
      where id=${input.designJobId}
      limit 1
    ),
    updated as (
      update design_jobs dj
      set
        assigned_to=${input.assigneeId},
        due_at=coalesce(${input.dueAt??null},dj.due_at),
        brief=coalesce(nullif(${input.brief??null},''),dj.brief),
        status=case when dj.status='brief' then 'designing' else dj.status end,
        updated_at=now()
      from old
      where dj.id=old.id
        and old.status not in ('approved','completed','cancelled')
      returning dj.id,dj.status,dj.assigned_to,dj.due_at,dj.brief
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,before_data,after_data)
      select
        ${input.actorId??null},
        'design_job',
        updated.id,
        'assigned',
        jsonb_build_object('assigned_to',old.assigned_to,'due_at',old.due_at,'status',old.status),
        jsonb_build_object('assigned_to',updated.assigned_to,'due_at',updated.due_at,'status',updated.status)
      from updated join old on old.id=updated.id
      returning id
    )
    select id,status from updated
  `;

  if(!rows[0]) throw new Error("Design job cannot be updated.");
  return {designJobId:String(rows[0].id),status:String(rows[0].status)};
}

export async function createDesignVersion(input:{
  designJobId:string;
  documentId:string;
  notes?:string|null;
  actorId?:string|null;
}){
  const sql=getSql();

  const rows=await sql`
    with locked as (
      select id,status
      from design_jobs
      where id=${input.designJobId}
        and status not in ('approved','completed','cancelled')
      for update
    ),
    next_version as (
      select coalesce(max(dv.version_number),0)+1 as version_number
      from design_versions dv
      join locked on locked.id=dv.design_job_id
    ),
    valid_document as (
      select d.id
      from documents d
      where d.id=${input.documentId}
        and d.bucket_name='design-files'
        and d.owner_type='design_job'
        and d.owner_id=${input.designJobId}
      limit 1
    ),
    created as (
      insert into design_versions (
        design_job_id,version_number,document_id,notes,status
      )
      select
        locked.id,
        next_version.version_number,
        (select id from valid_document),
        ${input.notes??null},
        'review'
      from locked cross join next_version
      where exists(select 1 from valid_document)
      returning id,design_job_id,version_number
    ),
    updated_job as (
      update design_jobs dj
      set status='waiting_approval',updated_at=now()
      from created
      where dj.id=created.design_job_id
      returning dj.id
    ),
    audit as (
      insert into audit_events (actor_id,entity_type,entity_id,action,after_data)
      select
        ${input.actorId??null},
        'design_job',
        created.design_job_id,
        'version_created',
        jsonb_build_object('design_version_id',created.id,'version_number',created.version_number,'document_id',${input.documentId})
      from created
      returning id
    )
    select created.id,created.design_job_id,created.version_number
    from created
  `;

  const row=rows[0];
  if(!row){
    throw new Error("Design document is invalid, belongs to another job, or is not in the design-files bucket.");
  }

  const customerRows=await sql`
    select o.customer_id,o.order_number,s.name_ar as service_name
    from design_jobs dj
    join order_items oi on oi.id=dj.order_item_id
    join orders o on o.id=oi.order_id
    join services s on s.id=oi.service_id
    where dj.id=${row.design_job_id}
    limit 1
  `;
  const customer=customerRows[0];
  if(customer?.customer_id){
    await queueInAppNotification({
      recipientType:"customer",
      recipientId:String(customer.customer_id),
      templateKey:"design_ready_for_approval",
      subject:`تصميم جديد بانتظار اعتمادك — V${Number(row.version_number)}`,
      body:`تم رفع نسخة جديدة لخدمة ${String(customer.service_name)} في طلب #${Number(customer.order_number)}. راجع الملف واعتمد النسخة أو اطلب التعديل من مكتبك الرقمي.`,
      relatedType:"design_version",
      relatedId:String(row.id)
    });
  }

  return {
    designVersionId:String(row.id),
    designJobId:String(row.design_job_id),
    versionNumber:Number(row.version_number)
  };
}

export async function decideDesignVersion(input:{
  designVersionId:string;
  customerId:string;
  decision:"approved"|"revision_requested"|"rejected";
  notes?:string|null;
}){
  const sql=getSql();

  const rows=await sql`
    with version_context as (
      select
        dv.id,
        dv.design_job_id,
        dv.version_number,
        dj.order_item_id,
        oi.order_id,
        oi.specifications,
        o.customer_id,
        dj.status as design_job_status
      from design_versions dv
      join design_jobs dj on dj.id=dv.design_job_id
      join order_items oi on oi.id=dj.order_item_id
      join orders o on o.id=oi.order_id
      where dv.id=${input.designVersionId}
        and o.customer_id=${input.customerId}
        and dj.status='waiting_approval'
      limit 1
      for update of dj
    ),
    latest as (
      select max(dv2.version_number) as latest_version
      from design_versions dv2
      join version_context vc on vc.design_job_id=dv2.design_job_id
    ),
    eligible as (
      select vc.*
      from version_context vc,latest
      where vc.version_number=latest.latest_version
        and not exists(
          select 1
          from design_versions av
          join design_approvals da on da.design_version_id=av.id
          where av.design_job_id=vc.design_job_id
            and da.decision='approved'
        )
        and not exists(
          select 1 from design_approvals existing
          where existing.design_version_id=vc.id
        )
    ),
    decision_row as (
      insert into design_approvals (
        design_version_id,customer_id,decision,approved_spec_snapshot,notes
      )
      select
        eligible.id,
        ${input.customerId},
        ${input.decision},
        eligible.specifications,
        ${input.notes??null}
      from eligible
      returning id,design_version_id,decision
    ),
    updated_version as (
      update design_versions dv
      set status=case
        when ${input.decision}='approved' then 'approved'
        when ${input.decision}='revision_requested' then 'revision_requested'
        else 'rejected'
      end
      from decision_row
      where dv.id=decision_row.design_version_id
      returning dv.design_job_id
    ),
    updated_job as (
      update design_jobs dj
      set
        status=case
          when ${input.decision}='approved' then 'approved'
          when ${input.decision}='revision_requested' then 'designing'
          else 'designing'
        end,
        updated_at=now()
      from updated_version
      where dj.id=updated_version.design_job_id
      returning dj.id,dj.order_item_id,dj.status
    ),
    audit as (
      insert into audit_events (entity_type,entity_id,action,after_data)
      select
        'design_job',
        updated_job.id,
        'customer_decision',
        jsonb_build_object(
          'design_version_id',${input.designVersionId},
          'decision',${input.decision},
          'customer_id',${input.customerId}
        )
      from updated_job
      returning id
    )
    select
      decision_row.id as approval_id,
      updated_job.id as design_job_id,
      updated_job.order_item_id,
      updated_job.status
    from decision_row
    join updated_version on true
    join updated_job on true
  `;

  const row=rows[0];
  if(!row){
    throw new Error("This design version is unavailable, not the latest version, or was already decided.");
  }

  if(input.decision==="approved"){
    await queueInAppNotification({
      recipientType:"customer",
      recipientId:input.customerId,
      templateKey:"design_approved",
      subject:"تم اعتماد التصميم للإنتاج",
      body:"سجل ORYX اعتمادك للنسخة الحالية وسيُستخدم هذا الاعتماد كبوابة للإنتاج.",
      relatedType:"design_job",
      relatedId:String(row.design_job_id)
    });
  }

  return {
    approvalId:String(row.approval_id),
    designJobId:String(row.design_job_id),
    orderItemId:String(row.order_item_id),
    status:String(row.status)
  };
}
