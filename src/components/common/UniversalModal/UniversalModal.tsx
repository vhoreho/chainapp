import React, { useRef } from "react";
import classNames from "classnames";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
}

export function UniversalModal({ children, className }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={classNames(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        className,
      )}
    >
      <div ref={modalRef} className="animate-rollout rounded-md bg-white p-4 transition-all">
        {children}
      </div>
    </div>
  );
}
