import { useCallback, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { InfoIcon } from "@/components/ui";
import { addBlockAsync, clearBlockChain, getBlockchain, resetChain } from "@/features";
import { useModal } from "@/hooks/context";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { CommonLayout } from "@/layouts/commonLayout";
import { RootState } from "@/store";
import { Block, RolesEnum } from "@/types";
import { CardsContainer } from "./components/CardsContainer/CardsContainer";
import NewBlockModal from "./components/NewBlockModal/NewBlockModal";
import { BlockFormData } from "./types";

export const Blockchain = () => {
  const { closeModal, openModal } = useModal();
  const { userData } = useAppSelector((state: RootState) => state.auth);
  const chain = useAppSelector((state) => state.blockchain.chain);

  const dispatch = useAppDispatch();

  const handleAddBlock = useCallback(
    (blockData: BlockFormData) => {
      const newBlock: Block = new Block(new Date(), blockData, chain[chain.length - 1].hash);

      dispatch(addBlockAsync(newBlock));
    },
    [chain, dispatch],
  );

  const handleOpenModal = () => {
    openModal(<NewBlockModal onClose={closeModal} onAddBlock={handleAddBlock} />);
  };

  return (
    <CommonLayout>
      <div className="grow py-7">
        <div className="layout w-full">
          <div className="flex flex-col items-center justify-between gap-4 pb-4 md:flex-row">
            <h2 className="flex items-center text-2xl font-semibold md:text-3xl">
              Проводник блокчейна
              <InfoIcon
                className="ml-2 block w-5 cursor-pointer fill-transparent stroke-gray-500 outline-none hover:stroke-black"
                data-tooltip-id="explorer"
              />
              <Tooltip
                id="explorer"
                style={{
                  width: 340,
                  fontSize: 13,
                  fontFamily: "Nunito",
                  borderRadius: 10,
                  lineHeight: 1.5,
                }}
                place="bottom"
                className="animate-scale"
                content="Проводник блокчейна - это веб-инструмент, позволяющий пользователям просматривать содержимое блокчейна, который представляет собой децентрализованную цифровую бухгалтерскую книгу, записывающую транзакции безопасным и прозрачным образом. Он предоставляет пользователям интерфейс для взаимодействия с блокчейном и просмотра такой информации, как история транзакций, балансы и другие данные, относящиеся к сети блокчейна."
              />
            </h2>
            <div className="flex flex-wrap gap-3 md:flex-row md:flex-nowrap">
              {userData.authData.role !== RolesEnum.MINER && (
                <button
                  className="w-full whitespace-nowrap rounded-lg bg-blue-500 px-4 py-1 font-semibold text-white hover:bg-blue-600 focus:outline-none"
                  onClick={handleOpenModal}
                >
                  Создать блок
                </button>
              )}

              {userData.authData.role === RolesEnum.ADMIN ||
                (userData.authData.role === RolesEnum.SUPERADMIN && (
                  <button
                    className="w-full whitespace-nowrap rounded-lg bg-red-500 px-4 py-1 font-semibold text-white hover:bg-red-600 focus:outline-none"
                    onClick={() => dispatch(clearBlockChain())}
                  >
                    Сбросить блоки
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
