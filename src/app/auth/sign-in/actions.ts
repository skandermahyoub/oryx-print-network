"use server";

import { redirect } from "next/navigation";
import { auth, authConfigured } from "@/lib/auth/server";

export type SignInState={error?:string}|null;

export async function signInWithEmail(
  _previous:SignInState,
  formData:FormData
):Promise<SignInState>{
  if(!authConfigured){
    return {error:"تسجيل الدخول غير مفعّل في بيئة المعاينة بعد."};
  }

  const email=String(formData.get("email")??"").trim();
  const password=String(formData.get("password")??"");

  if(!email||!password){
    return {error:"أدخل البريد الإلكتروني وكلمة المرور."};
  }

  const {error}=await auth.signIn.email({email,password});
  if(error){
    return {error:error.message||"تعذر تسجيل الدخول."};
  }

  redirect("/account");
}
