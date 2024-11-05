import type { Tool } from "@prisma/client"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cache } from "react"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { config } from "~/config"
import { findToolSlugs, findUniqueTool } from "~/server/tools/queries"
import { parseMetadata } from "~/utils/metadata"

type PageProps = {
  params: Promise<{ slug: string }>
}

const getMetadata = cache((tool: Tool, metadata?: Metadata): Metadata => {
  if (tool.isFeatured) {
    return {
      ...metadata,
      title: "Thank you for your payment!",
      description: `We've received your payment. ${tool.name} should be featured on ${config.site.name} shortly.`,
    }
  }

  return {
    ...metadata,
    title: `Thank you for submitting ${tool.name}!`,
    description: `We've received your submission. We'll review it shortly and get back to you.`,
  }
})

export const generateStaticParams = async () => {
  const tools = await findToolSlugs({ where: { publishedAt: undefined } })
  return tools.map(({ slug }) => ({ slug }))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata | undefined> => {
  const { slug } = await params
  const tool = await findUniqueTool({ where: { slug, publishedAt: undefined } })
  const url = `/submit/${slug}/thanks`

  if (!tool) {
    return
  }

  return parseMetadata(
    getMetadata(tool, {
      alternates: { canonical: url },
      openGraph: { url },
    }),
  )
}

export default async function SubmitThanks({ params }: PageProps) {
  const { slug } = await params

  const tool = await findUniqueTool({ where: { slug, publishedAt: undefined } })

  if (!tool) {
    notFound()
  }

  const { title, description } = getMetadata(tool)

  return (
    <Wrapper size="md">
      <Intro alignment="center">
        <IntroTitle>{title?.toString()}</IntroTitle>

        <IntroDescription>
          {description} If you have any questions, please contact us at{" "}
          <Link href={`mailto:${config.site.email}`}>{config.site.email}</Link>.
        </IntroDescription>
      </Intro>

      <img src="/_static/3d-heart.webp" alt="" className="max-w-64 w-2/3 h-auto mx-auto" />
    </Wrapper>
  )
}
