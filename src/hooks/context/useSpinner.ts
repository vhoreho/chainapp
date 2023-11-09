import { useContext } from "react";
import { SpinnerContext } from "@/contexts/spinnerContext";

export const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error("useSpinner must be used within a SpinnerProvider");
  }
  return context;
};
