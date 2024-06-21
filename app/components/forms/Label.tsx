import { type LabelHTMLAttributes, forwardRef } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const labelVariants = cva({
  base: "block self-start text-sm font-semibold text-foreground [&[for]]:cursor-pointer",

  variants: {
    isRequired: {
      true: "after:ml-0.5 after:text-red-500/75 after:content-['*']",
    },
  },
})

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & VariantProps<typeof labelVariants>

export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { className, htmlFor, isRequired, ...rest } = props

  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cx(labelVariants({ isRequired, className }))}
      {...rest}
    />
  )
})

Label.displayName = "Label"
