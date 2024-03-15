import axios from "axios";
import { GET_COIN, GET_COINS } from "@/constants/API";
import { Coin, GetCoinsReqM } from ".";

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

export const getCoin = async (id: string, token: string) => {
  const { data } = await axios.get<Coin>(GET_COIN(id), {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-API-KEY": process.env.NEXT_PUBLIC_COINS_STAT_API_KEY,
    },
  });

  return data;
};
