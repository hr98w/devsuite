import type { ComponentProps, HTMLAttributes } from "react"
import { Heading, type HeadingProps } from "~/components/common/heading"
import { type VariantProps, cva, cx } from "~/utils/cva"

const introVariants = cva({
  base: "flex flex-col gap-y-4 w-full max-w-md sm:max-w-xl md:max-w-3xl",

  variants: {
    alignment: {
      start: "items-start text-start mr-auto",
      center: "items-center text-center mx-auto",
      end: "items-end text-end ml-auto",
    },
  },

  defaultVariants: {
    alignment: "center",
  },
})

type IntroProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof introVariants> & {
    headingProps?: HeadingProps
  }

const Intro = ({ className, alignment, ...props }: IntroProps) => {
  return <div className={cx(introVariants({ alignment, className }))} {...props} />
}

const IntroTitle = ({ size = "h1", ...props }: ComponentProps<typeof Heading>) => {
  return <Heading size={size} {...props} />
}

const IntroDescription = ({ className, ...props }: ComponentProps<"h2">) => {
  return (
    <h2
      className={cx("w-full max-w-2xl text-base text-foreground/65 md:text-lg", className)}
      {...props}
    />
  )
}

export { Intro, IntroTitle, IntroDescription }
