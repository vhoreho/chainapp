import { forwardRef, memo, ReactNode } from "react";
import { alpha, styled, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import SimpleBar from "simplebar-react";

type Props = {
  children: ReactNode;
  sx: SxProps;
};

// eslint-disable-next-line react/display-name
const Scrollbar = forwardRef<HTMLDivElement, Props>(({ children, sx, ...other }, ref) => {
  const userAgent = typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (mobile) {
    return (
      <Box ref={ref} sx={{ overflow: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        scrollableNodeProps={{
          ref,
        }}
        clickOnTrack={false}
        sx={sx}
        {...other}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
});

const StyledRootScrollbar = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
}));

const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
}));

export default memo(Scrollbar);
