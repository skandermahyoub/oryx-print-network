import { requirePermission } from "@/lib/auth/access";

export default async function LoyaltyLayout({children}:{children:React.ReactNode}){
  await requirePermission("crm.manage");
  return children;
}
