import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
}

export function PrimaryButton({ children, isDisabled = false, onClick }: PrimaryButtonProps) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className="w-full h-full bg-[#0069A8] hover:bg-[#052F4A] disabled:bg-[#E5E7EB] disabled:text-[#99A1AF] transition-colors duration-300 text-white font-medium text-sm py-2 rounded-md cursor-pointer shadow-sm">
      {children}
    </button>
  )
}