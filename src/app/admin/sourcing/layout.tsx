import { requirePermission } from "@/lib/auth/access";

export default async function SourcingLayout({children}:{children:React.ReactNode}){
  await requirePermission("partners.manage");
  return children;
}
