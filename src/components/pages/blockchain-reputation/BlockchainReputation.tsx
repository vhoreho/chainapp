import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { CRIME_REPORT_ROUTE, GET_CRIME_TYPES_ROUTE } from "@/constants/API";
import { useModal } from "@/hooks/context";
import { CommonLayout } from "@/layouts/commonLayout";
import { CrimeTypeSelect } from "./components/report-reputation-modal/components/crimes-select/CrimesSelect";
import { ReportReputationModal } from "./components/report-reputation-modal/ReportReputationModal";

type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
};

interface Report {
  id: number;
  reportDate: string;
  user: User;
  crimeType: string;
  crimeDescription: string;
  walletAddress: string;
}

type FilterOptions = {
  fromDate: string;
  toDate: string;
  crimeType: string;
  walletAddress: string;
};

export const BlockchainReputation = () => {
  const { openModal, closeModal } = useModal();
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    fromDate: "",
    toDate: "",
    crimeType: "Другое",
    walletAddress: "",
  });
  const [handleRequest, setHandleRequest] = useState(false);
  const [crimeTypes, setCrimeTypes] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(GET_CRIME_TYPES_ROUTE)
      .then((response) => {
        setCrimeTypes(response.data);
        setFilterOptions((prevState) => ({ ...prevState, crimeType: response.data[0] }));
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  const handleSubmitReportModal = (data: any) => {
    axios.post(CRIME_REPORT_ROUTE, data);
    closeModal();

    setHandleRequest(!handleRequest);
  };

  const handleOpenReportModal = () => {
    openModal(<ReportReputationModal onSubmit={handleSubmitReportModal} closeModal={closeModal} />);
  };

  useEffect(() => {
    axios.get<Report[]>(CRIME_REPORT_ROUTE).then((response) => {
      setReports(response.data);
    });

    axios
      .get(GET_CRIME_TYPES_ROUTE)
      .then((response) => {
        setCrimeTypes(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении списка типов преступлений:", error);
      });
  }, [reports]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedType: string) => {
    setFilterOptions((prevData) => ({
      ...prevData,
      crimeType: selectedType,
    }));
  };

  const applyFilters = () => {
    let filtered = reports;

    if (filterOptions.fromDate) {
      filtered = filtered.filter(
        (report) => new Date(report.reportDate) >= new Date(filterOptions.fromDate),
      );
    }

    if (filterOptions.toDate) {
      filtered = filtered.filter(
        (report) => new Date(report.reportDate) <= new Date(filterOptions.toDate),
      );
    }

    if (filterOptions.crimeType) {
      filtered = filtered.filter((report) => report.crimeType === filterOptions.crimeType);
    }

    if (filterOptions.walletAddress) {
      filtered = filtered.filter((report) =>
        report.walletAddress.toLowerCase().includes(filterOptions.walletAddress.toLowerCase()),
      );
    }

    setFilteredReports(filtered);
  };

  const clearFilters = () => {
    setFilterOptions({
      fromDate: "",
      toDate: "",
      crimeType: crimeTypes[0],
      walletAddress: "",
    });
    setFilteredReports(reports);
  };

  return (
    <CommonLayout>
      <div className="w-full grow py-7">
        <div className="layout flex w-full flex-col items-center">
          <div className="relative flex w-full justify-center">
            <h1 className="mb-4 text-2xl font-bold" id="title">
              Проверка репутации кошелька{" "}
            </h1>
            <button
              onClick={handleOpenReportModal}
              className="absolute right-0 rounded-lg bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700"
            >
              Ввести отчет
            </button>
          </div>

          <div className="mb-4 w-full">
            <h2 className="mb-2 text-lg font-medium">Фильтр отчетов</h2>
            <div className="flex flex-col gap-3 lg:flex-row">
              <input
                type="text"
                placeholder="Введите адрес кошелька"
                name="walletAddress"
                value={filterOptions.walletAddress}
                onChange={handleFilterChange}
                className="rounded-md border px-3 py-1 shadow-sm focus:outline-blue-600 lg:w-2/6"
              />
              <CrimeTypeSelect
                options={crimeTypes}
                selectedOption={filterOptions.crimeType}
                onSelect={handleSelectChange}
                className="h-full !border bg-white !shadow-sm"
                dropdownClassName="left-0"
                wrapperClassName="lg:!w-2/6"
              />

              <button
                onClick={applyFilters}
                className="rounded-md bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
              >
                Применить
              </button>
              <button
                onClick={clearFilters}
                className="rounded-md bg-red-500 px-4 py-1 text-white hover:bg-red-600"
              >
                Сбросить
              </button>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredReports.length
              ? filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className=" flex cursor-pointer flex-col gap-4 rounded-md bg-platinum-500 p-4 transition-all hover:shadow-lg"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">{report.crimeType}</h3>
                      <p className="text-gray-500">
                        Дата:{" "}
                        {new Date(report.reportDate).toLocaleString("ru", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p>Автор отчета: {report.user?.username}</p>
                    <p className="line-clamp-4 h-24" title={report.crimeDescription}>
                      Описание: {report.crimeDescription}
                    </p>
                    <p>Номер кошелька: {report.walletAddress}</p>
                  </div>
                ))
              : reports.map((report) => (
                  <div
                    key={report.id}
                    className=" flex cursor-pointer flex-col gap-4 rounded-md bg-platinum-500 p-4 transition-all hover:shadow-lg"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">{report.crimeType}</h3>
                      <p className="text-gray-500">
                        Дата:{" "}
                        {new Date(report.reportDate).toLocaleString("ru", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p>Автор отчета: {report.user?.username}</p>
                    <p className="line-clamp-4 h-24" title={report.crimeDescription}>
                      Описание: {report.crimeDescription}
                    </p>
                    <p>Номер кошелька: {report.walletAddress}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};
