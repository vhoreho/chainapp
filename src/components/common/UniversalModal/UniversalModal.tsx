import { useModal } from "@/hooks/context";
import React, { useRef } from "react";

interface ModalProps {
  children: React.ReactNode;
}

export function UniversalModal({ children }: ModalProps) {
  const { closeModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white rounded-md p-4 animate-rollout">
        {children}
      </div>
    </div>
  );
}
