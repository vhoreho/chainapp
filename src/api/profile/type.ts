import { ROLES } from "@/types";

export type ProfileResM = {
  id: number;
  role: ROLES;
  username: string;
  email: string;
};
