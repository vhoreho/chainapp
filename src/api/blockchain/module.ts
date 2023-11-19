import axios from "axios";
import { CLEAR_BLOCKCHAIN_ROUTE, CREATE_BLOCK_ROUTE, GET_BLOCKCHAIN_ROUTE } from "@/constants/API";
import { Block } from "@/types";
import { CreateBlockReqM } from "./types";

export const createBlockQuery = async (createBlockReqM: CreateBlockReqM, token: string) => {
  const { data } = await axios.post<any>(CREATE_BLOCK_ROUTE, createBlockReqM, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getBlockChainQuery = async (token: string) => {
  const { data } = await axios.get<Block[]>(GET_BLOCKCHAIN_ROUTE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const resetBlockchain = async (token: string) => {
  const { data } = await axios.get<boolean>(CLEAR_BLOCKCHAIN_ROUTE, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
