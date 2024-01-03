import { Box, FormControl, TextField, Typography, styled } from "@mui/material";
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
      <Typography
        variant="h5"
        component="h5"
        fontFamily={"inherit"}
        color={teal["900"]}
        fontWeight={"500"}
      >
        Авторизация
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Username"
          size="small"
          required
          {...register("username")}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          required
          size="small"
          {...register("password")}
        />
      </Form>
    </LogInBox>
  );
};

const LogInBox = styled(Box)(({ theme }) => ({
  maxWidth: "calc(100%-32px)",
  width: "500px",
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  background:
    "linear-gradient(135deg, rgba(91, 228, 155, 0.2), rgba(0, 167, 111, 0.2)) rgb(255, 255, 255)",
}));

const Form = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
}));

const FormInput = styled(TextField)(() => ({}));
