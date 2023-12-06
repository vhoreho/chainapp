import axios from "axios";
import { GET_PROFILE_ROUTE, UPDATE_PROFILE_BY_ID_ROUTE } from "@/constants/API";
import { UpdateProfileReqM, UserResM } from "@/types";
import { ProfileResM } from "./type";

export const updateProfileQuery = async (updateProfileReqM: UpdateProfileReqM) => {
  const { data } = await axios.post<UserResM>(
    UPDATE_PROFILE_BY_ID_ROUTE(updateProfileReqM.id),
    updateProfileReqM,
  );

  return data;
};

export const getProfileQuery = async (token: string) => {
  const { data } = await axios.get<ProfileResM>(GET_PROFILE_ROUTE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
