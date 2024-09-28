// components/RegisterForm.tsx
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterFormInputs } from "@/types/forms";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormInputs) => void;
  isPending: boolean;
  isError: boolean;
  errors: { email?: boolean; password?: boolean; confirmPassword?: boolean };
}

export const RegisterView: React.FC<RegisterFormProps> = ({
  onSubmit,
  isPending,
  isError,
  errors,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<RegisterFormInputs>();

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Регистрация</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username" className="block text-sm mb-2">
                Логин
              </Label>
              <Input
                {...register("username", { required: true })}
                type="text"
                placeholder="Введите ваш логин"
              />
              {formErrors.username && <div className="text-red-500 text-sm">Логин обязателен</div>}
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm mb-2">
                Пароль
              </Label>
              <Input
                {...register("password", { required: true })}
                type="password"
                placeholder="Введите ваш пароль"
              />
              {formErrors.password && <div className="text-red-500 text-sm">Пароль обязателен</div>}
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="block text-sm mb-2">
                Подтверждение пароля
              </Label>
              <Input
                {...register("confirmPassword", { required: true })}
                type="password"
                placeholder="Подтвердите ваш пароль"
              />
              {formErrors.confirmPassword && (
                <div className="text-red-500 text-sm">Подтверждение пароля обязательно</div>
              )}
            </div>
            {isError && (
              <div className="text-red-500 text-sm">Ошибка регистрации. Попробуйте еще раз.</div>
            )}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
