import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import classnames from "classnames";
import { Loader } from "@/components/ui";
import { CommonLayout } from "@/layouts/commonLayout";
import { TransactionDetails } from "./components/transaction-details/TransactionDetails";
import WalletInfo from "./components/wallet-info/WalletInfo";
import { Transaction, Wallet } from "./types";

export const BlockchainExplorer = () => {
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [USDPrice, setUSDPrice] = useState(0);
  const [wallet, setWallet] = useState<Wallet>({
    address: "",
    final_balance: 0,
    n_tx: 0,
    total_received: 0,
    total_sent: 0,
    total_volume: 0,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    const fetchUSDPrice = async () => {
      const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");
      const usdPrice = response.data.bpi.USD.rate_float;
      const updatedTransactions = transactions.map((transaction) => ({
        ...transaction,
        amountInUSD: (transaction.amount / 1e8) * usdPrice,
      }));
      setUSDPrice(usdPrice);
      setTransactions(updatedTransactions);
    };

    fetchUSDPrice();
  }, [loading]);

  const fetchTransactions = async () => {
    setLoading(true);
    setCurrentPage(1);
    axios
      .get(`https://blockchain.info/rawaddr/${address}`)
      .then((response) => {
        const walletData: Wallet = {
          address: response.data.address,
          final_balance: response.data.final_balance,
          n_tx: response.data.n_tx,
          total_received: response.data.total_received,
          total_sent: response.data.total_sent,
          total_volume: response.data.total_sent + response.data.total_received,
        };
        setWallet(walletData);

        const transactions: Transaction[] = response.data.txs.map((tx: any) => ({
          hash: tx.hash,
          amount: tx.result,
          time: tx.time,
          from: tx.inputs,
          to: tx.out,
        }));
        const wallets: Array<string> = response.data.txs.map((tx: any) => [
          ...tx.inputs.map((item: any) => item.prev_out.addr),
          ...tx.out.map((item: any) => item.addr),
        ]);

        setTransactions(transactions);
        setAddress("");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchTransactions();
  };
  const handleClear = () => {
    setTransactions([]);
  };

  const handleChangeAddress = (address: string) => {
    setAddress(address);
    handleClear();
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(transactions.length / transactionsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <CommonLayout>
      <div className="w-[1240px] grow py-7">
        <div className="layout relative flex w-full animate-scale flex-col items-center">
          {transactions.length > 1 && (
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
          <h1 className="mb-4 text-2xl font-bold" id="title">
            Обозреватель транзакций
          </h1>
          <form onSubmit={handleSubmit} className="mb-4 flex w-full flex-col items-center gap-2">
            <label className="mb-4">Введите адрес кошелька:</label>
            <div className="flex w-full flex-col gap-3 md:flex-row">
              <input
                type="text"
                placeholder="Адрес кошелька"
                value={address}
                onChange={handleAddressChange}
                className="w-full rounded border-2 border-gray-300 p-2"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded bg-blue-500 px-4 py-2 font-bold text-white transition-all duration-200 ease-in-out hover:bg-blue-700"
              >
                Отправить
              </button>
            </div>
          </form>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="flex flex-wrap gap-4">
                {transactions.length > 0 ? (
                  <>
                    <WalletInfo wallet={wallet} />
                    {currentTransactions.map((transaction, index) => (
                      <TransactionDetails
                        classname={`animate-rollout${index + 1}00`}
                        key={transaction.hash}
                        amount={transaction.amount}
                        from={transaction.from}
                        hash={transaction.hash}
                        time={transaction.time}
                        to={transaction.to}
                        amountInUSD={transaction.amountInUSD}
                        address={wallet.address}
                        usdPrice={USDPrice}
                        onChangeAddress={handleChangeAddress}
                      />
                    ))}
                    <nav className="flex w-full justify-center">
                      <ul className="flex items-center">
                        <a
                          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
                          href="#"
                          className="rounded-l-lg border border-gray-300 bg-gray-100 px-3 py-1 text-gray-500 hover:bg-gray-200 hover:text-blue-500"
                        >
                          &laquo;
                        </a>
                        {pageNumbers.map((number) => (
                          <li key={number}>
                            <a
                              onClick={() => paginate(number)}
                              href="#"
                              className={classnames(
                                "border-y border-gray-300 bg-gray-100 px-3 py-1 text-gray-500 hover:bg-gray-200 hover:text-blue-500",
                                number === currentPage && "bg-gray-200 text-blue-500",
                              )}
                            >
                              {number}
                            </a>
                          </li>
                        ))}
                        <a
                          onClick={() =>
                            paginate(
                              currentPage < pageNumbers.length ? currentPage + 1 : currentPage,
                            )
                          }
                          href="#"
                          className="rounded-r-lg border-y border-r border-gray-300 bg-gray-100 px-3 py-1 text-gray-500 hover:bg-gray-200 hover:text-blue-500"
                        >
                          &raquo;
                        </a>
                      </ul>
                    </nav>
                  </>
                ) : (
                  <div className="mt-2 italic">Транзакций не обнаружено</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </CommonLayout>
  );
};
