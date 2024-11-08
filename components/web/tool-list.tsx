"use client"

import { useQueryStates } from "nuqs"
import { ToolCard } from "~/components/web/cards/tool-card"
import { EmptyList } from "~/components/web/empty-list"
import { Pagination } from "~/components/web/pagination"
import { ToolListFilters, type ToolListFiltersProps } from "~/components/web/tool-list-filters"
import { Grid } from "~/components/web/ui/grid"
import type { CategoryMany } from "~/server/categories/payloads"
import type { ToolMany } from "~/server/tools/payloads"
import { searchParams } from "~/server/tools/search-params"

type ToolListProps = ToolListFiltersProps & {
  tools: ToolMany[]
  categories?: CategoryMany[]
  totalCount: number
}

export const ToolList = ({ tools, totalCount, categories, ...props }: ToolListProps) => {
  const [{ q, perPage }] = useQueryStates(searchParams)

  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-8">
        <ToolListFilters categories={categories} {...props} />

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
