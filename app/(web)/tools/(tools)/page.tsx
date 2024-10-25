import type { Prisma } from "@prisma/client"
import type { Metadata } from "next"
import type { SearchParams } from "nuqs/server"
import { cache } from "react"
import { countTools, findTools } from "~/api/tools/queries"
import { ToolFilters } from "~/app/(web)/tools/(tools)/filters"
import { ToolCard } from "~/components/web/cards/tool-card"
import { EmptyList } from "~/components/web/empty-list"
import { Pagination } from "~/components/web/pagination"
import { Grid } from "~/components/web/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { parseMetadata } from "~/utils/metadata"
import { searchParamsCache } from "./search-params"

type PageProps = {
  searchParams: Promise<SearchParams>
}

const getMetadata = cache(
  (metadata?: Metadata): Metadata => ({
    ...metadata,
    title: "Browse Top Developer Tools",
    description:
      "Browse top developer tools. Stop wasting time and money by developing tools that already exist.",
  }),
)

export const metadata = parseMetadata(
  getMetadata({
    alternates: { canonical: "/tools" },
    openGraph: { url: "/tools" },
  }),
)

export default async function ToolsPage({ searchParams }: PageProps) {
  const { title, description } = getMetadata()
  const { q, page, sort, perPage } = searchParamsCache.parse(await searchParams)

  const skip = (page - 1) * perPage
  const take = perPage
  const sortArray = sort.split("_")
  const sortBy = sortArray[0]
  const sortOrder = sortArray[1]

  const where = q
    ? ({
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      } as Prisma.ToolWhereInput)
    : undefined

  const [tools, totalCount] = await Promise.all([
    findTools({
      orderBy: { [sortBy]: sortOrder },
      where,
      skip,
      take,
    }),

    countTools({
      where,
    }),
  ])

  return (
    <Wrapper>
      <Intro alignment="center" className="max-w-2xl mx-auto text-pretty">
        <IntroTitle>{title?.toString()}</IntroTitle>
        <IntroDescription>{description}</IntroDescription>
      </Intro>

      <div className="flex flex-col gap-6 lg:gap-8">
        <ToolFilters />

        <Grid>
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}

          {!tools.length && <EmptyList>No tools found{q ? ` for "${q}"` : ""}.</EmptyList>}
        </Grid>
      </div>

      <Pagination pageSize={perPage} totalCount={totalCount} />
    </Wrapper>
  )
}
