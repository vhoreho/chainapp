import { useState } from "react";
import { LogIn } from "./components/login/LogIn";
import { SignUpPage } from "./components/sign-up/SignUp";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleShowSignUp = () => {
    setIsSignUp(true);
  };

  const handleShowSignIn = () => {
    setIsSignUp(false);
  };

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
