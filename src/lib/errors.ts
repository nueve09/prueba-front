import { z } from 'zod'

export const remesaErrorMessage = {
  notFound: 'La remesa no existe',
  alreadyCharged: 'La remesa ya fue cobrada',
  loadFailed: 'No se pudieron cargar las remesas',
  unexpected: 'Ocurrió un error inesperado',
} as const

export type RemesaErrorCode = 'NOT_FOUND' | 'ALREADY_CHARGED' | 'LOAD_FAILED'

export class RemesaApiError extends Error {
  readonly code: RemesaErrorCode

  constructor(code: RemesaErrorCode, message: string) {
    super(message)
    this.name = 'RemesaApiError'
    this.code = code
  }
}

export const formatUnknownError = (error: unknown): string => {
  if (error instanceof z.ZodError) {
    return error.issues.map((issue) => issue.message).join('. ')
  }

  if (error instanceof RemesaApiError) {
    return error.message
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return remesaErrorMessage.unexpected
}
