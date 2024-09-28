// components/LoginFormView.tsx
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginFormInputs } from "@/types/forms"; // Импортируем тип

interface Props {
  onSubmit: (event: React.FormEvent) => void;
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
  isPending: boolean;
  isError: boolean;
}

export const LoginFormView = ({ onSubmit, register, errors, isPending, isError }: Props) => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Вход</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm mb-2">
                Логин
              </Label>
              <Input
                {...register("username", { required: true })}
                type="text"
                placeholder="Введите ваш логин"
              />
              {errors.username && <div className="text-red-500 text-sm">Логин обязателен</div>}
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
              {errors.password && <div className="text-red-500 text-sm">Пароль обязателен</div>}
            </div>
            {isError && (
              <div className="text-red-500 text-sm">
                Ошибка входа. Проверьте данные и попробуйте снова.
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Вход..." : "Войти"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
