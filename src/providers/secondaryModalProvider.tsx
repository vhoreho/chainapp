import { ReactNode, useState } from "react";
import { UniversalModal } from "@/components/common/UniversalModal/UniversalModal";
import { SecondaryModalContext } from "@/contexts/secondaryModalContext";

interface ModalProviderProps {
  children: ReactNode;
}

export function SecondaryModalProvider({ children }: ModalProviderProps) {
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
    <SecondaryModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && modalContent && <UniversalModal className="z-[70]">{modalContent}</UniversalModal>}
    </SecondaryModalContext.Provider>
  );
}
