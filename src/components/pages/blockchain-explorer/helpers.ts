import { Out } from "./types";

export const reduce = (
  transactions: Out[]
): Record<string, { totalValue: number; count: number }> => {
  const walletMap: Record<string, { totalValue: number; count: number }> = {};

  for (const transaction of transactions) {
      const { addr, value } = transaction;

      if (!walletMap[addr]) {
        walletMap[addr] = { totalValue: value, count: 1 };
      } else {
        walletMap[addr].totalValue += value;
        walletMap[addr].count += 1;
      }
    }

  return walletMap;
};
