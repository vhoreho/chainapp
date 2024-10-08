import { useContext } from "react";
import { SnackBarContext } from "@/context/snackBarContext";

export const useSnackBarContext = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("useSnackBarContext must be used within a SnackBarProvider");
  }
  return context;
};
