import { useTranslation } from "next-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { resetBlockchain, useCreateChainMutation } from "@/api/blockchain";
import { CreateBlockReqM } from "@/api/blockchain/types";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useAuthContext, useGlobalSpinner, useModal } from "@/hooks/context";
import { CommonLayout } from "@/layouts/commonLayout";
import { ROLES } from "@/types";
import { CardsContainer } from "./components/CardsContainer/CardsContainer";
import NewBlockModal from "./components/NewBlockModal/NewBlockModal";
import { BlockFormData } from "./types";

export const Blockchain = () => {
  const { t } = useTranslation();
  const { closeModal, openModal } = useModal();
  const { authData } = useAuthContext();
  const { showSpinner, hideSpinner } = useGlobalSpinner();
  const createChainMutation = useCreateChainMutation();
  const queryClient = useQueryClient();

  const handleAddBlock = async (blockData: BlockFormData) => {
    try {
      const reqModel: CreateBlockReqM = {
        userId: authData?.authData.id!,
        data: JSON.stringify(blockData),
      };
      await createChainMutation.mutateAsync(reqModel, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET] });
        },
      });
    } catch (error) {
    } finally {
      closeModal();
    }
  };

  const handleOpenModal = () => {
    openModal(<NewBlockModal onClose={closeModal} onAddBlock={handleAddBlock} />);
  };

  const handleResetBlockchain = () => {
    showSpinner();
    resetBlockchain(authData?.token!)
      .then((data) => {
        if (data)
          queryClient.invalidateQueries({ queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET] });
      })
      .finally(() => hideSpinner());
  };

  return (
    <CommonLayout>
      <div className="flex grow flex-col py-7">
        <div className="layout flex w-full grow flex-col">
          <div className="flex flex-col items-center justify-between gap-4 pb-4 md:flex-row">
            <h2 className="flex items-center text-2xl font-semibold md:text-3xl">
              {t("pages.blockchain.title")}
            </h2>
            <div className="flex flex-wrap gap-3 md:flex-row md:flex-nowrap">
              {authData?.authData.role !== ROLES.MINER && (
                <button
                  className="w-full whitespace-nowrap rounded-lg bg-blue-500 px-4 py-1 font-semibold text-white hover:bg-blue-600 focus:outline-none"
                  onClick={handleOpenModal}
                >
                  {t("pages.blockchain.create-block")}
                </button>
              )}

              {authData?.authData.role === ROLES.ADMIN ||
                (authData?.authData.role === ROLES.SUPERADMIN && (
                  <button
                    className="w-full whitespace-nowrap rounded-lg bg-red-500 px-4 py-1 font-semibold text-white hover:bg-red-600 focus:outline-none"
                    onClick={handleResetBlockchain}
                  >
                    {t("pages.blockchain.reset-block")}
                  </button>
                ))}
            </div>
          </div>
          <CardsContainer />
        </div>
      </div>
    </CommonLayout>
  );
};
