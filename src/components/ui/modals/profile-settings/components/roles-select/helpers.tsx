import { RolesEnum } from "@/types";

export const listOfRoles = () => {
  return Object.values(RolesEnum).map((role) => ({
    title: role,
    value: RolesEnum[role],
  }));
};
