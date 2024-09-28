import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterReqM } from "@/types";

type Props = {
  onRegister: (registerReqM: RegisterReqM) => void;
  loading: boolean;
};

type Inputs = {
  username: string;
  password: string;
  confirmPassword: string;
};

export const Register = ({ onRegister, loading }: Props) => {
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: Inputs) => {
    const { username, password } = data;
    onRegister({ username, password });
  };

  return (
    <div className="max-w-xl w-full mx-auto shadow-md rounded-lg p-4 flex flex-col gap-4 bg-white">
      <h3>Регистрация</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Введите логин" type="text" {...register("username")} />
        <Input placeholder="Введите пароль" type="password" {...register("password")} />
        <Input placeholder="Повторите пароль" type="password" {...register("confirmPassword")} />
        <Button type="submit" disabled={loading}>
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};
