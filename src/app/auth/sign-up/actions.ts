"use server";

import { redirect } from "next/navigation";
import { auth, authConfigured } from "@/lib/auth/server";

export type SignUpState={error?:string}|null;

export async function signUpWithEmail(
  _previous:SignUpState,
  formData:FormData
):Promise<SignUpState>{
  if(!authConfigured){
    return {error:"إنشاء الحسابات غير مفعّل في بيئة المعاينة بعد."};
  }

  const name=String(formData.get("name")??"").trim();
  const email=String(formData.get("email")??"").trim();
  const password=String(formData.get("password")??"");

  if(name.length<2||!email||password.length<8){
    return {error:"أدخل الاسم والبريد وكلمة مرور من 8 أحرف على الأقل."};
  }

  const {error}=await auth.signUp.email({name,email,password});
  if(error){
    return {error:error.message||"تعذر إنشاء الحساب."};
  }

  redirect("/account");
}
