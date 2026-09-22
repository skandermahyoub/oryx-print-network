import { createNeonAuth } from "@neondatabase/auth/next/server";

export const authConfigured=Boolean(
  process.env.NEON_AUTH_BASE_URL &&
  process.env.NEON_AUTH_COOKIE_SECRET &&
  process.env.NEON_AUTH_COOKIE_SECRET.length>=32
);

// Fail-closed build fallback. This is never treated as a valid configured auth environment.
const buildOnlyBaseUrl=process.env.NEON_AUTH_BASE_URL??"https://auth.invalid.local";
const buildOnlySecret=process.env.NEON_AUTH_COOKIE_SECRET??"oryx-build-only-cookie-secret-not-for-runtime";

export const auth=createNeonAuth({
  baseUrl:buildOnlyBaseUrl,
  cookies:{
    secret:buildOnlySecret,
    sessionDataTtl:300
  },
  logLevel:"warn"
});
