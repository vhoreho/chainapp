import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  APPROVE_UPDATE_ROLE_BY_ID_ROUTE,
  DELETE_USER_ROUTE,
  GET_USERS_ROUTE,
  REJECT_UPDATE_ROLE_BY_ID_ROUTE,
  UPDATE_ROLE_BY_ID_ROUTE,
} from "../../constants/API";
import { RolesEnum, User } from "@/types";
import { RootState } from "@/store";

export const getUsersAsync = createAsyncThunk(
  "users",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get<User[]>(GET_USERS_ROUTE);
      const {
        auth: {
          userData: {
            authData: { id },
          },
        },
      } = getState() as RootState;

      return data.filter((user) => user.id !== id);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export const filterUsers = createAsyncThunk(
  "users/filterUsers",
  (selectedRoles: RolesEnum[], { getState }) => {
    const { users } = (getState() as RootState).users;
    const filteredUsers = users.filter((user) =>
      selectedRoles.includes(user.role!)
    );
    return filteredUsers;
  }
);

export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  (searchText: string, { getState }) => {
    const { users } = (getState() as RootState).users;
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredUsers;
  }
);

export const approveChangeRoleRequest = createAsyncThunk(
  "users/approve-change-role",
  async (id: number, { rejectWithValue, getState }) => {
    try {
      const {
        auth: {
          userData: { token },
        },
      } = getState() as RootState;
      const { data } = await axios.get(APPROVE_UPDATE_ROLE_BY_ID_ROUTE(id), {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export const rejectChangeRoleRequest = createAsyncThunk(
  "users/reject-change-role",
  async (id: number, { rejectWithValue, getState }) => {
    try {
      const {
        auth: {
          userData: { token },
        },
      } = getState() as RootState;
      const { data } = await axios.get(REJECT_UPDATE_ROLE_BY_ID_ROUTE(id), {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export const deleteUser = createAsyncThunk(
  "/users/delete",
  async (id: number, { getState, rejectWithValue }) => {
    const {
      userData: { token },
    } = (getState() as RootState).auth;

    try {
      const { data } = await axios.get<any>(DELETE_USER_ROUTE(id), {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);
