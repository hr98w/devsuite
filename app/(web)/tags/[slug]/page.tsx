import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { SearchParams } from "nuqs/server"
import { ToolList } from "~/components/web/tool-list"
import { Intro, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { findTagSlugs, findUniqueTag } from "~/server/tags/queries"
import { searchTools } from "~/server/tools/queries"
import { parseMetadata } from "~/utils/metadata"

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}

export const generateStaticParams = async () => {
  const tags = await findTagSlugs({})
  return tags.map(({ slug }) => ({ slug }))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata | undefined> => {
  const { slug } = await params
  const tag = await findUniqueTag({ where: { slug } })
  const url = `/tags/${slug}`

  if (!tag) {
    return
  }

  return parseMetadata({
    title: tag.name,
    alternates: { canonical: url },
    openGraph: { url },
  })
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const { slug } = await params

  const [tag, { tools, totalCount }] = await Promise.all([
    findUniqueTag({ where: { slug } }),
    searchTools(await searchParams, { where: { tags: { some: { slug } } } }),
  ])

  if (!tag) {
    notFound()
  }

  return (
    <Wrapper>
      <Intro alignment="center">
        <IntroTitle>{tag.name}</IntroTitle>
      </Intro>

      <ToolList tools={tools} totalCount={totalCount} placeholder={`Search in "${tag.name}"`} />
    </Wrapper>
  )
}
