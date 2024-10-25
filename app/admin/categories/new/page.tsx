import type { Metadata } from "next"
import { CategoryForm } from "~/app/admin/categories/_components/category-form"
import { getTools } from "~/app/admin/categories/_lib/queries"
import { Wrapper } from "~/components/admin/ui/wrapper"
import { H4 } from "~/components/common/heading"

export const metadata: Metadata = {
  title: "Create category",
}

export default async function CreateCategoryPage() {
  const tools = await getTools()

  return (
    <Wrapper size="md">
      <H4 as="h1">Create category</H4>

      <CategoryForm tools={tools} />
    </Wrapper>
  )
}
