import { ComponentProps } from "react"

export interface NavLinkProps extends ComponentProps<'a'> {
  children: string
}
export default function NavLink({children, ...props}: NavLinkProps) {
  return (
    <a  {...props} className="font-medium text-sm">
      {children}
    </a>
  )
}