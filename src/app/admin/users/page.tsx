import Link from "next/link";
import { getAdminUsersAndRoles } from "@/lib/admin-users";
import { assignRoleAction, removeRoleAction, updateUserStatusAction } from "./actions";

export const dynamic="force-dynamic";

export default async function UsersAdminPage(){
  const {users,roles}=await getAdminUsersAndRoles();
  const staffRoles=roles.filter(role=>role.scope==="staff");

  return <main className="admin-list-page">
    <section className="admin-list-head">
      <div>
        <span className="eyebrow">ORYX ACCESS CONTROL</span>
        <h1>المستخدمون والصلاحيات</h1>
        <p>الدور ليس اسمًا في الواجهة. كل دور مربوط بصلاحيات فعلية وتتحقق منها الصفحات والعمليات الحساسة قبل التنفيذ.</p>
      </div>
      <Link className="secondary-button" href="/admin">مركز القيادة</Link>
    </section>

    <section className="access-role-grid">
      {roles.map(role=><article key={role.id}>
        <span>{role.scope}</span>
        <h2>{role.name}</h2>
        <p>{role.key}</p>
        <div><b>{role.users}</b> مستخدمين · <b>{role.permissions}</b> صلاحيات</div>
      </article>)}
    </section>

    <section className="admin-list-shell access-users-shell">
      <div className="admin-table-wrap">
        <table className="admin-table access-table">
          <thead><tr><th>المستخدم</th><th>النوع</th><th>الحالة</th><th>الأدوار</th><th>إضافة دور</th><th>الحساب</th></tr></thead>
          <tbody>
            {users.length?users.map(user=><tr key={user.id}>
              <td><strong>{user.name??"بدون اسم"}</strong><small>{user.email??user.authUserId??"—"}</small></td>
              <td>{user.type}</td>
              <td><span className="status-pill">{user.status}</span></td>
              <td><div className="user-role-list">
                {user.roles.length?user.roles.map(role=><form action={removeRoleAction} key={role}>
                  <input type="hidden" name="userId" value={user.id}/>
                  <input type="hidden" name="roleKey" value={role}/>
                  <button type="submit" title="إزالة الدور">{role} ×</button>
                </form>):<span>بدون دور</span>}
              </div></td>
              <td><form action={assignRoleAction} className="inline-role-form">
                <input type="hidden" name="userId" value={user.id}/>
                <select name="roleKey" required defaultValue="">
                  <option value="" disabled>اختر دورًا</option>
                  {staffRoles.filter(role=>!user.roles.includes(role.key)).map(role=><option value={role.key} key={role.key}>{role.name}</option>)}
                </select>
                <button type="submit">+</button>
              </form></td>
              <td><form action={updateUserStatusAction} className="inline-role-form">
                <input type="hidden" name="userId" value={user.id}/>
                <select name="status" defaultValue={user.status}>
                  <option value="active">نشط</option>
                  <option value="suspended">موقوف</option>
                  <option value="disabled">معطل</option>
                  <option value="invited">مدعو</option>
                </select>
                <button type="submit">حفظ</button>
              </form></td>
            </tr>):<tr><td colSpan={6} className="empty-cell">لا توجد حسابات تطبيق بعد.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  </main>;
}
