"use client"

import { Slot } from "@radix-ui/react-slot"
import { type ComponentProps, isValidElement } from "react"
import { Box } from "~/components/common/box"
import { type VariantProps, cva, cx } from "~/utils/cva"

const dockItemVariants = cva({
  base: [
    "relative p-1.5 rounded transition-all duration-150 ease-in-out",
    "hover:pb-2.5 hover:-mt-1 hover:z-10",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],

  variants: {
    isActive: {
      true: "after:absolute after:mt-1 after:left-1/2 after:-translate-x-1/2 after:pointer-events-none after:bg-current after:w-2.5 after:h-px after:rounded-full",
      false: "text-foreground/65",
    },
  },

  defaultVariants: {
    isActive: false,
  },
})

type DockItemProps = ComponentProps<"div"> &
  VariantProps<typeof dockItemVariants> & {
    /**
     * If series to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean
  }

const DockItem = ({ className, asChild, isActive, ...props }: DockItemProps) => {
  const useAsChild = asChild && isValidElement(props.children)
  const Component = useAsChild ? Slot : "div"

  return <Component className={cx(dockItemVariants({ isActive, className }))} {...props} />
}

const DockSeparator = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cx("w-[1px] h-4 -my-2 mx-1.5 bg-foreground/15", className)} {...props} />
}

export const Dock = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <Box>
      <div
        className={cx(
          "flex items-center bg-background/50 shadow-foreground/10 shadow-[0_0_25px_0_var(--tw-shadow-color)] backdrop-blur-xl rounded-xl py-1.5 px-2 isolate",
          className,
        )}
        {...props}
      />
    </Box>
  )
}

Dock.Item = DockItem
Dock.Separator = DockSeparator
