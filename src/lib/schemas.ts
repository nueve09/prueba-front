import { z } from 'zod'

const compactDatePattern = /^(\d{4})(\d{2})(\d{2})$/

const isCalendarDate = (value: string) => {
  const match = compactDatePattern.exec(value)
  if (!match) {
    return false
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day))

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

export const remesaStatusSchema = z.enum(['NO_COBRADO', 'COBRADO'], {
  error: 'Estatus de remesa inválido',
})

export const remesaIdSchema = z
  .string({ error: 'El ID es obligatorio' })
  .regex(/^\d{1,8}$/, 'El ID debe tener máximo 8 dígitos')

export const remesaCompanySchema = z
  .string({ error: 'La compañía es obligatoria' })
  .trim()
  .min(1, 'La compañía es obligatoria')
  .max(80, 'La compañía es demasiado larga')

export const remesaAmountSchema = z
  .string({ error: 'El monto es obligatorio' })
  .regex(/^\d+(\.\d{1,2})?$/, 'El monto debe ser numérico')

export const compactDateSchema = z
  .string({ error: 'La fecha es obligatoria' })
  .regex(/^\d{8}$/, 'La fecha debe tener formato AAAAMMDD')
  .refine(isCalendarDate, 'La fecha no es un día calendario válido')

const remesaFieldsSchema = z.object({
  id: remesaIdSchema,
  company: remesaCompanySchema,
  amount: remesaAmountSchema,
  created_at: compactDateSchema,
})

export const remesaSchema = z.discriminatedUnion('status', [
  remesaFieldsSchema.extend({
    status: z.literal('NO_COBRADO'),
    charged_at: z.literal(''),
  }),
  remesaFieldsSchema.extend({
    status: z.literal('COBRADO'),
    charged_at: compactDateSchema,
  }),
])

export const remesaListSchema = z
  .array(remesaSchema)
  .min(13, 'Debe haber más de 12 remesas')

export const searchQuerySchema = z
  .string()
  .max(64, 'La búsqueda es demasiado larga')
  .refine((value) => {
    for (const char of value) {
      const code = char.charCodeAt(0)
      if (code < 32 || code === 127) {
        return false
      }
    }
    return true
  }, 'La búsqueda contiene caracteres inválidos')

export const pageSchema = z
  .number()
  .int()
  .min(1, 'La página debe ser mayor a 0')

export type RemesaStatus = z.infer<typeof remesaStatusSchema>
export type Remesa = z.infer<typeof remesaSchema>
export type RemesaId = z.infer<typeof remesaIdSchema>
export type SearchQuery = z.infer<typeof searchQuerySchema>
