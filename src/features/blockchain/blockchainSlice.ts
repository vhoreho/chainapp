import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SHA256, enc } from "crypto-js";
import {
  addBlockAsync,
  clearBlockChain,
  getBlockchain,
  mineBlockAsync,
} from "./thunks";
import { ZERO_BLOCK_IDENTIFIER } from "../../constants/vars";
import { Block, LOADING_STATUS } from "@/types";

export interface CounterSlice {
  id: number;
  chain: Block[];
  difficulty: number;
  walletAddress: string;
  error: string | null;
  status: LOADING_STATUS | null;
}

const initialState: CounterSlice = {
  id: 0,
  chain: [
    new Block(
      new Date(),
      {
        amount: "Указывается количество токенов переданных между кошельками",
        receivedAddress:
          "Указывается адрес кошелька куда будут отправлены токены",
        message: "В тексте сообщения указывается примечание к транзакции",
      },
      ZERO_BLOCK_IDENTIFIER
    ),
  ],
  difficulty: 4,
  walletAddress: SHA256(new Date().getTime().toString()).toString(enc.Base64),
  error: null,
  status: null,
};

export const blockchainSlice = createSlice({
  name: "blockchain",
  initialState,
  reducers: {
    setWalletAddress: (state) => {},
    setChain: (state, action: PayloadAction<Block[]>) => {
      state.chain = action.payload;
    },
    mineBlock: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const block = state.chain[index];
      block.mineBlock(state.difficulty);
    },
    resetChain: (state) => {
      state.chain = state.chain.slice(0, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBlockAsync.fulfilled, (state, { payload }) => {
      state.chain.push(payload);
    });
    builder.addCase(getBlockchain.fulfilled, (state, { payload }) => {
      state.chain = [...state.chain, ...payload];
    });
    builder.addCase(clearBlockChain.fulfilled, (state) => {
      state.status = LOADING_STATUS.SUCCESS;
      state.chain = state.chain.slice(0, 1);
    });
    builder.addCase(
      clearBlockChain.rejected,
      (state, { payload }: { payload: any }) => {
        state.status = LOADING_STATUS.REJECT;
        state.error = payload;
      }
    );
    builder.addCase(mineBlockAsync.pending, (state) => {
      state.status = LOADING_STATUS.LOADING;
    });
    builder.addCase(mineBlockAsync.fulfilled, (state, { payload }) => {
      state.status = LOADING_STATUS.SUCCESS;
      const newChain = state.chain.map((block) =>
        block.id === payload.id ? payload : block
      );
      state.chain = newChain;
    });
  },
});

export const { mineBlock, setChain, resetChain } = blockchainSlice.actions;

export default blockchainSlice.reducer;
