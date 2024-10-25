/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/login", "/submit/*", "*.xml", "*.json"],
}

export default config
