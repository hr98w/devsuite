import { ToolCard } from "~/components/web/cards/tool-card"
import { Listing } from "~/components/web/listing"
import { findTools } from "~/server/tools/queries"

export const ListingTools = async () => {
  const tools = await findTools({ where: { isFeatured: true } })

  if (!tools.length) {
    return null
  }

  return (
    <Listing title="Featured Tools">
      {tools.map((tool, i) => (
        <ToolCard key={i} tool={tool} showBadges={false} />
      ))}
    </Listing>
  )
}
