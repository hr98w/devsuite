import merge from "deepmerge"
import type { Metadata } from "next"
import { config } from "~/config"

export const parseMetadata = ({
  title: metaTitle = config.site.tagline,
  description = config.site.description,
  ...metadata
}: Metadata): Metadata => {
  const title = `${metaTitle} – ${config.site.name}`

  const customMetadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/",
      siteName: config.site.name,
      locale: "en_US",
      type: "website",
      images: { url: "/_static/opengraph.png", width: 1200, height: 630 },
    },
    twitter: {
      title,
      description,
      site: "@devsuite",
      creator: "@piotrkulpinski",
      images: { url: "/_static/opengraph.png", width: 1200, height: 630 },
    },
    alternates: {
      canonical: "/",
      types: { "application/rss+xml": config.links.feed },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }

  return merge(customMetadata, metadata, { arrayMerge: (_, sourceArray) => sourceArray })
}
