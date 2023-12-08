import { useContext } from "react";
import { SecondaryModalContext } from "@/contexts/secondaryModalContext";

export function useSecondaryModal() {
  const context = useContext(SecondaryModalContext);
  if (!context) {
    throw new Error("useSecondaryModal must be used within a ModalProvider");
  }
  return context;
}
