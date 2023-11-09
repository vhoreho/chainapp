import { MD5 } from "crypto-js";

export type Data = {
  amount: number | string | null;
  receivedAddress: string;
  message: string;
};

export class Block {
  public id!: number;
  public created_date: Date | string;
  public data: Data | string;
  public prevHash: string;
  public hash: string;
  public nonce: number;

  constructor(timestamp: Date | string, data: Data, prevHash = "") {
    this.created_date = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash(): string {
    return MD5(
      this.prevHash + this.created_date + JSON.stringify(this.data) + this.nonce
    ).toString();
  }

  mineBlock(difficulty: number): void {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

export default Block;
