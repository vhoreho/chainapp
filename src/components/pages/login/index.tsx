// components/LoginForm.tsx
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useLogin } from "@/api/auth";
import { ROUTES } from "@/constants/routes";
import { useAuthContext } from "@/hooks/context";
import { LoginFormInputs } from "@/types/forms";
import { LoginFormView } from "./View";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { login: authLogin } = useAuthContext();
  const router = useRouter();
  const { mutate: loginMutate, isPending, isError } = useLogin();

  const onSubmit = (data: LoginFormInputs) => {
    loginMutate(data, {
      onSuccess: (responseData) => {
        const { token, user } = responseData;
        authLogin(token, user);
        router.push(ROUTES.DASHBOARD);
      },
    });
  };

  return (
    <LoginFormView
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      isPending={isPending}
      isError={isError}
    />
  );
};
