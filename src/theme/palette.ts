import { PaletteMode } from "@mui/material";
import { grey } from "@mui/material/colors";
import { alpha, TypeAction } from "@mui/material/styles";

// ----------------------------------------------------------------------

// SETUP COLORS

export const customGreyPalette = {
  ...grey,
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

export const primary = {
  lighter: "#D0ECFE",
  light: "#0c804a",
  main: "#12B76A",
  dark: "#41c587",
  darker: "#042174",
  contrastText: "#FFFFFF",
};

export const secondary = {
  lighter: "#EFD6FF",
  light: "#C684FF",
  main: "#8E33FF",
  dark: "#5119B7",
  darker: "#27097A",
  contrastText: "#FFFFFF",
};

export const info = {
  lighter: "#CAFDF5",
  light: "#61F3F3",
  main: "#00B8D9",
  dark: "#006C9C",
  darker: "#003768",
  contrastText: "#FFFFFF",
};

export const success = {
  lighter: "#C8FAD6",
  light: "#5BE49B",
  main: "#00A76F",
  dark: "#007867",
  darker: "#004B50",
  contrastText: "#FFFFFF",
};

export const warning = {
  lighter: "#FFF5CC",
  light: "#FFD666",
  main: "#FFAB00",
  dark: "#B76E00",
  darker: "#7A4100",
  contrastText: customGreyPalette[800],
};

export const error = {
  lighter: "#FFE9D5",
  light: "#FFAC82",
  main: "#FF5630",
  dark: "#B71D18",
  darker: "#7A0916",
  contrastText: "#FFFFFF",
};

export const common = {
  black: "#000000",
  white: "#FFFFFF",
};

export const action: TypeAction = {
  hover: alpha(customGreyPalette[500], 0.08),
  selected: alpha(customGreyPalette[500], 0.16),
  disabled: alpha(customGreyPalette[500], 0.8),
  disabledBackground: alpha(customGreyPalette[500], 0.24),
  focus: alpha(customGreyPalette[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
  active: "",
  selectedOpacity: 0,
  focusOpacity: 0,
  activatedOpacity: 0,
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(customGreyPalette[500], 0.2),
  action,
  contrastThreshold: 0,
  mode: "light",
};

// ----------------------------------------------------------------------

export function palette() {
  return {
    ...base,
    mode: "light" as PaletteMode,
    text: {
      primary: customGreyPalette[800],
      secondary: customGreyPalette[600],
      disabled: customGreyPalette[500],
    },
    background: {
      paper: "#FFFFFF",
      default: "#F4F5FA",
    },
    action: {
      ...base.action,
      active: customGreyPalette[600],
    },
  };
}
