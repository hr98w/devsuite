"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { redirect } from "next/navigation"
import type React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useServerAction } from "zsa-react"
import { createCollection, updateCollection } from "~/app/admin/collections/_lib/actions"
import type { getCollectionBySlug, getTools } from "~/app/admin/collections/_lib/queries"
import { type CollectionSchema, collectionSchema } from "~/app/admin/collections/_lib/validations"
import { RelationSelector } from "~/components/admin/relation-selector"
import { Button } from "~/components/admin/ui/button"
import { Input } from "~/components/admin/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/common/form"
import { cx } from "~/utils/cva"
import { nullsToUndefined } from "~/utils/helpers"

type CollectionFormProps = React.HTMLAttributes<HTMLFormElement> & {
  collection?: Awaited<ReturnType<typeof getCollectionBySlug>>
  tools: Awaited<ReturnType<typeof getTools>>
}

export function CollectionForm({
  children,
  className,
  collection,
  tools,
  ...props
}: CollectionFormProps) {
  const form = useForm<CollectionSchema>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      ...nullsToUndefined(collection),
      tools: collection?.tools.map(({ id }) => id),
    },
  })

  // Create collection
  const { execute: createCollectionAction, isPending: isCreatingCollection } = useServerAction(
    createCollection,
    {
      onSuccess: ({ data }) => {
        toast.success("Collection successfully created")
        redirect(`/admin/collections/${data.slug}`)
      },

      onError: ({ err }) => {
        toast.error(err.message)
      },
    },
  )

  // Update collection
  const { execute: updateCollectionAction, isPending: isUpdatingCollection } = useServerAction(
    updateCollection,
    {
      onSuccess: ({ data }) => {
        toast.success("Collection successfully updated")
        redirect(`/admin/collections/${data.slug}`)
      },

      onError: ({ err }) => {
        toast.error(err.message)
      },
    },
  )

  const onSubmit = form.handleSubmit(data => {
    collection
      ? updateCollectionAction({ id: collection.id, ...data })
      : createCollectionAction(data)
  })

  const isPending = isCreatingCollection || isUpdatingCollection

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className={cx("grid grid-cols-1 gap-4 max-w-3xl sm:grid-cols-2", className)}
        noValidate
        {...props}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tools"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Tools</FormLabel>
              <RelationSelector
                relations={tools}
                selectedIds={field.value ?? []}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-4 col-span-full">
          <Button variant="outline" asChild>
            <Link href="/admin/collections">Cancel</Link>
          </Button>

          <Button isPending={isPending} disabled={isPending}>
            {collection ? "Update collection" : "Create collection"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
