import "server-only"

import type { Prisma } from "@prisma/client"
import { endOfDay, startOfDay } from "date-fns"
import { unstable_noStore as noStore } from "next/cache"
import { prisma } from "~/services/prisma"
import type { GetCategoriesSchema } from "./validations"

export async function getCategories(input: GetCategoriesSchema) {
  noStore()
  const { page, per_page, sort, name, operator, from, to } = input

  try {
    // Offset to paginate the results
    const offset = (page - 1) * per_page

    // Column and order to sort by
    // Spliting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    const [column, order] = (sort?.split(".").filter(Boolean) ?? ["name", "asc"]) as [
      keyof Prisma.CategoryOrderByWithRelationInput | undefined,
      "asc" | "desc" | undefined,
    ]

    // Convert the date strings to Date objects and adjust the range
    const fromDate = from ? startOfDay(new Date(from)) : undefined
    const toDate = to ? endOfDay(new Date(to)) : undefined

    const where: Prisma.CategoryWhereInput = {
      // Filter by name
      name: name ? { contains: name, mode: "insensitive" } : undefined,

      // Filter by createdAt
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
    }

    // Transaction is used to ensure both queries are executed in a single transaction
    const [categories, categoriesTotal] = await prisma.$transaction([
      prisma.category.findMany({
        where,
        orderBy: column ? { [column]: order } : undefined,
        take: per_page,
        skip: offset,
      }),

      prisma.category.count({
        where,
      }),
    ])

    const pageCount = Math.ceil(categoriesTotal / per_page)
    return { categories, categoriesTotal, pageCount }
  } catch (err) {
    return { categories: [], categoriesTotal: 0, pageCount: 0 }
  }
}

export async function getCategorySlugs() {
  noStore()
  try {
    return await prisma.category.findMany({ select: { slug: true } })
  } catch (err) {
    return []
  }
}

export async function getTools() {
  noStore()
  try {
    return await prisma.tool.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    })
  } catch (err) {
    return []
  }
}

export async function getCategoryBySlug(slug: string) {
  noStore()
  try {
    return await prisma.category.findUnique({
      where: { slug },
      include: { tools: true },
    })
  } catch (err) {
    return null
  }
}
