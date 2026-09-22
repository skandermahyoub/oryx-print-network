import { redirect } from "next/navigation";
import { auth, authConfigured } from "@/lib/auth/server";

export async function GET(){
  if(authConfigured){
    await auth.signOut();
  }
  redirect("/");
}
