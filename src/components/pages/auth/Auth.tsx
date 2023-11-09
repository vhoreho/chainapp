"use client";

import { useState } from "react";
import { LogIn } from "./components/login/LogIn";
import { SignUpPage } from "./components/signup/SignUp";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleShowSignUp = () => {
    setIsSignUp(true);
  };

  const handleShowSignIn = () => {
    setIsSignUp(false);
  };

  return (
    <div className="flex justify-center text-platinum-500 items-center h-screen relative bg-cornflower-500">
      {isSignUp ? (
        <SignUpPage onSignIn={handleShowSignIn} />
      ) : (
        <LogIn onSignUp={handleShowSignUp} />
      )}
    </div>
  );
};
