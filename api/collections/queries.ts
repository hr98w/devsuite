import type { Prisma } from "@prisma/client"
import { collectionManyPayload, collectionOnePayload } from "~/api/collections/payloads"
import { prisma } from "~/services/prisma"

export const findCollections = async ({
  where,
  orderBy,
  ...args
}: Prisma.CollectionFindManyArgs) => {
  return await prisma.collection.findMany({
    ...args,
    orderBy: { name: "asc", ...orderBy },
    where: { tools: { some: { publishedAt: { lte: new Date() } } }, ...where },
    include: collectionManyPayload,
  })
}

export const findCollectionSlugs = async ({
  where,
  orderBy,
  ...args
}: Prisma.CollectionFindManyArgs) => {
  return await prisma.collection.findMany({
    ...args,
    orderBy: { name: "asc", ...orderBy },
    where: { tools: { some: { publishedAt: { lte: new Date() } } }, ...where },
    select: { slug: true },
  })
}

export const findUniqueCollection = async ({ ...args }: Prisma.CollectionFindUniqueArgs) => {
  return await prisma.collection.findUnique({
    ...args,
    include: collectionOnePayload,
  })
}
