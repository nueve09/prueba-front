import { create } from 'zustand'

import { counterSchema } from '@/lib/schemas'

type AppState = {
  count: number
  increment: () => void
}

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  increment: () =>
    set((state) => counterSchema.parse({ count: state.count + 1 })),
}))
