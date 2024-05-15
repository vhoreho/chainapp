import { UserRole } from "@/types";

export type KeysResM = {
  wallet: string;
  publicKey: string;
  privateKey: string;
};

export type ChangeRoleReqM = {
  role: UserRole;
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
