import { requirePermission } from "@/lib/auth/access";

export default async function ProcurementLayout({children}:{children:React.ReactNode}){
  await requirePermission("inventory.manage");
  return children;
}
