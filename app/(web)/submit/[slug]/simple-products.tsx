import { config } from "~/config"
import { isToolPublished } from "~/lib/tools"
import type { ToolOne } from "~/server/tools/payloads"
import { countUpcomingTools } from "~/server/tools/queries"
import { SimplifiedPlan } from "~/components/web/simple-plan-card"

type SubmitProductsProps = {
  tool: ToolOne
}
const plans = [
  {
    name: "Free",
    description: "Free Submit",
    isSubscription: false,
    isFeatured: false,
    prices: [
      {
        amount: 0,
        interval: "month" as const,
        url: "https://checkout.monthly.url"
      }
    ],
    features: [
      { text: "Unlimited projects", isIncluded: false },
      { text: "Priority support", isIncluded: false },
      { text: "Custom domain", isIncluded: false },
      { text: "Advanced analytics", isIncluded: false },
      { text: "24/7 phone support", isIncluded: false }
    ]
  },
  {
    name: "Super Plan",
    description: "Perfect for growing businesses",
    isSubscription: false,
    isFeatured: false,
    prices: [
      {
        amount: 29,
        interval: "month" as const,
        url: "https://checkout.monthly.url"
      },
    ],
    features: [
      { text: "Unlimited projects", isIncluded: true },
      { text: "Priority support", isIncluded: true },
      { text: "Custom domain", isIncluded: true },
      { text: "Advanced analytics", isIncluded: false },
      { text: "24/7 phone support", isIncluded: false }
    ]
  },
  {
    name: "Pro Plan",
    description: "Perfect for growing businesses",
    isSubscription: true,
    isFeatured: true,
    prices: [
      {
        amount: 29,
        interval: "month" as const,
        url: "https://checkout.monthly.url"
      },
      {
        amount: 290,
        interval: "year" as const,
        url: "https://checkout.yearly.url"
      }
    ],
    features: [
      { text: "Unlimited projects", isIncluded: true },
      { text: "Priority support", isIncluded: true },
      { text: "Custom domain", isIncluded: true },
      { text: "Advanced analytics", isIncluded: false },
      { text: "24/7 phone support", isIncluded: false }
    ]
  }
]

export const SubmitProductsSimple = async ({ tool }: SubmitProductsProps) => {
  const { discountCode } = config.submissions

  const [queueLength] = await Promise.all([
    countUpcomingTools({}),
  ])

  const isPublished = isToolPublished(tool)

  return (
    <>
      {plans.map((plan, index) => (
        <SimplifiedPlan
          key={index}
          name={plan.name}
          description={plan.description}
          isSubscription={plan.isSubscription}
          isFeatured={plan.isFeatured}
          prices={plan.prices}
          features={plan.features}
        />
      ))}
    </>
  )
}
