import { useMutation } from "@tanstack/react-query";
import { LogInReqM, RegisterReqM } from "@/types";
import { logInQuery, signUpQuery } from "./module";

export const useLogin = () =>
  useMutation({
    mutationFn: (loginRequest: LogInReqM) => logInQuery(loginRequest),
  });

export const useSignUp = () =>
  useMutation({
    mutationFn: (signUpRequest: RegisterReqM) => signUpQuery(signUpRequest),
  });
