import { ReactNode, useState } from 'react';
import { SpinnerContext } from '../contexts/spinnerContext';
import { Spinner } from '../components/common/ui/Spinner/Spinner';

interface SpinnerProviderProps {
  children: ReactNode;
}

export const SpinnerProvider: React.FC<SpinnerProviderProps> = ({
  children,
}) => {
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <Spinner variant="white" />
        </div>
      )}
    </SpinnerContext.Provider>
  );
};
