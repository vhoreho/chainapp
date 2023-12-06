import axios from "axios";
import { GENERATE_KEYS_ROUTE } from "@/constants/API";
import { KeysResM } from "./type";

export const generateKeysQuery = async (token: string) => {
  const { data } = await axios.get<KeysResM>(GENERATE_KEYS_ROUTE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
