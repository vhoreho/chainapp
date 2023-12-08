import { ROLES } from "@/types";

export type KeysResM = {
  publicKey: string;
  privateKey: string;
};

export type ChangeRoleReqM = {
  role: ROLES;
};
