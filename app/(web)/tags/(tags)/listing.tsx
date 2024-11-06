import type { SearchParams } from "nuqs/server"
import { TagCard } from "~/components/web/cards/tag-card"
import { EmptyList } from "~/components/web/empty-list"
import { Pagination } from "~/components/web/pagination"
import { countTags, findTags } from "~/server/tags/queries"
import { searchParamsCache } from "~/server/tags/search-params"

type TagsListingProps = {
  searchParams: Promise<SearchParams>
}

export const TagsListing = async ({ searchParams }: TagsListingProps) => {
  const params = await searchParams
  const { page, perPage } = searchParamsCache.parse({ perPage: "96", ...params })

  const skip = (page - 1) * perPage
  const take = perPage

  const [tags, totalCount] = await Promise.all([findTags({ skip, take }), countTags({})])

  return (
    <>
      {tags.map(tag => (
        <TagCard key={tag.id} tag={tag} />
      ))}

      {!tags.length && <EmptyList>No tags found.</EmptyList>}

      <Pagination pageSize={perPage} totalCount={totalCount} className="mt-4 col-span-full" />
    </>
  )
}
