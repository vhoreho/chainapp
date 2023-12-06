import { memo } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import moment from "moment";
import { useGetProfileQuery } from "@/api/profile";
import { Spinner } from "@/components/common";
import { ZERO_BLOCK_IDENTIFIER } from "@/constants/vars";
import { useAuthContext } from "@/hooks/context";
import { Block, REQUEST_STATUS, ROLES } from "@/types";
import "react-tooltip/dist/react-tooltip.css";

type Props = {
  chain: Block;
  wallet: string | null;
  isZeroBlock?: boolean;
};

export const Card = memo(function Card({ chain, wallet, isZeroBlock }: Props) {
  const { data: profile, isLoading } = useGetProfileQuery();
  const { created_date, data, prevHash, hash, nonce, id } = chain;

  const parsedData = typeof data === "string" ? JSON.parse(data) : data;

  const handleMine = () => {};

  return (
    <div
      className={classNames(
        "bg-white p-6 w-full rounded-lg shadow-xl overflow-hidden hover:scale-[1.01] transition-all cursor-pointer",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Детали блока</h2>
        {profile?.role === ROLES.MINER && prevHash !== ZERO_BLOCK_IDENTIFIER && (
          <div className="mx-2">|</div>
        )}
        {profile?.role !== ROLES.MINER && prevHash !== ZERO_BLOCK_IDENTIFIER && (
          <div className="mx-2">|</div>
        )}
        <span className="text-gray-500">
          {isZeroBlock
            ? "Дата создания блока"
            : `${moment(created_date).format("MMMM Do YYYY, h:mm:ss a")}`}
        </span>
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
        {parsedData?.amount && (
          <div className="mb-2 flex justify-between">
            <span className="text-gray-500">Сумма:</span>
            <span className="font-semibold text-gray-700">{parsedData.amount}</span>
          </div>
        )}
        {parsedData?.message && (
          <div className="flex justify-between">
            <span className="text-gray-500">Сообщение:</span>
            <span className="font-semibold text-gray-700">{parsedData.message}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <div className="text-sm">
          <span className="text-gray-500">Отправитель:</span> {wallet}
        </div>
        {parsedData?.receivedAddress && (
          <div className="text-sm">
            <span className="text-gray-500">Получатель:</span> {parsedData?.receivedAddress}
          </div>
        )}
      </div>
    </div>
  );
});
