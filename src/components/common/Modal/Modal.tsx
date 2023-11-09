import React, { ReactNode, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          ref={modalRef}
        >
          <div className="animate-rollout rounded-md bg-white  p-4">{children}</div>
        </div>
      )}
    </>
  );
};
