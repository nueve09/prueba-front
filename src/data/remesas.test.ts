import { describe, expect, it } from 'vitest'

import { remesaSeedList } from '@/data/remesas'
import { remesaListSchema } from '@/lib/schemas'

describe('remesaSeedList', () => {
  it('has more than twelve remesas with charged and uncharged records', () => {
    const parsed = remesaListSchema.safeParse(remesaSeedList)

    expect(parsed.success).toBe(true)
    expect(remesaSeedList.length).toBeGreaterThan(12)
    expect(remesaSeedList.some((remesa) => remesa.status === 'COBRADO')).toBe(
      true,
    )
    expect(remesaSeedList.some((remesa) => remesa.status === 'NO_COBRADO')).toBe(
      true,
    )
  })

  it('includes the remesa fields required by the assignment', () => {
    for (const remesa of remesaSeedList) {
      expect(remesa).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          company: expect.any(String),
          amount: expect.any(String),
          status: expect.stringMatching(/^(NO_COBRADO|COBRADO)$/),
          created_at: expect.any(String),
          charged_at: expect.any(String),
        }),
      )
    }
  })
})
