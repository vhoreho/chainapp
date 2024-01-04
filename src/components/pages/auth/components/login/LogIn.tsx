import { Box, Button, FormControl, TextField, Typography, styled } from "@mui/material";
import { teal } from "@mui/material/colors";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  onSignUp: () => void;
};

type Inputs = {
  username: string;
  password: string;
};

export const LogIn = ({ onSignUp }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <LogInBox>
      <Typography variant="h3" component="h3">
        Авторизация
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Username" size="medium" required {...register("username")} />
        <TextField
          fullWidth
          type="password"
          label="Password"
          required
          size="medium"
          {...register("password")}
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

const FormInput = styled(TextField)(() => ({}));
