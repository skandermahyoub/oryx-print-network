import { requirePermission } from "@/lib/auth/access";

export default async function ReportsLayout({children}:{children:React.ReactNode}){
  await requirePermission("reports.view");
  return children;
}
