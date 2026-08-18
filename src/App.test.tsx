import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import App from '@/App'

describe('App routes', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('shows the remesas workspace at /', () => {
    window.history.replaceState(null, '', '/')
    render(<App />)

    expect(
      screen.getAllByRole('heading', { name: 'Remesas' }).length,
    ).toBeGreaterThan(0)
  })

  it('shows a placeholder at /pagos without the remesa keypad', () => {
    window.history.replaceState(null, '', '/pagos')
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Pagos' })).toBeVisible()
    expect(
      screen.queryByRole('button', { name: 'Cobrar remesa' }),
    ).not.toBeInTheDocument()
  })
})
