import { afterEach, describe, expect, it, vi } from 'vitest'

import * as remesasApi from '@/api/remesas'
import { remesaSeedList } from '@/data/remesas'
import { useRemesasStore } from '@/stores/remesas-store'

const UNCHARGED_ID = '290034'
const OTHER_UNCHARGED_ID = '311122'

describe('useRemesasStore', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('loads remesas once and ignores a second load while ready', async () => {
    vi.useFakeTimers()
    const fetchSpy = vi.spyOn(remesasApi, 'fetchRemesas')

    const first = useRemesasStore.getState().load()
    await vi.advanceTimersByTimeAsync(280)
    await first

    expect(useRemesasStore.getState().status).toBe('ready')
    expect(useRemesasStore.getState().remesas).toHaveLength(remesaSeedList.length)
    expect(fetchSpy).toHaveBeenCalledTimes(1)

    await useRemesasStore.getState().load()
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('replaces only the charged remesa in state', async () => {
    vi.useFakeTimers()
    const load = useRemesasStore.getState().load()
    await vi.advanceTimersByTimeAsync(280)
    await load

    const beforeOther = useRemesasStore
      .getState()
      .remesas.find((remesa) => remesa.id === OTHER_UNCHARGED_ID)

    const charge = useRemesasStore.getState().charge(UNCHARGED_ID)
    await vi.advanceTimersByTimeAsync(280)
    await charge

    const charged = useRemesasStore
      .getState()
      .remesas.find((remesa) => remesa.id === UNCHARGED_ID)
    const other = useRemesasStore
      .getState()
      .remesas.find((remesa) => remesa.id === OTHER_UNCHARGED_ID)

    expect(charged?.status).toBe('COBRADO')
    expect(other).toEqual(beforeOther)
  })
})
