import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

export function useResponsive(query: string, start: number | Breakpoint, end: number | Breakpoint) {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start as Breakpoint));

  if (query === "up") {
    return mediaUp;
  }

  if (query === "down") {
    return mediaDown;
  }

  if (query === "between") {
    return mediaBetween;
  }

  return mediaOnly;
}

export function useWidth() {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce(
      (output, key) => {
        const matches = useMediaQuery(theme.breakpoints.up(key));

        return !output && matches ? key : output;
      },
      null as Breakpoint | null,
    ) || "xs"
  );
}
