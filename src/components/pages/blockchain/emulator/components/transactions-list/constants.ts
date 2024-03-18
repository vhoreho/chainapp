import { BlockData } from "@/types";
import { HeadCell } from "@/types/table";

export const cells: readonly HeadCell<BlockData>[] = [
  {
    id: "coin",
    numeric: false,
    disablePadding: false,
    label: "Вид коина",
  },
  {
    id: "amount",
    numeric: false,
    disablePadding: false,
    label: "Количество",
  },
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
    id: "from",
    numeric: false,
    disablePadding: false,
    label: "Адрес отправителя",
  },
  {
    id: "to",
    numeric: false,
    disablePadding: false,
    label: "Адрес получателя",
  },
];
