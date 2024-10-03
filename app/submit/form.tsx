"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { redirect } from "next/navigation"
import { type HTMLAttributes, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"
import { submitTool } from "~/actions/submit"
import { submitToolSchema } from "~/api/schemas"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/forms/input"
import { cx } from "~/utils/cva"

type SubmitProps = HTMLAttributes<HTMLFormElement> & {
  placeholder?: string
}

export const SubmitForm = ({ className, ...props }: SubmitProps) => {
  const [isSubmitPending, startSubmitTransition] = useTransition()

  const form = useForm<z.infer<typeof submitToolSchema>>({
    resolver: zodResolver(submitToolSchema),
    defaultValues: {
      name: "",
      websiteUrl: "",
      description: "",
      submitterName: "",
      submitterEmail: "",
    },
  })

  function onSubmit(input: z.infer<typeof submitToolSchema>) {
    startSubmitTransition(async () => {
      const { error, data } = await submitTool(input)

      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        form.reset()
        redirect(`/submit/${data.id}`)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cx("grid w-full gap-6 md:grid-cols-2", className)}
        noValidate
        {...props}
      >
        <FormField
          control={form.control}
          name="submitterName"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Your Name:</FormLabel>
              <FormControl>
                <Input size="lg" placeholder="John Doe" data-1p-ignore {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="submitterEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Your Email:</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  size="lg"
                  placeholder="john@doe.com"
                  data-1p-ignore
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Name:</FormLabel>
              <FormControl>
                <Input size="lg" placeholder="PostHog" data-1p-ignore {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Website URL:</FormLabel>
              <FormControl>
                <Input type="url" size="lg" placeholder="https://posthog.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Description:</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  placeholder="A platform that helps engineers build better products"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-full">
          <Button
            variant="primary"
            isPending={isSubmitPending}
            disabled={isSubmitPending}
            className="flex ml-auto min-w-32"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
