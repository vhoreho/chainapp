import React, { FunctionComponent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useQueryClient } from "@tanstack/react-query";
import {
  CreateBlockReqM,
  useCreateChainMutation,
  useGetTransactionsForMiningQuery,
} from "@/api/blockchain";
import { ProfileResM } from "@/api/profile/type";
import { UnsignedTransactionsModal } from "@/components/ui/modals";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useModal } from "@/hooks/context";
import { Block, BlockFormData, USER_ROLE } from "@/types";
import { NotificationModal } from "../notification-modal/NotificationModal";

type Props = {
  profile: ProfileResM;
  unsignedTransactions: Block[];
  signedTransactions: Block[];
};

const DynamicNewBlockModal = dynamic(() =>
  import("../new-block-modal/NewBlockModal").then((module) => module.NewBlockModal),
);

const DynamicSignedTransactionModal = dynamic(() =>
  import("@/components/ui/modals").then((module) => module.SignedTransactionsModal),
);

const DynamicMiningModal = dynamic(() =>
  import("@/components/ui/modals").then((module) => module.MiningTransactionModal),
);

export const BlockchainHeader: FunctionComponent<Props> = ({
  profile,
  unsignedTransactions,
  signedTransactions,
}) => {
  const { t } = useTranslation();
  const { closeModal, openModal } = useModal();
  const [isGenerated, setIsGenerated] = useState(false);
  const createChainMutation = useCreateChainMutation();
  const { data: transactionsForMining, isLoading } = useGetTransactionsForMiningQuery(profile.role);
  const queryClient = useQueryClient();

  const handleAddBlock = async (blockData: BlockFormData) => {
    try {
      const reqModel: CreateBlockReqM = {
        userId: profile?.id!,
        data: JSON.stringify(blockData),
      };
      await createChainMutation.mutateAsync(reqModel, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_UNSIGNED_TRANSACTIONS],
          });
        },
      });
    } catch (error) {
    } finally {
      closeModal();
    }
  };

  const handleOpenNewBlockModal = () => {
    openModal(
      <DynamicNewBlockModal onClose={closeModal} onAddBlock={handleAddBlock} profile={profile!} />,
    );
  };

  const handleOpenUnsignedBlockModal = () => {
    openModal(<UnsignedTransactionsModal unsignedTransactions={unsignedTransactions} />);
  };

  const handleOpenSignedBlockModal = () => {
    openModal(<DynamicSignedTransactionModal signedTransactions={signedTransactions} />);
  };

  const handleOpenMiningTransactionsModal = () => {
    if (transactionsForMining?.length) openModal(<DynamicMiningModal profile={profile} />);
  };

  useEffect(() => {
    if (!profile.publicKey && profile.role === USER_ROLE.USER) {
      openModal(
        <NotificationModal onClose={closeModal} profile={profile} onGenerate={setIsGenerated} />,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    console.log("🚀 ~ file: BlockchainHeader.tsx:99 ~ isGenerated:", isGenerated);
  }, [isGenerated]);

  return (
    <div className="flex flex-col items-center justify-between gap-4 pb-4 md:flex-row">
      <h2 className="flex items-center text-2xl font-semibold md:text-3xl">
        {t("pages.blockchain.title")}
      </h2>
      <div className="flex flex-wrap gap-3 md:flex-row md:flex-nowrap">
        {unsignedTransactions?.length && profile.role === USER_ROLE.USER ? (
          <button
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-cornflower-500/90 px-4 py-1 font-semibold text-white hover:bg-cornflower-500/100 focus:outline-none"
            onClick={handleOpenUnsignedBlockModal}
          >
            {t("pages.blockchain.unsigned-block")}
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-black">
              {unsignedTransactions.length}
            </span>
          </button>
        ) : null}
        {signedTransactions?.length && profile.role === USER_ROLE.USER ? (
          <button
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-green-300 px-4 py-1 font-semibold text-white hover:bg-green-400 focus:outline-none"
            onClick={handleOpenSignedBlockModal}
          >
            {t("pages.blockchain.block-in-progress")}
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-black">
              {signedTransactions.length}
            </span>
          </button>
        ) : null}
        {isLoading ? null : transactionsForMining?.length && profile.role === USER_ROLE.MINER ? (
          <button
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-green-300 px-4 py-1 font-semibold text-white hover:bg-green-400 focus:outline-none"
            onClick={handleOpenMiningTransactionsModal}
          >
            Транзакции для майнинга
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-black">
              {transactionsForMining.length}
            </span>
          </button>
        ) : null}
        {profile?.role === USER_ROLE.USER && profile.publicKey && (
          <button
            className="w-full whitespace-nowrap rounded-lg bg-blue-500 px-4 py-1 font-semibold text-white hover:bg-blue-600 focus:outline-none"
            onClick={handleOpenNewBlockModal}
          >
            {t("pages.blockchain.create-block")}
          </button>
        )}
      </div>
    </div>
  );
};
