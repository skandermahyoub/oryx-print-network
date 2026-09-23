import { getSql } from "@/lib/db";

export type CustomerIdentityInput={
  displayName:string;
  companyName?:string;
  phone:string;
  email?:string;
  city?:string;
  source:string;
};

export function normalizePhone(value:string){
  return value.replace(/\D+/g,"").replace(/^00/,"").slice(-15);
}

export function normalizeEmail(value:string){
  return value.trim().toLowerCase();
}

export async function findOrCreateCustomer(input:CustomerIdentityInput){
  const phone=normalizePhone(input.phone);
  const email=normalizeEmail(input.email??"");
  const identityKey=phone?`phone:${phone}`:`email:${email}`;
  const sql=getSql();

  const rows=await sql`
    with locked as (
      select pg_advisory_xact_lock(hashtext(${identityKey})) as ok
    ),
    existing as (
      select c.id
      from customers c,locked
      where
        (
          ${phone}<>'' and
          regexp_replace(coalesce(c.phone,''),'[^0-9]','','g')=${phone}
        )
        or
        (
          ${email}<>'' and
          lower(coalesce(c.email,''))=${email}
        )
      order by c.created_at asc
      limit 1
    ),
    updated as (
      update customers c
      set
        display_name=case when ${input.displayName}<>'' then ${input.displayName} else c.display_name end,
        company_name=coalesce(nullif(${input.companyName??""},''),c.company_name),
        phone=coalesce(nullif(${input.phone},''),c.phone),
        email=coalesce(nullif(${email},''),c.email),
        city=coalesce(nullif(${input.city??""},''),c.city),
        customer_type=case when ${input.companyName??""}<>'' then 'business' else c.customer_type end,
        metadata=c.metadata||jsonb_build_object('last_source',${input.source})
      from existing
      where c.id=existing.id
      returning c.id,false as created
    ),
    created as (
      insert into customers (
        customer_type,display_name,company_name,phone,email,city,metadata
      )
      select
        case when ${input.companyName??""}<>'' then 'business' else 'individual' end,
        ${input.displayName},
        nullif(${input.companyName??""},''),
        nullif(${input.phone},''),
        nullif(${email},''),
        nullif(${input.city??""},''),
        jsonb_build_object('source',${input.source})
      from locked
      where not exists(select 1 from existing)
      returning id,true as created
    )
    select id,created from updated
    union all
    select id,created from created
    limit 1
  `;

  const row=rows[0];
  if(!row) throw new Error("Customer identity could not be resolved.");

  return {
    customerId:String(row.id),
    created:Boolean(row.created)
  };
}
