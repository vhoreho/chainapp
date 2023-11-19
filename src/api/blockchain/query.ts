import { useMutation, useQuery } from "@tanstack/react-query";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useAuthContext } from "@/hooks/context";
import { createBlockQuery, getBlockChainQuery } from "./module";
import { CreateBlockReqM } from "./types";

export const useCreateChainMutation = () => {
  const { accessToken } = useAuthContext();
  const mutation = useMutation({
    mutationFn: (createBlockReqM: CreateBlockReqM) => {
      return createBlockQuery(createBlockReqM, accessToken!);
    },
    mutationKey: [USE_QUERY_KEYS.BLOCKCHAIN.MUTATION.CREATE],
  });

  return mutation;
};

export const useGetBlockchainQuery = () => {
  const { accessToken } = useAuthContext();
  return useQuery({
    queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET],
    queryFn: () => getBlockChainQuery(accessToken!),
  });
};
