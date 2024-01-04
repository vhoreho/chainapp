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
import { Iconify } from "@/components/common/iconify/Iconify";
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
    <LogInBox>
      <Typography variant="h3" component="h3">
        Авторизация
      </Typography>
      <Form onSubmit={handleSubmit(onLogIn)}>
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
        <Button type="submit" variant="contained" size="large">
          Войти
        </Button>
      </Form>
    </LogInBox>
  );
};

const LogInBox = styled(Box)(({ theme }) => ({
  maxWidth: "calc(100%-32px)",
  width: "500px",
  marginInline: theme.spacing(2),
  boxShadow: theme.customShadows.card,
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
