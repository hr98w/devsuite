import { Slot } from "@radix-ui/react-slot"
import Link, { type LinkProps } from "next/link"

import type { HTMLAttributes, ReactNode } from "react"
import { navigationLinkVariants } from "~/components/web/ui/navigation-link"
import { type VariantProps, cva, cx } from "~/utils/cva"

const affixVariants = cva({
  base: "size-5 duration-150 group-hover:first:-translate-x-0.5 group-hover:last:translate-x-0.5",
})

type PaginationLinkProps = Omit<HTMLAttributes<HTMLElement> & LinkProps, "prefix"> &
  VariantProps<typeof navigationLinkVariants> & {
    prefix?: ReactNode
    suffix?: ReactNode
    isDisabled?: boolean
  }

export const PaginationLink = ({
  children,
  className,
  prefix,
  suffix,
  isActive,
  isDisabled,
  ...props
}: PaginationLinkProps) => {
  if (isDisabled) {
    return (
      <span className={cx(navigationLinkVariants({ className: "pointer-events-none opacity-40" }))}>
        <Slot className={affixVariants()}>{prefix}</Slot>
        <span>{children}</span>
        <Slot className={affixVariants()}>{suffix}</Slot>
      </span>
    )
  }

  return (
    <Link
      className={cx(
        isActive && "bg-card-dark rounded-sm",
        navigationLinkVariants({ isActive, className }),
      )}
      {...props}
    >
      <Slot className={affixVariants()}>{prefix}</Slot>
      <span>{children}</span>
      <Slot className={affixVariants()}>{suffix}</Slot>
    </Link>
  )
}
