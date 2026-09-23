import { requirePermission } from "@/lib/auth/access";

export default async function ReadinessLayout({children}:{children:React.ReactNode}){
  await requirePermission("reports.view");
  return children;
}
