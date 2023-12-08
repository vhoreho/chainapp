import axios from "axios";
import {
  CLEAR_BLOCKCHAIN_ROUTE,
  CREATE_BLOCK_ROUTE,
  GET_BLOCKCHAIN_ROUTE,
  GET_SIGNED_TRANSACTIONS,
  GET_TRANSACTIONS_FOR_MINING,
  GET_UNSIGNED_TRANSACTIONS,
  SIGN_BLOCK_ROUTE,
} from "@/constants/API";
import { Block } from "@/types";
import { CreateBlockReqM, SignTransactionReqM } from "./types";

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

export const getUnsignedTransactions = async (token: string) => {
  const { data } = await axios.get<Block[]>(GET_UNSIGNED_TRANSACTIONS, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getTransactionsForMining = async (token: string) => {
  const { data } = await axios.get<Block[]>(GET_TRANSACTIONS_FOR_MINING, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getSignedTransactions = async (token: string) => {
  const { data } = await axios.get<Block[]>(GET_SIGNED_TRANSACTIONS, {
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

export const signTransaction = async (token: string, signTransactionReqM: SignTransactionReqM) => {
  const { data } = await axios.post<boolean>(
    SIGN_BLOCK_ROUTE(signTransactionReqM.id),
    { privateKey: signTransactionReqM.privateKey },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return data;
};
