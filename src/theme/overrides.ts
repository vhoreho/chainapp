import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { Theme, alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export function overrides(theme: Theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
        },
        __next: {
          width: "100%",
          height: "100%",
        },
      },
    },
  };
}
