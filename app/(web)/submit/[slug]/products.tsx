import { Plan } from "~/components/web/plan"
import { getProductFeatures, getProducts } from "~/lib/products"
import { isToolPublished } from "~/lib/tools"
import type { ToolOne } from "~/server/tools/payloads"
import { countUpcomingTools } from "~/server/tools/queries"
import { stripe } from "~/services/stripe"

type SubmitProductsProps = {
  tool: ToolOne
}

export const SubmitProducts = async ({ tool }: SubmitProductsProps) => {
  const [stripeProducts, queueLength] = await Promise.all([
    stripe.products.list({
      active: true,
      ids: process.env.STRIPE_PRODUCT_IDS?.split(",").map(e => e.trim()),
      expand: ["data.default_price"],
    }),

    countUpcomingTools({}),
  ])

  const isPublished = isToolPublished(tool)
  const products = getProducts(stripeProducts.data, isPublished)

  return (
    <>
      {products.map(async (plan, index) => {
        const prices = await stripe.prices.list({
          product: plan.id,
          active: true,
        })

        return (
          <Plan
            key={plan.id}
            isFeatured={index === products.length - 1}
            tool={tool}
            plan={plan}
            features={getProductFeatures(plan, isPublished, queueLength)}
            prices={prices.data}
          />
        )
      })}
    </>
  )
}
