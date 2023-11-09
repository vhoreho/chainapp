"use client";

import { store } from "@/store";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";

type ReduxProviderProps = {
  children: ReactNode;
};

export const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
