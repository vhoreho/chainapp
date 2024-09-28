import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/context/useAuth";
import { LogIn, Register } from "./components";

export const Auth = () => {
  const { logIn, isLoading, signUp } = useAuthContext();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleToggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="relative flex flex-col items-center justify-center max-w-full h-screen bg-[#F4F5FA] px-[10px]">
      {isRegistering ? (
        <Register onRegister={signUp} loading={isLoading} />
      ) : (
        <LogIn onLogIn={logIn} loading={isLoading} />
      )}
      <Button variant="link" onClick={handleToggleMode}>
        {isRegistering ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
      </Button>
    </div>
  );
};
