import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface TableCellProps extends ComponentProps<'td'> {}


export default function TableCell(props: TableCellProps) {
  return (
    <td {...props} className={twMerge("py-3 px-4 text-sm text-zinc-300", props.className )}/>
  )
}