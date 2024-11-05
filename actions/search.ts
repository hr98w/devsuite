"use server"

import { z } from "zod"
import { createServerAction } from "zsa"
import { authedProcedure } from "~/lib/safe-actions"
import { findToolSlugs } from "~/server/tools/queries"
import { prisma } from "~/services/prisma"

export const searchItems = authedProcedure
  .createServerAction()
  .input(z.object({ q: z.string() }))
  .handler(async ({ input: { q } }) => {
    const [tools, categories, collections, tags] = await Promise.all([
      prisma.tool.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
        orderBy: { name: "asc" },
        take: 5,
      }),
      prisma.category.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
        orderBy: { name: "asc" },
        take: 5,
      }),
      prisma.collection.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
        orderBy: { name: "asc" },
        take: 5,
      }),
      prisma.tag.findMany({
        where: { slug: { contains: q, mode: "insensitive" } },
        orderBy: { slug: "asc" },
        take: 5,
      }),
    ])

    return {
      tools,
      categories,
      collections,
      tags,
    }
  })

export const quickSearchTool = createServerAction()
  .input(z.object({ q: z.string() }))
  .handler(async ({ input: { q } }) => {
    const tool = await findToolSlugs({ where: { name: { equals: q, mode: "insensitive" } } })

    return { q, tool: tool.length === 1 ? tool[0].slug : null }
  })
