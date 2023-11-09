import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

type ReduxProviderProps = {
  children: ReactNode;
};

export const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
