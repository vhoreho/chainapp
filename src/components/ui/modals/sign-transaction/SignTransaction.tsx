import React, { FunctionComponent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames";
import moment from "moment";
import { useSignTransactionMutation } from "@/api/blockchain";
import { Spinner } from "@/components/common";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { Block } from "@/types";
import CloseIcon from "../../icons/Close";

type Props = {
  transaction: Block;
  onClose: () => void;
};

export const SignTransaction: FunctionComponent<Props> = ({
  transaction: { id, created_date, data, hash },
  onClose,
}) => {
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const signTransactionMutation = useSignTransactionMutation();
  const queryClient = useQueryClient();

  const handleSignButtonClick = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signTransactionMutation.mutateAsync({ privateKey, id });

      queryClient.invalidateQueries({
        queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_UNSIGNED_TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_CREATED_TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_SIGNED_TRANSACTIONS],
      });
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div key={hash} className="flex flex-col items-center justify-between rounded bg-white p-2">
      <div className="flex w-full items-start justify-between">
        <div className="text-lg font-semibold">
          Block #{id} - {moment(created_date).format("DD-MM-YYYY h:mm:ss")}
        </div>
        <button onClick={onClose}>
          <CloseIcon className="h-5 w-5 fill-black/50 hover:fill-black/100" />
        </button>
      </div>
      <div className="my-4 max-w-md self-start truncate text-gray-600">
        <p className="truncate">Адресат: {JSON.parse(data).receivedAddress}</p>
        <p>Количество: {JSON.parse(data).amount}</p>
        <p className="truncate">Сообщение: {JSON.parse(data).message}</p>
      </div>
      <div className="flex w-full flex-col items-center justify-between">
        <input
          type="text"
          placeholder="Введите приватный ключ"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          className="w-full rounded-t-md border p-2 outline-none"
        />
        <button
          onClick={handleSignButtonClick}
          disabled={!privateKey.length}
          className={classNames(
            "w-full flex justify-center whitespace-nowrap rounded-b-md bg-blue-500 px-4 py-2 text-white disabled:bg-blue-300",
            privateKey.length && "hover:bg-blue-600 focus:outline-none",
          )}
        >
          {isLoading ? <Spinner size="xs" /> : "Подписать транзакцию"}
        </button>
      </div>
      {error && <span className="mt-3 text-red-500">{error}</span>}
    </div>
  );
};
