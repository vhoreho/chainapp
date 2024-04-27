import { useQuery } from "@tanstack/react-query";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { getBTCCurrencyInUSD, getETHCurrencyInUSD } from "./module";

export const useGetBTCCurrencyInUSD = () => {
  return useQuery({
    queryFn: () => getBTCCurrencyInUSD(),
    queryKey: [USE_QUERY_KEYS.EXPLORER.QUERY.GET_BTC_CURRENCY_IN_USD],
  });
};

export const useGetETHCurrencyInUSD = () => {
  return useQuery({
    queryFn: () => getETHCurrencyInUSD(),
    queryKey: [USE_QUERY_KEYS.EXPLORER.QUERY.GET_ETH_CURRENCY_IN_USD],
  });
};
