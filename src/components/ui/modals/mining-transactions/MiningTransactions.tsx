import React, { FunctionComponent, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import classNames from "classnames";
import moment from "moment";
import { ProfileResM } from "@/api/profile/type";
import { useModal } from "@/hooks/context";
import { Block } from "@/types";
import CloseIcon from "../../icons/Close";

type Props = {
  transactionsForMining: Block[];
  profile: ProfileResM;
};

export const MiningTransactionModal: FunctionComponent<Props> = ({
  transactionsForMining,
  profile,
}) => {
  const { closeModal } = useModal();
  const [openBlockId, setOpenBlockId] = useState<number | null>(null);

  const toggleBlock = (id: number) => {
    setOpenBlockId((prevId) => (prevId === id ? null : id));
  };

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
          )}
        </div>
      ))}
    </div>
  );
};
