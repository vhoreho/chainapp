import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/store";
import { RootState } from "@/store";
import { LogIn } from "./components/login/LogIn";
import { SignUpPage } from "./components/signup/SignUp";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { authData } = useAppSelector((state: RootState) => state.auth.userData);
  const router = useRouter();

  const handleShowSignUp = () => {
    setIsSignUp(true);
  };

  const handleShowSignIn = () => {
    setIsSignUp(false);
  };

  useEffect(() => {
    if (authData.username) {
      router.push("/home");
    }
  }, []);

  return (
    <div className="relative flex h-screen items-center justify-center bg-cornflower-500 text-platinum-500">
      {isSignUp ? (
        <SignUpPage onSignIn={handleShowSignIn} />
      ) : (
        <LogIn onSignUp={handleShowSignUp} />
      )}
    </div>
  );
};
