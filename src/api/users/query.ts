import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useAuthContext } from "@/hooks/context";
import { changeRoleFetcher, generateKeysQuery } from "./module";
import { ChangeRoleReqM, KeysResM } from "./types";

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
