import { createContext } from "react";
import { LogInReqM, SignUpReqM, UserDataResM } from "@/types";
import { REQUEST_STATUS } from "@/types/request-status";

interface AuthContextType {
  isAuthenticated: boolean;
  authData: UserDataResM | null;
  logIn: (logInReqM: LogInReqM) => Promise<REQUEST_STATUS>;
  signUp: (signUpReqM: SignUpReqM) => Promise<REQUEST_STATUS>;
  logout: () => void;
  isLoading: boolean;
  error?: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
