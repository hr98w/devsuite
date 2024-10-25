import type { Metadata } from "next"
import { cache } from "react"
import { findCollections } from "~/api/collections/queries"
import { CategoryCard } from "~/components/web/cards/category-card"
import { EmptyList } from "~/components/web/empty-list"
import { Grid } from "~/components/web/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { parseMetadata } from "~/utils/metadata"

const getMetadata = cache(
  (metadata?: Metadata): Metadata => ({
    ...metadata,
    title: "Developer Tools by Collection",
    description:
      "Browse top collections of developer tools. Stop wasting time and money by developing tools that already exist.",
  }),
)

export const metadata = parseMetadata(
  getMetadata({
    alternates: { canonical: "/collections" },
    openGraph: { url: "/collections" },
  }),
)

export default async function Collections() {
  const { title, description } = getMetadata()
  const collections = await findCollections({})

  return (
    <Wrapper>
      <Intro alignment="center" className="max-w-2xl mx-auto text-pretty">
        <IntroTitle className="!leading-none">{title?.toString()}</IntroTitle>
        <IntroDescription>{description}</IntroDescription>
      </Intro>

      <Grid>
        {collections.map(collection => (
          <CategoryCard
            key={collection.id}
            href={`/collections/${collection.slug}`}
            category={collection}
          />
        ))}

        {!collections.length && <EmptyList>No collections found.</EmptyList>}
      </Grid>
    </Wrapper>
  )
}
