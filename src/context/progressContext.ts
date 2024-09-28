import { createContext } from "react";

interface ProgressContextType {
  handleStop: () => void;
  handleStart: () => void;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined);
