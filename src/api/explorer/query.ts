import { useMutation } from "@tanstack/react-query";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { getBitcoinTransactionsFetcher, getEthereumTransactionsFetcher } from "./module";

export const useGetBitcoinTransactionsMutation = () => {
  const mutation = useMutation({
    mutationFn: (address: string) => getBitcoinTransactionsFetcher(address),
    mutationKey: [USE_QUERY_KEYS.EXPLORER.MUTATION.GET_TRANSACTION],
  });

  return mutation;
};

export const useGetEthereumTransactionsMutation = () => {
  const mutation = useMutation({
    mutationFn: (address: string) => getEthereumTransactionsFetcher(address),
    mutationKey: [USE_QUERY_KEYS.EXPLORER.MUTATION.GET_ETHEREUM_TRANSACTION],
  });

  return mutation;
};
