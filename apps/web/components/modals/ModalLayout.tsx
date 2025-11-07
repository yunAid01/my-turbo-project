import { X } from "lucide-react";
import React from "react";

interface ModalLayoutProps {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}
export default function ModalLayout({
  children,
  isOpen,
  onClose,
}: ModalLayoutProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="모달 닫기"
        >
          <X size={24} />
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
