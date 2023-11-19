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
