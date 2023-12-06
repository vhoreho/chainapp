import { useState } from "react";
import Marquee from "react-fast-marquee";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import { LogIn } from "./components/login/LogIn";
import { SignUpPage } from "./components/sign-up/SignUp";

export const Auth = () => {
  const { t } = useTranslation();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleShowSignUp = () => {
    setIsSignUp(true);
  };

  const handleShowSignIn = () => {
    setIsSignUp(false);
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-cornflower-500 text-platinum-500">
      {/* {isSignUp ? (
        <SignUpPage onSignIn={handleShowSignIn} />
      ) : ( */}
      <LogIn onSignUp={handleShowSignUp} />
      {/* )} */}
    </div>
  );
};
