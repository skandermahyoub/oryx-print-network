import { requirePermission } from "@/lib/auth/access";

export default async function LogisticsLayout({children}:{children:React.ReactNode}){
  await requirePermission("delivery.manage");
  return children;
}
