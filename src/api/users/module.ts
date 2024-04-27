import axios from "axios";
import {
  CREATE_USER_ROUTE,
  DELETE_USER_ROUTE,
  GENERATE_KEYS_ROUTE,
  GET_USERS_ROUTE,
  GET_WALLETS,
  UPDATE_ROLE_ROUTE,
} from "@/constants/API";
import { ChangeRoleReqM, CreateUserReqM, KeysResM, User } from "./types";

export const getUsersFetcher = async (token: string) => {
  const { data } = await axios.get<User[]>(GET_USERS_ROUTE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getWallets = async (token: string) => {
  const { data } = await axios.get<any[]>(GET_WALLETS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const generateKeysQuery = async (token: string) => {
  const { data } = await axios.get<KeysResM>(GENERATE_KEYS_ROUTE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const changeRoleFetcher = async (token: string, changeRoleResM: ChangeRoleReqM) => {
  const { data } = await axios.post<boolean>(UPDATE_ROLE_ROUTE, changeRoleResM, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const createUserFetcher = async (token: string, createUserResM: CreateUserReqM) => {
  const { data } = await axios.post<boolean>(CREATE_USER_ROUTE, createUserResM, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deleteUserFetcher = async (token: string, id: number) => {
  const { data } = await axios.get<boolean>(DELETE_USER_ROUTE(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
