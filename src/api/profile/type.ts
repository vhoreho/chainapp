import { USER_ROLE } from "@/types";

export type ProfileResM = {
  id: number;
  role: USER_ROLE;
  username: string;
  email: string;
  publicKey: string | null;
  walletAddress: string | null;
};
