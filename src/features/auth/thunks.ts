import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  AUTHORIZATION_ROUTE,
  REGISTER_ROUTE,
  UPDATE_PROFILE_BY_ID_ROUTE,
  UPDATE_ROLE_BY_ID_ROUTE,
} from "../../constants/API";
import {
  LogIn,
  RolesEnum,
  SignUp,
  UpdateProfileState,
  User,
  UserDataPayload,
} from "@/types";
import { RootState } from "@/store";

export const logInAsync = createAsyncThunk(
  "auth/login",
  async (formState: LogIn, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<UserDataPayload>(
        AUTHORIZATION_ROUTE,
        formState
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export const signUpAsync = createAsyncThunk(
  "auth/signup",
  async (formState: SignUp, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<UserDataPayload>(
        REGISTER_ROUTE,
        formState
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export const updateRole = createAsyncThunk(
  "users/role",
  async (
    state: { id: number; role: RolesEnum },
    { rejectWithValue, getState }
  ) => {
    try {
      const {
        auth: {
          userData: { token },
        },
      } = getState() as RootState;
      const { data } = await axios.post<User>(
        UPDATE_ROLE_BY_ID_ROUTE(state.id),
        {
          role: state.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export const updateProfile = createAsyncThunk(
  "update-profile",
  async (formState: UpdateProfileState, { rejectWithValue, getState }) => {
    try {
      const {
        auth: {
          userData: { token },
        },
      } = getState() as RootState;
      const {} = await axios.post<User>(
        UPDATE_PROFILE_BY_ID_ROUTE(formState.id),
        formState,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);
