import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import { cx } from "~/utils/cva"
import { Box } from "../Box"

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <Box focusWithin>
    <CheckboxPrimitive.Root
      ref={ref}
      className={cx(
        "peer size-4 shrink-0 rounded-sm disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-500 data-[state=checked]:text-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  </Box>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
