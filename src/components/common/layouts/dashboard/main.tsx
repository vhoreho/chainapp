import { ReactNode } from "react";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import { useResponsive } from "@/hooks/use-responsive";
import { HEADER, NAV, SPACING } from "../constants";

// ----------------------------------------------------------------------
type Props = {
  children: ReactNode;
  sx?: SxProps;
};

export default function Main({ children, sx, ...other }: Props) {
  const lgUp = useResponsive("up", "lg");

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
