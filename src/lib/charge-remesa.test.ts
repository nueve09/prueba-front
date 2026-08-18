import { afterEach, describe, expect, it, vi } from 'vitest'

import { toast } from '@/components/ui/toast-manager'
import { remesaSeedList } from '@/data/remesas'
import { submitRemesaCharge } from '@/lib/charge-remesa'
import { remesaErrorMessage } from '@/lib/errors'
import { useRemesasStore } from '@/stores/remesas-store'

const UNCHARGED_ID = '290034'

describe('submitRemesaCharge', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('returns false and toasts on invalid or unchargeable ids', async () => {
    const add = vi.spyOn(toast, 'add')

    await expect(submitRemesaCharge('abc')).resolves.toBe(false)
    expect(add).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'error', title: expect.any(String) }),
    )

    vi.useFakeTimers()
    const load = useRemesasStore.getState().load()
    await vi.advanceTimersByTimeAsync(280)
    await load

    const pending = submitRemesaCharge('29939303')
    await vi.advanceTimersByTimeAsync(280)
    await expect(pending).resolves.toBe(false)
    expect(add).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        title: remesaErrorMessage.alreadyCharged,
      }),
    )
  })

  it('returns true for a valid uncharged id', async () => {
    vi.useFakeTimers()
    const load = useRemesasStore.getState().load()
    await vi.advanceTimersByTimeAsync(280)
    await load

    const pending = submitRemesaCharge(UNCHARGED_ID)
    await vi.advanceTimersByTimeAsync(280)
    await expect(pending).resolves.toBe(true)
    expect(
      remesaSeedList.some(
        (remesa) => remesa.id === UNCHARGED_ID && remesa.status === 'NO_COBRADO',
      ),
    ).toBe(true)
  })
})
