import type { ComponentProps } from "react"
import { H4 } from "~/components/common/heading"
import { Grid } from "~/components/web/ui/grid"
import { cx } from "~/utils/cva"

export const Listing = ({ children, className, title, ...props }: ComponentProps<"div">) => {
  return (
    <div className={cx("flex flex-col gap-6 lg:gap-8", className)} {...props}>
      <H4 as="h4" className="text-center">
        {title}
      </H4>

      <Grid>{children}</Grid>
    </div>
  )
}
