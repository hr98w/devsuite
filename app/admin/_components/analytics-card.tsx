import type { ComponentProps } from "react"
import wretch from "wretch"
import { AnalyticsChart, type AnalyticsChartData } from "~/app/admin/_components/analytics-chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/admin/ui/card"
import { Skeleton } from "~/components/common/skeleton"
import { env } from "~/env"

export const AnalyticsCard = async ({ ...props }: ComponentProps<typeof Card>) => {
  const api = wretch(`${env.NEXT_PUBLIC_PLAUSIBLE_HOST}/api/v1`)
    .auth(`Bearer ${env.PLAUSIBLE_API_KEY}`)
    .options({ cache: "no-store" })
    .errorType("json")

  const queryOptions = new URLSearchParams({
    metrics: "visitors",
    period: "30d",
    site_id: env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  })

  const { results } = await api
    .get(`/stats/timeseries?${queryOptions.toString()}`)
    .json<{ results: AnalyticsChartData[] }>()
  const totalVisitors = results.reduce((acc, curr) => acc + curr.visitors, 0)
  const averageVisitors = Math.round(totalVisitors / results.length)

  return (
    <Card {...props}>
      <CardHeader>
        <CardDescription>Visitors</CardDescription>
        <CardTitle className="text-3xl">{totalVisitors.toLocaleString()}</CardTitle>
      </CardHeader>

      <CardContent>
        <AnalyticsChart data={results} average={averageVisitors} className="h-56 w-full" />
      </CardContent>
    </Card>
  )
}

export const AnalyticsCardSkeleton = ({ ...props }: ComponentProps<typeof Card>) => {
  return (
    <Card {...props}>
      <CardHeader>
        <Skeleton className="h-5 w-12" />
        <Skeleton className="text-3xl w-24">&nbsp;</Skeleton>
      </CardHeader>

      <CardContent>
        <Skeleton className="h-56 w-full" />
      </CardContent>
    </Card>
  )
}
