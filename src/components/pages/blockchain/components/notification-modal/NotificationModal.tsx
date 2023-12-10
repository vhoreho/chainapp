import React, { FC } from "react";
import { ProfileResM } from "@/api/profile/type";
import CloseIcon from "@/components/ui/icons/Close";
import { GenerateKeysModal } from "@/components/ui/modals";
import { useModal } from "@/hooks/context";

type NewBlockModalProps = {
  onClose: () => void;
  profile: ProfileResM;
  onGenerate: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NotificationModal: FC<NewBlockModalProps> = ({ onClose, profile, onGenerate }) => {
  const { openModal, closeModal } = useModal();

  return (
    <div className="flex max-w-[500px] flex-col gap-4">
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-semibold">Подписание блока</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="h-5 w-5 fill-black/50 hover:fill-black/100" />
        </button>
      </div>
      <strong>Добро пожаловать в мир блокчейн!🌐✨</strong>
      <p>
        Прежде чем приступить к созданию блоков, не забудьте сгенерировать свой приватный 🔐 и
        публичный 🔑 ключи.
      </p>
      <p>
        <strong>Приватный ключ</strong> обеспечивает безопасность и конфиденциальность, позволяя вам
        подписывать транзакции и подтверждать свою уникальность в сети.
      </p>
      <p>
        <strong>Публичный ключ</strong>, в свою очередь, служит для генерации адреса вашего кошелька
        и позволяет другим пользователям отправлять вам токены.
      </p>
      <p className="mb-6">
        Эти ключи — ключевые инструменты в вашем арсенале для безопасного и успешного участия в
        децентрализованном мире криптовалют! 🚀💰
      </p>
      <button
        onClick={() =>
          openModal(<GenerateKeysModal closeModal={closeModal} onGenerate={onGenerate} />)
        }
        className="inline-flex justify-center self-end rounded-md border border-transparent bg-blue-500 px-4 py-[10px] text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none"
      >
        Сгенерировать
      </button>
    </div>
  );
};
