import type { Metadata } from "next"
import { Suspense } from "react"
import { DataTableSkeleton } from "~/components/admin/data-table/data-table-skeleton"
import { searchParamsSchema } from "~/schema/search-params"
import type { SearchParams } from "~/types"
import { TagsTable } from "./_components/tags-table"
import { getTags } from "./_lib/queries"

type PageProps = {
  searchParams: SearchParams
}

export const metadata: Metadata = {
  title: "Tags",
}

export default async function TagsPage({ searchParams }: PageProps) {
  const search = searchParamsSchema.parse(await searchParams)
  const tagsPromise = getTags(search)

  return (
    <Suspense
      fallback={
        <DataTableSkeleton
          title="Tags"
          columnCount={5}
          rowCount={15}
          searchableColumnCount={1}
          filterableColumnCount={2}
          cellWidths={["12%", "48%", "15%", "15%", "10%"]}
          shrinkZero
        />
      }
    >
      <TagsTable tagsPromise={tagsPromise} />
    </Suspense>
  )
}
