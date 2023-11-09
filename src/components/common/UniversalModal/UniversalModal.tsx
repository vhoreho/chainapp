import React, { useRef } from "react";
import { useModal } from "@/hooks/context";

interface ModalProps {
  children: React.ReactNode;
}

export function UniversalModal({ children }: ModalProps) {
  const { closeModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="animate-rollout rounded-md bg-white p-4">
        {children}
      </div>
    </div>
  );
}
