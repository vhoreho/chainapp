import { USER_ROLE } from "@/types";

export function getRoleName(roleNumber: number): string | undefined {
  const roleEntries = Object.entries(USER_ROLE);
  for (const [roleName, roleId] of roleEntries) {
    if (typeof roleId === "number" && roleId === roleNumber) {
      return roleName;
    }
  }
  return undefined; // Role number not found
}
