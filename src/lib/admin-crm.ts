import { databaseConfigured, getSql } from "@/lib/db";

export type CrmSnapshot={
  pipeline:Array<{stage:string;count:number;value:number}>;
  leads:Array<{
    id:string;
    name:string;
    company:string|null;
    phone:string|null;
    source:string|null;
    status:string;
    createdAt:string;
  }>;
  overdue:Array<{
    id:string;
    subject:string|null;
    type:string;
    dueAt:string;
  }>;
  totals:{
    leads:number;
    openOpportunities:number;
    pipelineValue:number;
    overdueActivities:number;
  };
};

const empty:CrmSnapshot={
  pipeline:[],
  leads:[],
  overdue:[],
  totals:{leads:0,openOpportunities:0,pipelineValue:0,overdueActivities:0}
};

export async function getCrmSnapshot():Promise<CrmSnapshot>{
  if(!databaseConfigured()) return empty;
  try{
    const sql=getSql();
    const [pipeline,leads,overdue,totals]=await Promise.all([
      sql`
        select stage,count(*)::integer as count,coalesce(sum(estimated_value),0)::numeric(14,2) as value
        from opportunities
        where stage not in ('won','lost','cancelled')
        group by stage
        order by case stage
          when 'new' then 10
          when 'contacted' then 20
          when 'qualified' then 30
          when 'quote' then 40
          when 'negotiation' then 50
          else 90 end
      `,
      sql`
        select id,coalesce(full_name,'—') as name,company_name,phone,source,status,created_at
        from leads
        order by created_at desc
        limit 30
      `,
      sql`
        select id,subject,activity_type,due_at
        from activities
        where completed_at is null and due_at is not null and due_at<now()
        order by due_at asc
        limit 30
      `,
      sql`
        select
          (select count(*)::integer from leads) as leads,
          (select count(*)::integer from opportunities where stage not in ('won','lost','cancelled')) as open_opportunities,
          (select coalesce(sum(estimated_value),0)::numeric(14,2) from opportunities where stage not in ('won','lost','cancelled')) as pipeline_value,
          (select count(*)::integer from activities where completed_at is null and due_at is not null and due_at<now()) as overdue_activities
      `
    ]);

    const t=totals[0];
    return {
      pipeline:pipeline.map(row=>({
        stage:String(row.stage),
        count:Number(row.count??0),
        value:Number(row.value??0)
      })),
      leads:leads.map(row=>({
        id:String(row.id),
        name:String(row.name),
        company:row.company_name?String(row.company_name):null,
        phone:row.phone?String(row.phone):null,
        source:row.source?String(row.source):null,
        status:String(row.status),
        createdAt:new Date(String(row.created_at)).toISOString()
      })),
      overdue:overdue.map(row=>({
        id:String(row.id),
        subject:row.subject?String(row.subject):null,
        type:String(row.activity_type),
        dueAt:new Date(String(row.due_at)).toISOString()
      })),
      totals:{
        leads:Number(t?.leads??0),
        openOpportunities:Number(t?.open_opportunities??0),
        pipelineValue:Number(t?.pipeline_value??0),
        overdueActivities:Number(t?.overdue_activities??0)
      }
    };
  }catch{
    return empty;
  }
}
