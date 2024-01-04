import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MUIThemeProvider, ThemeOptions, createTheme } from "@mui/material";
import { Typography, TypographyOptions } from "@mui/material/styles/createTypography";
import { CSSProperties, ReactNode, useMemo } from "react";

import { customShadows } from "./custom-shadows";
import { overrides } from "./overrides";
import { shadows } from "./shadows";
import { typography } from "./typography";
import { palette } from "./palette";

declare module "@mui/material/styles" {
  interface Theme {
    customShadows: { [key: string]: string };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: { [key: string]: string };
  }

  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties["fontFamily"];
    fontWeightSemiBold: CSSProperties["fontWeight"];
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    fontSecondaryFamily?: React.CSSProperties["fontFamily"];
    fontWeightSemiBold?: CSSProperties["fontWeight"];
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    fontSecondaryFamily: true;
    fontWeightSemiBold: true;
  }
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const memoizedValue: ThemeOptions = useMemo(
    () => ({
      typography,
      palette: palette(),
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    [],
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
