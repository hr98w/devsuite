import { CategoryCard } from "~/components/web/cards/category-card"
import { EmptyList } from "~/components/web/empty-list"
import { findCategories } from "~/server/categories/queries"

export const CategoriesListing = async () => {
  const categories = await findCategories({})

  return (
    <>
      {categories.map(category => (
        <CategoryCard key={category.id} href={`/categories/${category.slug}`} category={category} />
      ))}

      {!categories.length && <EmptyList>No categories found.</EmptyList>}
    </>
  )
}
