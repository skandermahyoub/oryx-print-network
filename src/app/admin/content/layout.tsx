import { requirePermission } from "@/lib/auth/access";

export default async function ContentLayout({children}:{children:React.ReactNode}){
  await requirePermission("content.manage");
  return children;
}
