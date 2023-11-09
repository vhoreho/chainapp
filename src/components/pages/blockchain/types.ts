import { Block } from "@/types";

export type BlockFormData = {
  amount: number | null;
  receivedAddress: string;
  message: string;
};

export type BlockData = Block & {
  index: number;
  timestamp: Date;
  data: BlockFormData;
  prevHash: string;
  hash: string;
  nonce: number;
};
