import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server"

export const searchParams = {
  q: parseAsString,
  page: parseAsInteger.withDefault(1),
  sort: parseAsString.withDefault("publishedAt_desc"),
  perPage: parseAsInteger.withDefault(24),
}

export const searchParamsCache = createSearchParamsCache(searchParams)
