export type CreateBlockReqM = {
  userId: number;
  data: string;
};

export type SignTransactionReqM = {
  privateKey: string;
  id: number;
};

export type MineBlockReqM = {
  id: number;
  nonce: number;
};
