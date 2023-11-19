import { useMutation, useQuery } from "@tanstack/react-query";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { useAuthContext } from "@/hooks/context";
import { UpdateProfileReqM } from "@/types";
import { getProfileQuery, updateProfileQuery } from "./module";

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
  const { accessToken } = useAuthContext();
  return useQuery({
    queryKey: [USE_QUERY_KEYS.PROFILE.QUERY.GET],
    queryFn: () => getProfileQuery(accessToken!),
  });
};
