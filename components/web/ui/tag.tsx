import { Slot } from "@radix-ui/react-slot"
import { type HTMLAttributes, type ReactNode, forwardRef, isValidElement } from "react"
import { Slottable } from "~/components/common/slottable"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const tagVariants = cva({
  base: "flex items-center gap-1 text-foreground/65 text-sm hover:text-foreground",
})

export const tagAffixVariants = cva({
  base: "shrink-0 stroke-2 text-foreground/25",
})

type TagProps = Omit<HTMLAttributes<HTMLElement>, "prefix"> &
  VariantProps<typeof tagVariants> & {
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

export const Tag = forwardRef<HTMLSpanElement, TagProps>((props: TagProps, ref) => {
  const { children, className, asChild, prefix, suffix, ...rest } = props

  const useAsChild = asChild && isValidElement(props.children)
  const Component = useAsChild ? Slot : "span"

  return (
    <Component className={cx(tagVariants({ className }))} {...rest} ref={ref}>
      <Slottable child={children} asChild={asChild}>
        {child => (
          <>
            {prefix && <Slot className={cx(tagAffixVariants())}>{prefix}</Slot>}
            {child}
            {suffix && <Slot className={cx(tagAffixVariants())}>{suffix}</Slot>}
          </>
        )}
      </Slottable>
    </Component>
  )
})
