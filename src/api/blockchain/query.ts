import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useAuthContext } from "@/hooks/context";
import { ROLES } from "@/types";
import { getProfileQuery } from "../profile";
import {
  createBlockQuery,
  getBlockChainQuery,
  getSignedTransactions,
  getTransactionsForMining,
  getUnsignedTransactions,
  signTransaction,
} from "./module";
import { CreateBlockReqM, SignTransactionReqM } from "./types";

export const useCreateChainMutation = () => {
  const { authData } = useAuthContext();
  const mutation = useMutation({
    mutationFn: (createBlockReqM: CreateBlockReqM) => {
      return createBlockQuery(createBlockReqM, authData?.access_token!);
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

export const useGetTransactionsForMiningQuery = (role: ROLES) => {
  const { authData } = useAuthContext();

  return useQuery({
    queryKey: [USE_QUERY_KEYS.BLOCKCHAIN.QUERY.GET_TRANSACTIONS_FOR_MINING],
    queryFn: () => getTransactionsForMining(authData?.access_token!),
    enabled: !!authData?.access_token && role === ROLES.MINER,
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
