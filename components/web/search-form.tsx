"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon, SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { type HTMLAttributes, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useServerAction } from "zsa-react"
import { quickSearchTool } from "~/actions/search"
import { FormField } from "~/components/common/form"
import { Form, FormControl } from "~/components/common/form"
import { Input } from "~/components/web/ui/input"
import { cx } from "~/utils/cva"

export const SearchForm = ({ className, ...props }: HTMLAttributes<HTMLFormElement>) => {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const schema = z.object({
    q: z.string(),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { q: "" },
  })

  const handleExpand = () => {
    setIsExpanded(true)
    inputRef.current?.focus()
  }

  const handleCollapse = () => {
    setIsExpanded(false)
  }

  const { execute, isPending } = useServerAction(quickSearchTool, {
    onSuccess: ({ data }) => {
      form.reset()

      if (data.tool) {
        router.push(`/tools/${data.tool}`)
      } else {
        router.push(`/tools?q=${data.q}`)
      }
    },

    onError: ({ err }) => {
      toast.error(err.message)
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => execute(data))}
        className={cx("flex items-center shrink-0", className)}
        noValidate
        {...props}
      >
        <div className="relative flex items-center">
          <FormField
            control={form.control}
            name="q"
            render={({ field }) => (
              <FormControl>
                <Input
                  size="md"
                  placeholder="Search tools..."
                  className={cx(
                    "transition-[width,opacity,transform] duration-200 ease-in-out",
                    isExpanded ? "w-32 opacity-100" : "w-0 opacity-0",
                  )}
                  {...field}
                  onFocus={handleExpand}
                  onBlur={handleCollapse}
                  ref={inputRef}
                />
              </FormControl>
            )}
          />

          <button
            type="button"
            className={cx(
              "p-1 text-foreground/65 hover:text-foreground duration-200 ease-in-out will-change-transform absolute inset-y-0 right-0",
              isExpanded ? "opacity-0 translate-x-1 pointer-events-none" : "opacity-100",
            )}
            onClick={handleExpand}
            tabIndex={-1}
            aria-label="Search"
          >
            <SearchIcon className="size-4" />
          </button>

          {isPending && (
            <div className="absolute top-1/2 -translate-y-1/2 right-2">
              <LoaderIcon className="animate-spin" />
            </div>
          )}
        </div>
      </form>
    </Form>
  )
}
