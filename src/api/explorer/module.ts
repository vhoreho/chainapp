import axios from "axios";
import { GET_TRANSACTIONS_BY_ADDRESS } from "@/constants/API";
import { WalletResM } from ".";

export const getTransactionFetcher = async (address: string) => {
  try {
    const { data } = await axios.get<WalletResM>(GET_TRANSACTIONS_BY_ADDRESS(address));
    return data;
  } catch (error) {
    throw error; // Rethrow the error to be caught by the mutation
  }
};
