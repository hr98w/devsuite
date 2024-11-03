"use server"

import { createServerAction } from "zsa"
import { prisma } from "~/services/prisma"

export const updateToolContent = createServerAction().handler(async () => {
  const tools = await prisma.tool.findMany({})

  await Promise.all(
    tools.map(async tool => {
      return prisma.tool.update({
        where: { id: tool.id },
        data: { content: tool.content?.replaceAll("•", "-") },
      })
    }),
  )
})
