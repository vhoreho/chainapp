import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Iconify } from "@/components/common/design-system/iconify/Iconify";
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
    <RegisterBox>
      <Typography variant="h3" component="h3">
        Регистрация
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Username" size="medium" required {...register("username")} />
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Password"
          required
          size="medium"
          {...register("password", { minLength: 4 })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? "mdi-light:eye" : "mdi-light:eye-off"} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          required
          size="medium"
          {...register("confirmPassword", { validate: (value) => value === watch("password") })}
          error={!!watch("password") && watch("password") !== watch("confirmPassword")}
          helperText={
            watch("password") &&
            watch("password") !== watch("confirmPassword") &&
            "Passwords do not match"
          }
        />
        <Button type="submit" variant="contained" size="large" disabled={loading}>
          Зарегистрироваться
        </Button>
      </Form>
    </RegisterBox>
  );
};

const RegisterBox = styled(Box)(({ theme }) => ({
  maxWidth: "calc(100%-32px)",
  width: "500px",
  marginInline: theme.spacing(2),
  boxShadow: theme.customShadows.base,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  background: theme.palette.grey[50],
}));

const Form = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
}));
