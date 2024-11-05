import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { SearchParams } from "nuqs/server"
import { Suspense } from "react"
import { ToolsListing } from "~/app/(web)/tools/(tools)/listing"
import { ToolListSkeleton } from "~/components/web/tool-list-skeleton"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { findCategorySlugs, findUniqueCategory } from "~/server/categories/queries"
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
  const category = await findUniqueCategory({ where: { slug } })

  if (!category) {
    notFound()
  }

  return (
    <Wrapper>
      <Intro>
        <IntroTitle>{category.name}</IntroTitle>
        <IntroDescription>{category.description}</IntroDescription>
      </Intro>

      <Suspense fallback={<ToolListSkeleton />}>
        <ToolsListing
          searchParams={searchParams}
          where={{ categories: { some: { slug } } }}
          placeholder={`Search ${category.name.toLowerCase()} tools...`}
        />
      </Suspense>
    </Wrapper>
  )
}
