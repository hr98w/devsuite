import { Prisma } from "@prisma/client"

export const tagOnePayload = Prisma.validator<Prisma.TagInclude>()({
  _count: { select: { tools: { where: { publishedAt: { lte: new Date() } } } } },
})

export const tagManyPayload = Prisma.validator<Prisma.TagInclude>()({
  _count: { select: { tools: { where: { publishedAt: { lte: new Date() } } } } },
})

export type TagOne = Prisma.TagGetPayload<{ include: typeof tagOnePayload }>
export type TagMany = Prisma.TagGetPayload<{ include: typeof tagManyPayload }>
