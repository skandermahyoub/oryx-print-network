"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInWithEmail } from "./actions";

export default function SignInPage(){
  const [state,formAction,isPending]=useActionState(signInWithEmail,null);

  return <main className="auth-page">
    <section className="auth-brand">
      <span>ORYX</span>
      <strong>PRINT NETWORK</strong>
      <p>نطبع أي شيء على أي شيء.</p>
    </section>

    <section className="auth-panel">
      <div>
        <span className="eyebrow">SECURE ACCESS</span>
        <h1>الدخول إلى أوريكس</h1>
        <p>لوحة الإدارة وحسابات الشركاء والعملاء محمية عبر Neon Managed Auth.</p>
      </div>

      <form action={formAction} className="auth-form">
        <label>البريد الإلكتروني<input name="email" type="email" autoComplete="email" required placeholder="name@company.com"/></label>
        <label>كلمة المرور<input name="password" type="password" autoComplete="current-password" required placeholder="••••••••"/></label>
        {state?.error?<p className="form-error">{state.error}</p>:null}
        <button className="primary-button" disabled={isPending}>{isPending?"جاري التحقق...":"تسجيل الدخول"}</button>
      </form>

      <Link href="/" className="auth-back">العودة إلى الواجهة العامة ←</Link>
    </section>
  </main>;
}
