import { useContext } from "react";
import { ModalContext } from "@/context/modalContext";

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal context must be used within a ModalProvider");
  }
  return context;
};
