import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider as MUIThemeProvider,
  ThemeOptions,
  createTheme,
} from "@mui/material/styles";
import {
  Typography,
  TypographyOptions,
} from "@mui/material/styles/createTypography";
import { ReactNode, useMemo } from "react";

import { customShadows } from "./custom-shadows";
import { overrides } from "./overrides";
import { palette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";

declare module "@mui/material/styles" {
  interface Theme {
    customShadows: { [key: string]: string };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: { [key: string]: string };
  }
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const memoizedValue: ThemeOptions = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
