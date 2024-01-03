import { Box, styled } from "@mui/material";
import { blue } from "@mui/material/colors";

type Props = {
  onSignIn: () => void;
};

export const SignUp = ({ onSignIn }: Props) => {
  return <SignUpBox>SignUp</SignUpBox>;
};

const SignUpBox = styled(Box)(({ theme }) => ({
  maxWidth: "calc(100%-32px)",
  width: "744px",
  background: blue[100],
  boxShadow: theme.shadows[10],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
}));
