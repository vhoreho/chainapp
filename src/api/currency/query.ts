import { useMutation } from "@tanstack/react-query";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { getCurrencyInUSD } from "./module";

export const useGetCurrencyInUSD = () => {
  const mutation = useMutation({
    mutationFn: () => getCurrencyInUSD(),
    mutationKey: [USE_QUERY_KEYS.EXPLORER.MUTATION.GET_CURRENCY_IN_USD],
  });

  return mutation;
};
