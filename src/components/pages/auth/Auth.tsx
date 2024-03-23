import { useState } from "react";
import { styled } from "@mui/material";
import { useAuthContext } from "@/hooks/context";
import { LogIn, Register } from "./components";

export const Auth = () => {
  const { logIn, isLoading, signUp, error } = useAuthContext();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleToggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <Wrapper>
      {isRegistering ? (
        <Register onRegister={signUp} loading={isLoading} />
      ) : (
        <LogIn onLogIn={logIn} loading={isLoading} />
      )}
      <ToggleModeButton onClick={handleToggleMode}>
        {isRegistering ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
      </ToggleModeButton>
    </Wrapper>
  );
};

const Wrapper = styled("div")(() => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  background: "#F4F5FA",
}));

const ToggleModeButton = styled("button")(({ theme }) => ({
  marginTop: theme.spacing(2),
  cursor: "pointer",
  border: "none",
  background: "none",
  fontFamily: "Play",
  color: theme.palette.primary.main,
  textDecoration: "underline",
  "&:hover": {
    opacity: 0.8,
  },
}));
