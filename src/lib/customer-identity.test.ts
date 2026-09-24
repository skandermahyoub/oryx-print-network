import { describe,expect,it } from "vitest";
import { normalizeEmail,normalizePhone } from "./customer-identity";

describe("customer identity normalization",()=>{
  it("normalizes Yemen-style and international phone formatting",()=>{
    expect(normalizePhone("+967 772 110 101")).toBe("967772110101");
    expect(normalizePhone("00967-772-110-101")).toBe("967772110101");
  });

  it("normalizes email casing and whitespace",()=>{
    expect(normalizeEmail("  SALES@Example.COM ")).toBe("sales@example.com");
  });
});
