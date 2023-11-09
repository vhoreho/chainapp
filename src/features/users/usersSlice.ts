import { createSlice } from "@reduxjs/toolkit";
import {
  approveChangeRoleRequest,
  deleteUser,
  filterUsers,
  getUsersAsync,
  searchUsers,
} from "./thunks";
import { User } from "../../types/auth";
import { ROLES } from "../../types/Roles";

type State = {
  users: User[];
  roles: ROLES[];
  filteredUsers: User[];
};

const initialState: State = {
  users: [],
  roles: [],
  filteredUsers: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUsersAsync.fulfilled,
      (state, { payload }: { payload: any }) => {
        if (payload) {
          state.users = payload;
          state.roles = payload.map((item: User) => item.role);
        }
      }
    );
    builder.addCase(filterUsers.fulfilled, (state, { payload }) => {
      state.filteredUsers = payload;
    });
    builder.addCase(searchUsers.fulfilled, (state, { payload }) => {
      state.filteredUsers = payload;
    });
    builder.addCase(deleteUser.fulfilled, () => {});
  },
});

export default usersSlice.reducer;
