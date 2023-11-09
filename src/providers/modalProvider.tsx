import { UniversalModal } from "@/components/common/UniversalModal/UniversalModal";
import { ModalContext } from "@/contexts/modalContext";
import { ReactNode, useState } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && modalContent && (
        <UniversalModal>{modalContent}</UniversalModal>
      )}
    </ModalContext.Provider>
  );
}
