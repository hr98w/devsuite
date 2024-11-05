import type { Metadata } from "next"
import type { SearchParams } from "nuqs/server"
import { cache } from "react"
import { searchTools } from "~/api/tools/queries"
import { ToolList } from "~/components/web/tool-list"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { parseMetadata } from "~/utils/metadata"

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

export default async function Tools({ searchParams }: PageProps) {
  const { title, description } = getMetadata()
  const { tools, totalCount } = await searchTools(await searchParams, {})

  return (
    <Wrapper>
      <Intro alignment="center">
        <IntroTitle>{title?.toString()}</IntroTitle>
        <IntroDescription>{description}</IntroDescription>
      </Intro>

      <ToolList tools={tools} totalCount={totalCount} />
    </Wrapper>
  )
}
