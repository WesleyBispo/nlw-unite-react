import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface IconButtonProps extends ComponentProps<'button'> {
  children: JSX.Element
  transparent?: boolean
}
export default function IconButton({ children, transparent, disabled, ...props}: IconButtonProps) {
  return (
    <button {...props} 
    className={
     twMerge(
      'p-1.5 border border-white/10 rounded-md flex items-center justify-center',
      transparent ? 'bg-black/20': 'bg-white/10',
      disabled ? 'cursor-not-allowed opacity-40' : null 
     )
    }
    >
      {children}
    </button>
   )
}