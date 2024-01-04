import { createContext } from "react";
import { AlertColor } from "@mui/material";

interface SnackBarContextType {
  handleClose: () => void;
  handleShow: (message: string, severity: AlertColor) => void;
}

export const SnackBarContext = createContext<SnackBarContextType | undefined>(undefined);
