import axios from "axios";
import { AUTHORIZATION_ROUTE, REGISTER_ROUTE } from "@/constants/API";
import { LogInReqM, SignUpReqM, UserDataResM } from "@/types";

export const logInQuery = async (loginData: LogInReqM) => {
  const { data } = await axios.post<UserDataResM>(AUTHORIZATION_ROUTE, loginData);

  return data;
};

export const signUpQuery = async (signUpReqM: SignUpReqM) => {
  const { data } = await axios.post<UserDataResM>(REGISTER_ROUTE, signUpReqM);
  return data;
};
