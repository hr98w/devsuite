"use client"

import { cva } from "cva"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"
import { cx } from "~/utils/cva"

export const navigationLinkVariants = cva({
  base: ["group flex items-center gap-2 p-0.5 -m-0.5 text-sm cursor-pointer disabled:opacity-50"],
  variants: {
    isActive: {
      false: "text-foreground/65 hover:text-foreground",
      true: "text-foreground",
    },
  },
  defaultVariants: {
    isActive: false,
  },
})

const isItemActive = (href: string | undefined, pathname: string) => {
  if (href && href !== "/") {
    return pathname.includes(href)
  }

  return false
}

export const NavigationLink = ({
  className,
  ...props
}: ComponentProps<"a"> & ComponentProps<typeof Link>) => {
  const pathname = usePathname()
  const isActive = isItemActive(props.href, pathname)
  const Comp = props.href.startsWith("http") ? "a" : Link

  return <Comp className={cx(navigationLinkVariants({ isActive, className }))} {...props} />
}
