import { USER_ROLE } from "@/types";

export type KeysResM = {
  wallet: string;
  publicKey: string;
  privateKey: string;
};

export type ChangeRoleReqM = {
  role: USER_ROLE;
};

export type CreateUserReqM = {
  username: string;
  password: string;
  role: number;
};

export type User = {
  id: number;
  username: string;
  role: number;
};

export type Wallet = {
  id: number;
  address: string;
  user: User;
};
