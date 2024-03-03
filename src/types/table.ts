export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc";

export type CoinsStatData = {
  id: number;
  price: number;
  totalSupply: number;
  volume: number;
  name: string;
  icon: string;
};
