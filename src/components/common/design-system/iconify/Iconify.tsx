import { forwardRef, ReactNode } from "react";
import { Icon, IconifyIcon } from "@iconify/react";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";

interface IconifyProps {
  icon: IconifyIcon | string;
  sx?: SxProps;
  width?: number;
  children?: ReactNode;
}

// eslint-disable-next-line react/display-name
export const Iconify = forwardRef<HTMLDivElement, IconifyProps>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  ),
);
