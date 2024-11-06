import type { Metadata } from "next"
import type { SearchParams } from "nuqs/server"
import { Suspense, cache } from "react"
import { TagsListing } from "~/app/(web)/tags/(tags)/listing"
import { TagSkeleton } from "~/components/web/cards/tag-skeleton"
import { Grid } from "~/components/web/ui/grid"
import { Intro, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { parseMetadata } from "~/utils/metadata"

type PageProps = {
  searchParams: Promise<SearchParams>
}

const getMetadata = cache(
  (metadata?: Metadata): Metadata => ({
    ...metadata,
    title: "Browse Tags",
  }),
)

export const metadata = parseMetadata(
  getMetadata({
    alternates: { canonical: "/tags" },
    openGraph: { url: "/tags" },
  }),
)

export default function Tags({ searchParams }: PageProps) {
  const { title } = getMetadata()

  return (
    <Wrapper>
      <Intro>
        <IntroTitle>{title?.toString()}</IntroTitle>
      </Intro>

      <Grid className="md:gap-8">
        <Suspense fallback={[...Array(24)].map((_, index) => <TagSkeleton key={index} />)}>
          <TagsListing searchParams={searchParams} />
        </Suspense>
      </Grid>
    </Wrapper>
  )
}
