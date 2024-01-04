import axios from "axios";
import { GENERATE_KEYS_ROUTE, UPDATE_ROLE_ROUTE } from "@/constants/API";
import { ChangeRoleReqM, KeysResM } from "./types";

export const generateKeysQuery = async (token: string) => {
  const { data } = await axios.get<KeysResM>(GENERATE_KEYS_ROUTE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const changeRoleFetcher = async (token: string, changeRoleResM: ChangeRoleReqM) => {
  const { data } = await axios.post<boolean>(UPDATE_ROLE_ROUTE, changeRoleResM, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
