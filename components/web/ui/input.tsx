import type { ComponentProps } from "react"
import { Box } from "~/components/common/box"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const inputVariants = cva({
  base: [
    "appearance-none min-h-0 bg-transparent text-foreground rounded-lg break-words truncate transition duration-150 placeholder:text-inherit placeholder:opacity-50 disabled:opacity-25",
    "resize-none [field-sizing:content]",
  ],

  variants: {
    size: {
      sm: "px-2 py-0.5 text-[13px]/normal rounded-md",
      md: "px-3 py-1 text-[13px]/normal rounded-md",
      lg: "px-4 py-2.5 text-sm/normal rounded-lg",
    },
  },

  defaultVariants: {
    size: "md",
  },
})

export type InputProps = Omit<ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>

export const Input = ({ size, className, ...props }: InputProps) => {
  return (
    <Box focus>
      <input className={cx(inputVariants({ size, className }))} {...props} />
    </Box>
  )
}
