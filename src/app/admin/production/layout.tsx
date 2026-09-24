import { requirePermission } from "@/lib/auth/access";

export default async function ModuleLayout({children}:{children:React.ReactNode}){
  await requirePermission("production.manage");
  return children;
}
