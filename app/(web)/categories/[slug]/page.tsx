import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { SearchParams } from "nuqs/server"
import { Suspense, cache } from "react"
import { ToolsListing } from "~/app/(web)/tools/(tools)/listing"
import { ToolListSkeleton } from "~/components/web/tool-list-skeleton"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import type { CategoryOne } from "~/server/categories/payloads"
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

const getMetadata = cache((category: CategoryOne, metadata?: Metadata): Metadata => {
  const count = category._count.tools
  const prefix = `${count > 1 ? `${count} ` : ""}Best`
  const name = category.label || `${category.name} Tools`

  return {
    ...metadata,
    title: `${prefix} ${name}`,
    description: `${category.description} A curated collection of the best ${name} to help you build your next project faster.`,
  }
})

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata | undefined> => {
  const { slug } = await params
  const category = await findUniqueCategory({ where: { slug } })
  const url = `/categories/${slug}`

  if (!category) {
    return
  }

  return parseMetadata(
    getMetadata(category, {
      alternates: { canonical: url },
      openGraph: { url },
    }),
  )
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const category = await findUniqueCategory({ where: { slug } })

  if (!category) {
    notFound()
  }

  const { description } = getMetadata(category)
  const title = category.label || `${category.name} Tools`

  return (
    <Wrapper>
      <Intro>
        <IntroTitle>{title}</IntroTitle>
        <IntroDescription>{description}</IntroDescription>
      </Intro>

      <Suspense fallback={<ToolListSkeleton />}>
        <ToolsListing
          searchParams={searchParams}
          where={{ categories: { some: { slug } } }}
          placeholder={`Search ${title?.toString().toLowerCase()}...`}
        />
      </Suspense>
    </Wrapper>
  )
}
