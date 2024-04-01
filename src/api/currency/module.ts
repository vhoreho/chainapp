import axios from "axios";
import { GET_CURRENCY_IN_USD } from "@/constants/API";
import { ConverterResM } from ".";

export const getCurrencyInUSD = async () => {
  try {
    const { data } = await axios.get<ConverterResM>(GET_CURRENCY_IN_USD);
    return data.bpi.USD.rate_float;
  } catch (error) {
    throw error; // Rethrow the error to be caught by the mutation
  }
};
