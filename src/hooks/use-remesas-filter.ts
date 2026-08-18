import { useMemo } from 'react'

import { normalizeSearchValue } from '@/lib/format'
import { pageSchema, searchQuerySchema, type Remesa } from '@/lib/schemas'

export const REMESA_PAGE_SIZE = 10

type RemesasFilterResult = {
  items: Remesa[]
  pageCount: number
  total: number
  page: number
}

const matchesQuery = (remesa: Remesa, query: string) => {
  if (!query) {
    return true
  }

  const amount = normalizeSearchValue(remesa.amount)
  const company = remesa.company.toLowerCase()
  const id = remesa.id.toLowerCase()

  return id.includes(query) || company.includes(query) || amount.includes(query)
}

export const useRemesasFilter = (
  remesas: Remesa[],
  query: string,
  page: number,
): RemesasFilterResult => {
  const parsedQuery = searchQuerySchema.safeParse(query)
  const normalizedQuery = parsedQuery.success
    ? normalizeSearchValue(parsedQuery.data)
    : ''

  const parsedPage = pageSchema.safeParse(page)
  const requestedPage = parsedPage.success ? parsedPage.data : 1

  return useMemo(() => {
    const charged = remesas
      .filter((remesa) => remesa.status === 'COBRADO')
      .filter((remesa) => matchesQuery(remesa, normalizedQuery))
      .toSorted((left, right) =>
        right.charged_at.localeCompare(left.charged_at),
      )

    const pageCount = Math.max(1, Math.ceil(charged.length / REMESA_PAGE_SIZE))
    const currentPage = Math.min(requestedPage, pageCount)
    const start = (currentPage - 1) * REMESA_PAGE_SIZE

    return {
      items: charged.slice(start, start + REMESA_PAGE_SIZE),
      pageCount,
      total: charged.length,
      page: currentPage,
    }
  }, [normalizedQuery, remesas, requestedPage])
}
