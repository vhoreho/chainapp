import { forwardRef } from "react";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";

type Props = {
  src: string;
  sx: SxProps;
};

// eslint-disable-next-line react/display-name
export const SvgColor = forwardRef(({ src, sx, ...other }: Props, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: "inline-block",
      bgcolor: "currentColor",
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));
