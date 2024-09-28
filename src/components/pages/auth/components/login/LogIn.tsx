import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogInReqM } from "@/types";

type Props = {
  onLogIn: (logInReqM: LogInReqM) => void;
  loading: boolean;
};

type Inputs = {
  username: string;
  password: string;
};

export const LogIn = ({ onLogIn }: Props) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-xl w-full mx-auto shadow-md rounded-lg p-4 flex flex-col gap-4 bg-white">
      <h3>Авторизация</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onLogIn)}>
        <Input placeholder="Введите логин" required {...register("username")} />
        <Input
          placeholder="Введите пароль"
          type={showPassword ? "text" : "password"}
          required
          {...register("password", { minLength: 4 })}
        />
        <Button type="submit">Войти</Button>
      </form>
    </div>
  );
};
