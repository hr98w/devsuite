import type { Metadata } from "next"
import { cache } from "react"
import { CategoryCard } from "~/components/web/cards/category-card"
import { EmptyList } from "~/components/web/empty-list"
import { Grid } from "~/components/web/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { findCategories } from "~/server/categories/queries"
import { parseMetadata } from "~/utils/metadata"

const getMetadata = cache(
  (metadata?: Metadata): Metadata => ({
    ...metadata,
    title: "Developer Tools by Category",
    description:
      "Browse top categories of developer tools. Stop wasting time and money by developing tools that already exist.",
  }),
)

export const metadata = parseMetadata(
  getMetadata({
    alternates: { canonical: "/categories" },
    openGraph: { url: "/categories" },
  }),
)

export default async function Categories() {
  const { title, description } = getMetadata()
  const categories = await findCategories({})

  return (
    <Wrapper>
      <Intro alignment="center">
        <IntroTitle>{title?.toString()}</IntroTitle>
        <IntroDescription>{description}</IntroDescription>
      </Intro>

      <Grid>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            href={`/categories/${category.slug}`}
            category={category}
          />
        ))}

        {!categories.length && <EmptyList>No categories found.</EmptyList>}
      </Grid>
    </Wrapper>
  )
}
