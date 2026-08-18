import { describe, expect, it } from 'vitest'

import {
  compactDateSchema,
  pageSchema,
  remesaAmountSchema,
  remesaCompanySchema,
  remesaIdSchema,
  remesaSchema,
  searchQuerySchema,
} from '@/lib/schemas'

describe('remesaIdSchema', () => {
  it('accepts an id of at most eight digits', () => {
    expect(remesaIdSchema.safeParse('12345678').success).toBe(true)
    expect(remesaIdSchema.safeParse('1').success).toBe(true)
  })

  it('rejects empty, non-digit, and nine-digit ids', () => {
    expect(remesaIdSchema.safeParse('').success).toBe(false)
    expect(remesaIdSchema.safeParse('abc').success).toBe(false)
    expect(remesaIdSchema.safeParse('123456789').success).toBe(false)
  })
})

describe('remesaSchema status', () => {
  it('requires empty charged_at for NO_COBRADO', () => {
    const parsed = remesaSchema.safeParse({
      id: '12345678',
      company: 'Western Union',
      amount: '12000',
      status: 'NO_COBRADO',
      created_at: '20231203',
      charged_at: '',
    })

    expect(parsed.success).toBe(true)
  })

  it('requires a calendar charged_at for COBRADO', () => {
    const parsed = remesaSchema.safeParse({
      id: '12345678',
      company: 'Western Union',
      amount: '12000',
      status: 'COBRADO',
      created_at: '20231203',
      charged_at: '20231203',
    })

    expect(parsed.success).toBe(true)
  })

  it('rejects COBRADO without a charged_at date', () => {
    const parsed = remesaSchema.safeParse({
      id: '12345678',
      company: 'Western Union',
      amount: '12000',
      status: 'COBRADO',
      created_at: '20231203',
      charged_at: '',
    })

    expect(parsed.success).toBe(false)
  })

  it('rejects unknown status values', () => {
    const parsed = remesaSchema.safeParse({
      id: '12345678',
      company: 'Western Union',
      amount: '12000',
      status: 'PENDING',
      created_at: '20231203',
      charged_at: '',
    })

    expect(parsed.success).toBe(false)
  })
})

describe('compactDateSchema', () => {
  it('accepts a real calendar YYYYMMDD date', () => {
    expect(compactDateSchema.safeParse('20231203').success).toBe(true)
  })

  it('rejects non-calendar days and the wrong shape', () => {
    expect(compactDateSchema.safeParse('20231340').success).toBe(false)
    expect(compactDateSchema.safeParse('2023-12-03').success).toBe(false)
  })
})

describe('remesaAmountSchema and remesaCompanySchema', () => {
  it('accepts numeric amounts with optional cents', () => {
    expect(remesaAmountSchema.safeParse('12000').success).toBe(true)
    expect(remesaAmountSchema.safeParse('4300.50').success).toBe(true)
  })

  it('rejects a non-numeric amount', () => {
    expect(remesaAmountSchema.safeParse('abc').success).toBe(false)
  })

  it('rejects a blank company', () => {
    expect(remesaCompanySchema.safeParse('').success).toBe(false)
    expect(remesaCompanySchema.safeParse('   ').success).toBe(false)
  })
})

describe('searchQuerySchema and pageSchema', () => {
  it('rejects control characters and overlong search queries', () => {
    expect(searchQuerySchema.safeParse('\u0007').success).toBe(false)
    expect(searchQuerySchema.safeParse('a'.repeat(65)).success).toBe(false)
    expect(searchQuerySchema.safeParse('wu').success).toBe(true)
  })

  it('rejects page 0 and non-integers', () => {
    expect(pageSchema.safeParse(0).success).toBe(false)
    expect(pageSchema.safeParse(1.5).success).toBe(false)
    expect(pageSchema.safeParse(1).success).toBe(true)
  })
})
