import { Suspense } from "react"
import {
  AnalyticsCard,
  AnalyticsCardSkeleton,
} from "~/app/admin/(dashboard)/_components/analytics-card"
import {
  ScheduledToolsCard,
  ScheduledToolsCardSkeleton,
} from "~/app/admin/(dashboard)/_components/scheduled-tools-card"
import { StatsCard } from "~/app/admin/(dashboard)/_components/stats-card"
import { Card, CardHeader } from "~/components/ui/card"
import { H3 } from "~/components/ui/heading"
import { Skeleton } from "~/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <>
      <H3>Dashboard</H3>

      <div className="grid grid-cols-2 gap-4 overflow-clip md:grid-cols-3 lg:grid-cols-4">
        <Suspense
          fallback={Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-5 w-24" />
                <Skeleton className="text-3xl w-12">&nbsp;</Skeleton>
              </CardHeader>
            </Card>
          ))}
        >
          <StatsCard />
        </Suspense>

        <Suspense fallback={<AnalyticsCardSkeleton className="col-span-full lg:col-span-2" />}>
          <AnalyticsCard className="col-span-full lg:col-span-2" />
        </Suspense>

        <Suspense fallback={<ScheduledToolsCardSkeleton className="col-span-full lg:col-span-2" />}>
          <ScheduledToolsCard className="col-span-full lg:col-span-2" />
        </Suspense>
      </div>
    </>
  )
}
