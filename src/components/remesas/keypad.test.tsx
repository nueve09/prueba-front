import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { RemesaKeypad } from '@/components/remesas/keypad'
import { toast } from '@/components/ui/toast'
import { useRemesasStore } from '@/stores/remesas-store'

const UNCHARGED_ID = '290034'

const readyStore = async () => {
  const load = useRemesasStore.getState().load()
  await vi.advanceTimersByTimeAsync(280)
  await load
}

const press = (name: string) => {
  fireEvent.click(screen.getByRole('button', { name }))
}

describe('RemesaKeypad', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('shows pressed digits without a ** prefix and caps at 8 digits', async () => {
    const user = userEvent.setup()
    render(<RemesaKeypad />)

    await user.click(screen.getByRole('button', { name: '1' }))
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '3' }))

    const display = screen.getByRole('status')
    expect(display).toHaveTextContent('1 2 3')
    expect(display).not.toHaveTextContent('**')

    for (let index = 0; index < 6; index += 1) {
      await user.click(screen.getByRole('button', { name: '4' }))
    }

    expect(display.textContent?.replaceAll(' ', '')).toHaveLength(8)
  })

  it('charges a ready uncharged id and clears the display', async () => {
    vi.useFakeTimers()
    await readyStore()
    render(<RemesaKeypad />)

    for (const digit of UNCHARGED_ID) {
      press(digit)
    }

    press('Cobrar remesa')
    await act(async () => {
      await vi.runAllTimersAsync()
    })

    expect(screen.getByRole('status')).toBeEmptyDOMElement()
    expect(
      useRemesasStore
        .getState()
        .remesas.find((remesa) => remesa.id === UNCHARGED_ID)?.status,
    ).toBe('COBRADO')
  })

  it('rejects a decimal id without mutating remesas', async () => {
    vi.useFakeTimers()
    const add = vi.spyOn(toast, 'add')
    await readyStore()
    render(<RemesaKeypad />)

    press('1')
    press('.')
    press('2')
    press('Cobrar remesa')

    expect(add).toHaveBeenCalledWith(expect.objectContaining({ type: 'error' }))
    expect(
      useRemesasStore
        .getState()
        .remesas.find((remesa) => remesa.id === UNCHARGED_ID)?.status,
    ).toBe('NO_COBRADO')
  })
})
