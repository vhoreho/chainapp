import React, { useEffect, useState } from "react";
import * as bitcoin from "bitcoinjs-lib";
import classNames from "classnames";
import { ProfileResM } from "@/api/profile/type";
import { Spinner } from "@/components/common";
import { RandomIcon } from "@/components/ui";
import { keyPair } from "@/utils/key-pair";
import { NewBlockFormData } from "./types";

interface NewBlockModalProps {
  onClose: () => void;
  onAddBlock: (formData: NewBlockFormData) => void;
  profile: ProfileResM;
}

export const NewBlockModal: React.FC<NewBlockModalProps> = ({ onClose, onAddBlock }) => {
  const [formState, setFormState] = useState<NewBlockFormData>({
    amount: null,
    message: "",
    receivedAddress: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormState((prevData: NewBlockFormData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    setIsLoading(true);
    e.preventDefault();
    onAddBlock(formState);
  };

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  const generateAddress = () => {
    setFormState((prev) => ({
      ...prev,
      receivedAddress:
        bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address?.toString() || "",
    }));
  };

  useEffect(() => {
    const { amount, message, receivedAddress } = formState;
    if (amount && message && receivedAddress) {
      setIsDisabled(false);
    }
  }, [formState]);

  return (
    <div className=" w-96">
      <h2 className="mb-2 text-lg font-medium">Создать новый блок</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="relative mb-4">
          <input
            type="text"
            id="receivedAddress"
            name="receivedAddress"
            value={formState.receivedAddress}
            onChange={handleFormChange}
            className="sm:text-sm w-full rounded-md border border-gray-300 px-2 py-1 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            required
            placeholder="Введите адрес получателя"
          />
          <RandomIcon
            onClick={generateAddress}
            className="absolute right-2 top-1/2 w-6 -translate-y-1/2 cursor-pointer bg-white fill-gray-400 pl-2 transition-all hover:fill-black"
          />
        </div>{" "}
        <div className="mb-4">
          <input
            type="number"
            min="0.00000"
            max="9999999999.0000"
            step="0.000001"
            id="amount"
            name="amount"
            value={formState.amount ?? ""}
            onChange={handleFormChange}
            className="sm:text-sm w-full rounded-md border border-gray-300 px-2 py-1 shadow-sm placeholder:text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            required
            placeholder="Введите количество токенов"
          />
        </div>
        <div className="mb-4">
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formState.message ?? ""}
            onChange={handleFormChange}
            className="sm:text-sm w-full resize-none rounded-md border border-gray-300 px-2 py-1 shadow-sm placeholder:text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            required
            placeholder="Введите сообщение"
          />
        </div>
        <div className="mt-4 grid grid-cols-2">
          <button
            type="submit"
            disabled={Boolean(formState.amount) && !formState.message && !formState.receivedAddress}
            className={classNames(
              "flex items-center justify-center whitespace-nowrap rounded-lg  px-4 py-1 font-semibold text-white ",
              "enabled:bg-blue-500 enabled:hover:bg-blue-600 enabled:focus:outline-none enabled:cursor-pointer",
              "disabled:bg-blue-400",
            )}
          >
            {isLoading ? <Spinner variant="white" size="xs" /> : <>Создать блок</>}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-3 flex items-center justify-center whitespace-nowrap rounded-lg bg-red-500 px-4 py-1 font-semibold text-white hover:bg-red-700 focus:outline-none"
          >
            Закрыть
          </button>
        </div>
      </form>
    </div>
  );
};
