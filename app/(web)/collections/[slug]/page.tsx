import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { SearchParams } from "nuqs/server"
import { ToolList } from "~/components/web/tool-list"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { findCollectionSlugs, findUniqueCollection } from "~/server/collections/queries"
import { searchTools } from "~/server/tools/queries"
import { parseMetadata } from "~/utils/metadata"

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}

export const generateStaticParams = async () => {
  const collections = await findCollectionSlugs({})
  return collections.map(({ slug }) => ({ slug }))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata | undefined> => {
  const { slug } = await params
  const collection = await findUniqueCollection({ where: { slug } })
  const url = `/collections/${slug}`

  if (!collection) {
    return
  }

  return parseMetadata({
    title: collection.name,
    alternates: { canonical: url },
    openGraph: { url },
  })
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const { slug } = await params

  const [collection, { tools, totalCount }] = await Promise.all([
    findUniqueCollection({ where: { slug } }),
    searchTools(await searchParams, { where: { collections: { some: { slug } } } }),
  ])

  if (!collection) {
    notFound()
  }

  return (
    <Wrapper>
      <Intro alignment="center">
        <IntroTitle>{collection.name}</IntroTitle>
        <IntroDescription>{collection.description}</IntroDescription>
      </Intro>

      <ToolList
        tools={tools}
        totalCount={totalCount}
        placeholder={`Search ${collection.name.toLowerCase()} tools...`}
      />
    </Wrapper>
  )
}
