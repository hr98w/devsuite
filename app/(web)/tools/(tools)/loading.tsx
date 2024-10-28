import { Skeleton } from "~/components/common/skeleton"
import { ToolListSkeleton } from "~/components/web/tool-list-skeleton"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"

export default function Loading() {
  return (
    <Wrapper>
      <Intro alignment="center" className="max-w-2xl mx-auto text-pretty">
        <IntroTitle className="!leading-none">
          <Skeleton className="w-48">&nbsp;</Skeleton>
        </IntroTitle>

        <IntroDescription>
          <Skeleton className="w-full">&nbsp;</Skeleton>
        </IntroDescription>
      </Intro>

      <ToolListSkeleton />
    </Wrapper>
  )
}
