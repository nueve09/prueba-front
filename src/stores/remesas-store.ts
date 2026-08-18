import { create } from 'zustand'

import { chargeRemesa, fetchRemesas } from '@/api/remesas'
import { RemesaApiError, remesaErrorMessage } from '@/lib/errors'
import type { Remesa } from '@/lib/schemas'

type LoadStatus = 'idle' | 'loading' | 'ready' | 'error'

type RemesasState = {
  remesas: Remesa[]
  status: LoadStatus
  load: () => Promise<void>
  charge: (id: string) => Promise<void>
}

export const useRemesasStore = create<RemesasState>((set, get) => ({
  remesas: [],
  status: 'idle',
  load: async () => {
    try {
      const { status } = get()
      if (status === 'loading' || status === 'ready') {
      return
    }

      set({ status: 'loading' })

      const remesas = await fetchRemesas()
      set({ remesas, status: 'ready' })
    } catch (error) {
      set({ status: 'error' })
      if (error instanceof RemesaApiError || error instanceof Error) {
        throw error
      }

      throw new RemesaApiError('LOAD_FAILED', remesaErrorMessage.loadFailed)
    }
  },
  charge: async (id) => {
    const charged = await chargeRemesa(id)
    set((state) => ({
      remesas: state.remesas.map((remesa) =>
        remesa.id === charged.id ? charged : remesa,
      ),
    }))
  },
}))
