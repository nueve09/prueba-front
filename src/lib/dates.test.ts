import { describe, expect, it } from 'vitest'

import { formatLongDate, toCompactDate, todayCompactDate } from '@/lib/dates'

describe('dates', () => {
  it('formats a UTC calendar day as YYYYMMDD', () => {
    expect(toCompactDate(new Date(Date.UTC(2023, 11, 3)))).toBe('20231203')
  })

  it('returns today as an eight-digit compact date', () => {
    expect(todayCompactDate()).toMatch(/^\d{8}$/)
  })

  it('formats a long Spanish date', () => {
    const formatted = formatLongDate(new Date(2023, 11, 3))
    expect(formatted.toLowerCase()).toContain('diciembre')
    expect(formatted).toContain('2023')
  })
})
