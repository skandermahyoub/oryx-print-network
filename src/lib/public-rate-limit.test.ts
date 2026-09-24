import { describe,expect,it } from "vitest";
import { publicClientKey } from "./public-rate-limit";

describe("public API client hashing",()=>{
  it("returns a stable non-reversible key for the same request fingerprint",()=>{
    const a=new Request("https://oryx.test",{
      headers:{"x-forwarded-for":"203.0.113.9","user-agent":"ORYX-Test"}
    });
    const b=new Request("https://oryx.test",{
      headers:{"x-forwarded-for":"203.0.113.9","user-agent":"ORYX-Test"}
    });
    const first=publicClientKey(a);
    const second=publicClientKey(b);
    expect(first).toBe(second);
    expect(first).toMatch(/^[a-f0-9]{64}$/);
    expect(first).not.toContain("203.0.113.9");
  });

  it("changes when the client fingerprint changes",()=>{
    const a=new Request("https://oryx.test",{headers:{"x-forwarded-for":"203.0.113.9","user-agent":"A"}});
    const b=new Request("https://oryx.test",{headers:{"x-forwarded-for":"203.0.113.10","user-agent":"A"}});
    expect(publicClientKey(a)).not.toBe(publicClientKey(b));
  });
});
