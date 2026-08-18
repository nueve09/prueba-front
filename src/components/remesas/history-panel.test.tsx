import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { RemesaHistoryPanel } from '@/components/remesas/history-panel'
import { formatRemesaAmount, formatRemesaId } from '@/lib/format'
import type { Remesa } from '@/lib/schemas'

const charged = (index: number): Remesa => ({
  id: String(20000000 + index),
  company: `Company ${index}`,
  amount: String(1000 + index),
  status: 'COBRADO',
  created_at: '20231001',
  charged_at: `202310${String(12 - (index % 12)).padStart(2, '0')}`,
})

const manyCharged = Array.from({ length: 12 }, (_, index) => charged(index))

describe('RemesaHistoryPanel', () => {
  it('renders formatted id, company, and amount plus a search field', () => {
    render(<RemesaHistoryPanel remesas={manyCharged} isLoading={false} />)

    expect(screen.getByRole('searchbox', { name: 'Buscar remesas' })).toBeVisible()
    expect(screen.getByText(formatRemesaId(manyCharged[0].id))).toBeVisible()
    expect(screen.getByText(manyCharged[0].company)).toBeVisible()
    expect(
      screen.getByText((_, node) => {
        return (
          node instanceof HTMLElement &&
          node.tagName === 'SPAN' &&
          node.textContent === formatRemesaAmount(manyCharged[0].amount)
        )
      }),
    ).toBeVisible()
  })

  it('shows pagination when there is more than one page', () => {
    render(<RemesaHistoryPanel remesas={manyCharged} isLoading={false} />)

    expect(screen.getByRole('navigation', { name: 'pagination' })).toBeVisible()
    expect(screen.getByRole('link', { name: '2' })).toBeVisible()
  })

  it('calls window.print from the print control', async () => {
    const user = userEvent.setup()
    const print = vi.spyOn(window, 'print').mockImplementation(() => {})
    render(<RemesaHistoryPanel remesas={manyCharged} isLoading={false} />)

    await user.click(screen.getByRole('button', { name: 'Imprimir' }))
    expect(print).toHaveBeenCalledTimes(1)
    print.mockRestore()
  })

  it('shows Hoy and omits mockup chrome', () => {
    render(<RemesaHistoryPanel remesas={manyCharged} isLoading={false} />)

    expect(screen.getByText('Hoy')).toBeVisible()
    expect(screen.queryByText(/notific/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/operador/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('img', { name: /avatar/i })).not.toBeInTheDocument()
  })
})
