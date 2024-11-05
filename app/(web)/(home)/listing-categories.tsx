import { CategoryCard } from "~/components/web/cards/category-card"
import { Listing } from "~/components/web/listing"
import { findCategories } from "~/server/categories/queries"

export const ListingCategories = async () => {
  const categories = await findCategories({})

  if (!categories.length) {
    return null
  }

  return (
    <Listing title="Browse Categories">
      {categories.map((category, i) => (
        <CategoryCard key={i} href={`/categories/${category.slug}`} category={category} />
      ))}
    </Listing>
  )
}
