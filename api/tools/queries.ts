import type { Prisma } from "@prisma/client"
import type { SearchParams } from "nuqs/server"
import { toolManyPayload, toolOnePayload } from "~/api/tools/payloads"
import { searchParamsCache } from "~/api/tools/search-params"
import { prisma } from "~/services/prisma"

export const searchTools = async (
  searchParams: SearchParams,
  { where, ...args }: Prisma.ToolFindManyArgs,
) => {
  const { q, page, sort, perPage } = searchParamsCache.parse(searchParams)

  // Values to paginate the results
  const skip = (page - 1) * perPage
  const take = perPage

  // Column and order to sort by
  // Spliting the sort string by "." to get the column and order
  // Example: "title.desc" => ["title", "desc"]
  const [sortBy, sortOrder] = sort.split(".")

  const whereQuery: Prisma.ToolWhereInput = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      }
    : {}

  const [tools, totalCount] = await prisma.$transaction([
    prisma.tool.findMany({
      ...args,
      orderBy: { [sortBy]: sortOrder },
      where: { publishedAt: { lte: new Date() }, ...whereQuery, ...where },
      include: toolManyPayload,
      take,
      skip,
    }),

    prisma.tool.count({
      where: { publishedAt: { lte: new Date() }, ...whereQuery, ...where },
    }),
  ])

  return { tools, totalCount }
}

export const findTools = async ({ where, ...args }: Prisma.ToolFindManyArgs) => {
  return await prisma.tool.findMany({
    ...args,
    where: { publishedAt: { lte: new Date() }, ...where },
    include: toolManyPayload,
  })
}

export const findToolSlugs = async ({ where, orderBy, ...args }: Prisma.ToolFindManyArgs) => {
  return await prisma.tool.findMany({
    ...args,
    orderBy: { name: "asc", ...orderBy },
    where: { publishedAt: { lte: new Date() }, ...where },
    select: { slug: true },
  })
}

export const countTools = async ({ where, ...args }: Prisma.ToolCountArgs) => {
  return await prisma.tool.count({
    ...args,
    where: { publishedAt: { lte: new Date() }, ...where },
  })
}

export const countUpcomingTools = async ({ where, ...args }: Prisma.ToolCountArgs) => {
  return await prisma.tool.count({
    ...args,
    where: { OR: [{ publishedAt: { gt: new Date() } }, { publishedAt: null }], ...where },
  })
}

export const findUniqueTool = async ({ where, ...args }: Prisma.ToolFindUniqueArgs) => {
  return await prisma.tool.findUnique({
    ...args,
    where: { publishedAt: { lte: new Date() }, ...where },
    include: toolOnePayload,
  })
}

export const findFirstTool = async ({ where, ...args }: Prisma.ToolFindFirstArgs) => {
  return await prisma.tool.findFirst({
    ...args,
    where: { publishedAt: { lte: new Date() }, ...where },
  })
}
