import type { Metadata } from "next"
import { Suspense, cache } from "react"
import { CategorySkeleton } from "~/components/web/cards/category-skeleton"
import { Grid } from "~/components/web/ui/grid"
import { Intro, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { parseMetadata } from "~/utils/metadata"
import { CollectionsListing } from "./listing"

const getMetadata = cache(
  (metadata?: Metadata): Metadata => ({
    ...metadata,
    title: "Browse Collections",
  }),
)

export const metadata = parseMetadata(
  getMetadata({
    alternates: { canonical: "/collections" },
    openGraph: { url: "/collections" },
  }),
)

export default function Collections() {
  const { title } = getMetadata()

  return (
    <Wrapper>
      <Intro>
        <IntroTitle>{title?.toString()}</IntroTitle>
      </Intro>

      <Grid>
        <Suspense fallback={[...Array(6)].map((_, index) => <CategorySkeleton key={index} />)}>
          <CollectionsListing />
        </Suspense>
      </Grid>
    </Wrapper>
  )
}
