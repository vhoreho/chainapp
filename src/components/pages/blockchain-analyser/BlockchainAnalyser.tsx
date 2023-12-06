import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import { v4 } from "uuid";
import { CommonLayout } from "@/layouts/commonLayout";
import { mergeObjects } from "@/utils/helpers";
import { reduce } from "../blockchain-explorer/helpers";
import { WalletResponseModel } from "../blockchain-explorer/types";
import WalletInfo from "./components/wallet-info/WalletInfo";

export const BlockchainAnalyser = () => {
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState<
    Record<string, { totalValue: number; count: number }>[]
  >([]);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const fetchTransactions = async () => {
    const {
      data: { address: walletAddress, txs },
    } = await axios.get<WalletResponseModel>(`https://blockchain.info/rawaddr/${address}`);

    const outputWallets = txs.map((t) => reduce(t.out));

    setTransactions(mergeObjects(outputWallets));
    setAddress("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchTransactions();
    console.log(transactions);
  };

  const handleClear = () => {
    setTransactions([]);
  };

  const handleChangeAddress = (address: string) => {
    setAddress(address);
    handleClear();
  };

  return (
    <CommonLayout>
      <div className="max-w-[1240px] grow py-7">
        {false && (
          <div className="absolute right-8 flex gap-4">
            <button className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 focus:outline-none">
              <CSVLink data={transactions}>Экспорт CSV</CSVLink>
            </button>
            <button
              onClick={handleClear}
              className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 focus:outline-none"
            >
              Очистить
            </button>
          </div>
        )}
        <div className="layout relative flex w-full animate-scale flex-col items-center">
          <h1 className="mb-4 text-2xl font-bold" id="title">
            Анализ транзакций
          </h1>
          <form onSubmit={handleSubmit} className="mb-4 flex w-full flex-col items-center gap-2">
            <div className="flex w-full flex-col justify-center gap-3 md:flex-row">
              <input
                type="text"
                placeholder="Введите адрес кошелька"
                value={address}
                onChange={handleAddressChange}
                className="w-[600px] rounded-md border-2 border-gray-300 p-2 focus:outline-blue-600"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded bg-blue-500 px-4 py-2 font-bold text-white transition-all duration-200 ease-in-out hover:bg-blue-700"
              >
                Отправить
              </button>
            </div>
          </form>
          {transactions.length > 0 ? (
            transactions.map((trans) => <WalletInfo key={v4()} walletData={trans} />)
          ) : (
            <span>Транзакций не обнаружено</span>
          )}
        </div>
      </div>
    </CommonLayout>
  );
};
