import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthContext } from "@/hooks/context";
import { UpdateProfileReqM } from "@/types";
import { getProfileQuery, updateProfileQuery } from "./module";
import { ProfileResM } from "./type";

enum QueryKeys {
  PROFILE = "profile",
  UPDATE = "update-profile",
}

export const useUpdateProfileMutation = () => {
  const mutation = useMutation({
    mutationFn: (updateProfileReqM: UpdateProfileReqM) => {
      return updateProfileQuery(updateProfileReqM);
    },
    mutationKey: [QueryKeys.UPDATE],
  });

  return mutation;
};

export const useGetProfileQuery = () => {
  const { authData } = useAuthContext();

  return useQuery<ProfileResM, AxiosError>({
    queryKey: [QueryKeys.PROFILE],
    queryFn: () => getProfileQuery(authData?.access_token!),
    enabled: !!authData?.access_token,
  });
};
