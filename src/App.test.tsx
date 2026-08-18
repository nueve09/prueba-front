import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

import App from '@/App'
import { APP_NAV_ITEMS } from '@/config/nav'

const unusedNavItems = APP_NAV_ITEMS.filter((item) => item.to !== '/')

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

  it.each(unusedNavItems)(
    'shows a placeholder at $to without the remesa keypad',
    ({ to, label }) => {
      window.history.replaceState(null, '', to)
      render(<App />)

      expect(screen.getByRole('heading', { name: label })).toBeVisible()
      expect(
        screen.queryByRole('button', { name: 'Cobrar remesa' }),
      ).not.toBeInTheDocument()
    },
  )

  it('navigates to Pagos from the remesas rail link', async () => {
    const user = userEvent.setup()
    window.history.replaceState(null, '', '/')
    render(<App />)

    await user.click(screen.getByRole('link', { name: 'Pagos' }))

    expect(window.location.pathname).toBe('/pagos')
    expect(screen.getByRole('heading', { name: 'Pagos' })).toBeVisible()
    expect(
      screen.queryByRole('button', { name: 'Cobrar remesa' }),
    ).not.toBeInTheDocument()
  })
})
