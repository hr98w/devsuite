import { NextResponse } from "next/server"
import { auth } from "~/lib/auth"

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (proxies for third-party services)
     * 4. /_static/ (static files inside /public folder)
     * 5. Metadata files: favicon.ico, sitemap.xml, robots.txt, rss.xml, manifest.webmanifest, .well-known
     * biome-ignore format:
     */
    "/((?!api/|_next/|_proxy/|_static/|favicon.ico|sitemap(?:-\d+)?.xml|robots.txt|rss.xml|manifest.webmanifest|.well-known).*)",
  ],
}

export default auth(({ nextUrl, auth }) => {
  // disable auth
  // if (!auth && nextUrl.pathname.startsWith("/admin")) {
  //   return NextResponse.redirect(new URL("/login", nextUrl))
  // }

  return NextResponse.next()
})
