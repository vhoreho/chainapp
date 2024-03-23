import { Meta } from "@/api/coins";
import { CoinsStatData, HeadCell } from "@/types/table";

export const headCells: readonly HeadCell<CoinsStatData>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Наименование",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Цена (USD)",
  },
  {
    id: "totalSupply",
    numeric: true,
    disablePadding: false,
    label: "Сумма доступных коинов",
  },
  {
    id: "volume",
    numeric: true,
    disablePadding: false,
    label: "Капитализация",
  },
];

export const initialMetaState: Meta = {
  page: 1,
  hasNextPage: false,
  hasPreviousPage: false,
  itemCount: 0,
  limit: 10,
  pageCount: 0,
};
