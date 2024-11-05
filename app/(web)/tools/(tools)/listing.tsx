import type { Prisma } from "@prisma/client"
import type { SearchParams } from "nuqs/server"
import type { ComponentProps } from "react"
import { ToolList } from "~/components/web/tool-list"
import { searchTools } from "~/server/tools/queries"

type ToolsListingProps = Omit<ComponentProps<typeof ToolList>, "tools" | "totalCount"> & {
  searchParams: Promise<SearchParams>
  where?: Prisma.ToolWhereInput
}

export const ToolsListing = async ({ searchParams, where, ...props }: ToolsListingProps) => {
  const { tools, totalCount } = await searchTools(await searchParams, { where })

  return <ToolList tools={tools} totalCount={totalCount} {...props} />
}
