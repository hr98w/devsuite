import type { Metadata } from "next"
import type { SearchParams } from "nuqs/server"
import { cache } from "react"
import { TagCard } from "~/components/web/cards/tag-card"
import { EmptyList } from "~/components/web/empty-list"
import { Pagination } from "~/components/web/pagination"
import { Grid } from "~/components/web/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { countTags, findTags } from "~/server/tags/queries"
import { searchParamsCache } from "~/server/tags/search-params"
import { parseMetadata } from "~/utils/metadata"

type PageProps = {
  searchParams: Promise<SearchParams>
}

const getMetadata = cache(
  (metadata?: Metadata): Metadata => ({
    ...metadata,
    title: "Developer Tools by Tag",
    description:
      "Browse top tags of developer tools. Stop wasting time and money by developing tools that already exist.",
  }),
)

export const metadata = parseMetadata(
  getMetadata({
    alternates: { canonical: "/tags" },
    openGraph: { url: "/tags" },
  }),
)

export default async function Tags({ searchParams }: PageProps) {
  const { title, description } = getMetadata()
  const params = await searchParams
  const { page, perPage } = searchParamsCache.parse({ perPage: "96", ...params })

  const skip = (page - 1) * perPage
  const take = perPage

  const [tags, totalCount] = await Promise.all([
    findTags({
      skip,
      take,
    }),

    countTags({}),
  ])

  return (
    <Wrapper>
      <Intro alignment="center">
        <IntroTitle>{title?.toString()}</IntroTitle>
        <IntroDescription>{description}</IntroDescription>
      </Intro>

      <Grid className="md:gap-8">
        {tags.map(tag => (
          <TagCard key={tag.id} tag={tag} />
        ))}

        {!tags.length && <EmptyList>No tags found.</EmptyList>}
      </Grid>

      <Pagination pageSize={perPage} totalCount={totalCount} />
    </Wrapper>
  )
}
