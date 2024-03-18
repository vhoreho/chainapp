import { Wallet } from "@/api/users";
import { UserResM } from ".";

export class Block {
  public created_date!: string;
  public data!: string;
  public prevHash!: string;
  public hash!: string;
  public nonce!: number;
  public id!: number;
  public user?: UserResM | null;

  constructor(init?: Block) {
    Object.assign(this, init);
  }
}

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
  coin: string;
  from: string;
  to: string;
  amount: string;
};

export type UnsignedTransaction = {
  id: number;
  hash: string;
  created_date: string;
  nonce: number;
  coin: string;
  amount: number;
  wallet: Wallet;
};
