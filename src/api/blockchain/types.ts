export type CreateBlockReqM = {
  amount: number;
  message: string;
  coin: string;
  wallet: string;
};

export type SignTransactionReqM = {
  privateKey: string;
  id: number;
};

export type MineBlockReqM = {
  id: number;
  nonce: number;
};
