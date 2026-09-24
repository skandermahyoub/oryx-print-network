import { databaseConfigured, getSql } from "@/lib/db";

export type CatalogBuilderOptions={
  categories:Array<{id:string;name:string;department:string}>;
  finishings:Array<{id:string;key:string;name:string;category:string|null}>;
};

export async function getCatalogBuilderOptions():Promise<CatalogBuilderOptions>{
  if(!databaseConfigured()) return {categories:[],finishings:[]};

  const sql=getSql();
  const [categories,finishings]=await Promise.all([
    sql`
      select c.id,c.name_ar,d.name_ar as department_name
      from categories c
      join departments d on d.id=c.department_id
      where c.is_active=true and d.is_active=true
      order by d.sort_order,d.name_ar,c.sort_order,c.name_ar
    `,
    sql`
      select id,key,name_ar,category
      from finishings
      where is_active=true
      order by category nulls last,name_ar
    `
  ]);

  return {
    categories:categories.map(row=>({
      id:String(row.id),
      name:String(row.name_ar),
      department:String(row.department_name)
    })),
    finishings:finishings.map(row=>({
      id:String(row.id),
      key:String(row.key),
      name:String(row.name_ar),
      category:row.category?String(row.category):null
    }))
  };
}
