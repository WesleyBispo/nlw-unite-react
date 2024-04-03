import { ComponentProps } from "react";

export interface TableHeaderProps extends ComponentProps<'th'> {}


export default function TableHeader(props: TableHeaderProps) {
  return (
    <th className="py-3 px-4 text-sm font-semibold" {...props}/>
  )
}