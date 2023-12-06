import React, { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@/components/ui/icons/Close";
import { GET_CRIME_TYPES_ROUTE } from "@/constants/API";
import { CrimeTypeSelect } from "./components/crimes-select/CrimesSelect";

interface ReportReputationProps {
  onSubmit: (reportData: any) => void;
  closeModal: () => void;
}

export const ReportReputationModal: React.FC<ReportReputationProps> = ({
  onSubmit,
  closeModal,
}) => {
  // const {
  //   userData: { authData },
  // } = useAppSelector((state: RootState) => state.auth);
  const [reportData, setReportData] = useState({
    userId: 1,
    wasInvolvedInIllegalActivity: true,
    crimeType: "Другое",
    crimeDescription: "",
    walletAddress: "",
  });
  const [crimeTypes, setCrimeTypes] = useState<string[]>([]);
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  useEffect(() => {
    reportData.crimeDescription && reportData.walletAddress
      ? setIsFormDisabled(false)
      : setIsFormDisabled(true);
  }, [reportData]);

  useEffect(() => {
    axios
      .get(GET_CRIME_TYPES_ROUTE)
      .then((response) => {
        setCrimeTypes(response.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;
      setReportData((prevData) => ({
        ...prevData,
        [name]: isChecked,
      }));
    } else {
      setReportData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (selectedType: string) => {
    setReportData((prevData) => ({
      ...prevData,
      crimeType: selectedType,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(reportData);
  };

  return (
    <div className="w-[500px] rounded-md bg-white p-4">
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-bold">Отправить отчет о репутации</h2>
        <button onClick={closeModal} className="">
          <CloseIcon className="h-5 w-5 fill-black/50 hover:fill-black/100" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="walletAddress" className="block font-medium">
            Адрес кошелька:
          </label>
          <input
            id="walletAddress"
            name="walletAddress"
            value={reportData.walletAddress}
            onChange={handleInputChange}
            className="sm:text-sm w-full resize-none rounded-md border p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          ></input>
        </div>
        <div className="mb-4">
          <label htmlFor="crimeType" className="block font-medium">
            Тип преступления (Crime Type):
          </label>
          <CrimeTypeSelect
            options={crimeTypes}
            selectedOption={reportData.crimeType}
            onSelect={handleSelectChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="crimeDescription" className="block font-medium">
            Описание преступления:
          </label>
          <textarea
            id="crimeDescription"
            name="crimeDescription"
            value={reportData.crimeDescription}
            onChange={handleInputChange}
            rows={4}
            className="sm:text-sm w-full resize-none rounded-md border p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={isFormDisabled}
            className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none disabled:bg-blue-300"
          >
            Отправить отчет
          </button>
        </div>
      </form>
    </div>
  );
};
