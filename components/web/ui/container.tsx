import type { ComponentProps } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"

const containerVariants = cva({
  base: "relative w-full max-w-[64rem] mx-auto px-6 lg:px-8",
})

type ContainerProps = ComponentProps<"div"> & VariantProps<typeof containerVariants>

export const Container = ({ className, ...props }: ContainerProps) => {
  return <div className={cx(containerVariants({ className }))} {...props} />
}
