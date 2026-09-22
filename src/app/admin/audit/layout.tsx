import { requirePermission } from "@/lib/auth/access";

export default async function AuditLayout({children}:{children:React.ReactNode}){
  await requirePermission("audit.view");
  return children;
}
