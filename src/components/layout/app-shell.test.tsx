import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'

import { AppShell } from '@/components/layout/app-shell'
import { APP_NAV_ITEMS } from '@/config/nav'

describe('AppShell', () => {
  it('uses a desktop rail and mobile tabs with the same destinations', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<div>child</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    const navigations = screen.getAllByRole('navigation', { name: 'Principal' })
    const rail = navigations.find((node) => node.className.includes('lg:flex'))
    const tabs = navigations.find((node) => node.className.includes('lg:hidden'))

    expect(rail).toHaveClass('hidden')
    expect(rail).toHaveClass('lg:flex')
    expect(tabs).toHaveClass('lg:hidden')

    for (const item of APP_NAV_ITEMS) {
      expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: item.label })).toBeInTheDocument()
    }
  })
})
