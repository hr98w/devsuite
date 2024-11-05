import type { MetadataRoute } from "next"
import { env } from "~/env"

export default function Robots(): MetadataRoute.Robots {
  const url = env.NEXT_PUBLIC_SITE_URL

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/*", "/login"],
    },
    host: url,
    sitemap: `${url}/sitemap.xml`,
  }
}
