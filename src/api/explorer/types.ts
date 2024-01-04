export type WalletResM = {
  hash160: string;
  address: string;
  n_tx: number;
  n_unredeemed: number;
  total_received: number;
  total_sent: number;
  final_balance: number;
  txs: TransactionResM[];
};

export type TransactionResM = {
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
  inputs: InputResM[];
  out: OutResM[];
  result: number;
  balance: number;
};

type InputResM = {
  prev_out: {
    addr: string;
    value: number;
  };
};

export type OutResM = {
  addr: string;
  value: number;
};
