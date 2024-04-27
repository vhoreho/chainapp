import axios from "axios";
import { GET_CURRENCY_IN_USD, GET_ETHEREUM_IN_USD } from "@/constants/API";
import { ConverterResM } from ".";

export const getBTCCurrencyInUSD = async () => {
  try {
    const { data } = await axios.get<ConverterResM>(GET_CURRENCY_IN_USD);
    return data.bpi.USD.rate_float;
  } catch (error) {
    throw error; // Rethrow the error to be caught by the mutation
  }
};

export const getETHCurrencyInUSD = async () => {
  try {
    const { data } = await axios.get<any>(GET_ETHEREUM_IN_USD);
    return data.USD;
  } catch (error) {
    throw error; // Rethrow the error to be caught by the mutation
  }
};
