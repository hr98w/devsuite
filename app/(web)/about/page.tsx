import type { Metadata } from "next"
import { cache } from "react"
import { Prose } from "~/components/common/prose"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { config } from "~/config"
import { parseMetadata } from "~/utils/metadata"
import AboutContent from "./content.mdx"

const getMetadata = cache(
  (metadata?: Metadata): Metadata => ({
    ...metadata,
    title: "About",
    description: `${config.site.description}`,
  }),
)

export const metadata = parseMetadata(
  getMetadata({
    alternates: { canonical: "/about" },
    openGraph: { url: "/about" },
  }),
)

export default function AboutPage() {
  const { title, description } = getMetadata()

  return (
    <Wrapper size="sm">
      <Intro alignment="start">
        <IntroTitle>{title?.toString()}</IntroTitle>
        <IntroDescription>{description}</IntroDescription>
      </Intro>

      <Prose>
        <AboutContent />
      </Prose>
    </Wrapper>
  )
}
