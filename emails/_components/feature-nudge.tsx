import type { Tool } from "@prisma/client"
import { Hr, Link, Text } from "@react-email/components"
import { config } from "~/config"
import { EmailButton } from "~/emails/_components/button"

type EmailFeatureNudgeProps = {
  tool?: Tool
  showButton?: boolean
}

export const EmailFeatureNudge = ({ tool, showButton }: EmailFeatureNudgeProps) => {
  const link = `${config.site.url}/submit/${tool?.slug}`

  const benefits = [
    "⏱️ Get published within 12 hours",
    "🔗 Get a do-follow link",
    "⭐ Featured on our homepage",
    "📌 Pinned at the top of category pages",
    "📌 Pinned at the top of topics pages",
    "📌 Pinned at the top of related tool listings",
    "✏️ Unlimited content updates",
  ]

  if (tool?.isFeatured) {
    return null
  }

  return (
    <>
      {showButton && <Hr />}

      <Text>
        Want to maximize {tool?.name}'s visibility? Consider upgrading to{" "}
        <Link href={link}>our Featured plan</Link>. We offer a wide range of featuring options such
        as:
      </Text>

      <ul>
        {benefits.map(benefit => (
          <li key={benefit}>
            <Text className="m-0">{benefit}</Text>
          </li>
        ))}
      </ul>

      <Text>
        Plus, we're currently offering a{" "}
        <strong className="text-black">50% Early Bird discount!</strong>
      </Text>

      {showButton && <EmailButton href={link}>Boost {tool?.name}'s visibility</EmailButton>}
    </>
  )
}