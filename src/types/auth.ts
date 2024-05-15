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
  access_token: string;
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

export class AuthData {
  public token!: string;
  public authData!: {
    id: number;
    username: string;
    role: UserRole;
    email: string;
  };

  public constructor(init?: AuthData) {
    Object.assign(this, init);
  }

  static mapFromReqM({ access_token }: UserDataResM) {
    const authData = new AuthData();
    authData.token = access_token;

    return authData;
  }
}
