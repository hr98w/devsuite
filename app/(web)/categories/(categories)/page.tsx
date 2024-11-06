import type { Metadata } from "next"
import { Suspense, cache } from "react"
import { CategorySkeleton } from "~/components/web/cards/category-skeleton"
import { Grid } from "~/components/web/ui/grid"
import { Intro, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { parseMetadata } from "~/utils/metadata"
import { CategoriesListing } from "./listing"

const getMetadata = cache(
  (metadata?: Metadata): Metadata => ({
    ...metadata,
    title: "Browse Categories",
  }),
)

export const metadata = parseMetadata(
  getMetadata({
    alternates: { canonical: "/categories" },
    openGraph: { url: "/categories" },
  }),
)

export default function Categories() {
  const { title } = getMetadata()

  return (
    <Wrapper>
      <Intro>
        <IntroTitle>{title?.toString()}</IntroTitle>
      </Intro>

      <Grid>
        <Suspense fallback={[...Array(6)].map((_, index) => <CategorySkeleton key={index} />)}>
          <CategoriesListing />
        </Suspense>
      </Grid>
    </Wrapper>
  )
}
