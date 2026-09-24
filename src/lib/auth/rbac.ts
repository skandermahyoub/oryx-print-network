export type PermissionSet = readonly string[];

/**
 * Permission matching is deliberately exact. A user may either hold the
 * requested permission or the explicit global wildcard. This prevents
 * accidental prefix/substring privilege escalation (for example,
 * `orders.read` must never satisfy `orders.write`).
 */
export function hasPermission(permissions: PermissionSet, requested: string): boolean {
  if (!requested.trim()) return false;
  return permissions.includes("*") || permissions.includes(requested);
}

export function hasEveryPermission(permissions: PermissionSet, requested: readonly string[]): boolean {
  return requested.length > 0 && requested.every((permission) => hasPermission(permissions, permission));
}

export function hasAnyPermission(permissions: PermissionSet, requested: readonly string[]): boolean {
  return requested.length > 0 && requested.some((permission) => hasPermission(permissions, permission));
}
