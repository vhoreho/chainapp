import React, { useRef, ReactNode } from 'react';

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
          className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
          ref={modalRef}
        >
          <div className="bg-white rounded-md p-4  animate-rollout">
            {children}
          </div>
        </div>
      )}
    </>
  );
};
