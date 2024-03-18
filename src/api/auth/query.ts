import { useMutation } from "@tanstack/react-query";
import { USE_QUERY_KEYS } from "@/constants/useQueryKeys";
import { LogInReqM, RegisterReqM } from "@/types";
import { logInQuery, signUpQuery } from "./module";

export const useAuthorizationLogInMutation = () => {
  const mutation = useMutation({
    mutationFn: (logInReqM: LogInReqM) => {
      return logInQuery(logInReqM);
    },
    mutationKey: [USE_QUERY_KEYS.AUTHORIZATION.MUTATION.LOG_IN],
  });

  return mutation;
};

export const useAuthorizationSignUpMutation = () => {
  const mutation = useMutation({
    mutationFn: (signUpReqM: RegisterReqM) => {
      return signUpQuery(signUpReqM);
    },
    mutationKey: [USE_QUERY_KEYS.AUTHORIZATION.MUTATION.SIGN_UP],
  });

  return mutation;
};
