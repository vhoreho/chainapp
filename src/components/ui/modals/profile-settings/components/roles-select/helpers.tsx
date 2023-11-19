import { ROLES } from "@/types";

export const listOfRoles = () => {
  return Object.values(ROLES).map((role) => ({
    title: role,
    value: ROLES[role],
  }));
};
