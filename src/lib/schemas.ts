import { z } from 'zod'

export const counterSchema = z.object({
  count: z.number().int().nonnegative(),
})
