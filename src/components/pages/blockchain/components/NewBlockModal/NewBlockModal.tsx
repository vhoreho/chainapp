import React, { useState } from "react";
import { enc, SHA256 } from "crypto-js";
import { Spinner } from "@/components/common";
import { RandomIcon } from "@/components/ui";
import { NewBlockFormData } from "./types";

interface NewBlockModalProps {
  onClose: () => void;
  onAddBlock: (formData: NewBlockFormData) => void;
}

const NewBlockModal: React.FC<NewBlockModalProps> = ({ onClose, onAddBlock }) => {
  const [formData, setFormData] = useState<NewBlockFormData>({
    amount: null,
    message: "",
    receivedAddress: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData: NewBlockFormData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onAddBlock(formData);
    onClose();
  };

  const generateAddress = () => {
    setFormData((prev) => ({
      ...prev,
      receivedAddress: SHA256(new Date().getTime().toString()).toString(enc.Base64),
    }));
  };

  return (
    <div className=" w-96">
      <h2 className="mb-2 text-lg font-medium">Создать новый блок</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="relative mb-4">
          <input
            type="text"
            id="receivedAddress"
            name="receivedAddress"
            value={formData.receivedAddress}
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
            value={formData.amount ?? ""}
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
            value={formData.message ?? ""}
            onChange={handleFormChange}
            className="sm:text-sm w-full resize-none rounded-md border border-gray-300 px-2 py-1 shadow-sm placeholder:text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            required
            placeholder="Введите сообщение"
          />
        </div>
        <div className="mt-4 grid grid-cols-2">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none"
          >
            {isLoading ? <Spinner variant="white" /> : <>Создать блок</>}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-3 inline-flex justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-700 focus:outline-none"
          >
            Закрыть
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBlockModal;
