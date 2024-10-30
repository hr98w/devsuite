"use client"

import { useQueryStates } from "nuqs"
import type { ToolMany } from "~/api/tools/payloads"
import { searchParams } from "~/api/tools/search-params"
import { ToolCard } from "~/components/web/cards/tool-card"
import { EmptyList } from "~/components/web/empty-list"
import { Pagination } from "~/components/web/pagination"
import { ToolListFilters, type ToolListFiltersProps } from "~/components/web/tool-list-filters"
import { Grid } from "~/components/web/ui/grid"

type ToolListProps = ToolListFiltersProps & {
  tools: ToolMany[]
  totalCount: number
}

export const ToolList = ({ tools, totalCount, ...props }: ToolListProps) => {
  const [{ q, perPage }] = useQueryStates(searchParams)

  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-8">
        <ToolListFilters {...props} />

        <Grid>
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}

          {!tools.length && <EmptyList>No tools found{q ? ` for "${q}"` : ""}.</EmptyList>}
        </Grid>
      </div>

      <Pagination pageSize={perPage} totalCount={totalCount} />
    </>
  )
}
