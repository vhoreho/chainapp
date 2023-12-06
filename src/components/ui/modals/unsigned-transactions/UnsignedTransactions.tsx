import React, { FunctionComponent } from "react";
import moment from "moment";
import { useModal } from "@/hooks/context";
import { Block } from "@/types";
import CloseIcon from "../../icons/Close";
import { SignTransaction } from "../sign-transaction/SignTransaction";

type Props = {
  unsignedTransactions: Block[];
};

export const UnsignedTransactionsModal: FunctionComponent<Props> = ({ unsignedTransactions }) => {
  const { closeModal, openModal } = useModal();

  const handleSignTransaction = (transaction: Block) => {
    openModal(<SignTransaction transaction={transaction} onClose={closeModal} />);
  };

  return (
    <div className="max-h-[calc(100vh_-_120px)] max-w-[600px] overflow-y-scroll scrollbar-hide">
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-semibold">Неподписанные блоки</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="h-5 w-5 fill-black/50 hover:fill-black/100" />
        </button>
      </div>
      <p>
        После того, как пользователь инициировал транзакцию, соответствующий блок оказывается в
        хранилище неподписанных транзакций, где ожидает подписи от того же пользователя, который
        создал этот блок. После успешной подписи своей приватной подписью, блок отправляется майнеру
        для выполнения процесса добычи, в ходе которого майнер ищет уникальное число, необходимое
        для создания нового блока в цепи блоков. 🔄🔐
      </p>
      {unsignedTransactions.map((transaction) => (
        <div
          key={transaction.hash}
          className="my-4 flex flex-col items-center justify-between rounded border bg-white p-4 shadow-md"
        >
          <div className="flex w-full items-start justify-between">
            <div className="text-lg font-semibold">
              Block #{transaction.id} -{" "}
              {moment(transaction.created_date).format("DD-MM-YYYY h:mm:ss")}
            </div>
            <button
              onClick={() => handleSignTransaction(transaction)}
              className="rounded-md bg-blue-500 px-4 py-1 text-white hover:bg-blue-600 focus:outline-none"
            >
              Подписать
            </button>
          </div>
          <div className="my-4 max-w-md self-start truncate text-gray-600">
            <p className="truncate">Адресат: {JSON.parse(transaction.data).receivedAddress}</p>
            <p>Количество: {JSON.parse(transaction.data).amount}</p>
            <p className="truncate">Сообщение: {JSON.parse(transaction.data).message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
