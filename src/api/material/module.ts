import axios from "axios";
import { BASE_MATERIAL_ROUTE } from "@/constants/API";
import { CreateMaterialReqM, MaterialResM } from "./types";

export const createMaterialFetcher = async (
  createMaterialReqM: CreateMaterialReqM,
  token: string,
) => {
  const { data } = await axios.post<any>(BASE_MATERIAL_ROUTE, createMaterialReqM, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getMaterials = async () => {
  const { data } = await axios.get<MaterialResM[]>(BASE_MATERIAL_ROUTE);

  return data;
};
