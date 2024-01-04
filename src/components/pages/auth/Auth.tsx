import { styled } from "@mui/material";
import { useAuthContext } from "@/hooks/context";
import { LogIn } from "./components";

export const Auth = () => {
  const { logIn, isLoading, error } = useAuthContext();

  return (
    <Wrapper>
      <LogIn onLogIn={logIn} loading={isLoading} />
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
  background: theme.palette.grey[100],
}));
