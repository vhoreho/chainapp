import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthorizationLogInMutation, useAuthorizationSignUpMutation } from "@/api/auth";
import { ROUTES } from "@/constants/routes";
import { AUTH_DATA } from "@/constants/ui";
import { AuthContext } from "@/contexts/authContext";
import { useSnackBarContext } from "@/hooks/context";
import { useProgressContext } from "@/hooks/context/useProgressContext";
import { LogInReqM, RegisterReqM, REQUEST_STATUS, UserDataResM } from "@/types";
import { getAxiosErrorMessage } from "@/utils/get-axios-error-message";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState<UserDataResM | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleStart, handleStop } = useProgressContext();
  const [error, setError] = useState();
  const logInMutation = useAuthorizationLogInMutation();
  const signUpMutation = useAuthorizationSignUpMutation();
  const { handleShow } = useSnackBarContext();

  const logIn = async (logInReqM: LogInReqM) => {
    try {
      handleStart();
      const authData = await logInMutation.mutateAsync(logInReqM);
      localStorage.setItem(AUTH_DATA, JSON.stringify(authData));
      setIsAuthenticated(true);
      setAuthData(authData);
      setError(undefined);
      router.push(ROUTES.DASHBOARD);
      return REQUEST_STATUS.FULFILLED;
    } catch (error) {
      handleShow(getAxiosErrorMessage(error), "error");
      return REQUEST_STATUS.REJECT;
    } finally {
      handleStop();
    }
  };

  const signUp = async (signUpReqM: RegisterReqM) => {
    try {
      setIsLoading(true);
      const authData = await signUpMutation.mutateAsync(signUpReqM);
      localStorage.setItem(AUTH_DATA, JSON.stringify(authData));
      setIsAuthenticated(true);
      setAuthData(authData);
      setError(undefined);
      router.push(ROUTES.DASHBOARD);
      return REQUEST_STATUS.FULFILLED;
    } catch (error) {
      setError(getAxiosErrorMessage(error));
      return REQUEST_STATUS.REJECT;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_DATA);
    setAuthData(null);
    router.push("/");
  };

  useEffect(() => {
    const storedAuthData = localStorage.getItem(AUTH_DATA);
    setIsAuthenticated(!!storedAuthData);
    storedAuthData && setAuthData(JSON.parse(storedAuthData) as UserDataResM);
    if (storedAuthData === null) {
      router.push(ROUTES.AUTH);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, logIn, error, signUp, logout, authData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
