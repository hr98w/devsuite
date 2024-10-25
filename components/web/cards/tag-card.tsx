import Link from "next/link"
import plur from "plur"
import type { HTMLAttributes } from "react"
import type { TagMany } from "~/api/tags/payloads"
import { H5 } from "~/components/common/heading"
import { cx } from "~/utils/cva"

type TagCardProps = HTMLAttributes<HTMLElement> & {
  tag: TagMany
}

export const TagCard = ({ className, tag, ...props }: TagCardProps) => {
  return (
    <Link
      href={`/tags/${tag.slug}`}
      className={cx("group animate-reveal -my-2 py-2 min-w-0 flex items-center gap-4", className)}
      {...props}
    >
      <H5 as="h3" className="truncate !text-base group-hover:underline">
        {tag.name}
      </H5>

      <hr className="min-w-2 flex-1" />

      <span className="shrink-0 text-xs text-foreground/50">
        {tag._count.tools} {plur("tool", tag._count.tools)}
      </span>
    </Link>
  )
}
