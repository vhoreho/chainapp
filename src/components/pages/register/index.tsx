// pages/register.tsx
import { useRouter } from "next/router";
import { useSignUp } from "@/api/auth"; // Предполагается, что у вас есть хук useRegister
import { ROUTES } from "@/constants/routes";
import { RegisterFormInputs } from "@/types/forms";
import { RegisterView } from "./View";

export const Register = () => {
  const router = useRouter();
  const { mutate: registerMutate, isPending, isError } = useSignUp();

  const onSubmit = (data: RegisterFormInputs) => {
    if (data.password !== data.confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    registerMutate(data, {
      onSuccess: (responseData) => {
        const { token } = responseData;
        localStorage.setItem("token", token);
        router.push(ROUTES.DASHBOARD);
      },
    });
  };

  return <RegisterView onSubmit={onSubmit} isPending={isPending} isError={isError} errors={{}} />;
};
