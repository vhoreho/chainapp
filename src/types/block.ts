export class Block {
  public created_date!: string;
  public data!: string;
  public prevHash!: string;
  public hash!: string;
  public nonce!: number;
  public id!: number;

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
  nonce: number;
};
