import React, { FunctionComponent, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import dynamic from "next/dynamic";
import classNames from "classnames";
import moment from "moment";
import { useGetTransactionsForMiningQuery } from "@/api/blockchain";
import { ProfileResM } from "@/api/profile/type";
import { Spinner } from "@/components/common";
import { useModal } from "@/hooks/context";
import { useSecondaryModal } from "@/hooks/context/useSecondaryModal";
import CloseIcon from "../../icons/Close";

type Props = {
  profile: ProfileResM;
};

const DynamicMiningModal = dynamic(
  import("@/components/ui/modals").then((module) => module.MineModal),
);

export const MiningTransactionModal: FunctionComponent<Props> = ({ profile }) => {
  const { closeModal } = useModal();
  const { openModal } = useSecondaryModal();
  const [openBlockId, setOpenBlockId] = useState<number | null>(null);
  const { data: transactionsForMining, isLoading } = useGetTransactionsForMiningQuery(profile.role);

  const toggleBlock = (id: number) => {
    setOpenBlockId((prevId) => (prevId === id ? null : id));
  };

  const handleOpenMineModal = (id: number) => {
    openModal(<DynamicMiningModal id={id} />);
  };

  if (isLoading) {
    return (
      <div className="max-h-[calc(100vh_-_120px)] max-w-[600px] overflow-y-scroll scrollbar-hide">
        <div className="mb-4 flex justify-between">
          <h2 className="text-2xl font-semibold">⛏️ Добро пожаловать в майнинг ⛏️</h2>
          <button onClick={closeModal} className="">
            <CloseIcon className="h-5 w-5 fill-black/50 hover:fill-black/100" />
          </button>
        </div>
        <div className="text-left">
          <p className="mb-4">
            Майнинг - это захватывающий процесс, в ходе которого 🧑‍💻 майнеры соревнуются за решение
            сложных математических задач (Proof of Work) для добавления новых блоков в блокчейн. Это
            обеспечивает безопасность и надежность всей сети.
          </p>
          <p className="mb-4">
            🌐 Благодаря участию майнеров, блокчейн становится децентрализованным хранилищем данных,
            а они сами получают вознаграждение в виде новых криптовалютных монет за свой вклад в
            обеспечение безопасности сети.
          </p>
        </div>
        <div className="flex justify-center">
          <Spinner variant="blue" />
        </div>
      </div>
    );
  }

  if (!transactionsForMining?.length) {
    closeModal();
    return null;
  }

  return (
    <div className="max-h-[calc(100vh_-_120px)] max-w-[600px] overflow-y-scroll scrollbar-hide">
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-semibold">⛏️ Добро пожаловать в майнинг ⛏️</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="h-5 w-5 fill-black/50 hover:fill-black/100" />
        </button>
      </div>
      <div className="text-left">
        <p className="mb-4">
          Майнинг - это захватывающий процесс, в ходе которого 🧑‍💻 майнеры соревнуются за решение
          сложных математических задач (Proof of Work) для добавления новых блоков в блокчейн. Это
          обеспечивает безопасность и надежность всей сети.
        </p>
        <p className="mb-4">
          🌐 Благодаря участию майнеров, блокчейн становится децентрализованным хранилищем данных, а
          они сами получают вознаграждение в виде новых криптовалютных монет за свой вклад в
          обеспечение безопасности сети.
        </p>
      </div>
      {transactionsForMining.map((block) => (
        <div
          key={block.id}
          className={classNames(
            "border p-4 transition-all",
            openBlockId === block.id ? "animate-accordion-open" : "animate-accordion-close",
          )}
        >
          <div
            className="flex cursor-pointer items-center justify-between"
            onClick={() => toggleBlock(block.id)}
          >
            <h2 className="text-lg font-semibold">
              🧱 Block #{block.id} - {moment(block.created_date).format("DD-MM-YYYY h:mm:ss")}
            </h2>
            <div className="p-2">
              {openBlockId === block.id ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>
          {openBlockId === block.id && (
            <>
              <div className="mt-4">
                <p>🔗 Предыдущий хэш: {block.prevHash}</p>
                <div className="my-4 max-w-md self-start truncate text-gray-600">
                  <p>
                    👤 Пользователь: <strong>{block.user?.username}</strong>
                  </p>
                  <p className="truncate">🎁 Адресат: {JSON.parse(block.data).receivedAddress}</p>
                  <p>💰 Количество: {JSON.parse(block.data).amount}</p>
                  <p className="truncate">💬 Сообщение: {JSON.parse(block.data).message}</p>
                </div>
                <p>🔐 Хэш: {block.hash}</p>
              </div>
              <button
                onClick={() => handleOpenMineModal(block.id)}
                className={classNames(
                  "w-full flex justify-center whitespace-nowrap mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",
                )}
              >
                Добыть блок
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
