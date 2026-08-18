import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { RemesaHistoryPanel } from '@/components/remesas/history-panel'
import { RemesaKeypadDialog } from '@/components/remesas/keypad-dialog'

describe('RemesaKeypadDialog', () => {
  it('keeps the Cobrar trigger off the desktop layout', () => {
    render(<RemesaHistoryPanel remesas={[]} isLoading={false} />)

    const trigger = screen.getByRole('button', { name: 'Cobrar' })
    expect(trigger.parentElement).toHaveClass('lg:hidden')
  })

  it('opens a dialog that contains the keypad', async () => {
    const user = userEvent.setup()
    render(<RemesaKeypadDialog />)

    await user.click(screen.getByRole('button', { name: 'Cobrar' }))

    expect(await screen.findByRole('dialog')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Cobrar remesa' })).toBeVisible()
    expect(screen.getByRole('status')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Cobrar remesa' })).toBeVisible()
  })
})
