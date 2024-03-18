import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useAuthContext } from "@/hooks/context";
import { Block, USER_ROLE } from "@/types";
import {
  createBlockFetcher,
  deleteUnsignedTransaction,
  getBlockChainQuery,
  getSignedTransactions,
  getTransactionsForMining,
  getUnsignedTransactions,
  mineBlock,
  signTransaction,
} from "./module";
import { CreateBlockReqM, MineBlockReqM, SignTransactionReqM } from "./types";

export const useCreateChainMutation = () => {
  const { authData } = useAuthContext();
  const mutation = useMutation({
    mutationFn: (createBlockReqM: CreateBlockReqM) => {
      return createBlockFetcher(createBlockReqM, authData?.access_token!);
    },
    mutationKey: [USE_QUERY_KEYS.BLOCKCHAIN.MUTATION.CREATE],
  });

  return mutation;
};

export const useGetBlockchainQuery = () => {
  const { authData } = useAuthContext();
  return useQuery({
    queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_CREATED_TRANSACTIONS],
    queryFn: () => getBlockChainQuery(authData?.access_token!),
    enabled: !!authData?.access_token,
  });
};

export const useGetUnsignedTransactionsQuery = () => {
  const { authData } = useAuthContext();
  return useQuery({
    queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_UNSIGNED_TRANSACTIONS],
    queryFn: () => getUnsignedTransactions(authData?.access_token!),
    enabled: !!authData?.access_token,
  });
};

export const useGetSignedTransactionsQuery = () => {
  const { authData } = useAuthContext();
  return useQuery({
    queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_SIGNED_TRANSACTIONS],
    queryFn: () => getSignedTransactions(authData?.access_token!),
    enabled: !!authData?.access_token,
  });
};

export const useGetTransactionsForMiningQuery = (role: USER_ROLE) => {
  const { authData } = useAuthContext();

  return useQuery({
    queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_TRANSACTIONS_FOR_MINING],
    queryFn: () => getTransactionsForMining(authData?.access_token!),
    enabled: !!authData?.access_token && role === USER_ROLE.BLOCK_CONFIRMER,
  });
};

export const useSignTransactionMutation = () => {
  const { authData } = useAuthContext();
  const mutation = useMutation<boolean, AxiosError, SignTransactionReqM>({
    mutationFn: (signTransactionReqM: SignTransactionReqM) =>
      signTransaction(authData?.access_token!, signTransactionReqM),
    mutationKey: [USE_QUERY_KEYS.BLOCKCHAIN.MUTATION.SIGN_TRANSACTION],
  });

  return mutation;
};

export const useDeleteUnsignedTransactionMutation = () => {
  const { authData } = useAuthContext();
  const mutation = useMutation<Block[], AxiosError, number>({
    mutationFn: (id) => deleteUnsignedTransaction(authData?.access_token!, id),
    mutationKey: [USE_QUERY_KEYS.BLOCKCHAIN.MUTATION.DELETE_UNSIGNED_TRANSACTION],
  });

  return mutation;
};

export const useMineBlockMutation = () => {
  const { authData } = useAuthContext();
  const mutation = useMutation<Block[], AxiosError, MineBlockReqM>({
    mutationFn: (mineBlockReqM) => mineBlock(authData?.access_token!, mineBlockReqM),
    mutationKey: [USE_QUERY_KEYS.BLOCKCHAIN.MUTATION.MINE_BLOCK],
  });

  return mutation;
};
