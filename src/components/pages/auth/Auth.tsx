import { styled } from "@mui/material";
import { useState } from "react";

import { LogIn, SignUp } from "./components";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleShowSignUp = () => {
    setIsSignUp(true);
  };

  const handleShowSignIn = () => {
    setIsSignUp(false);
  };

  return (
    <Wrapper>
      {isSignUp ? (
        <SignUp onSignIn={handleShowSignIn} />
      ) : (
        <LogIn onSignUp={handleShowSignUp} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100vh",
  color: "#FFFFFF",
}));
