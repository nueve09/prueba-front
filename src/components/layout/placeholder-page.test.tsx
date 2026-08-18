import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PlaceholderPage } from '@/components/layout/placeholder-page'

describe('PlaceholderPage', () => {
  it('renders the title heading without a remesa keypad', () => {
    render(<PlaceholderPage title="Pagos" />)

    expect(screen.getByRole('heading', { name: 'Pagos' })).toBeVisible()
    expect(
      screen.queryByRole('button', { name: 'Cobrar remesa' }),
    ).not.toBeInTheDocument()
  })
})
