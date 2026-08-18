import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { IconRail } from '@/components/layout/icon-rail'
import { APP_NAV_ITEMS } from '@/config/nav'

describe('IconRail', () => {
  it('exposes every destination and marks remesas as the current page at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <IconRail />
      </MemoryRouter>,
    )

    for (const item of APP_NAV_ITEMS) {
      const link = screen.getByRole('link', { name: item.label })
      if (item.to === '/') {
        expect(link).toHaveAttribute('aria-current', 'page')
      } else {
        expect(link).not.toHaveAttribute('aria-current', 'page')
      }
    }
  })
})
