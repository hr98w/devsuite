import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { findTagSlugs, findUniqueTag } from "~/api/tags/queries"
import { findTools } from "~/api/tools/queries"
import { ToolCard } from "~/components/web/cards/tool-card"
import { EmptyList } from "~/components/web/empty-list"
import { Grid } from "~/components/web/ui/grid"
import { Intro, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { parseMetadata } from "~/utils/metadata"

type PageProps = {
  params: Promise<{ slug: string }>
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

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params

  const [tag, tools] = await Promise.all([
    findUniqueTag({ where: { slug } }),
    findTools({ where: { tags: { some: { slug } } } }),
  ])

  if (!tag) {
    notFound()
  }

  return (
    <Wrapper>
      <Intro alignment="center" className="max-w-2xl mx-auto text-pretty">
        <IntroTitle className="!leading-none">{tag.name}</IntroTitle>
      </Intro>

      <Grid>
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}

        {!tools.length && <EmptyList>No tools found in the tag.</EmptyList>}
      </Grid>
    </Wrapper>
  )
}
