import { H5 } from "~/components/common/heading"
import { Skeleton } from "~/components/common/skeleton"

export const TagSkeleton = () => {
  return (
    <div className="group animate-reveal min-w-0 flex items-center gap-4">
      <H5 className="w-1/3 !text-base">
        <Skeleton>&nbsp;</Skeleton>
      </H5>

      <Skeleton className="h-0.5 flex-1" />

      <span className="w-1/5 shrink-0 text-xs text-foreground/50">
        <Skeleton>&nbsp;</Skeleton>
      </span>
    </div>
  )
}
