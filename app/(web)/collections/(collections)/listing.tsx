import { CategoryCard } from "~/components/web/cards/category-card"
import { EmptyList } from "~/components/web/empty-list"
import { findCollections } from "~/server/collections/queries"

export const CollectionsListing = async () => {
  const collections = await findCollections({})

  return (
    <>
      {collections.map(collection => (
        <CategoryCard
          key={collection.id}
          href={`/collections/${collection.slug}`}
          category={collection}
        />
      ))}

      {!collections.length && <EmptyList>No collections found.</EmptyList>}
    </>
  )
}
