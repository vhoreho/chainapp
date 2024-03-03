import { BlockData } from "@/types";
import { HeadCell } from "@/types/table";

export const cells: readonly HeadCell<BlockData>[] = [
  {
    id: "hash",
    numeric: false,
    disablePadding: true,
    label: "Текущий hash",
  },
  {
    id: "prevHash",
    numeric: false,
    disablePadding: false,
    label: "Предыдущий hash",
  },
  {
    id: "user",
    numeric: false,
    disablePadding: false,
    label: "Пользователь",
  },
  {
    id: "data",
    numeric: false,
    disablePadding: false,
    label: "Данные",
  },
];
