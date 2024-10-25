import type { Prisma } from "@prisma/client"
import { categoryManyPayload, categoryOnePayload } from "~/api/categories/payloads"
import { prisma } from "~/services/prisma"

export const findCategories = async ({ where, orderBy, ...args }: Prisma.CategoryFindManyArgs) => {
  return await prisma.category.findMany({
    ...args,
    orderBy: { name: "asc", ...orderBy },
    where: { tools: { some: { publishedAt: { lte: new Date() } } }, ...where },
    include: categoryManyPayload,
  })
}

export const findCategorySlugs = async ({
  where,
  orderBy,
  ...args
}: Prisma.CategoryFindManyArgs) => {
  return await prisma.category.findMany({
    ...args,
    orderBy: { name: "asc", ...orderBy },
    where: { tools: { some: { publishedAt: { lte: new Date() } } }, ...where },
    select: { slug: true },
  })
}

export const findUniqueCategory = async ({ ...args }: Prisma.CategoryFindUniqueArgs) => {
  return await prisma.category.findUnique({
    ...args,
    include: categoryOnePayload,
  })
}
