import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryClient } from "@/constants/query-client";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useAuthContext } from "@/hooks/context";
import {
  changeRoleFetcher,
  createUserFetcher,
  deleteUserFetcher,
  generateKeysQuery,
  getUsersFetcher,
  getWallets,
} from "./module";
import { ChangeRoleReqM, CreateUserReqM, KeysResM, User, Wallet } from "./types";

enum QueryKeys {
  USERS = "users",
}

export const useGetUsersQuery = () => {
  const { authData } = useAuthContext();

  return useQuery<User[], AxiosError>({
    queryKey: [QueryKeys.USERS],
    queryFn: () => getUsersFetcher(authData?.access_token!),
    enabled: !!authData?.access_token,
  });
};

export const invalidateUsers = () => {
  queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS] });
};

export const useGetWalletsQuery = () => {
  const { authData } = useAuthContext();

  return useQuery<Wallet[], AxiosError>({
    queryKey: [USE_QUERY_KEYS.USERS.QUERY.GET_WALLETS],
    queryFn: () => getWallets(authData?.access_token!),
    enabled: !!authData?.access_token,
  });
};

export const useGenerateKeysMutation = () => {
  const { authData } = useAuthContext();
  return useMutation<KeysResM, AxiosError>({
    mutationKey: [USE_QUERY_KEYS.USERS.QUERY.GENERATE_KEYS],
    mutationFn: () => generateKeysQuery(authData?.access_token!),
  });
};

export const useChangeRoleMutation = () => {
  const { authData } = useAuthContext();
  return useMutation<boolean, AxiosError, ChangeRoleReqM>({
    mutationKey: [USE_QUERY_KEYS.USERS.MUTATION.CHANGE_ROLE],
    mutationFn: (changeRoleReqM: ChangeRoleReqM) =>
      changeRoleFetcher(authData?.access_token!, changeRoleReqM),
  });
};

export const useCreateUserMutation = () => {
  const { authData } = useAuthContext();
  return useMutation<boolean, AxiosError, CreateUserReqM>({
    mutationKey: [USE_QUERY_KEYS.USERS.MUTATION.CREATE_USER],
    mutationFn: (createUserReqM: CreateUserReqM) =>
      createUserFetcher(authData?.access_token!, createUserReqM),
  });
};

export const useDeleteUserMutation = () => {
  const { authData } = useAuthContext();
  return useMutation<boolean, AxiosError, number>({
    mutationKey: [USE_QUERY_KEYS.USERS.MUTATION.DELETE_USER],
    mutationFn: (id: number) => deleteUserFetcher(authData?.access_token!, id),
  });
};
