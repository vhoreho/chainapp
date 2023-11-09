import { createContext } from "react";

interface SpinnerContextType {
  showSpinner: () => void;
  hideSpinner: () => void;
}

export const SpinnerContext = createContext<SpinnerContextType | undefined>(undefined);
