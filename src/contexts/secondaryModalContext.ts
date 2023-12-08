import { createContext, ReactNode } from "react";

interface SecondaryModalContextType {
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

export const SecondaryModalContext = createContext<SecondaryModalContextType | undefined>(
  undefined,
);
