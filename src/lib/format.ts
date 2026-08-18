const amountFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

export const formatRemesaAmount = (amount: string): string => {
  const parsed = Number(amount)
  if (Number.isNaN(parsed)) {
    return amount
  }

  return amountFormatter.format(parsed)
}

export const formatRemesaId = (id: string): string => `#${id}`

export const normalizeSearchValue = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replaceAll(/[$,\s]/g, '')
