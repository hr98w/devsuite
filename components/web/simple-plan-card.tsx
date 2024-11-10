"use client"

import { CheckIcon, XIcon, ArrowUpRightIcon } from "lucide-react"
import { Card, CardStars } from "~/components/web/ui/card"
import { PlanIntervalSwitch } from "~/components/web/plan-interval-switch"
import { H5 } from "~/components/common/heading"
import { Button } from "~/components/web/ui/button"
import { Stack } from "~/components/common/stack"
import { useState } from "react"

type PlanInterval = "month" | "year"

type PlanFeature = {
  text: string
  isIncluded: boolean
  tooltip?: string
}

type PlanPrice = {
  amount: number
  interval: PlanInterval
  url: string
}

type SimplifiedPlanProps = {
  name: string
  description?: string
  prices: PlanPrice[]
  features: PlanFeature[]
  isSubscription: boolean
  isFeatured?: boolean
  className?: string
}

export const SimplifiedPlan = ({
  name,
  description,
  prices,
  features,
  isSubscription,
  isFeatured,
  className,
}: SimplifiedPlanProps) => {
  const [interval, setInterval] = useState<PlanInterval>("month")
  
  const currentPrice = prices.find(p => !isSubscription || p.interval === interval) ?? prices[0]

  const handlePurchase = () => {
    window.open(currentPrice.url, "_blank")?.focus()
  }

  return (
    <Card
      hover={false}
      isRevealed={false}
      isFeatured={isFeatured}
      className="items-stretch gap-8 basis-72 grow max-w-80"
    >
      {isFeatured && <CardStars className="brightness-150" />}

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <H5>{name}</H5>

          {isSubscription && prices.length > 1 && (
            <PlanIntervalSwitch
              intervals={[
                { label: "Monthly", value: "month" },
                { label: "Yearly", value: "year" },
              ]}
              value={interval}
              onChange={setInterval}
              className="-my-0.5"
            />
          )}
        </div>

        {description && (
          <p className="text-foreground/50 text-sm text-pretty">{description}</p>
        )}
      </div>

      <div className="relative flex items-end font-display">
        <span className="self-start mt-1 mr-1 text-xl/none">$</span>
        <span className="text-4xl/[0.9] sm:text-5xl/[0.9] font-semibold">
          {currentPrice.amount}
        </span>
        {currentPrice.amount > 0 && (
          <div className="m-1 text-foreground/50 text-base/none md:text-lg/none">
            /{isSubscription ? interval : "one-time"}
          </div>
        )}
      </div>

      <Stack direction="column" className="items-stretch">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-3 text-sm">
            <div className={`shrink-0 size-5 stroke-[3px] p-1 text-white rounded-md ${
              feature.isIncluded ? "bg-green-500/50" : "bg-foreground/10"
            }`}>
              {feature.isIncluded ? <CheckIcon /> : <XIcon />}
            </div>
            <span className={feature.isIncluded ? "" : "opacity-50"}>
              {feature.text}
            </span>
          </div>
        ))}
      </Stack>

      <Button
        onClick={currentPrice.amount === 0 ? undefined : handlePurchase}
        disabled={currentPrice.amount === 0}
        className="mt-auto"
        variant={currentPrice.amount === 0 ? "secondary" : "primary"}
        suffix={<ArrowUpRightIcon />}
      >
        {currentPrice.amount === 0 ? "Current Package" : `Choose ${name}`}
      </Button>
    </Card>
  )
}