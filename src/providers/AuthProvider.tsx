import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthorizationLogInMutation, useAuthorizationSignUpMutation } from "@/api/auth";
import { ROUTES } from "@/constants/routes";
import { AUTH_TOKEN } from "@/constants/ui";
import { AuthContext } from "@/contexts/authContext";
import { LogInReqM, REQUEST_STATUS, SignUpReqM } from "@/types";
import { getAxiosErrorMessage } from "@/utils/get-axios-error-message";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const logInMutation = useAuthorizationLogInMutation();
  const signUpMutation = useAuthorizationSignUpMutation();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem(AUTH_TOKEN);
    setIsAuthenticated(!!storedAccessToken);
    storedAccessToken && setAccessToken(storedAccessToken);
    if (storedAccessToken === null) {
      router.push(ROUTES.AUTH);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isAuthenticated && router.push(ROUTES.HOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const logIn = async (logInReqM: LogInReqM) => {
    try {
      setIsLoading(true);
      const { access_token } = await logInMutation.mutateAsync(logInReqM);
      localStorage.setItem(AUTH_TOKEN, access_token);
      setIsAuthenticated(true);
      setAccessToken(access_token);
      setError(undefined);
      return REQUEST_STATUS.FULFILLED;
    } catch (error) {
      setError(getAxiosErrorMessage(error));
      return REQUEST_STATUS.REJECT;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (signUpReqM: SignUpReqM) => {
    try {
      setIsLoading(true);
      const { access_token } = await signUpMutation.mutateAsync(signUpReqM);
      localStorage.setItem(AUTH_TOKEN, access_token);
      setIsAuthenticated(true);
      setAccessToken(access_token);
      setError(undefined);
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
    localStorage.removeItem(AUTH_TOKEN);
    setAccessToken(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, logIn, error, signUp, logout, accessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
