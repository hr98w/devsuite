import { Box } from "~/components/common/box"
import { ToolSkeleton } from "~/components/web/cards/tool-skeleton"
import { Grid } from "~/components/web/ui/grid"

export const ToolListSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <Box className="px-4 py-2.5 text-sm/normal rounded-lg w-full">
        <span>&nbsp;</span>
      </Box>

      <Grid>
        {[...Array(6)].map((_, index) => (
          <ToolSkeleton key={index} />
        ))}
      </Grid>
    </div>
  )
}
