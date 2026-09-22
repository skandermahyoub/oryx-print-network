"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpWithEmail } from "./actions";

export default function SignUpPage(){
  const [state,formAction,isPending]=useActionState(signUpWithEmail,null);

  return <main className="auth-page">
    <section className="auth-brand">
      <span>ORYX</span>
      <strong>PRINT NETWORK</strong>
      <p>مكتب الطباعة والإبداع في حساب واحد.</p>
    </section>

    <section className="auth-panel">
      <div>
        <span className="eyebrow">CUSTOMER ACCOUNT</span>
        <h1>أنشئ حسابك</h1>
        <p>تابع الطلبات والتصميمات والفواتير والمكافآت وأعد تنفيذ أعمالك السابقة دون إدخال البيانات من جديد.</p>
      </div>

      <form action={formAction} className="auth-form">
        <label>الاسم<input name="name" required placeholder="الاسم الكامل"/></label>
        <label>البريد الإلكتروني<input name="email" type="email" autoComplete="email" required placeholder="name@example.com"/></label>
        <label>كلمة المرور<input name="password" type="password" minLength={8} autoComplete="new-password" required placeholder="8 أحرف على الأقل"/></label>
        {state?.error?<p className="form-error">{state.error}</p>:null}
        <button className="primary-button" disabled={isPending}>{isPending?"جاري إنشاء الحساب...":"إنشاء الحساب"}</button>
      </form>

      <p className="auth-switch">لديك حساب؟ <Link href="/auth/sign-in">تسجيل الدخول</Link></p>
      <Link href="/" className="auth-back">العودة إلى الواجهة العامة ←</Link>
    </section>
  </main>;
}
