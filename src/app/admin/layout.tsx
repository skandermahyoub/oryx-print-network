import Link from "next/link";
import { requireStaffAccess } from "@/lib/auth/access";

export const dynamic="force-dynamic";

export default async function AdminLayout({children}:{children:React.ReactNode}){
  const access=await requireStaffAccess();

  return <div className="admin-root">
    <div className="admin-security-bar">
      <Link href="/admin"><strong>ORYX OS</strong></Link>
      <span>{access.preview?"PREVIEW ACCESS":access.user.name??access.user.email??"STAFF"}</span>
      <Link href="/">الواجهة العامة ←</Link>
    </div>
    {children}
  </div>;
}
