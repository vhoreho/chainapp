import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useAuthContext } from "@/hooks/context";
import { getCoin, getCoinStats } from "./module";
import { Coin, GetCoinsReqM, GetCoinsResM } from ".";

export const useGetCoinsQuery = () => {
  const { authData } = useAuthContext();

  return useQuery<GetCoinsResM>({
    queryKey: [USE_QUERY_KEYS.COINS_STAT.QUERY.GET_COINS],
    queryFn: () => getCoinStats({ page: 1, limit: 868, currency: "usd" }, authData?.access_token!),
    enabled: !!authData?.access_token,
  });
};

export const useGetCoinsMutation = () => {
  const { authData } = useAuthContext();

  return useMutation<GetCoinsResM, AxiosError, GetCoinsReqM>({
    mutationKey: [USE_QUERY_KEYS.COINS_STAT.QUERY.GET_COINS],
    mutationFn: (getCoinsReqM: GetCoinsReqM) => getCoinStats(getCoinsReqM, authData?.access_token!),
  });
};

export const useGetCoinMutation = () => {
  const { authData } = useAuthContext();

  return useMutation<Coin, AxiosError, string>({
    mutationKey: [USE_QUERY_KEYS.COINS_STAT.QUERY.GET_COIN],
    mutationFn: (id: string) => getCoin(id, authData?.access_token!),
  });
};
