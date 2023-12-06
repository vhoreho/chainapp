import { FC } from "react";
import { Wallet } from "../../types";

type Props = {
  wallet: Wallet;
};

const WalletInfo: FC<Props> = ({ wallet }) => {
  return (
    <div className="mx-auto rounded-lg border bg-platinum-500 p-4">
      <div className="mb-2 text-lg font-bold">Адрес кошелька:</div>
      <div className="mb-4">{wallet.address}</div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <div className="mb-2 text-lg font-bold">Всего получено:</div>
          <div className="text-2xl font-bold">{wallet.total_received / 100000000} BTC</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="mb-2 text-lg font-bold">Всего отправлено:</div>
          <div className="text-2xl font-bold">{wallet.total_sent / 100000000} BTC</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="mb-2 text-lg font-bold">Общий баланс:</div>
          <div className="text-2xl font-bold">{wallet.final_balance / 100000000} BTC</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="mb-2 text-lg font-bold">Количество транзакций:</div>
          <div className="text-2xl font-bold">{wallet.n_tx}</div>
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;
