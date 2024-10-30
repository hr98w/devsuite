"use client"

import { LoaderIcon, SearchIcon } from "lucide-react"
import { type Values, useQueryStates } from "nuqs"
import { useEffect, useState, useTransition } from "react"
import { searchParams } from "~/api/tools/search-params"
import { Stack } from "~/components/common/stack"
import { Input } from "~/components/web/ui/input"
import { Select } from "~/components/web/ui/select"
import { useDebounce } from "~/hooks/use-debounce"

export type ToolListFiltersProps = {
  placeholder?: string
}

export const ToolListFilters = ({ placeholder }: ToolListFiltersProps) => {
  const [isLoading, startTransition] = useTransition()
  const [filters, setFilters] = useQueryStates(searchParams, { shallow: false, startTransition })
  const [inputValue, setInputValue] = useState(filters.q || "")
  const q = useDebounce(inputValue, 300)

  const updateFilters = (values: Partial<Values<typeof searchParams>>) => {
    setFilters({ ...values, page: null })
  }

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      q: q || null,
      page: q && q !== prev.q ? null : prev.page,
    }))
  }, [q])

  const sortOptions = [
    { value: "publishedAt.desc", label: "Newest" },
    { value: "publishedAt.asc", label: "Oldest" },
    { value: "name.asc", label: "Name A-Z" },
    { value: "name.desc", label: "Name Z-A" },
  ]

  return (
    <Stack className="w-full flex-nowrap">
      <div className="relative w-full min-w-0">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none">
          {isLoading ? <LoaderIcon className="animate-spin" /> : <SearchIcon />}
        </div>

        <Input
          name="q"
          size="lg"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder={placeholder || "Search tools..."}
          className="w-full truncate pl-10"
        />
      </div>

      <Select
        name="sort"
        size="lg"
        className="min-w-36"
        value={filters.sort}
        onChange={e => updateFilters({ sort: e.target.value })}
      >
        <option value="" disabled>
          Order by
        </option>

        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Stack>
  )
}
