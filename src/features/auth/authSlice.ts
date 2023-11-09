import { createSlice } from "@reduxjs/toolkit";
import { logInAsync, signUpAsync, updateRole } from "./thunks";
import { STORAGE } from "../../constants/storage";
import { LOADING_STATUS, UserData } from "@/types";

type State = {
  status: LOADING_STATUS | null;
  userData: UserData;
  error: string | null;
};

const initialState: State = {
  status: null,
  userData: {
    token: "",
    authData: {
      id: null,
      username: "",
      role: null,
      email: "",
      isConfirmedUpdateRoleRequest: null,
      requestedRole: null,
    },
  },
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = {
        token: "",
        authData: {
          id: null,
          username: "",
          role: null,
          email: "",
          isConfirmedUpdateRoleRequest: null,
          requestedRole: null,
        },
      };
      localStorage.removeItem(STORAGE.USER_DATA);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInAsync.pending, (state) => {
      state.status = LOADING_STATUS.LOADING;
    }),
      builder.addCase(logInAsync.fulfilled, (state, { payload }) => {
        if (payload) {
          console.log(payload);

          state.status = LOADING_STATUS.SUCCESS;
          state.error = null;
          state.userData.token = payload.access_token;
          state.userData.authData.username = payload.payload.username;
          state.userData.authData.role = payload.payload.role;
          state.userData.authData.email = payload.payload.email;
          state.userData.authData.id = payload.payload.id;
          state.userData.authData.isConfirmedUpdateRoleRequest =
            payload.payload.isConfirmedUpdateRoleRequest;
          localStorage.setItem(
            STORAGE.USER_DATA,
            JSON.stringify(state.userData)
          );
        }
      });
    builder.addCase(
      logInAsync.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = payload;
        state.status = LOADING_STATUS.REJECT;
      }
    );
    builder.addCase(signUpAsync.pending, (state) => {
      state.status = LOADING_STATUS.LOADING;
    });
    builder.addCase(signUpAsync.fulfilled, (state, { payload }) => {
      if (payload) {
        state.status = LOADING_STATUS.SUCCESS;
        state.error = null;
        state.userData.token = payload.access_token;
        state.userData.authData.username = payload.payload.username;
        state.userData.authData.role = payload.payload.role;
        state.userData.authData.email = payload.payload.email;
        state.userData.authData.id = payload.payload.id;
        localStorage.setItem(STORAGE.USER_DATA, JSON.stringify(state.userData));
      }
    });
    builder.addCase(
      signUpAsync.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = payload;
        state.status = LOADING_STATUS.REJECT;
      }
    );
    builder.addCase(updateRole.pending, (state) => {
      state.status = LOADING_STATUS.LOADING;
    });
    builder.addCase(updateRole.fulfilled, (state, { payload }) => {
      if (payload) {
        state.userData.authData.isConfirmedUpdateRoleRequest =
          payload.isConfirmedUpdateRoleRequest;
        state.status = LOADING_STATUS.SUCCESS;
      }
    });
    builder.addCase(
      updateRole.rejected,
      (state, { payload }: { payload: any }) => {
        state.error = payload;
        state.status = LOADING_STATUS.REJECT;
      }
    );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
