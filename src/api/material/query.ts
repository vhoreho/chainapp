import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/hooks/context";
import { createMaterialFetcher, getMaterials } from "./module";
import { CreateMaterialReqM } from "./types";

enum QueryKeys {
  MATERIALS = "materials",
  CREATE_MATERIAL = "create-material",
}

const queryClient = new QueryClient();

export const useCreateMaterial = () => {
  const { authData } = useAuthContext();
  const mutation = useMutation({
    mutationFn: (createMaterialReqM: CreateMaterialReqM) => {
      return createMaterialFetcher(createMaterialReqM, authData?.access_token!);
    },
    mutationKey: [QueryKeys.CREATE_MATERIAL],
  });

  return mutation;
};

export const useGetMaterials = () => {
  return useQuery({
    queryKey: [QueryKeys.MATERIALS],
    queryFn: () => getMaterials(),
  });
};

export const invalidateMaterials = () => {
  queryClient.invalidateQueries({ queryKey: [QueryKeys.MATERIALS] });
};

export const prefetchMaterials = async (query: QueryClient) => {
  await query.prefetchQuery({
    queryKey: [QueryKeys.MATERIALS],
    queryFn: getMaterials,
  });
};
