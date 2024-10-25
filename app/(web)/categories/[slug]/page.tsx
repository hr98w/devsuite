import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { findCategorySlugs, findUniqueCategory } from "~/api/categories/queries"
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

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params

  const [category, tools] = await Promise.all([
    findUniqueCategory({ where: { slug } }),
    findTools({ where: { categories: { some: { slug } } } }),
  ])

  if (!category) {
    notFound()
  }

  return (
    <Wrapper>
      <Intro alignment="center" className="max-w-2xl mx-auto text-pretty">
        <IntroTitle className="!leading-none">{category.name}</IntroTitle>

        <IntroDescription>{category.description}</IntroDescription>
      </Intro>

      <Grid>
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}

        {!tools.length && <EmptyList>No tools found in the category.</EmptyList>}
      </Grid>
    </Wrapper>
  )
}
