import React, { FunctionComponent, useState } from "react";
import ClipboardJS from "clipboard";
import { useGenerateKeysMutation } from "@/api/users";
import { Spinner } from "@/components/common";
import { CopySvg } from "../..";
import CloseIcon from "../../icons/Close";

type Props = {
  closeModal: () => void;
};

export const GenerateKeysModal: FunctionComponent<Props> = ({ closeModal }) => {
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const generateKeysMutation = useGenerateKeysMutation();

  const handleGenerateKeys = () => {
    setIsLoading(true);
    generateKeysMutation.mutateAsync(undefined, {
      onSuccess: (keys) => {
        setPrivateKey(keys.privateKey);
      },
      onError: (error) => {
        console.log("🚀 ~ file: GenerateKeys.tsx:21 ~ handleGenerateKeys ~ error:", error);
      },
      onSettled: () => setIsLoading(false),
    });
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(privateKey);
  };

  return (
    <div className="max-w-[600px]">
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-semibold">Генерация приватного ключа</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="h-5 w-5 fill-black/50 hover:fill-black/100" />
        </button>
      </div>
      <p className="mb-8">
        Сохранение приватного ключа крайне важно для обеспечения безопасности ваших криптовалютных
        активов. Этот уникальный цифровой код служит для подписи транзакций и подтверждения вашего
        владения. Сохраняйте приватный ключ у себя, чтобы обеспечить полный контроль и избежать
        несанкционированного доступа. 🌐💼 Важно отметить, что восстановление утерянного приватного
        ключа часто невозможно. Поэтому сохраняйте его в надежном месте и не делитесь с ним ни с
        кем. Это гарантирует, что только вы будете иметь доступ к вашим криптовалютным средствам.
        🔐💰
      </p>
      <div className="mb-6 flex w-full shadow-md">
        <div className="relative flex w-full items-center rounded-s-md border border-gray-200 px-3">
          {privateKey ? (
            <span className="max-w-[425px] truncate text-black">{privateKey}</span>
          ) : (
            <span className="max-w-[425px] truncate text-gray-500">
              Нажмите кнопку сгенерировать
            </span>
          )}
          <CopySvg
            onClick={handleCopyToClipboard}
            className="absolute right-2 h-4 w-4 cursor-pointer fill-slate-600 hover:fill-cornflower-500"
          />
        </div>
        <button
          onClick={handleGenerateKeys}
          className="inline-flex min-w-[135px] justify-center self-end rounded-e-md border border-transparent bg-blue-500 px-4 py-[10px] text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none"
        >
          {isLoading ? <Spinner size="xs" /> : <span>Сгенерировать</span>}
        </button>
      </div>
    </div>
  );
};
