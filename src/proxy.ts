import { NextRequest, NextResponse } from "next/server";
import { auth, authConfigured } from "@/lib/auth/server";

const protectedMiddleware=auth.middleware({
  loginUrl:"/auth/sign-in"
});

export default function proxy(request:NextRequest){
  if(!authConfigured){
    // Local construction may temporarily expose the read-only admin preview.
    // Public deployments fail closed if auth secrets are missing.
    if(process.env.ENABLE_ADMIN_PREVIEW==="true"){
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/sign-in",request.url));
  }

  return protectedMiddleware(request);
}

export const config={
  matcher:[
    "/admin/:path*",
    "/account/:path*",
    "/partner-portal/:path*"
  ]
};
