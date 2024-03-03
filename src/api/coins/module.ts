import axios from "axios";
import { GET_COINS } from "@/constants/API";
import { GetCoinsReqM } from ".";

export const getCoinStats = async (getCoinsReqM: GetCoinsReqM, token: string) => {
  const { data } = await axios.get<any>(
    GET_COINS(getCoinsReqM.page, getCoinsReqM.limit, getCoinsReqM.currency),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": process.env.NEXT_PUBLIC_COINS_STAT_API_KEY,
      },
    },
  );

  return data;
};
