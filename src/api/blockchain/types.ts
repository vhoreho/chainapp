export type CreateBlockReqM = {
  userId: number;
  data: string;
};

export type SignTransactionReqM = {
  privateKey: string;
  id: number;
};
