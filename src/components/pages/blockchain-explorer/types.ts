type Input = {
  prev_out: {
    addr: string;
    value: number;
  };
};

export type Out = {
  addr: string;
  value: number;
};

export type Transaction = {
  hash: string;
  amount: number;
  time: number;
  from: Input[];
  to: Out[];
  amountInUSD?: number;
};

export type Wallet = {
  address: string;
  final_balance: number;
  n_tx: number;
  total_received: number;
  total_sent: number;
  total_volume: number;
};

export type TransactionModel = {
  hash: string;
  ver: number;
  vin_sz: number;
  vout_sz: number;
  size: number;
  weight: number;
  fee: number;
  lock_time: number;
  tx_index: number;
  double_spend: boolean;
  time: number;
  block_index: number;
  block_height: number;
  inputs: Input[];
  out: Out[];
  result: number;
  balance: number;
};

export type WalletResponseModel = {
  hash160: string;
  address: string;
  n_tx: number;
  n_unredeemed: number;
  total_received: number;
  total_sent: number;
  final_balance: number;
  txs: TransactionModel[];
};
