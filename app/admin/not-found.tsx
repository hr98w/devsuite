"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "~/components/admin/ui/button"
import { H3 } from "~/components/common/heading"

export default function NotFound() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col items-start gap-2 max-w-lg">
      <H3 as="h1">404 Not Found</H3>

      <p className="text-muted-foreground">
        We're sorry, but the page {pathname} could not be found. You may have mistyped the address
        or the page may have moved.
      </p>

      <Button className="mt-4" asChild>
        <Link href="/admin">Go back home</Link>
      </Button>
    </div>
  )
}
