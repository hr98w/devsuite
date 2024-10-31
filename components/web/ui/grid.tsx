import type { ComponentProps } from "react"
import { cx } from "~/utils/cva"

export const Grid = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cx("grid grid-auto-fill-lg gap-5 w-full", className)} {...props} />
}
