import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router'
import { describe, expect, it } from 'vitest'

import { MobileTabs } from '@/components/layout/mobile-tabs'
import { APP_NAV_ITEMS } from '@/config/nav'

const PathnameProbe = () => {
  const { pathname } = useLocation()
  return <div>{pathname}</div>
}

describe('MobileTabs', () => {
  it('exposes every destination and navigates when a tab is activated', async () => {
    const user = userEvent.setup()
    const pagos = APP_NAV_ITEMS.find((item) => item.to === '/pagos')

    render(
      <MemoryRouter initialEntries={['/']}>
        <MobileTabs />
        <PathnameProbe />
      </MemoryRouter>,
    )

    for (const item of APP_NAV_ITEMS) {
      expect(screen.getByRole('tab', { name: item.label })).toBeInTheDocument()
    }

    await user.click(screen.getByRole('tab', { name: pagos?.label ?? 'Pagos' }))

    expect(screen.getByText('/pagos')).toBeVisible()
  })
})
