import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { Stack } from "~/components/common/stack"
import { ToolCard } from "~/components/web/cards/tool-card"
import { Listing } from "~/components/web/listing"
import { Button } from "~/components/web/ui/button"
import { findTools } from "~/server/tools/queries"

export const ListingTools = async () => {
  const tools = await findTools({ where: { isFeatured: true } })

  if (!tools.length) {
    return null
  }

  return (
    <Stack direction="column" className="gap-y-6">
      <Listing>
        {tools.map((tool, i) => (
          <ToolCard key={i} tool={tool} showBadges={false} />
        ))}
      </Listing>

      <Button variant="secondary" suffix={<ArrowRightIcon />} className="mx-auto" asChild>
        <Link href="/tools">View All Tools</Link>
      </Button>
    </Stack>
  )
}
