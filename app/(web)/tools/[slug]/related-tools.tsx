import { getRandomElement } from "@curiousleaf/utils"
import type { Prisma } from "@prisma/client"
import { ToolCard } from "~/components/web/cards/tool-card"
import { Listing } from "~/components/web/listing"
import type { ToolOne } from "~/server/tools/payloads"
import { findTools } from "~/server/tools/queries"
import { prisma } from "~/services/prisma"

export const RelatedTools = async ({ tool }: { tool: ToolOne }) => {
  const take = 3
  const where = {
    categories: { some: { slug: { in: tool.categories.map(({ slug }) => slug) } } },
    NOT: { slug: tool.slug },
  } satisfies Prisma.ToolWhereInput

  const itemCount = await prisma.tool.count({ where })
  const skip = Math.max(0, Math.floor(Math.random() * itemCount) - take)
  const properties = ["id", "name"] satisfies (keyof Prisma.ToolOrderByWithRelationInput)[]
  const orderBy = getRandomElement(properties)
  const orderDir = getRandomElement(["asc", "desc"] as const)

  const tools = await findTools({
    where,
    take,
    skip,
    orderBy: { [orderBy]: orderDir },
  })

  if (!tools.length) {
    return null
  }

  return (
    <Listing title={`Developer Tools Similar to ${tool.name}:`}>
      {tools.map(tool => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </Listing>
  )
}
