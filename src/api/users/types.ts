import { USER_ROLE } from "@/types";

export type KeysResM = {
  publicKey: string;
  privateKey: string;
};

export type ChangeRoleReqM = {
  role: USER_ROLE;
};
