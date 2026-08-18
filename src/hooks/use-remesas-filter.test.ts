import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useRemesasFilter } from '@/hooks/use-remesas-filter'
import type { Remesa } from '@/lib/schemas'

const charged = (index: number, extra: Partial<Remesa> = {}): Remesa => ({
  id: String(10000000 + index),
  company: extra.company ?? 'Other Co',
  amount: extra.amount ?? '1000',
  status: 'COBRADO',
  created_at: '20231001',
  charged_at: extra.charged_at ?? `202310${String(31 - index).padStart(2, '0')}`,
  ...extra,
  status: 'COBRADO',
})

const fixture: Remesa[] = [
  charged(0, {
    company: 'Western Union',
    amount: '8500',
    charged_at: '20231012',
  }),
  charged(1, { charged_at: '20231011' }),
  charged(2, { charged_at: '20231010' }),
  charged(3, { charged_at: '20231009' }),
  charged(4, { charged_at: '20231008' }),
  charged(5, { charged_at: '20231007' }),
  charged(6, { charged_at: '20231006' }),
  charged(7, { charged_at: '20231005' }),
  charged(8, { charged_at: '20231004' }),
  charged(9, { charged_at: '20231003' }),
  charged(10, { charged_at: '20231002' }),
  charged(11, { charged_at: '20231001' }),
  {
    id: '20000001',
    company: 'Western Union',
    amount: '8500',
    status: 'NO_COBRADO',
    created_at: '20231001',
    charged_at: '',
  },
]

describe('useRemesasFilter', () => {
  it('returns only COBRADO remesas sorted by charged_at descending, ten per page', () => {
    const { result } = renderHook(() => useRemesasFilter(fixture, '', 1))

    expect(result.current.items).toHaveLength(10)
    expect(result.current.total).toBe(12)
    expect(result.current.items.every((item) => item.status === 'COBRADO')).toBe(
      true,
    )
    expect(result.current.items.map((item) => item.charged_at)).toEqual([
      '20231012',
      '20231011',
      '20231010',
      '20231009',
      '20231008',
      '20231007',
      '20231006',
      '20231005',
      '20231004',
      '20231003',
    ])
    expect(result.current.items[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        company: expect.any(String),
        amount: expect.any(String),
      }),
    )
  })

  it('filters charged remesas by id, company, or amount and excludes NO_COBRADO', () => {
    const byId = renderHook(() => useRemesasFilter(fixture, '10000000', 1))
    expect(byId.result.current.items.map((item) => item.id)).toEqual(['10000000'])

    const byCompany = renderHook(() =>
      useRemesasFilter(fixture, 'western union', 1),
    )
    expect(byCompany.result.current.items.map((item) => item.id)).toEqual([
      '10000000',
    ])

    const byAmount = renderHook(() => useRemesasFilter(fixture, '8500', 1))
    expect(byAmount.result.current.items.map((item) => item.id)).toEqual([
      '10000000',
    ])
  })

  it('returns the next slice on page 2 without repeating page 1 ids', () => {
    const page1 = renderHook(() => useRemesasFilter(fixture, '', 1))
    const page2 = renderHook(() => useRemesasFilter(fixture, '', 2))
    const page1Ids = new Set(page1.result.current.items.map((item) => item.id))

    expect(page2.result.current.items).toHaveLength(2)
    expect(
      page2.result.current.items.every((item) => !page1Ids.has(item.id)),
    ).toBe(true)
  })
})
