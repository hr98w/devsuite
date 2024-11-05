import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { SearchParams } from "nuqs/server"
import { Suspense } from "react"
import { ToolsListing } from "~/app/(web)/tools/(tools)/listing"
import { ToolListSkeleton } from "~/components/web/tool-list-skeleton"
import { Intro, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { findTagSlugs, findUniqueTag } from "~/server/tags/queries"
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
  const tag = await findUniqueTag({ where: { slug } })

  if (!tag) {
    notFound()
  }

  return (
    <Wrapper>
      <Intro>
        <IntroTitle>{tag.name}</IntroTitle>
      </Intro>

      <Suspense fallback={<ToolListSkeleton />}>
        <ToolsListing
          searchParams={searchParams}
          where={{ tags: { some: { slug } } }}
          placeholder={`Search in "${tag.name}"`}
        />
      </Suspense>
    </Wrapper>
  )
}
