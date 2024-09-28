import { createContext, ReactNode } from "react";

type Props = {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<Props | undefined>(undefined);
