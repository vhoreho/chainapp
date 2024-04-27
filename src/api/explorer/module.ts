import axios from "axios";
import { GET_ETHEREUM_TRANSACTIONS, GET_TRANSACTIONS_BY_ADDRESS } from "@/constants/API";
import { BitcoinWalletResM, EthereumWalletResM } from ".";

export const getBitcoinTransactionsFetcher = async (address: string) => {
  try {
    const { data } = await axios.get<BitcoinWalletResM>(GET_TRANSACTIONS_BY_ADDRESS(address));
    return data;
  } catch (error) {
    throw error; // Rethrow the error to be caught by the mutation
  }
};

export const getEthereumTransactionsFetcher = async (address: string) => {
  try {
    const { data } = await axios.get<EthereumWalletResM>(GET_ETHEREUM_TRANSACTIONS(address));
    return data;
  } catch (error) {
    throw error; // Rethrow the error to be caught by the mutation
  }
};
