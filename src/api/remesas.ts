import { remesaSeedList } from '@/data/remesas'
import { todayCompactDate } from '@/lib/dates'
import { RemesaApiError, remesaErrorMessage } from '@/lib/errors'
import {
  remesaIdSchema,
  remesaListSchema,
  remesaSchema,
  type Remesa,
} from '@/lib/schemas'

const MOCK_DELAY_MS = 280

let remesas: Remesa[] = remesaSeedList.map((remesa) => ({ ...remesa }))

export const resetRemesasApi = () => {
  remesas = remesaSeedList.map((remesa) => ({ ...remesa }))
}

export const replaceRemesasApi = (next: unknown) => {
  remesas = next as Remesa[]
}

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })

export const fetchRemesas = async (): Promise<Remesa[]> => {
  await wait(MOCK_DELAY_MS)

  const parsed = remesaListSchema.safeParse(remesas)
  if (!parsed.success) {
    throw parsed.error
  }

  return parsed.data
}

export const chargeRemesa = async (id: string): Promise<Remesa> => {
  await wait(MOCK_DELAY_MS)

  const parsedId = remesaIdSchema.safeParse(id)
  if (!parsedId.success) {
    throw parsedId.error
  }

  const current = remesas.find((remesa) => remesa.id === parsedId.data)
  if (!current) {
    throw new RemesaApiError('NOT_FOUND', remesaErrorMessage.notFound)
  }

  if (current.status === 'COBRADO') {
    throw new RemesaApiError(
      'ALREADY_CHARGED',
      remesaErrorMessage.alreadyCharged,
    )
  }

  const charged = remesaSchema.parse({
    ...current,
    status: 'COBRADO',
    charged_at: todayCompactDate(),
  })

  remesas = remesas.map((remesa) =>
    remesa.id === charged.id ? charged : remesa,
  )

  return charged
}
