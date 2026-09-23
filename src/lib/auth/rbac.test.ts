import { describe, expect, it } from "vitest";
import { hasAnyPermission, hasEveryPermission, hasPermission } from "./rbac";

describe("RBAC permission matching", () => {
  it("allows an exact permission", () => {
    expect(hasPermission(["orders.read", "orders.write"], "orders.write")).toBe(true);
  });

  it("denies absent and lookalike permissions", () => {
    expect(hasPermission(["orders.read"], "orders.write")).toBe(false);
    expect(hasPermission(["orders.write.extra"], "orders.write")).toBe(false);
    expect(hasPermission(["orders"], "orders.write")).toBe(false);
  });

  it("allows the explicit global wildcard", () => {
    expect(hasPermission(["*"], "finance.settlements.manage")).toBe(true);
  });

  it("rejects an empty requested permission", () => {
    expect(hasPermission(["*"], "")).toBe(false);
    expect(hasPermission(["*"], "   ")).toBe(false);
  });

  it("supports all-of and any-of checks without treating an empty list as authorization", () => {
    const permissions = ["orders.read", "design.approve"];
    expect(hasEveryPermission(permissions, ["orders.read", "design.approve"])).toBe(true);
    expect(hasEveryPermission(permissions, ["orders.read", "finance.read"])).toBe(false);
    expect(hasAnyPermission(permissions, ["finance.read", "design.approve"])).toBe(true);
    expect(hasAnyPermission(permissions, [])).toBe(false);
    expect(hasEveryPermission(permissions, [])).toBe(false);
  });
});
