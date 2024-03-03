import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useAuthContext } from "@/hooks/context";
import { getCoinStats } from "./module";
import { GetCoinsReqM, GetCoinsResM } from ".";

export const useGetCoinsMutation = () => {
  const { authData } = useAuthContext();

  return useMutation<GetCoinsResM, AxiosError, GetCoinsReqM>({
    mutationKey: [USE_QUERY_KEYS.COINS_STAT.QUERY.GET_COINS],
    mutationFn: (getCoinsReqM: GetCoinsReqM) => getCoinStats(getCoinsReqM, authData?.access_token!),
  });
};
