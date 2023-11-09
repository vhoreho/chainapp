import { createSlice } from "@reduxjs/toolkit";
import { RolesEnum, User } from "@/types";
import { deleteUser, filterUsers, getUsersAsync, searchUsers } from "./thunks";

type State = {
  users: User[];
  roles: RolesEnum[];
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
