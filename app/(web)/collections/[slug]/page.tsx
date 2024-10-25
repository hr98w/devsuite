import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { findCollectionSlugs, findUniqueCollection } from "~/api/collections/queries"
import { findTools } from "~/api/tools/queries"
import { ToolCard } from "~/components/web/cards/tool-card"
import { EmptyList } from "~/components/web/empty-list"
import { Grid } from "~/components/web/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { parseMetadata } from "~/utils/metadata"

type PageProps = {
  params: Promise<{ slug: string }>
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

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params

  const [collection, tools] = await Promise.all([
    findUniqueCollection({ where: { slug } }),
    findTools({ where: { collections: { some: { slug } } } }),
  ])

  if (!collection) {
    notFound()
  }

  return (
    <Wrapper>
      <Intro alignment="center" className="max-w-2xl mx-auto text-pretty">
        <IntroTitle className="!leading-none">{collection.name}</IntroTitle>

        <IntroDescription>{collection.description}</IntroDescription>
      </Intro>

      <Grid>
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}

        {!tools.length && <EmptyList>No tools found in the collection.</EmptyList>}
      </Grid>
    </Wrapper>
  )
}
