import { describe, expect, it } from 'vitest'

import {
  formatRemesaAmount,
  formatRemesaId,
  normalizeSearchValue,
} from '@/lib/format'

describe('format helpers', () => {
  it('formats amounts as USD currency', () => {
    expect(formatRemesaAmount('12000')).toMatch(/12[,.]000/)
    expect(formatRemesaAmount('not-a-number')).toBe('not-a-number')
  })

  it('prefixes remesa ids with #', () => {
    expect(formatRemesaId('290034')).toBe('#290034')
  })

  it('normalizes search values by trimming, lowercasing, and stripping money noise', () => {
    expect(normalizeSearchValue('  Western Union  ')).toBe('westernunion')
    expect(normalizeSearchValue('$8,500')).toBe('8500')
  })
})
