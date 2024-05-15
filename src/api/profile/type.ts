import { UserRole } from "@/types";

export type ProfileResM = {
  id: number;
  role: UserRole;
  username: string;
  email: string;
  publicKey: string | null;
  walletAddress: string | null;
};
