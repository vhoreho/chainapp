import { useMutation } from "@tanstack/react-query";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { getTransactionFetcher } from "./module";

export const useGetTransactionsMutation = () => {
  const mutation = useMutation({
    mutationFn: (address: string) => getTransactionFetcher(address),
    mutationKey: [USE_QUERY_KEYS.EXPLORER.MUTATION.GET_TRANSACTION],
  });

  return mutation;
};
