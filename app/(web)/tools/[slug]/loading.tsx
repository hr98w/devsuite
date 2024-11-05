import { ArrowUpRightIcon, HashIcon } from "lucide-react"
import { RelatedToolsSkeleton } from "~/app/(web)/tools/[slug]/related-tools-skeleton"
import { Skeleton } from "~/components/common/skeleton"
import { Stack } from "~/components/common/stack"
import { Button } from "~/components/web/ui/button"
import { Gallery } from "~/components/web/ui/gallery"
import { Tag } from "~/components/web/ui/tag"
import { Wrapper } from "~/components/web/ui/wrapper"

export default function Loading() {
  return (
    <>
      <Wrapper size="sm">
        <div className="flex w-full flex-col items-start gap-y-4">
          <Stack size="lg" className="relative w-full justify-between">
            <Stack size="lg">
              <Skeleton className="size-10 rounded-md" />
              <Skeleton className="h-8 w-48" />
            </Stack>

            <Button size="md" variant="primary" suffix={<ArrowUpRightIcon />} disabled>
              <Skeleton className="w-20">&nbsp;</Skeleton>
            </Button>
          </Stack>

          <Stack size="sm" direction="column" className="w-full">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
          </Stack>

          <Stack size="sm" className="mt-4">
            <Skeleton className="h-4 w-24 ml-1" />
            <Skeleton className="h-4 w-32 ml-1" />
          </Stack>
        </div>

        <Gallery images={[""]} />

        <div className="space-y-2">
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} className="h-4" style={{ width: `${50 + Math.random() * 50}%` }} />
          ))}
        </div>

        <Stack>
          {[...Array(6)].map((_, i) => (
            <Tag key={i} prefix={<HashIcon />}>
              <Skeleton className="h-3 w-12" />
            </Tag>
          ))}
        </Stack>
      </Wrapper>

      <RelatedToolsSkeleton />
    </>
  )
}
