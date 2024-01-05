import { useContext } from "react";
import { ProgressContext } from "@/contexts/progressContext";

export const useProgressContext = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgressContext must be used within a ProgressProvider");
  }
  return context;
};
