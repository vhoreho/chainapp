import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "@/store";
import { Block } from "@/types";
import {
  CLEAR_BLOCKCHAIN_ROUTE,
  CREATE_BLOCK_ROUTE,
  GET_BLOCKCHAIN_ROUTE,
  MINER_BLOCK_ROUTE,
} from "../../constants/API";

export const addBlockAsync = createAsyncThunk("blockchain/create", async (block: Block, { getState }) => {
  try {
    const { blockchain } = getState() as RootState;
    const newBlock: any = block;
    const prevBlock = blockchain.chain[blockchain.chain.length - 1];
    newBlock.prevHash = prevBlock.hash;
    newBlock.mineBlock(blockchain.difficulty);
    newBlock.data = JSON.stringify(block.data);
    newBlock.nonce = 0;

    const { data } = await axios.post(CREATE_BLOCK_ROUTE, block);

    return data;
  } catch (error) {
    throw error;
  }
});

export const getBlockchain = createAsyncThunk("blockchain/get", async (_, { getState }) => {
  try {
    const { blockchain } = getState() as RootState;
    blockchain.chain = blockchain.chain.slice(0, 1);
    const { data } = await axios.get(GET_BLOCKCHAIN_ROUTE);

    return data;
  } catch (error) {
    throw error;
  }
});

export const mineBlockAsync = createAsyncThunk(
  "blockchain/mine",
  async (id: number) => {
    try {
      const { data } = await axios.get(MINER_BLOCK_ROUTE(id));
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const clearBlockChain = createAsyncThunk(
  "blockchain/clear",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<boolean>(CLEAR_BLOCKCHAIN_ROUTE);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);
