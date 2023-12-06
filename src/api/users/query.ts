import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useAuthContext } from "@/hooks/context";
import { generateKeysQuery } from "./module";
import { KeysResM } from "./type";

export const useGenerateKeysMutation = () => {
  const { authData } = useAuthContext();
  return useMutation<KeysResM, AxiosError>({
    mutationKey: [USE_QUERY_KEYS.USERS.QUERY.GENERATE_KEYS],
    mutationFn: () => generateKeysQuery(authData?.access_token!),
  });
};
