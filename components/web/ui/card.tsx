import { Slot } from "@radix-ui/react-slot"
import type { ComponentProps } from "react"
import { isValidElement } from "react"
import { Box, type BoxProps } from "~/components/common/box"
import { H3 } from "~/components/common/heading"
import { Stars } from "~/components/web/ui/stars"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const cardVariants = cva({
  base: "group/card relative w-full flex flex-col items-start gap-4 rounded-lg p-6 backdrop-blur-lg transform-gpu",

  variants: {
    isFeatured: {
      true: "",
    },
    isRevealed: {
      true: "animate-reveal",
    },
  },

  defaultVariants: {
    isFeatured: false,
    isRevealed: true,
  },
})

export type CardProps = ComponentProps<"div"> &
  BoxProps &
  VariantProps<typeof cardVariants> & {
    /**
     * If card to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean
  }

export const Card = ({
  className,
  hover = true,
  focus = true,
  asChild,
  isFeatured,
  isRevealed,
  ...props
}: CardProps) => {
  const useAsChild = asChild && isValidElement(props.children)
  const Component = useAsChild ? Slot : "div"

  return (
    <Box hover={hover} focus={focus}>
      <Component className={cx(cardVariants({ isFeatured, isRevealed, className }))} {...props} />
    </Box>
  )
}

export const CardHeader = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cx("flex flex-col space-y-1.5 p-4 md:p-6", className)} {...props} />
}

export const CardTitle = ({ ...props }: ComponentProps<"h3">) => {
  return <H3 {...props} />
}

export const CardDescription = ({ className, ...props }: ComponentProps<"p">) => {
  return <p className={cx("text-sm text-foreground/65 line-clamp-2", className)} {...props} />
}

export const CardContent = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cx("w-full p-4 pt-0 md:p-6 md:pt-0", className)} {...props} />
}

export const CardFooter = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cx("flex items-center p-4 pt-0 md:p-6 md:pt-0", className)} {...props} />
}

export const CardStars = ({ className, ...props }: ComponentProps<"div">) => {
  return <Stars className={cx("absolute inset-0 -z-10", className)} {...props} />
}
