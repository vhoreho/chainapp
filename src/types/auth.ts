import { UserRole } from "./roles";

export type LogInReqM = {
  username: string;
  password: string;
};

export type RegisterReqM = {
  username: string;
  password: string;
};

export type UserDataResM = {
  token: string;
  user: any;
};

export type UserResM = {
  id: number | null;
  username: string;
  role: UserRole | null;
  email: string;
  isConfirmedUpdateRoleRequest: boolean | null;
  requestedRole: UserRole | null;
};

export type UpdateProfileReqM = {
  id: number;
  username: string;
  email: string;
  password: string;
};
