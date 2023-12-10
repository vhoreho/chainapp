/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, memo, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useDeleteUnsignedTransactionMutation } from "@/api/blockchain";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useModal } from "@/hooks/context";
import { Block } from "@/types";
import { DeleteIcon } from "../..";
import CloseIcon from "../../icons/Close";
import { SignTransaction } from "../sign-transaction/SignTransaction";

type Props = {
  unsignedTransactions: Block[];
};

export const UnsignedTransactionsModal: FunctionComponent<Props> = ({ unsignedTransactions }) => {
  const [state, setState] = useState(unsignedTransactions);
  const { closeModal, openModal } = useModal();
  const deleteTransactionMutation = useDeleteUnsignedTransactionMutation();
  const queryClient = useQueryClient();

  const handleSignTransaction = (transaction: Block) => {
    openModal(<SignTransaction transaction={transaction} onClose={closeModal} />);
  };

  const handleDeleteTransaction = (id: number) => {
    deleteTransactionMutation.mutateAsync(id, {
      onSuccess: (transactions) => {
        queryClient.invalidateQueries({
          queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_UNSIGNED_TRANSACTIONS],
        });
        setState(transactions);
      },
    });
  };

  useEffect(() => {
    if (!state.length) closeModal();
  }, [state]);

  return (
    <div className="max-h-[calc(100vh_-_120px)] max-w-[600px] overflow-y-scroll scrollbar-hide">
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-semibold">Неподписанные блоки</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="h-5 w-5 fill-black/50 hover:fill-black/100" />
        </button>
      </div>
      <p className="border-b pb-3">
        После того, как пользователь инициировал транзакцию, соответствующий блок оказывается в
        хранилище неподписанных транзакций, где ожидает подписи от того же пользователя, который
        создал этот блок. После успешной подписи своей приватной подписью, блок отправляется майнеру
        для выполнения процесса добычи, в ходе которого майнер ищет уникальное число, необходимое
        для создания нового блока в цепи блоков. 🔄🔐
      </p>
      <div className="flex flex-col">
        {state.map((transaction, index) => (
          <div
            key={transaction.hash}
            className="flex flex-col items-center justify-between border-x border-b bg-white px-4 pt-4"
          >
            <div className="flex w-full items-start justify-between">
              <div className="text-lg font-semibold">
                ⛓️ Block #{++index} -{" "}
                {moment(transaction.created_date).format("DD-MM-YYYY h:mm:ss")}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleSignTransaction(transaction)}
                  className="rounded-md bg-blue-500 px-4 py-1 text-white transition-all hover:bg-blue-600 focus:outline-none"
                >
                  🖋️ Подписать
                </button>
                <button
                  className="group rounded-md border-[2px] border-red-500 p-1 transition-all hover:bg-red-500"
                  onClick={() => handleDeleteTransaction(transaction.id)}
                >
                  <DeleteIcon className="h-5 w-5 stroke-red-500 group-hover:stroke-white" />
                </button>
              </div>
            </div>
            <div className="my-4 max-w-md self-start truncate text-gray-600">
              <p className="truncate">👤 Адресат: {JSON.parse(transaction.data).receivedAddress}</p>
              <p>💰 Количество: {JSON.parse(transaction.data).amount}</p>
              <p className="truncate">💬 Сообщение: {JSON.parse(transaction.data).message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
