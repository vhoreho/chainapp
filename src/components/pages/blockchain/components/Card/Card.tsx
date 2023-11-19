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
  const { t } = useTranslation();
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
        <h2 className="text-lg font-bold">{t("pages.blockchain.card.title")}</h2>
        {profile?.role === ROLES.MINER && prevHash !== ZERO_BLOCK_IDENTIFIER && (
          <div className="mx-2">|</div>
        )}
        {profile?.role !== ROLES.MINER && prevHash !== ZERO_BLOCK_IDENTIFIER && (
          <div className="mx-2">|</div>
        )}
        <span className="text-gray-500">
          {isZeroBlock
            ? t("pages.blockchain.card.created")
            : `${moment(created_date).format("MMMM Do YYYY, h:mm:ss a")}`}
        </span>
        {/* {profile?.role === ROLES.MINER && prevHash !== ZERO_BLOCK_IDENTIFIER && nonce === 0 && (
          <button
            onClick={handleMine}
            className=" ml-auto flex min-w-[120px] items-center justify-center rounded-lg bg-green-500 px-4 py-1 font-semibold text-white hover:bg-green-600 focus:outline-none"
          >
            {status === REQUEST_STATUS.LOADING ? (
              <Spinner />
            ) : (
              t("pages.blockchain.card.mine-block")
            )}
          </button>
        )} */}
        {profile?.role === ROLES.MINER && prevHash !== ZERO_BLOCK_IDENTIFIER && nonce !== 0 && (
          <span className="ml-auto text-green-500">{t("pages.blockchain.card.verified")}</span>
        )}
        {profile?.role === ROLES.MINER || prevHash === ZERO_BLOCK_IDENTIFIER ? null : nonce ===
          0 ? (
          <span className="ml-auto text-red-500">{t("pages.blockchain.card.not-verified")}</span>
        ) : (
          <span className="ml-auto text-green-500">{t("pages.blockchain.card.verified")}</span>
        )}
      </div>
      <div className="mb-4 border-b border-gray-300 pb-4">
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">{t("pages.blockchain.card.prev-hash")}</span>
          <span className="break-all font-semibold text-gray-700">{prevHash}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-500">{t("pages.blockchain.card.current-hash")}</span>
          <span className="break-all font-semibold text-gray-700">{hash}</span>
        </div>
        {parsedData?.amount && (
          <div className="mb-2 flex justify-between">
            <span className="text-gray-500">{t("pages.blockchain.card.amount")}</span>
            <span className="font-semibold text-gray-700">{parsedData.amount}</span>
          </div>
        )}
        {parsedData?.message && (
          <div className="flex justify-between">
            <span className="text-gray-500">{t("pages.blockchain.card.message")}</span>
            <span className="font-semibold text-gray-700">{parsedData.message}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <div className="text-sm">
          <span className="text-gray-500">{t("pages.blockchain.card.sender")}:</span> {wallet}
        </div>
        {parsedData?.receivedAddress && (
          <div className="text-sm">
            <span className="text-gray-500">{t("pages.blockchain.card.recipient")}:</span>{" "}
            {parsedData?.receivedAddress}
          </div>
        )}
      </div>
    </div>
  );
});
