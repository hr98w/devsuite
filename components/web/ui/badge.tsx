import { Slot } from "@radix-ui/react-slot"
import { type ComponentProps, type ReactNode, isValidElement } from "react"
import { Slottable } from "~/components/common/slottable"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const badgeVariants = cva({
  base: "flex items-center text-foreground/65 font-display rounded",

  variants: {
    variant: {
      soft: "bg-foreground/[7.5%] hover:[&[href]]:bg-foreground/10",
      outline:
        "bg-background ring-1 ring-foreground/15 hover:[&[href]]:ring-foreground/25 hover:[&[href]]:text-foreground",
      ghost: "bg-transparent !p-0 hover:[&[href]]:text-foreground",
      success: "bg-green-500/50 text-foreground",
      error: "bg-red-500/50 text-foreground",
    },
    size: {
      sm: "px-1 py-px gap-1 text-[10px]/tight",
      md: "px-1.5 py-[3px] gap-1.5 text-xs/tight",
      lg: "px-2 py-1 gap-2 text-xs/tight",
    },
  },

  defaultVariants: {
    variant: "soft",
    size: "md",
  },
})

export const badgeAffixVariants = cva({
  base: "shrink-0 size-[1em]",
})

type BadgeProps = Omit<ComponentProps<"span">, "prefix"> &
  VariantProps<typeof badgeVariants> & {
    /**
     * If set to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean

    /**
     * The slot to be rendered before the label.
     */
    prefix?: ReactNode

    /**
     * The slot to be rendered after the label.
     */
    suffix?: ReactNode
  }

export const Badge = ({
  children,
  className,
  asChild,
  variant,
  size,
  prefix,
  suffix,
  ...props
}: BadgeProps) => {
  const useAsChild = asChild && isValidElement(children)
  const Component = useAsChild ? Slot : "span"

  return (
    <Component className={cx(badgeVariants({ variant, size, className }))} {...props}>
      <Slottable child={children} asChild={asChild}>
        {child => (
          <>
            {prefix && <Slot className={cx(badgeAffixVariants())}>{prefix}</Slot>}
            {child}
            {suffix && <Slot className={cx(badgeAffixVariants())}>{suffix}</Slot>}
          </>
        )}
      </Slottable>
    </Component>
  )
}
