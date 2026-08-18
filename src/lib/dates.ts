const compactFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'UTC',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const longDateFormatter = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export const toCompactDate = (date: Date): string =>
  compactFormatter.format(date).replaceAll('-', '')

export const todayCompactDate = (): string => toCompactDate(new Date())

export const formatLongDate = (date: Date): string =>
  longDateFormatter.format(date)
