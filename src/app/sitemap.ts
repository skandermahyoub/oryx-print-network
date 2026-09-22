import type { MetadataRoute } from "next";
import { getCatalogSummaries } from "@/lib/catalog-repository";
import { offerPackages } from "@/lib/packages";
import { projectIdeas } from "@/lib/projects";
import { magazineArticles } from "@/lib/magazine";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const base=getSiteUrl();
  const services=await getCatalogSummaries();

  const staticRoutes=["","/services","/packages","/projects","/partners","/magazine","/order/new","/track"];
  return [
    ...staticRoutes.map((path,index)=>({
      url:`${base}${path}`,
      changeFrequency:(index===0?"daily":"weekly") as "daily"|"weekly",
      priority:index===0?1:index<4?0.9:0.7
    })),
    ...services.map(service=>({
      url:`${base}/services/${service.slug}`,
      changeFrequency:"weekly" as const,
      priority:0.8
    })),
    ...offerPackages.map(pack=>({
      url:`${base}/packages/${pack.slug}`,
      changeFrequency:"weekly" as const,
      priority:pack.seasonal?0.85:0.75
    })),
    ...projectIdeas.map(project=>({
      url:`${base}/projects/${project.slug}`,
      changeFrequency:"monthly" as const,
      priority:0.65
    })),
    ...magazineArticles.map(article=>({
      url:`${base}/magazine/${article.slug}`,
      changeFrequency:"monthly" as const,
      priority:0.7
    }))
  ];
}
