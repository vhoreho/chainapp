import { ReactNode, useState } from 'react';
import { Spinner } from "@/components/common";
import { SpinnerContext } from "../contexts/spinnerContext";

interface SpinnerProviderProps {
  children: ReactNode;
  variant?: "white" | "blue";
  size?: "xs" | "md" | "lg";
}

export const SpinnerProvider: React.FC<SpinnerProviderProps> = ({ children, size, variant }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showSpinner = () => {
    setIsLoading(true);
  };

  const hideSpinner = () => {
    setIsLoading(false);
  };

  return (
    <SpinnerContext.Provider value={{ showSpinner, hideSpinner }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Spinner variant={variant} size="lg" />
        </div>
      )}
    </SpinnerContext.Provider>
  );
};
