import type { Tool } from "@prisma/client"
import { GiftIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense, cache } from "react"
import { SubmitProducts } from "~/app/(web)/submit/[slug]/products"
import { Prose } from "~/components/common/prose"
import { PlanSkeleton } from "~/components/web/plan"
import { Badge } from "~/components/web/ui/badge"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Ping } from "~/components/web/ui/ping"
import { Wrapper } from "~/components/web/ui/wrapper"
import { config } from "~/config"
import { isToolPublished } from "~/lib/tools"
import { findToolSlugs, findUniqueTool } from "~/server/tools/queries"
import { parseMetadata } from "~/utils/metadata"

type PageProps = {
  params: Promise<{ slug: string }>
}

const getMetadata = cache((tool: Tool, metadata?: Metadata): Metadata => {
  if (isToolPublished(tool)) {
    return {
      ...metadata,
      title: `Boost ${tool.name}'s Visibility`,
      description: `You can upgrade ${tool.name}'s listing on ${config.site.name} to benefit from a featured badge, a prominent placement, and a do-follow link.`,
    }
  }

  return {
    ...metadata,
    title: "Choose a submission package",
    description: `Maximize ${tool.name}'s impact from day one. Select a package that suits your goals - from free listing to premium features.`,
  }
})

export const generateStaticParams = async () => {
  const tools = await findToolSlugs({ where: { publishedAt: undefined } })
  return tools.map(({ slug }) => ({ slug }))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata | undefined> => {
  const { slug } = await params
  const tool = await findUniqueTool({ where: { slug, publishedAt: undefined, isFeatured: false } })
  const url = `/submit/${slug}`

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

export default async function SubmitPackages({ params }: PageProps) {
  const { slug } = await params
  const tool = await findUniqueTool({ where: { slug, publishedAt: undefined, isFeatured: false } })

  if (!tool) {
    notFound()
  }

  const { title, description } = getMetadata(tool)

  return (
    <Wrapper>
      <Intro alignment="center">
        <IntroTitle>{title?.toString()}</IntroTitle>
        <IntroDescription>{description}</IntroDescription>

        <Badge
          size="lg"
          variant="success"
          prefix={<GiftIcon />}
          className="relative mt-1 gap-2 text-sm"
        >
          50% off — Early Bird offer
          <Ping className="absolute -top-1 -left-1 text-yellow-500" />
        </Badge>
      </Intro>

      <div className="flex flex-wrap justify-center gap-5">
        <Suspense fallback={[...Array(3)].map((_, index) => <PlanSkeleton key={index} />)}>
          <SubmitProducts tool={tool} />
        </Suspense>
      </div>

      <Intro alignment="center">
        <IntroTitle size="h3">Have questions?</IntroTitle>

        <Prose>
          <p>
            If you have any questions, please contact us at{" "}
            <Link href={`mailto:${config.site.email}`}>{config.site.email}</Link>.
          </p>
        </Prose>
      </Intro>
    </Wrapper>
  )
}
