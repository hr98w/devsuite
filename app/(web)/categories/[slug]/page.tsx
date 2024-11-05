import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { SearchParams } from "nuqs/server"
import { ToolList } from "~/components/web/tool-list"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { findCategorySlugs, findUniqueCategory } from "~/server/categories/queries"
import { searchTools } from "~/server/tools/queries"
import { parseMetadata } from "~/utils/metadata"

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}

export const generateStaticParams = async () => {
  const categories = await findCategorySlugs({})
  return categories.map(({ slug }) => ({ slug }))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata | undefined> => {
  const { slug } = await params
  const category = await findUniqueCategory({ where: { slug } })
  const url = `/categories/${slug}`

  if (!category) {
    return
  }

  return parseMetadata({
    title: category.name,
    alternates: { canonical: url },
    openGraph: { url },
  })
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params

  const [category, { tools, totalCount }] = await Promise.all([
    findUniqueCategory({ where: { slug } }),
    searchTools(await searchParams, { where: { categories: { some: { slug } } } }),
  ])

  if (!category) {
    notFound()
  }

  return (
    <Wrapper>
      <Intro alignment="center">
        <IntroTitle>{category.name}</IntroTitle>
        <IntroDescription>{category.description}</IntroDescription>
      </Intro>

      <ToolList
        tools={tools}
        totalCount={totalCount}
        placeholder={`Search in "${category.name}"`}
      />
    </Wrapper>
  )
}
