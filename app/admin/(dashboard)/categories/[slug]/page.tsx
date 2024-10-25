import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CategoryActions } from "~/app/admin/(dashboard)/categories/_components/category-actions"
import { CategoryForm } from "~/app/admin/(dashboard)/categories/_components/category-form"
import {
  getCategoryBySlug,
  getCategorySlugs,
  getTools,
} from "~/app/admin/(dashboard)/categories/_lib/queries"
import { Wrapper } from "~/components/admin/ui/wrapper"
import { H4 } from "~/components/common/heading"

type PageProps = {
  params: Promise<{ slug: string }>
}

export const metadata: Metadata = {
  title: "Update category",
}

export const generateStaticParams = async () => {
  const categories = await getCategorySlugs()
  return categories.map(({ slug }) => ({ slug }))
}

export default async function UpdateCategoryPage({ params }: PageProps) {
  const { slug } = await params
  const [category, tools] = await Promise.all([getCategoryBySlug(slug), getTools()])

  if (!category) {
    return notFound()
  }

  return (
    <Wrapper size="md">
      <div className="flex items-center justify-between gap-4">
        <H4 as="h1">Update category</H4>

        <CategoryActions category={category} />
      </div>

      <CategoryForm category={category} tools={tools} />
    </Wrapper>
  )
}
