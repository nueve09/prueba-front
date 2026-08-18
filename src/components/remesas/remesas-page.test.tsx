import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { RemesasPage } from '@/components/remesas/remesas-page'
import { useRemesasStore } from '@/stores/remesas-store'

describe('RemesasPage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads the store on mount and shows history with a desktop-only keypad', () => {
    const load = vi.spyOn(useRemesasStore.getState(), 'load')
    render(<RemesasPage />)

    expect(load).toHaveBeenCalled()
    expect(screen.getByRole('searchbox', { name: 'Buscar remesas' })).toBeVisible()

    const headings = screen.getAllByRole('heading', { name: 'Remesas', level: 1 })
    const keypadSection = headings
      .map((heading) => heading.closest('section'))
      .find((section) => section !== null)

    expect(keypadSection).toHaveClass('hidden')
    expect(keypadSection).toHaveClass('lg:flex')
  })
})
