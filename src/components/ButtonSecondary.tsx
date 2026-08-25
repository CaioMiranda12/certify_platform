import type { ReactNode } from "react";

interface SecondaryButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}

export function SecondaryButton({ children, isDisabled = false, onClick, isActive }: SecondaryButtonProps) {
  const activeStyle = isActive
    ? "bg-primary-blue-100 text-primary-blue-500"
    : "";

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`w-full bg-transparent hover:bg-[#F3F4F6] transition-colors duration-300 text-[#6B7280] font-medium text-sm py-2 rounded-md cursor-pointer
      `}>
      {children}
    </button>
  )
}