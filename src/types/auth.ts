import { RolesEnum } from "./roles";

export type LogIn = {
  username: string;
  password: string;
};

export type SignUp = {
  username: string;
  email: string;
  password: string;
};

export type UserDataPayload = {
  access_token: string;
  payload: {
    id: number;
    username: string;
    role: RolesEnum;
    email: string;
    isConfirmedUpdateRoleRequest: boolean | null;
    requestedRole: RolesEnum | null;
  };
};

export type UserData = {
  token: string;
  authData: {
    id: number | null;
    username: string;
    role: RolesEnum | null;
    email: string;
    isConfirmedUpdateRoleRequest: boolean | null;
    requestedRole: RolesEnum | null;
  };
};

export type User = {
  id: number | null;
  username: string;
  role: RolesEnum | null;
  email: string;
  isConfirmedUpdateRoleRequest: boolean | null;
  requestedRole: RolesEnum | null;
};

export type UpdateProfileState = {
  id: number;
  username: string;
  email: string;
  password: string;
};
