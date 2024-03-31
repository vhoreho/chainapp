import { useQuery } from "@tanstack/react-query";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { getCurrencyInUSD } from "./module";

export const useGetCurrencyInUSD = () => {
  return useQuery({
    queryFn: () => getCurrencyInUSD(),
    queryKey: [USE_QUERY_KEYS.EXPLORER.QUERY.GET_CURRENCY_IN_USD],
  });
};
