import { useEffect } from 'react'

import { RemesaHistoryPanel } from '@/components/remesas/history-panel'
import { RemesaKeypad } from '@/components/remesas/keypad'
import { toast } from '@/components/ui/toast'
import { formatUnknownError } from '@/lib/errors'
import { useRemesasStore } from '@/stores/remesas-store'

export const RemesasPage = () => {
  const remesas = useRemesasStore((state) => state.remesas)
  const status = useRemesasStore((state) => state.status)

  useEffect(() => {
    void useRemesasStore
      .getState()
      .load()
      .catch((error: unknown) => {
        toast.add({
          title: formatUnknownError(error),
          type: 'error',
        })
      })
  }, [])

  return (
    <main className="grid h-full min-h-0 bg-background lg:grid-cols-[minmax(0,1fr)_22rem] lg:bg-kiosk">
      <section className="print:hidden hidden min-h-0 flex-col gap-8 bg-kiosk px-8 py-10 text-kiosk-foreground lg:flex">
        <header className="flex flex-col gap-3">
          <p className="text-sm tracking-wide text-kiosk-foreground/80">
            Ventanilla <span className="font-heading font-bold">Digital</span>
          </p>
          <h1 className="font-heading text-5xl font-extrabold text-kiosk-accent">
            Remesas
          </h1>
        </header>
        <RemesaKeypad />
      </section>
      <RemesaHistoryPanel remesas={remesas} isLoading={status === 'loading'} />
    </main>
  )
}
