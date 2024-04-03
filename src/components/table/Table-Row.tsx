import { ComponentProps } from "react";
export interface TableRowProps extends ComponentProps<'tr'> {}

export default function TableRow(props: TableRowProps) {
  return (
    <tr className="border-b border-white/10 text-left" {...props}></tr>
  )
}