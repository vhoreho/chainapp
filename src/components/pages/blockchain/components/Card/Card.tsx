import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import moment from "moment";
import { Spinner } from "@/components/common";
import { ZERO_BLOCK_IDENTIFIER } from "@/constants/vars";
import { mineBlockAsync } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { RootState } from "@/store";
import { Block, Data, LOADING_STATUS, RolesEnum } from "@/types";
import "react-tooltip/dist/react-tooltip.css";

type Props = {
  chain: Block;
  onMine: () => void;
  wallet: string | null;
};

export const Card: FC<Props> = ({
  chain: { created_date, data, prevHash, hash, nonce, id },
  wallet,
  onMine,
}) => {
  const [isRerender, setIsRerender] = useState(false);

  const { userData } = useAppSelector((state: RootState) => state.auth);
  const { status } = useAppSelector((state: RootState) => state.blockchain);
  const dispatch = useAppDispatch();

  const parsedData = typeof data === "string" ? (JSON.parse(data) as Data) : data;

  const handleMine = () => {
    dispatch(mineBlockAsync(id));
    setIsRerender(!isRerender);
  };

  useEffect(() => {
    isRerender;
  }, [isRerender]);

  return (
    <div
      className={classNames(
        "bg-white p-6 w-full rounded-lg shadow-xl animate-scale overflow-hidden hover:scale-[1.01] transition-all cursor-pointer",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Детали транзакции</h2>
        {userData.authData.role === RolesEnum.MINER && prevHash !== ZERO_BLOCK_IDENTIFIER && (
          <div className="mx-2">|</div>
        )}
        {userData.authData.role !== RolesEnum.MINER && prevHash !== ZERO_BLOCK_IDENTIFIER && (
          <div className="mx-2">|</div>
        )}
        <span className="text-gray-500">{`${moment(created_date).format(
          "MMMM Do YYYY, h:mm:ss a",
        )}`}</span>
        {userData.authData.role === RolesEnum.MINER &&
          prevHash !== ZERO_BLOCK_IDENTIFIER &&
          nonce === 0 && (
            <button
              onClick={handleMine}
              className=" ml-auto flex min-w-[120px] items-center justify-center rounded-lg bg-green-500 px-4 py-1 font-semibold text-white hover:bg-green-600 focus:outline-none"
            >
              {status === LOADING_STATUS.LOADING ? <Spinner /> : "Майнить блок"}
            </button>
          )}
        {userData.authData.role === RolesEnum.MINER &&
          prevHash !== ZERO_BLOCK_IDENTIFIER &&
          nonce !== 0 && <span className="ml-auto text-green-500">Верифицирован</span>}
        {userData.authData.role === RolesEnum.MINER ||
        prevHash === ZERO_BLOCK_IDENTIFIER ? null : nonce === 0 ? (
          <span className="ml-auto text-red-500">Не верифицирован</span>
        ) : (
          <span className="ml-auto text-green-500">Верифицирован</span>
        )}
      </div>
      <div className="mb-4 border-b border-gray-300 pb-4">
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">Предыдущий хэш транзакции:</span>
          <span className="break-all font-semibold text-gray-700">{prevHash}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">Хэш транзакции:</span>
          <span className="break-all font-semibold text-gray-700">{hash}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">Сумма</span>
          <span className="font-semibold text-gray-700">{parsedData.amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Сообщение</span>
          <span className="font-semibold text-gray-700">{parsedData.message}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm">
          <span className="text-gray-500">Отправитель:</span> {wallet}
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Адресат:</span> {parsedData.receivedAddress}
        </div>
      </div>
    </div>
  );
};
