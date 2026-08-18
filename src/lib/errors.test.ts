import { describe, expect, it } from 'vitest'

import {
  RemesaApiError,
  formatUnknownError,
  remesaErrorMessage,
} from '@/lib/errors'
import { remesaIdSchema } from '@/lib/schemas'

describe('formatUnknownError', () => {
  it('joins Zod issue messages', () => {
    const parsed = remesaIdSchema.safeParse('abc')
    expect(parsed.success).toBe(false)
    if (parsed.success) {
      return
    }

    const message = formatUnknownError(parsed.error)
    expect(message.length).toBeGreaterThan(0)
    expect(message).toContain('dígitos')
  })

  it('maps remesa API errors to their user-facing messages', () => {
    expect(
      formatUnknownError(
        new RemesaApiError('ALREADY_CHARGED', remesaErrorMessage.alreadyCharged),
      ),
    ).toBe(remesaErrorMessage.alreadyCharged)
    expect(
      formatUnknownError(
        new RemesaApiError('NOT_FOUND', remesaErrorMessage.notFound),
      ),
    ).toBe(remesaErrorMessage.notFound)
  })

  it('falls back for unknown values', () => {
    expect(formatUnknownError(undefined)).toBe(remesaErrorMessage.unexpected)
    expect(formatUnknownError('nope')).toBe(remesaErrorMessage.unexpected)
  })
})
