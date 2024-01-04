import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useAuthContext } from "@/hooks/context";
import { UpdateProfileReqM } from "@/types";
import { getProfileQuery, updateProfileQuery } from "./module";
import { ProfileResM } from "./type";

export const useUpdateProfileMutation = () => {
  const mutation = useMutation({
    mutationFn: (updateProfileReqM: UpdateProfileReqM) => {
      return updateProfileQuery(updateProfileReqM);
    },
    mutationKey: [USE_QUERY_KEYS.PROFILE.MUTATION.UPDATE],
  });

  return mutation;
};

export const useGetProfileQuery = () => {
  const { authData } = useAuthContext();
  return useQuery<ProfileResM, AxiosError>({
    queryKey: [USE_QUERY_KEYS.PROFILE.QUERY.GET],
    queryFn: () => getProfileQuery(authData?.access_token!),
    enabled: !!authData?.access_token,
  });
};
