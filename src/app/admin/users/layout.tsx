import { requirePermission } from "@/lib/auth/access";

export default async function UsersLayout({children}:{children:React.ReactNode}){
  await requirePermission("users.manage");
  return children;
}
